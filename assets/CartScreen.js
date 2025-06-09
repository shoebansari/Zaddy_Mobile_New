import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from './CartScreenStyle';
import Header from '../../components/header/Header';
import { getUserId } from '../../api/auth';
import { addProductInCart, updateQuantityInCart } from '../../redux/slices/cartSlice';
import { emitCartUpdate } from '../../utils/emitCartUpdate';
import Toast from "react-native-toast-message";
import { calculateDiscountPercentage } from '../../utils/clientUtil';

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    try {
      const items = await AsyncStorage.getItem('cartItems');
      const parsedItems = items ? JSON.parse(items) : [];
      setCartItems(parsedItems);

      if (parsedItems.length) {
        const initialQuantities = {};
        parsedItems.forEach((item) => {
          initialQuantities[item.productId] = item.quantity || 1;
        });
        setQuantities(initialQuantities);
      }
    } catch (error) {
      console.error('Error loading cart items:', error);
      Alert.alert('Error', 'Failed to load cart items');
    }
  };

  const handleQuantityChange = async (newQuantity, productId) => {
    if (newQuantity < 1) return;

    setQuantities(prev => ({
      ...prev,
      [productId]: newQuantity,
    }));

    try {
      // Update AsyncStorage
      const items = await AsyncStorage.getItem('cartItems');
      const parsedItems = items ? JSON.parse(items) : [];
      const updatedItems = parsedItems.map(item =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      );
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedItems));

      // Dispatch to Redux with correct payload structure
      const userId = await getUserId();
      const payload = {
        updateQuantityInCartView: {
          userId: userId,
          productId: productId,
          quantity: newQuantity
        }
      };
      await dispatch(updateQuantityInCart(payload)).unwrap();
    } catch (error) {
      console.error('Error updating quantity:', error);
      Alert.alert('Error', 'Failed to update quantity');
    }
  };

  const increaseQuantity = (productId) => {
    const item = cartItems.find(item => item.productId === productId);
    const currentQty = quantities[productId] || 1;

    if (currentQty >= item.stock) {
      Alert.alert('Warning', 'Out of stock!');
      return;
    }

    handleQuantityChange(currentQty + 1, productId);
  };

  const decreaseQuantity = (productId) => {
    const currentQty = quantities[productId] || 1;
    if (currentQty > 1) {
      handleQuantityChange(currentQty - 1, productId);
    }
  };

  const handleDeleteItem = async (productId) => {
    try {
      const updatedItems = cartItems.filter(item => item.productId !== productId);
      await AsyncStorage.setItem('cartItems', JSON.stringify(updatedItems));
      setCartItems(updatedItems);
      Alert.alert('Success', 'Item removed from cart.');
      emitCartUpdate();
    } catch (error) {
      console.error('Error removing item:', error);
      Alert.alert('Error', 'Failed to remove item');
    }
  };

  const paymentSummary = useMemo(() => {
    let mrpTotal = 0;
    let sellingPriceTotal = 0;

    cartItems?.forEach(item => {
      const quantity = quantities[item.productId] || 1;
      mrpTotal += item.mrp * quantity;
      sellingPriceTotal += item.price * quantity;
    });

    const discount = mrpTotal - sellingPriceTotal;
    const deliveryFee = 0;
    const total = sellingPriceTotal + deliveryFee;

    return {
      mrpTotal,
      discount,
      deliveryFee,
      total,
    };
  }, [cartItems, quantities]);

  const handleCheckoutClick = async () => {
    const userId = await getUserId();

    if (!userId) {
      Toast.show({
        type: "error",
        text1: "Please log in to place your order",
      });

      navigation.navigate('SignInScreen');
      return;
    }

    setLoading(true);
    try {

      // Add all cart items to Redux before checkout
      for (const item of cartItems) {
        const payload = {
          productId: item.productId,
          quantity: quantities[item.productId] || 1,
          userId
        };
        await dispatch(addProductInCart(payload)).unwrap();
      }

      navigation.navigate('ShippingScreen');
    } catch (error) {
      console.error('Checkout error:', error);
      Alert.alert('Error', error.message || 'Failed to proceed to checkout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Header />

        {!cartItems?.length ? (
          <View style={styles.emptyCartContent}>
            <Image
              source={require('../../../assets/empty-cart.png')}
              style={styles.emptyCartImage}
              resizeMode="contain"
            />
            <Text style={styles.emptyCartTitle}>Your Cart is Empty!</Text>
            <Text style={styles.emptyCartText}>
              Have a nice day to buy the items you saved for later!
            </Text>
            <TouchableOpacity
              style={styles.continueShopping}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.continueShoppingText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <ScrollView style={styles.scrollView}>
              <View style={styles.cartItemsContainer}>
                {cartItems.map((item) => (
                  <View key={item.productId} style={styles.cartItem}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.productImage}
                      resizeMode="cover"
                    />

                    <View style={styles.productDetails}>
                      <Text style={styles.productName}>{item.productName}</Text>

                      <View style={styles.priceContainer}>
                        <Text style={styles.price}>₹{item.price}</Text>
                        <Text style={styles.mrp}>₹{item.mrp}</Text>
                        <View style={styles.discountBadge}>
                          <Text style={styles.discountText}>
                             {calculateDiscountPercentage(item?.mrp, item?.price)}% off
                          </Text>
                        </View>
                      </View>

                      <Text style={styles.seller}>
                        Sold by: <Text style={styles.sellerName}>{item.sellerName}</Text>
                      </Text>

                      <View style={styles.quantityContainer}>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => decreaseQuantity(item.productId)}
                        >
                          <Text style={styles.quantityButtonText}>−</Text>
                        </TouchableOpacity>

                        <View style={styles.quantityValue}>
                          <Text>{quantities[item.productId] || 1}</Text>
                        </View>

                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => increaseQuantity(item.productId)}
                        >
                          <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.deleteButton}
                          onPress={() => handleDeleteItem(item.productId)}
                        >
                          <Icon name="trash-2" size={20} color="#DC2626" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>

            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>Payment Details</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>MRP Total</Text>
                <Text style={styles.summaryValue}>₹{paymentSummary.mrpTotal.toFixed(2)}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Product Discount</Text>
                <Text style={styles.summaryValue}>₹{paymentSummary.discount.toFixed(2)}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, styles.textGreen]}>Delivery Fee</Text>
                <Text style={[styles.summaryValue, styles.textGreen]}>
                  {paymentSummary.deliveryFee === 0 ? 'FREE' : `₹${paymentSummary.deliveryFee}`}
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>₹{paymentSummary.total.toFixed(2)}</Text>
              </View>

              <Text style={styles.savings}>
                You Saved ₹{paymentSummary.discount.toFixed(2)}
              </Text>

              <TouchableOpacity
                style={[styles.checkoutButton, loading && styles.disabledButton]}
                onPress={handleCheckoutClick}
                disabled={loading}
              >
                <Text style={styles.checkoutButtonText}>
                  {loading ? 'Processing...' : 'Checkout'}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default CartScreen;
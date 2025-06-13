import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import styles from './OrderSuccessfullStyle';

const OrderSuccessfullScreen = () => {
  const navigation = useNavigation();
  const { data } = useSelector((state) => state.orderSlice.orderData);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Success Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
          </View>

          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>Thank you for your purchase!</Text>
            <Text style={styles.subtitle}>
              We've received your order.
              {'\n'}It will ship to: <Text style={styles.bold}>{data?.deliveryAddress}</Text>
              {'\n'}Expected delivery date: <Text style={styles.bold}>{data?.expectedDelivery}</Text>
              {'\n'}Order No: <Text style={styles.bold}>{data?.orderNo}</Text>
            </Text>
          </View>

          {/* Order Summary Section */}
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Order Summary</Text>

            {/* Product List */}
            {data?.productDetails?.map((product, index) => (
              <View key={index} style={styles.productItem}>
                <View style={styles.productImageContainer}>
                  {product.images?.[0] && (
                    <Image
                      source={{ uri: product.images[0] }}
                      style={styles.productImage}
                      resizeMode="cover"
                    />
                  )}
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product?.productName}</Text>

                  <View style={styles.priceRow}>
                    {product.mrp && product.price && product.mrp > product.price ? (
                      <>
                        <Text style={styles.price}>₹{product.price}</Text>
                        <Text style={styles.mrp}>₹{product.mrp}</Text>
                        <Text style={styles.discount}>
                          ₹{product.mrp - product.price} OFF
                        </Text>
                      </>
                    ) : (
                      <Text style={styles.price}>₹{product.price}</Text>
                    )}
                  </View>

                  <Text style={styles.qty}>Qty: {product.quantity || 1}</Text>
                  <View style={styles.ingredientsContainer}>
                    {product?.ingredients?.map((ingredient, i) => (
                      <Text key={i} style={styles.ingredient}>
                        {ingredient}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            ))}

            {/* Totals */}
            <View style={styles.totalsContainer}>
              <View style={styles.totalsRow}>
                <Text style={styles.totalLabel}>Subtotal</Text>
                <Text style={styles.totalValue}>₹{data?.subTotal || data?.totalAmount}</Text>
              </View>
              <View style={styles.totalsRow}>
                <Text style={styles.totalLabel}>Shipping</Text>
                <Text style={styles.totalValue}>₹{data?.shippingCharge || 0}</Text>
              </View>
              <View style={[styles.totalsRow, styles.totalBold]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>₹{data?.totalAmount}</Text>
              </View>
            </View>
          </View>

          {/* Continue Shopping Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Tab')}
          >
            <Text style={styles.buttonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderSuccessfullScreen;

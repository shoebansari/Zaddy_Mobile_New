import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, TextInput, Modal, TouchableWithoutFeedback, Pressable } from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect, useNavigationState } from '@react-navigation/native';
import { logout } from '../../redux/slices/signInSlice';
import { listenToCartUpdates } from '../../utils/emitCartUpdate';
import { searchProduct } from '../../redux/slices/productsSlice';

export default function Header() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loginDetail = useSelector((state) => state?.loginSlice);
  const user = loginDetail?.user ?? null;

  console.log(user);
  console.log('loginDetail==>',loginDetail);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [cartDropdownVisible, setCartDropdownVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const currentRoute = useNavigationState(state => 
    state?.routes ? state.routes[state.routes.length - 1]?.name : null
  );

  const handleLogoPress = () => {
    // List of screens that are not in the tab navigator
    const nonTabScreens = ['ShippingScreen','ProductDetails', 'ProductsScreen', 'Cart','OrderSuccessfullScreen','ProductDetails '];
    
    const isInNonTabScreen = currentRoute && nonTabScreens.includes(currentRoute);

    if (isInNonTabScreen) {
      // If we're in a non-tab screen, navigate to Tab
      navigation.navigate('Tab');
    } else {
      // If we're in the tab navigator or state is not available, navigate to Home tab
      navigation.navigate('Home');
    }
  };

  const handleOutsideClick = () => {
    if (dropdownVisible) {
      setDropdownVisible(false);
    }
    if (cartDropdownVisible) {
      setCartDropdownVisible(false);
    }
  };

  const loadCartItems = useCallback(async () => {
    try {
      const cartData = await AsyncStorage.getItem('cartItems');
      const items = cartData ? JSON.parse(cartData) : [];
      setCartItems(items);
    } catch (error) {

    }
  }, []);

  useEffect(() => {
    const unsubscribeCartUpdate = listenToCartUpdates(() => {
      loadCartItems();
    });

    return () => {
      unsubscribeCartUpdate();
    };
  }, [loadCartItems]);

  useFocusEffect(
    useCallback(() => {
      loadCartItems();
    }, [loadCartItems])
  );

  const handleLogout = async () => {
    await AsyncStorage.removeItem('loginDetails');
    await AsyncStorage.removeItem('token');
    dispatch(logout());
    setDropdownVisible(false);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 1),
      0
    ).toFixed(2);
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.cartItemImage} 
        resizeMode="contain"
      />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName} numberOfLines={1}>
          {item.productName || 'Unnamed Product'}
        </Text>
        <Text style={styles.cartItemPrice}>
          Rs {(item.price || 0).toFixed(2)} x {item.quantity || 1}
        </Text>
      </View>
    </View>
  );

  const cartCount = cartItems.length;

  const toggleSearch = () => {
    setIsOpen(!isOpen);
    setSearchValue("");
    setSearchResults([]);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const clearInput = () => {
    setSearchValue("");
    setSearchResults([]);
    inputRef.current?.focus();
  };

  const handleSearch = async (query) => {
    try {
      if (query.length >= 3) {
        const response = await dispatch(searchProduct(query));
        if (response.payload) {
          setSearchResults(response.payload);
        }
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    }
  };

  const handleProductClick = (productId) => {
    navigation?.navigate('ProductDetails', { productId });
    setIsOpen(false);
  };

  return (
    <View style={styles.wrapper}>
      <Pressable style={StyleSheet.absoluteFill} onPress={handleOutsideClick} />
      <View style={styles.container}>
        {user?.username ? (
          <View style={styles.userContainer}>
            <TouchableOpacity
              onPress={() => {
                setDropdownVisible(!dropdownVisible);
                setCartDropdownVisible(false);
              }}
              style={styles.adminButton}
            >
              <Ionicons name="person-circle-outline" size={22} color="#333" />
              <Text style={styles.username}>{user.username}</Text>
            </TouchableOpacity>
          </View>
        ) : <View style={styles.userContainer} />}

        {/* Logo */}
        <TouchableOpacity style={styles.logoContainer} onPress={handleLogoPress}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.iconsContainer}>
          <TouchableOpacity 
            style={styles.iconBtn}
            onPress={toggleSearch}
          >
            <Feather name="search" size={22} color="black" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.iconBtn, styles.cartIconContainer]}
            onPress={() => {
              setCartDropdownVisible(!cartDropdownVisible);
              setDropdownVisible(false);
            }}
          >
            <Ionicons name="cart-outline" size={22} color="black" />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* User Dropdown Modal */}
      <Modal
        visible={dropdownVisible}
        transparent={true}
        animationType="none"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={[styles.dropdown, styles.dropdownPosition]}>
                <TouchableOpacity 
                  style={styles.dropdownItem}
                  onPress={() => {
                    navigation.navigate("UserProfile");
                    setDropdownVisible(false);
                  }}
                >
                  <Ionicons name="person-outline" size={18} color="#333" />
                  <Text style={styles.dropdownText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.dropdownItem}
                  onPress={() => {
                    navigation.navigate('OrderHistory');
                    setDropdownVisible(false);
                  }}
                >
                  <Ionicons name="receipt-outline" size={18} color="#333" />
                  <Text style={styles.dropdownText}>Order History</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.dropdownItem}
                  onPress={() => {
                    navigation.navigate('AddressList');
                    setDropdownVisible(false);
                  }}
                >
                  <Ionicons name="home-outline" size={18} color="#333" />
                  <Text style={styles.dropdownText}>Address</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.dropdownItem, styles.logoutItem]}
                  onPress={handleLogout}
                >
                  <Ionicons name="log-out-outline" size={18} color="#d00" />
                  <Text style={[styles.dropdownText, styles.logoutText]}>Logout</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Cart Dropdown Modal */}
      <Modal
        visible={cartDropdownVisible}
        transparent={true}
        animationType="none"
        onRequestClose={() => setCartDropdownVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setCartDropdownVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={[styles.cartDropdown, styles.cartDropdownPosition]}>
                <Text style={styles.cartDropdownTitle}>Cart Items</Text>
                <Text style={styles.cartItemCount}>Items ({cartItems.length})</Text>
                
                {cartItems.length > 0 ? (
                  <>
                    <FlatList
                      data={cartItems}
                      renderItem={renderCartItem}
                      keyExtractor={(item) => item.productId || item.id}
                      style={styles.cartList}
                      contentContainerStyle={{ paddingBottom: 10 }}
                    />
                    <View style={styles.cartTotalContainer}>
                      <Text style={styles.cartTotalText}>Total amount to be paid:</Text>
                      <Text style={styles.cartTotalPrice}>Rs {calculateTotal()}</Text>
                    </View>
                    <TouchableOpacity 
                      style={styles.cartButton}
                      onPress={() => {
                        navigation.navigate('Cart');
                        setCartDropdownVisible(false);
                      }}
                    >
                      <Text style={styles.cartButtonText}>Proceed to Cart</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <Text style={styles.emptyCartText}>Your cart is empty</Text>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Search Bar */}
      {isOpen && (
        <View
          ref={containerRef}
          style={{
            backgroundColor: 'white',
            paddingVertical: 12,
            paddingHorizontal: 16,
            width: '100%',
            borderTopWidth: 1,
            borderTopColor: '#E5E7EB'
          }}
        >
          <View style={{ width: '100%', maxWidth: 640, marginHorizontal: 'auto' }}>
            <View style={{
              position: 'relative',
              flexDirection: 'row',
              alignItems: 'center',
              maxWidth: 384,
              marginHorizontal: 'auto'
            }}>
              <TextInput
                ref={inputRef}
                value={searchValue}
                onChangeText={(text) => {
                  const filteredValue = text.replace(/[^a-zA-Z0-9 ]/g, "");
                  setSearchValue(filteredValue);
                  handleSearch(filteredValue);
                }}
                placeholder="Search..."
                style={{
                  flex: 1,
                  paddingLeft: 12,
                  paddingRight: 32,
                  paddingVertical: 8,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: 'black',
                  fontSize: 14
                }}
                onFocus={() => setShowResults(true)}
                accessibilityLabel="Search input"
              />
              {searchValue && (
                <TouchableOpacity
                  onPress={clearInput}
                  style={{
                    position: 'absolute',
                    right: 12,
                  }}
                  accessibilityLabel="Clear search"
                >
                  <Icon name="close" size={20} color="#6B7280" />
                </TouchableOpacity>
              )}
            </View>
            {showResults && searchValue.length >= 3 && (
              <View style={{
                maxWidth: 384,
                marginHorizontal: 'auto',
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#E5E7EB',
                borderRadius: 6,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 5,
                maxHeight: 240,
                marginTop: 4
              }}>
                {searchResults.length > 0 ? (
                  <View style={{ padding: 8 }}>
                    {searchResults.map((result, index) => (
                      <TouchableOpacity
                        key={`${result.commonId}-${index}`}
                        style={{
                          padding: 8,
                          backgroundColor: '#fff',
                        }}
                        onPress={() => handleProductClick(result.commonId)}
                      >
                        <Text style={{ fontWeight: '500', fontSize: 14 }}>
                          {result.commonProduct}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : (
                  <View style={{ padding: 8 }}>
                    <Text style={{ color: '#6B7280', fontSize: 14 }}>
                      {searchValue.length >= 1
                        ? "No products found"
                        : "Type at least 3 characters"}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 999,
    position: 'relative',
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  adminButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
  },
  username: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    left: 15,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 1000,
    width: 180,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
  },
  logoutItem: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 5,
    paddingTop: 10,
  },
  logoutText: {
    color: '#d00',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    marginLeft: 15,
    position: 'relative',
  },
  cartIconContainer: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    right: -8,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cartDropdown: {
    position: 'absolute',
    top: 60,
    right: 15,
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 1000,
    width: 300,
    maxHeight: 400,
    padding: 15,
  },
  cartDropdownTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cartItemCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  cartList: {
    maxHeight: 200,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cartItemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 14,
    marginBottom: 5,
  },
  cartItemPrice: {
    fontSize: 12,
    color: '#666',
  },
  cartTotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  cartTotalText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cartTotalPrice: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cartButton: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 4,
    marginTop: 10,
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyCartText: {
    textAlign: 'center',
    paddingVertical: 20,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  dropdownPosition: {
    position: 'absolute',
    top: 60, // Adjust this value based on your header height
    left: 15,
  },
  cartDropdownPosition: {
    position: 'absolute',
    top: 60, // Adjust this value based on your header height
    right: 15,
  },
});


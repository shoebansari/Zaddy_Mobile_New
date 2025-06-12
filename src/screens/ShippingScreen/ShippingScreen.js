import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Dropdown } from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { addAddress, fetchAddress, updateAddress, } from "../../redux/slices/addressSlice";
import { getUserId } from "../../api/auth";
import { addOrderWithDetails } from "../../redux/slices/orderSlice";
import { v4 as uuidv4 } from "uuid";
import { fetchCountries, fetchStates, fetchCities } from "../../redux/slices/geographySlice";
import { fetchPaymentMode } from "../../redux/slices/paymentSlice";
import Coupon from "../../components/Coupon";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./ShippingStyle";

const { width } = Dimensions.get('window');

const ShippingScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [paymentMode, setPaymentMode] = useState("online");
  const [discount, setDiscount] = useState(0);
  const [couponId, setCouponId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [onlineMethod, setOnlineMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isAddressSaved, setIsAddressSaved] = useState(false);

  const { countries, states, cities } = useSelector((state) => state.geographySlice);
  const { paymentData } = useSelector((state) => state.paymentSlice);
  const {addressData} = useSelector((state) => state.addressSlice);
  const { addressList } = useSelector((state) => state.addressSlice);
  console.log("POII", addressList); 
  console.log("Address Detail:", addressData);  

  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    email: "",
    street: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    isDefualt: false,
  });

  const totalAmount = items.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );

  const validAddresses = addressData.filter(item => item.addressId);
const validCartItems = items.filter(item => item.productId);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchCountries());
      dispatch(fetchPaymentMode());
      try {
        const result = await dispatch(fetchAddress()).unwrap();
        console.log("ASDD",result);
      } catch (error) {
        console.error("Failed to fetch address:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (address.country) dispatch(fetchStates(address.country));
  }, [address.country, dispatch]);

  useEffect(() => {
    if (address.state) dispatch(fetchCities(address.state));
  }, [address.state, dispatch]);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const savedItems = await AsyncStorage.getItem('cartItems');
        if (savedItems) {
          const parsedItems = JSON.parse(savedItems);
          const validItems = parsedItems.map(item => ({
            ...item,
            quantity: item.quantity || 1,
            price: item.price || 0
          }));
          setItems(validItems);
        }
      } catch (error) {
        console.error("Failed to load cart items", error);
        Toast.show({
          type: "error",
          text1: 'Failed to load cart items'
        });
      }
    };
    loadCartItems();
  }, []);

  const handleChange = (name, value) => {
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "country") {
      setAddress((prev) => ({ ...prev, state: "", city: "" }));
    }

    if (name === "state") {
      setAddress((prev) => ({ ...prev, city: "" }));
    }
  };

  const handlePaymentMethodChange = (item) => {
    setOnlineMethod(item);
  };

  const validateAddress = () => {
    const {
      fullName,
      mobile,
      street,
      email,
      city,
      state,
      pincode,
      country,
    } = address;

    if (!fullName || !mobile || !email || !street || !city || !state || !pincode || !country) {
      Toast.show({
        type: "error",
        text1: "Please fill all address fields.",
      });
      return false;
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      Toast.show({
        type: "error",
        text1: "Invalid 10-digit mobile number",
      });
      return false;
    }

    if (!/^\d{6}$/.test(pincode)) {
      Toast.show({
        type: "error",
        text1: "Invalid 6-digit pincode",
      });
      return false;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      Toast.show({
        type: "error",
        text1: "Invalid email format",
      });
      return false;
    }

    return true;
  };

  const handleContinue = async () => {
    if (!validateAddress()) return;

    try {
      const userId = await getUserId();
      if (!userId) {
        Toast.show({
          type: "error",
          text1: "User not authenticated",
        });
        return;
      }

      const payload = {
        userId: userId,
        isDefualt: address.isDefualt,
        name: address.fullName,
        mobile: address.mobile,
        email: address.email,
        streetAddress: address.street,
        state: address.state,
        city: address.city,
        pincode: address.pincode,
        country: address.country,
        createdBy: userId,
      };

      setLoading(true);
      const resultAction = await dispatch(addAddress(payload));
      if (addAddress.fulfilled.match(resultAction)) {
        await dispatch(fetchAddress());
        Toast.show({
          type: "success",
          text1: "Address saved successfully!",
        });
        setShowAddressForm(false);
      } else {
        throw new Error(resultAction.payload || "Failed to save address");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSelect = async (addressId) => {
    try {
      const userId = await getUserId();
      if (!userId) {
        Toast.show({
          type: "error",
          text1: "User not authenticated",
        });
        return;
      }

      setLoading(true);

      // Find the address to update
      const addressToUpdate = addressList.find(addr => addr.addressId === addressId);
      if (!addressToUpdate) {
        Toast.show({
          type: "error",
          text1: "Address not found",
        });
        return;
      }

      // Reset all addresses to non-default first
      await Promise.all(
        addressList.map(async (addr) => {
          if (addr.isDefualt && addr.addressId !== addressId) {
            const resetData = {
              ...addr,
              userId: userId,
              isDefualt: false
            };
            await dispatch(updateAddress(resetData)).unwrap();
          }
        })
      );

      // Set the selected address as default
      const data = {
        ...addressToUpdate,
        userId: userId,
        isDefualt: true
      };

      const response = await dispatch(updateAddress(data)).unwrap();
      
      if (response.statusCode === 200) {
        Toast.show({
          type: "success",
          text1: response.message || "Address updated successfully",
        });
        await dispatch(fetchAddress());
        setSelectedAddressId(addressId);
      } else {
        throw new Error(response.message || "Failed to update address");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error.message || "Failed to update default address",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!addressData || addressData.length === 0) {
      Toast.show({
        type: "error",
        text1: "Please add or select an address first.",
      });
      return;
    }

    if (paymentMode === "online" && !onlineMethod?.paymentModeId) {
      Toast.show({
        type: "error",
        text1: "Please select a payment method.",
      });
      return;
    }

    try {
      const userId = await getUserId();
      if (!userId) {
        Toast.show({
          type: "error",
          text1: "User not authenticated",
        });
        return;
      }

      const selectedAddress = addressData.find((addr) => addr.isDefualt) || addressData[0];
      const paymentId = paymentMode === "online" ? onlineMethod?.paymentModeId : "cod";

      const OrderDetailsXML = `<OrderDetails>${items
        .map(
          (item) =>
            `<Detail>
              <productId>${item.productId}</productId>
              <quantity>${item.quantity || 1}</quantity>
              <price>${item.price || 0}</price>
              <discountPrice>${item.discountPrice || 0}</discountPrice>
              <gstCharge>${item.gst || 0}</gstCharge>
              <extraCharge>${item.extraCharge || 0}</extraCharge>
              <totalAmount>${(item.price || 0) * (item.quantity || 1)}</totalAmount>
              <MRP>${item.mrp || 0}</MRP>
            </Detail>`
        )
        .join("")}</OrderDetails>`.trim();

      const orderPayload = {
        userId: userId,
        addressId: selectedAddress.addressId,
        paymentId: paymentId,
        shippedDate: new Date().toISOString(),
        price: totalAmount,
        mrp: "",
        discountPrice: discount,
        deliveryCharge: 0,
        gstCharge: 0,
        extraCharge: 0,
        totalAmount: totalAmount - discount,
        paymentMethod: paymentMode === "cod" ? "Cash on Delivery" : onlineMethod.paymentName,
        transactionId: `TXN-${uuidv4().slice(0, 8)}`,
        trackingNo: `TRK-${uuidv4().slice(0, 8)}`,
        note: "Urgent Delivery",
        status: "Order Successfully",
        createdBy: userId,
        couponId: couponId,
        cancelOrderDate: null,
        OrderDetailsXML: OrderDetailsXML,
      };

      setLoading(true);
      const result = await dispatch(addOrderWithDetails(orderPayload)).unwrap();

      if (result.statusCode === 200) {
        Toast.show({
          type: "success",
          text1: result.message,
        });
        await AsyncStorage.removeItem('cartItems');
        navigation.navigate("OrderSuccessfullScreen");
      } else {
        Toast.show({
          type: "error",
          text1: result.message || "Order failed",
        });
      }
    } catch (error) {
      console.error("Order error:", error);
      Toast.show({
        type: "error",
        text1: error.message || "Failed to place order",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseForm = () => {
    setShowAddressForm(false);
    setIsAddressSaved(false);
    setAddress({
      fullName: "",
      mobile: "",
      street: "",
      country: "",
      state: "",
      city: "",
      pincode: "",
      isDefualt: false,
    });
  };

  const renderAddressItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.addressItem,
        item.isDefualt && styles.selectedAddressItem,
      ]}
      onPress={() => handleAddressSelect(item.addressId)}
    >
      <View style={styles.radioButton}>
        <View style={[
          styles.radioOuter,
          item.isDefualt && styles.radioOuterSelected,
        ]}>
          {item.isDefualt && <View style={styles.radioInner} />}
        </View>
      </View>

      <View style={styles.addressContent}>
        <Text style={styles.addressName}>{item.name}</Text>
        <Text style={styles.addressText}>{item.mobile}</Text>
        <Text style={styles.addressText}>
          {item.streetAddress}, {item.city_Name}, {item.state_Name} - {item.pincode}
        </Text>
        {item.isDefualt && (
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultBadgeText}>Default</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: item.image }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.productName}
        </Text>
        <View style={styles.productDetails}>
          <Text style={styles.productQuantity}>Qty: {item.quantity || 1}</Text>
          <Text style={styles.productPrice}>₹{(item.price || 0) * (item.quantity || 1)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Payment Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Mode</Text>
          {paymentMode === "online" && (
            <View style={styles.paymentMethodContainer}>
              <Text style={styles.paymentLabel}>Select Payment Method</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={paymentData?.filter((method) => method.status === "Active") || []}
                search
                maxHeight={300}
                labelField="paymentName"
                valueField="paymentModeId"
                placeholder="Select payment method"
                searchPlaceholder="Search..."
                value={onlineMethod?.paymentModeId || null}
                onChange={handlePaymentMethodChange}
                renderLeftIcon={() => (
                  <MaterialIcons name="payment" size={20} color="#333" style={styles.dropdownIcon} />
                )}
              />
            </View>
          )}
        </View>

        {/* Address Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>

          {Array.isArray(addressList) && addressList.length > 0 ? (
            <FlatList
              data={addressList}
              renderItem={renderAddressItem}
              keyExtractor={(item) => item.addressId}
              scrollEnabled={false}
            />
          ) : (
            <Text style={styles.noAddressText}>
              No addresses found. Please add an address.
            </Text>
          )}

          {!showAddressForm && (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddressForm(true)}
            >
              <Text style={styles.addButtonText}>+ Add New Address</Text>
            </TouchableOpacity>
          )}

          {showAddressForm && (
            <View style={styles.addressForm}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseForm}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>

              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={address.fullName}
                onChangeText={(text) => handleChange("fullName", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                value={address.mobile}
                onChangeText={(text) => handleChange("mobile", text)}
                keyboardType="phone-pad"
                maxLength={10}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={address.email}
                onChangeText={(text) => handleChange("email", text)}
                keyboardType="email-address"
              />
              <TextInput
                style={styles.input}
                placeholder="Street Address"
                value={address.street}
                onChangeText={(text) => handleChange("street", text)}
                multiline
              />
              <View style={styles.dropdownContainer}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={countries || []}
                  labelField="country_Name"
                  valueField="country_Id"
                  placeholder="Select Country"
                  value={String(address.country)}  
                  onChange={(item) => handleChange("country", String(item.country_Id))}
                />
              </View>

              {/* State Dropdown */}
              <View style={styles.dropdownContainer}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={states || []}
                  labelField="stateName"
                  valueField="pk_StateId"
                  placeholder="Select State"
                  value={address.state}
                  onChange={(item) => handleChange("state", String(item.pk_StateId))}
                />
              </View>

              {/* City Dropdown */}
              <View style={styles.dropdownContainer}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={cities || []}
                  labelField="cityName"
                  valueField="pk_CityId"
                  placeholder="Select City"
                  value={address.city}
                  onChange={(item) => handleChange("city", String(item.pk_CityId))}
                />
              </View>

              <TextInput
                style={styles.input}
                placeholder="Pincode"
                value={address.pincode}
                onChangeText={(text) => handleChange("pincode", text)}
                keyboardType="number-pad"
                maxLength={6}
              />

              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => handleChange("isDefualt", !address.isDefualt)}
              >
                <View style={[
                  styles.checkbox,
                  address.isDefualt && styles.checkboxChecked,
                ]}>
                  {address.isDefualt && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxLabel}>Set as default address</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleContinue}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.saveButtonText}>Save & Continue</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Cart Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>

          {items.length > 0 ? (
            <FlatList
              data={items}
              renderItem={renderCartItem}
              keyExtractor={(item) => item.productId}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.cartItemSeparator} />}
            />
          ) : (
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
          )}

          <View style={styles.couponContainer}>
            <Coupon
              onApplyDiscount={setDiscount}
              totalAmount={totalAmount}
              onCouponSelected={(id) => setCouponId(id)}
            />
          </View>

          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>₹{totalAmount}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>₹0</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount</Text>
              <Text style={[styles.summaryValue, styles.discountValue]}>
                -₹{discount}
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹{totalAmount - discount}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.placeOrderButtonText}>
              Place Order • ₹{totalAmount - discount}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShippingScreen;
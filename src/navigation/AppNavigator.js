import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomTabNavigator from './BottomTabNavigator';
import SignInScreen from '../screens/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import ReturnRefundScreen from '../screens/ReturnRefundScreen';
import TermsScreen from '../screens/TermsScreen';
import TrackOrderScreen from '../screens/TrackOrderScreen';
import WhatWeStandForScreen from '../screens/WhatWeStandForScreen';
import Header from '../components/header/Header';
import CartScreen from '../screens/CartScreen/CartScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen/ProductDetailsScreen';
import ShippingScreen from '../screens/ShippingScreen/ShippingScreen';
import OrderSuccessfullScreen from '../screens/OrderSuccessfullScreen/OrderScuccessfullScreen';
import EditUserDetailsScreen from '../screens/EditUserDetailsScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import AddressListScreen from '../screens/AddressListScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import VerifyOtpScreen from '../screens/VerifyOtpScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import CameraScreen from '../screens/CameraScreen/CameraScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Persistent Header */}
      <Header />
      
      {/* Stack Navigator */}
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FFFFFF' },
        }}
      >
        <Stack.Screen name="Tab" component={BottomTabNavigator} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ContactUs" component={ContactUsScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="ReturnRefund" component={ReturnRefundScreen} />
        <Stack.Screen name="Terms" component={TermsScreen} />
        <Stack.Screen name="TrackOrder" component={TrackOrderScreen} />
        <Stack.Screen name="WhatWeStandFor" component={WhatWeStandForScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="ShippingScreen" component={ShippingScreen} />
        <Stack.Screen name="OrderSuccessfullScreen" component={OrderSuccessfullScreen} />
        <Stack.Screen name="EditUserDetails" component={EditUserDetailsScreen} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        <Stack.Screen name="AddressList" component={AddressListScreen} />
        <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
        <Stack.Screen name="AddAddress" component={AddAddressScreen} />
        <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />

        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      </Stack.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default AppNavigator; 
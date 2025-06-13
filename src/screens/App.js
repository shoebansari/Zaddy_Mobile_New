import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './src/redux/store';
import Tabs from './src/navigation/Tabs';
import SignInScreen from './src/screens/SignInScreen/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import VerifyOtpScreen from './src/screens/VerifyOtpScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import Toast from 'react-native-toast-message';
import ProductsScreen from './src/screens/ProductsScreen';
import HomeScreen from './src/screens/HomeScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SkinCareInsightForm from './src/screens/SkinCareInsightForm';
import WhatWeStandForScreen from './src/screens/WhatWeStandForScreen';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
import TermsScreen from './src/screens/TermsScreen';
import ReturnRefundScreen from './src/screens/ReturnRefundScreen';
import TrackOrderScreen from './src/screens/TrackOrderScreen';
import ContactUsScreen from './src/screens/ContactUsScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen/ProductDetailsScreen'
import CartScreen from './src/screens/CartScreen/CartScreen';
import ShippingScreen from './src/screens/ShippingScreen/ShippingScreen';
import OrderSuccessfullScreen from './src/screens/OrderSuccessfullScreen/OrderScuccessfullScreen';
import EditUserDetailsScreen from './src/screens/EditUserDetailsScreen';
import AddressListScreen from './src/screens/AddressListScreen';
import AddAddressScreen from './src/screens/AddAddressScreen';
import OrderDetailsScreen from './src/screens/OrderDetailsScreen';
import OrderHistoryScreen from './src/screens/OrderHistoryScreen';
import skinProducts from './src/components/skinProducts';
import CameraScreen from './src/screens/CameraScreen/CameraScreen';
const Stack = createNativeStackNavigator();

function MainNavigator() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.loginSlice.isAuthenticated);

  useEffect(() => {
    dispatch({ type: 'CHECK_AUTH_STATUS' });
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tab" component={Tabs} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
        <Stack.Screen name="SkinCareForm" component={SkinCareInsightForm} />
        <Stack.Screen name="WhatWeStandFor" component={WhatWeStandForScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="Terms" component={TermsScreen} />
        <Stack.Screen name="ReturnRefund" component={ReturnRefundScreen} />
        <Stack.Screen name="TrackOrder" component={TrackOrderScreen} />
        <Stack.Screen name="ContactUs" component={ContactUsScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="ShippingScreen" component={ShippingScreen} />
        <Stack.Screen name="OrderSuccessfullScreen" component={OrderSuccessfullScreen} />
        <Stack.Screen name="EditUserDetails" component={EditUserDetailsScreen} />
        <Stack.Screen name="AddressList" component={AddressListScreen} />
        <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
        <Stack.Screen name="AddAddress" component={AddAddressScreen} />
        <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
        <Stack.Screen name="skinProducts" component={skinProducts} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <MainNavigator />
        <Toast />
      </Provider>
    </GestureHandlerRootView>
  );
}

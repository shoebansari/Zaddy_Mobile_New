import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
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
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <View style={styles.container}>
      {/* Persistent Header */}
      <Header />
      
      {/* Stack Navigator */}
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
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
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default AppNavigator; 
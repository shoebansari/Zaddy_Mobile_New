import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AccountScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Scrollable content */}
      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Ionicons name="person-circle-outline" size={100} color="#333" />

        {/* Sign In Button */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => navigation.navigate('SignUp')}>
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('WhatWeStandFor')}>
          <Text style={styles.linkText}>What we stand for</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
          <Text style={styles.linkText}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
          <Text style={styles.linkText}>Terms and Conditions</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ReturnRefund')}>
          <Text style={styles.linkText}>Return and Refund Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('TrackOrder')}>
          <Text style={styles.linkText}>Track Order</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ContactUs')}>
          <Text style={styles.linkText}>Contact Us</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 20, 
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
  },
  secondaryButtonText: {
    color: '#333',
  },
  linkText: {
    fontSize: 16,
    color: '#000000',
    marginTop: 12,
    cursor: 'pointer',
    textDecorationLine: 'underline',
  },
});
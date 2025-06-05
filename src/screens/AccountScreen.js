import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const AccountScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Account Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});

export default AccountScreen; 
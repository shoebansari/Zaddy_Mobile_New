import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const SkinInsightScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Skin Insight Screen</Text>
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

export default SkinInsightScreen; 
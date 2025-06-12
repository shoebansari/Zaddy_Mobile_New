import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ReturnRefundScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Return & Refund Policy</Text>

        <Text style={styles.paragraph}>
          At <Text style={styles.brand}>Zaddy</Text>, we want you to be completely satisfied with your purchase. We understand that sometimes a product may not meet your expectations, and we're here to help.
        </Text>

        <Text style={styles.heading}>Return Policy</Text>
        <Text style={styles.paragraph}>
          You may return most new, unopened items within 30 days of delivery for a full refund.
        </Text>

        <Text style={styles.heading}>Refund Process</Text>
        <Text style={styles.paragraph}>
          Once we receive your returned item, we will inspect it and notify you of the status of your refund.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#222',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 12,
    color: '#333',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 16,
  },
  brand: {
    fontWeight: 'bold',
    color: '#007AFF',
  }
});
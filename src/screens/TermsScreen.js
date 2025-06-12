import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TermsScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Terms & Conditions</Text>

        <Text style={styles.paragraph}>
          Welcome to <Text style={styles.brand}>Zaddy</Text>. By accessing and using our services, you agree to these terms and conditions.
        </Text>

        <Text style={styles.heading}>1. Agreement to Terms</Text>
        <Text style={styles.paragraph}>
          By accessing our website and using our services, you agree to be bound by these Terms and Conditions and our Privacy Policy.
        </Text>

        <Text style={styles.heading}>2. Use License</Text>
        <Text style={styles.paragraph}>
          Permission is granted to temporarily access the materials on Zaddy's website for personal, non-commercial use only.
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
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 

export default function ReturnRefundScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.mainContainer}>
      
      
      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Tab', { screen: 'Account' })} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Return & Refund Policy</Text>
        </View>

        <Text style={styles.paragraph}>
          At <Text style={styles.brand}>Zaddycare</Text>, each of our products is carefully crafted to ensure
          high-quality results with full transparency. We genuinely hope you enjoy using our products as
          much as we enjoy creating them. However, if you wish to return an item, simply get in touch with us —
          we will handle the rest.
        </Text>

        <Text style={styles.heading}>1. Refunds & Replacements</Text>
        <Text style={styles.paragraph}>
          We offer refunds or replacements only under the following circumstances:
        </Text>
        <Text style={styles.listItem}>- You received an incorrect product</Text>
        <Text style={styles.listItem}>- The item delivered was damaged</Text>
        <Text style={styles.listItem}>- The product you received was expired</Text>

        <Text style={styles.paragraph}>
          If any of the above applies, please submit your return or replacement request within 7 days of receiving the product.
          You can initiate the process by emailing us at <Text style={styles.contact}>help@zaddycare.com</Text>.
        </Text>

        <Text style={styles.heading}>2. Return Requests</Text>
        <Text style={styles.paragraph}>
          Kindly note, return requests will not be accepted or processed after the 7-day window from the date of delivery.
        </Text>

        <Text style={styles.heading}>3. Processing Time</Text>
        <Text style={styles.paragraph}>
          Once your request is received, please allow up to 48 hours for our team to review it. If approved,
          we will arrange for a reverse pickup through our courier partner, who will collect the item from your doorstep.
        </Text>

        <Text style={styles.heading}>4. Refund Timeline</Text>
        <Text style={styles.paragraph}>
          After we receive and inspect the returned item, if your concern is verified, a refund will be processed
          within 24 hours.
        </Text>

        <Text style={styles.heading}>5. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions or concerns about returns or refunds, please contact us at:
          <Text style={styles.contact}> help@zaddycare.com</Text>.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    width: '100%',
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 60, 
    paddingBottom: 40,
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222',
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 8,
    color: '#000',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 12,
  },
  listItem: {
    fontSize: 16,
    color: '#333',
    marginLeft: 20,
    marginBottom: 8,
  },
  brand: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  contact: {
    color: '#007AFF',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 20,
    zIndex: 1,
  }
});
import React from 'react';
import { ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import Header from '../components/home/Header';
import NotificationSlider from '../components/home/NotificationSlider';
import MenuIcon from '../components/home/MenuIcon';
import HorizontalSlider from '../components/home/HorizontalSlider';
import ProductList from '../components/home/ProductList';
import SkinInsight from '../components/home/SkinInsight';

const HomeScreen = () => {
  // Sample product data
  const bestSellers = [
    {
      id: 1,
      name: 'Vitamin C Serum',
      description: 'Brightening & Anti-aging',
      price: 29.99,
      image: 'https://via.placeholder.com/160x160',
    },
    {
      id: 2,
      name: 'Hyaluronic Acid',
      description: 'Deep Hydration',
      price: 24.99,
      image: 'https://via.placeholder.com/160x160',
    },
    // Add more products as needed
  ];

  const newLaunches = [
    {
      id: 1,
      name: 'Rose Water Toner',
      description: 'Natural & Refreshing',
      price: 19.99,
      image: 'https://via.placeholder.com/160x160',
    },
    {
      id: 2,
      name: 'Night Cream',
      description: 'Repair & Nourish',
      price: 34.99,
      image: 'https://via.placeholder.com/160x160',
    },
    // Add more products as needed
  ];

  const recommendedProducts = [
    {
      id: 1,
      name: 'Face Moisturizer',
      description: 'All-day Hydration',
      price: 27.99,
      image: 'https://via.placeholder.com/160x160',
    },
    {
      id: 2,
      name: 'Sunscreen SPF 50',
      description: 'Broad Spectrum Protection',
      price: 22.99,
      image: 'https://via.placeholder.com/160x160',
    },
    // Add more products as needed
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <NotificationSlider />
        <MenuIcon />
        <HorizontalSlider />
        <ProductList title="Our Best Sellers" products={bestSellers} />
        <SkinInsight />
        <ProductList title="New Launches" products={newLaunches} />
        <ProductList title="Recommended for You" products={recommendedProducts} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default HomeScreen; 
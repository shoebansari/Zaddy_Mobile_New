import React from 'react';
import { ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/home/Header';
import NotificationSlider from '../components/home/NotificationSlider';
import MenuIcon from '../components/home/MenuIcon';
import HorizontalSlider from '../components/home/HorizontalSlider';
import ProductList from '../components/home/ProductList';
import SkinInsight from '../components/home/SkinInsight';
import { fetchCategory } from '../redux/slices/homeSlice';
import { useEffect } from 'react';
const HomeScreen = () => {

  const dispatch = useDispatch();
  const { bestSeller,bestRecommended, bestArrial,  isLoader, isError } = useSelector(state => state.homeSlice.categoryList);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);


  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <NotificationSlider />
        <MenuIcon />
        <HorizontalSlider />
        <ProductList title="Our Best Sellers" products={bestSeller} />
        <SkinInsight />
        <ProductList title="New Launches" products={bestArrial} />
        <ProductList title="Recommended for You" products={bestRecommended} /> 
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
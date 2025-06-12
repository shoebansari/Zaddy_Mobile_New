import React from 'react';
import { StyleSheet, SafeAreaView, View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import NotificationSlider from '../components/home/NotificationSlider';
import MenuIcon from '../components/home/MenuIcon';
import HorizontalSlider from '../components/home/HorizontalSlider';
import ProductList from '../components/home/ProductList';
import SkinInsight from '../components/home/SkinInsight';
import { fetchCategory } from '../redux/slices/homeSlice';
import { useEffect } from 'react';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { bestSeller, bestRecommended, bestArrial, isLoader, isError } = useSelector(state => state.homeSlice.categoryList);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const renderItem = ({ item }) => {
    switch (item.type) {
      case 'notification':
        return <NotificationSlider />;
      case 'menu':
        return <MenuIcon />;
      case 'slider':
        return <HorizontalSlider />;
      case 'bestSeller':
        return <ProductList title="Our Best Sellers" products={bestSeller} />;
      case 'skinInsight':
        return <SkinInsight />;
      case 'newLaunches':
        return <ProductList title="New Launches" products={bestArrial} />;
      case 'recommended':
        return <ProductList title="Recommended for You" products={bestRecommended} />;
      default:
        return null;
    }
  };

  const sections = [
    { id: '1', type: 'notification' },
    { id: '2', type: 'menu' },
    { id: '3', type: 'slider' },
    { id: '4', type: 'bestSeller' },
    { id: '5', type: 'skinInsight' },
    { id: '6', type: 'newLaunches' },
    { id: '7', type: 'recommended' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sections}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        initialNumToRender={4}
        maxToRenderPerBatch={2}
        windowSize={5}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  }
});

export default HomeScreen; 
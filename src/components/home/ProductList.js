
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

export default function ProductList({products, title, isLoader, isError}) {
 
  const navigation = useNavigation();
  

  const handleProductPress = (productId) => {
    navigation?.navigate('ProductDetails', {productId});
  };

  const renderProduct = ({ item }) => {
    const discountPercentage = item.discountPrice 
      ? item.discountPrice 
      : Math.round(((item.mrp - item.price) / item.mrp) * 100);

    return (
      <TouchableOpacity 
        style={styles.productCard}
        onPress={() => handleProductPress(item.productId)}
      >
        {/* Product Image with Badge */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: item.imageUrl }} 
            style={styles.productImage} 
            resizeMode="contain" 
          />
          {/* {discountPercentage > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.badgeText}>{discountPercentage} ₹ OFF</Text>
            </View>
          )} */}
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>{item.productName}</Text>
          
          {/* Price Section */}
          <View style={styles.priceContainer}>
            <Text style={styles.sellingPrice}>₹{Number(item.price || 0).toFixed(2)}</Text>
            {item.mrp > item.price && (
              <Text style={styles.mrp}>₹{Number(item.mrp || 0).toFixed(2)}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoader) return <Text style={styles.loadingText}>Loading...</Text>;
  if (isError) return <Text style={styles.errorText}>Error fetching data.</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={products}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 10,
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  productCard: {
    width: 160,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    overflow: 'hidden',
    elevation: 3,
    border:"1px solid black",
    marginTop:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    position: 'relative',
    height: 140,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '80%',
    height: '80%',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#90EE90',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    height: 40,
  },
  productSubName: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  sellingPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginRight: 8,
  },
  mrp: {
    fontSize: 13,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
});
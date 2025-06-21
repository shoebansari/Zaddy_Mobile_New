import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { searchAllSkinInsightProduct } from '../../redux/slices/filterSlice';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 12;
const CARD_WIDTH = (width - CARD_MARGIN * 3) / 2;

const calculateDiscountPercentage = (mrp, price) => {
  if (!mrp || !price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
};

const RecommendedScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const IMAGE_BASE_URL = "https://api.zaddycare.in/productImage";
  useEffect(() => {
    dispatch(searchAllSkinInsightProduct({
      "age": "25 to 30",
      "gender": "Male",
      "skintype": "Normal",
      "skinSensitive": "Yes"
    })).unwrap().then((result) => {
      setData(result);
    }).catch(() => {
      setData([]);
    });
  }, [dispatch]);
  console.log('data===>', data);
  const handleClick = (id, productName) => {
    navigation.navigate('ProductDetails', { productId: id, productName });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleClick(item.productId, item.productName)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={`${IMAGE_BASE_URL}/${item.image}`}
         // source={item.image ? { uri: item.image } : require('../../assets/empty-cart.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.productName} numberOfLines={1}>
        {item.productName}
      </Text>
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>
      <View style={styles.priceContainer}>
        {item.mrp && (
          <Text style={styles.price}>₹ {item.price}</Text>
        )}
        <Text style={styles.mrp}>₹ {item.mrp}</Text>
        <Text style={styles.discount}>
          {calculateDiscountPercentage(item.mrp, item.price)}% Off
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleClick(item.productId, item.productName)}
      >
        <Text style={styles.buttonText}>View Products</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Your Personalized Product Recommendations
        </Text>
        <Text style={styles.headerSubtitle}>
          Products specially selected based on your skin analysis
        </Text>
      </View>

      {data?.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, idx) => item.productId?.toString() || idx.toString()}
          numColumns={2}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No recommended products available.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  grid: {
    paddingHorizontal: 4,
    paddingBottom: 10,
  },
  flatList: {
    flex: 0.8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: CARD_MARGIN,
    flex: 1,
    alignItems: 'center',
    padding: 8,
    minHeight: 150,
    maxWidth: CARD_WIDTH,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  imageContainer: {
    width: '25%',
    height: 60,
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    gap: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  mrp: {
    fontSize: 12,
    color: '#888',
    textDecorationLine: 'line-through',
  },
  discount: {
    fontSize: 12,
    color: '#16a34a',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RecommendedScreen;

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { getAllOrderByUserId } from '../redux/slices/orderSlice';
import { useNavigation } from '@react-navigation/native';

const OrderHistoryScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { orderHistory, loading, error } = useSelector((state) => state.orderSlice);

  useEffect(() => {
    dispatch(getAllOrderByUserId());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Icon name="arrow-back" size={24} color="#000" />
          <Text style={styles.header}>My Orders</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Icon name="search-outline" size={18} color="#888" />
          <TextInput placeholder="Search orders" style={styles.searchInput} />
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <Icon name="filter" size={20} color="#C2185B" />
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#C2185B" style={styles.loading} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView>
          {orderHistory?.length > 0 ? (
            orderHistory?.map((order, index) => (
              <TouchableOpacity
                key={index}
                style={styles.orderCard}
                onPress={() => navigation.navigate('OrderDetails', { orderId: order.orderId })}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.orderStatus}>{order.status}</Text>
                  <Text style={styles.orderReason}>Order No: {order.orderNo}</Text>
                  <Text style={styles.orderMeta}>Payment: {order.paymentMethod}</Text>
                  <Text style={styles.orderMeta}>Amount: ₹{order.totalAmount.toFixed(2)}</Text>
                  <Text style={styles.orderMeta}>Shipping: {order.fullAddress || 'N/A'}</Text>
                </View>
                <Icon name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No Orders Found</Text>
              <Text style={styles.emptySubtitle}>Start shopping now!</Text>
              <Image
                source={{ uri: 'https://png.pngtree.com/png-clipart/20220922/original/pngtree-buy-now-shopping-cart-black-button-sticker-png-image_8628056.png' }}
                style={styles.illustration}
              />
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9', // light background for a softer look
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
    marginLeft:10
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
  searchRow: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    marginLeft:30, 
    marginRight:30
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    borderRadius: 12,
    flex: 1,
    height: 45,
    shadowColor: '#ddd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  filterText: {
    marginLeft: 6,
    color: '#C2185B',
    fontWeight: '500',
  },
  loading: {
    marginTop: 30,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#ddd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  orderStatus: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  orderReason: {
    color: '#666',
    fontSize: 13,
    marginBottom: 2,
  },
  orderMeta: {
    fontSize: 12,
    color: '#999',
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
  },
  emptySubtitle: {
    color: '#999',
    fontSize: 14,
    marginBottom: 12,
  },
  illustration: {
    width: 120,
    height: 120,
    marginTop: 20,
  },
});

export default OrderHistoryScreen;
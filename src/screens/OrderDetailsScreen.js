import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearOrderDetails,
  fetchOrderDetailsByOrderNo,
} from '../redux/slices/orderSlice';
// import { jsPDF } from 'jspdf';
//import * as FileSystem from 'expo-file-system';
//import * as Sharing from 'expo-sharing';
import Toast from 'react-native-toast-message';

const BASE_IMAGE_URL = "https://api.zaddycare.in/productImage/";

const OrderDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { orderId } = route.params;

  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.orderSlice);
 
  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderDetailsByOrderNo({ orderId }));
    }
    // return () => dispatch(clearOrderDetails());
  }, [orderId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#C2185B" style={{ marginTop: 40 }} />;
  }

  if (error) {
    return <Text style={{ color: 'red', padding: 20 }}>{error}</Text>;
  }

  if (!orderDetails) {
    return null;
  }

  // const generatePDF = async (orderData) => {
  //   try {
  //     // Validate orderData
  //     if (!orderData || !orderData.products) {
  //       Toast.show({
  //         type: 'error',
  //         text1: 'Error',
  //         text2: 'Order details not available'
  //       });
  //       return;
  //     }

  //     // Create new document
  //     const doc = new jsPDF({
  //       orientation: 'p',
  //       unit: 'pt',
  //       format: 'a4'
  //     });

  //     // Set basic content
  //     let yPos = 50;
  //     const margin = 40;
  //     const lineHeight = 25;

  //     // Header
  //     doc.text('Order Details', margin, yPos);
  //     yPos += lineHeight * 2;

  //     // Order Info
  //     doc.text(`Order ID: ${orderData.orderId || 'N/A'}`, margin, yPos);
  //     yPos += lineHeight;
      
  //     doc.text(`Date: ${orderData.createdDate ? new Date(orderData.createdDate).toLocaleDateString() : 'N/A'}`, margin, yPos);
  //     yPos += lineHeight;
      
  //     doc.text(`Status: ${orderData.status || 'N/A'}`, margin, yPos);
  //     yPos += lineHeight * 2;

  //     // Products Table Header
  //     doc.text('Products:', margin, yPos);
  //     yPos += lineHeight;

  //     // Products List
  //     if (Array.isArray(orderData.products)) {
  //       orderData.products.forEach((product) => {
  //         doc.text(`Product: ${product.productName || 'N/A'}`, margin + 20, yPos);
  //         yPos += lineHeight;
  //         doc.text(`Quantity: ${product.quantity || 0}`, margin + 20, yPos);
  //         yPos += lineHeight;
  //         doc.text(`Price: ₹${product.price || 0}`, margin + 20, yPos);
  //         yPos += lineHeight;
  //         doc.text(`Total: ₹${(product.quantity || 0) * (product.price || 0)}`, margin + 20, yPos);
  //         yPos += lineHeight * 1.5;
  //       });
  //     }

  //     // Total Amount
  //     yPos += lineHeight;
  //     doc.text(`Total Amount: ₹${orderData.totalAmount || 0}`, margin, yPos);

  //     // Get PDF as base64
  //     const pdfBase64 = doc.output('datauristring');
      
  //     // Create file path
  //     const fileName = `Order_${orderData.orderId || 'unknown'}.pdf`;
  //     const filePath = `${FileSystem.documentDirectory}${fileName}`;
      
  //     // Write file
  //     await FileSystem.writeAsStringAsync(filePath, pdfBase64.split(',')[1], {
  //       encoding: FileSystem.EncodingType.Base64,
  //     });
      
  //     // Share file
  //     if (await Sharing.isAvailableAsync()) {
  //       await Sharing.shareAsync(filePath);
  //       Toast.show({
  //         type: 'success',
  //         text1: 'Success',
  //         text2: 'PDF generated and ready to share'
  //       });
  //     } else {
  //       Toast.show({
  //         type: 'error',
  //         text1: 'Error',
  //         text2: 'Sharing is not available on this device'
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error generating PDF:', error);
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Error',
  //       text2: 'Failed to generate PDF: ' + error.message
  //     });
  //   }
  // };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>Order Details</Text>
      </View>

      <Text style={styles.orderId}>
        Order No: <Text style={{ fontWeight: '600' }}>{orderDetails.orderNo}</Text>
      </Text>

      {/* Product Info */}
      {orderDetails.products?.map((product, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.productContainer}>
            <Image
              source={{ uri: `${BASE_IMAGE_URL}${product.images?.[0]?.image}` }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>{product.productName}</Text>
              <Text style={styles.productSubtitle}>Quantity: {product.quantity}</Text>
              <Text style={styles.productPrice}>₹{product.price}</Text>
              <Text style={styles.seller}>Sold by: {orderDetails.sellerName}</Text>
            </View>
          </View>
        </View>
      ))}

      {/* Status & Updates */}
      <View style={styles.card}>
        <Text style={styles.statusText}>✅ {orderDetails.status}</Text>
        {orderDetails.deliveryDate && (
          <Text style={styles.statusText}>📦 Delivered on {orderDetails.deliveryDate}</Text>
        )}
        <TouchableOpacity>
          <Text style={styles.link}>🔄 See All Updates</Text>
        </TouchableOpacity>
        <Text style={styles.greyText}>🚫 Return policy ended</Text>
      </View>

      {/* Chat Support */}
      <TouchableOpacity style={styles.chatButton}>
        <Text style={styles.chatText}>💬 Need help? Chat with us</Text>
      </TouchableOpacity>

      {/* Tracking Info */}
      <View style={styles.card}>
        <Text style={styles.sectionText}>
          📍 Order placed by: {orderDetails.name}
        </Text>
        <Text style={styles.sectionText}>Transaction ID: {orderDetails.transactionId}</Text>
        <TouchableOpacity>
          <Text style={styles.link}>🔒 Manage who can access</Text>
        </TouchableOpacity>
      </View>

      {/* Rate Product */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>⭐ Rate this product</Text>
        <Text style={styles.stars}>⭐ ⭐ ⭐ ⭐ ⭐</Text>
      </View>

      {/* Download Invoice */}
      <TouchableOpacity
        style={[
          styles.downloadButton,
          (!orderDetails || !orderDetails.products) && styles.downloadButtonDisabled
        ]}
        // onPress={() => generatePDF(orderDetails)}
        disabled={!orderDetails || !orderDetails.products}
      >
        <Icon name="download-outline" size={24} color="#fff" />
        <Text style={styles.downloadButtonText}>
          {!orderDetails ? 'Loading...' : 'Download PDF'}
        </Text>
      </TouchableOpacity>

      {/* Shipping Address */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📦 Shipping Address</Text>
        <Text>{orderDetails.name}</Text>
        <Text>{orderDetails.billingAddress}</Text>
      </View>

      {/* Price Breakdown */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>💰 Price Details</Text>
        {orderDetails.products?.map((product, idx) => (
          <View key={idx}>
            <View style={styles.row}>
              <Text>Product Price</Text>
              <Text>₹{product.price}</Text>
            </View>
            <View style={styles.row}>
              <Text>Discount</Text>
              <Text>-₹{product.discountPrice}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text>Total</Text>
              <Text style={styles.totalText}>₹{product.totalAmount}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f6f8',
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  orderId: {
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  productContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-around',
  },
  productTitle: {
    fontWeight: '600',
    fontSize: 14,
  },
  productSubtitle: {
    color: '#666',
    fontSize: 12,
  },
  productPrice: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  seller: {
    color: '#999',
    fontSize: 12,
  },
  statusText: {
    fontSize: 14,
    marginVertical: 2,
  },
  link: {
    color: '#0a84ff',
    marginTop: 8,
  },
  greyText: {
    color: '#777',
    marginTop: 4,
    fontSize: 12,
  },
  chatButton: {
    backgroundColor: '#0a84ff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  chatText: {
    color: '#fff',
    fontWeight: '600',
  },
  sectionText: {
    fontSize: 14,
    marginVertical: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stars: {
    fontSize: 22,
    marginTop: 4,
    color: '#ffcc00',
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    justifyContent: 'center',
  },
  downloadButtonDisabled: {
    backgroundColor: '#666',
    opacity: 0.7,
  },
  downloadButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
});

export default OrderDetailsScreen;
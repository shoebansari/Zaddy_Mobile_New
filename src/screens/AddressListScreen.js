import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddress, deleteAddress } from '../redux/slices/addressSlice';

const AddressListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { addressList, loading } = useSelector((state) => state.addressSlice);
  console.log('addressList==>',addressList);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    dispatch(fetchAddress());
  }, [dispatch]);

  const confirmDelete = async (addressId) => {
    if (!addressId) {
      console.warn("No addressId provided for deletion.");
      return;
    }

    const data = { addressId };

    try {
      const result = await dispatch(deleteAddress(data));

      if (deleteAddress.fulfilled.match(result)) {
        await dispatch(fetchAddress());
      } else {
        console.warn("Failed to delete address:", result);
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    }

    setSelectedAddressId(null);
    setModalVisible(false);
  };

  const handleDeletePress = (addressId) => {
    setSelectedAddressId(addressId);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Delivery Address</Text>
      </View>

      {/* Add New Address Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddAddress')}
      >
        <Text style={styles.addButtonText}>Add a new address</Text>
      </TouchableOpacity>

      {/* Address List */}
      <ScrollView>
        {!loading ? (
          addressList.map((address) => (
            <View key={address.addressId} style={styles.card}>
              <Text style={styles.text}>Name : {address.name}</Text>
              <Text style={styles.text}>
                Address : {address.city_Name}, {address.state_Name}, {address.country_Name}, {address.pincode}
              </Text>
              <Text style={styles.text}>Mobile: {address.mobile}</Text>
              <Text style={styles.text}>Email: {address.email}</Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => navigation.navigate('AddAddress', { addressData: address })}
                >
                  <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleDeletePress(address.addressId)}
                >
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text>Unable to load addresses.</Text>
        )}
      </ScrollView>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to delete this address?</Text>
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <Button title="Delete" color="red" onPress={() => confirmDelete(selectedAddressId)} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AddressListScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  addButton: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  actionButton: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 8,
    borderRadius: 4,
    width: '48%',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
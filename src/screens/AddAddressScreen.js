import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { addAddress, updateAddress } from '../redux/slices/addressSlice';
import { fetchCountries, fetchStates, fetchCities } from '../redux/slices/geographySlice';
import Toast from 'react-native-toast-message';

const addressSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  mobile: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Invalid 10-digit mobile number")
    .required("Mobile number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  streetAddress: Yup.string().required("Street address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.string()
    .required("Pincode is required")
    .matches(/^[0-9]+$/, "Pincode must be numeric")
    .length(6, "Pincode must be exactly 6 digits"),
  country: Yup.string().required("Country is required"),
  addressType: Yup.string().required("Address type is required"),
});

const AddAddressScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.loginSlice?.user?.userId);
  const { addressData } = route.params || {};
 
  const {
    loading,
    error,
    countries,
    states,
    cities
  } = useSelector(state => state.geographySlice);
  const { success } = useSelector(state => state.addressSlice);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    if (addressData?.country) {
      dispatch(fetchStates(addressData.country));
    }
    if (addressData?.state) {
      dispatch(fetchCities(addressData.state));
    }
  }, [dispatch, addressData]);

  useEffect(() => {
    if (success) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Address saved successfully',
        onHide: () => {
          navigation.navigate('AddressList');
        }
      });
    }
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.toString()
      });
    }
  }, [success, error, navigation]);

  const initialValues = {
    name: addressData?.name || '',
    email: addressData?.email || '',
    mobile: addressData?.mobile || '',
    country: addressData?.country || '',
    state: addressData?.state || '',
    city: addressData?.city || '',
    streetAddress: addressData?.streetAddress || '',
    pincode: addressData?.pincode || '',
    addressType: addressData?.addressType || 'Home',
  };

  return (
    <>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>
          {addressData ? 'Edit Address' : 'Add Address'}
        </Text>
      </View>

      <Formik
        initialValues={initialValues}
        validationSchema={addressSchema}
        onSubmit={(values) => {
          const payload = {
            ...values,
            userId,
            addressType: values.addressType || 'Home',
            isDefault: true,
            createdBy: userId,
          };

          if (addressData?.addressId) {
            dispatch(updateAddress({ ...payload, addressId: addressData.addressId }))
              .then((result) => {
                if (updateAddress.fulfilled.match(result)) {
                  Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Address updated successfully',
                    onHide: () => {
                      navigation.navigate('AddressList');
                    }
                  });
                } else {
                  Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Failed to update address'
                  });
                }
              })
              .catch((error) => {
                Toast.show({
                  type: 'error',
                  text1: 'Error',
                  text2: error.toString()
                });
              });
          } else {
            dispatch(addAddress(payload));
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Contact Information</Text>

            <TextInput
              label="Full Name"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              mode="outlined"
              style={styles.input}
              error={touched.name && !!errors.name}
            />
            {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <TextInput
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              mode="outlined"
              style={styles.input}
              error={touched.email && !!errors.email}
            />
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
              label="Phone Number"
              value={values.mobile}
              onChangeText={handleChange('mobile')}
              onBlur={handleBlur('mobile')}
              keyboardType="phone-pad"
              mode="outlined"
              style={styles.input}
              error={touched.mobile && !!errors.mobile}
            />
            {touched.mobile && errors.mobile && <Text style={styles.error}>{errors.mobile}</Text>}

            <Text style={styles.header}>Shipping Address</Text>

            {/* Country Picker */}
            <View style={styles.dropdownContainer}>
              <Text style={styles.label}>Country</Text>
              <Picker
                selectedValue={values.country}
                onValueChange={(val) => {
                  setFieldValue('country', val);
                  setFieldValue('state', '');
                  setFieldValue('city', '');
                  dispatch(fetchStates( val ));
                }}
                style={styles.picker}
              >
                <Picker.Item label="Select Country" value="" />
                {countries?.map(c => (
                  <Picker.Item key={c.country_Id} label={c.country_Name} value={c.country_Id} />
                ))}
              </Picker>
              {touched.country && errors.country && <Text style={styles.error}>{errors.country}</Text>}
            </View>

            {/* State Picker */}
            <View style={styles.dropdownContainer}>
              <Text style={styles.label}>State</Text>
              <Picker
                style={styles.picker}
                selectedValue={values.state}
                onValueChange={(itemValue) => setFieldValue('state', itemValue)}
              >
                <Picker.Item label="Select State" value="" />
                <Picker.Item label="Maharashtra" value="Maharashtra" />
                <Picker.Item label="Gujarat" value="Gujarat" />
                <Picker.Item label="Karnataka" value="Karnataka" />
                {/* Add more states as needed */}
              </Picker>
              {touched.state && errors.state && <Text style={styles.error}>{errors.state}</Text>}
            </View>

            {/* City Picker */}
            <View style={styles.dropdownContainer}>
              <Text style={styles.label}>City</Text>
              <Picker
                selectedValue={values.city}
                onValueChange={(val) => setFieldValue('city', val)}
                style={styles.picker}
              >
                <Picker.Item label="Select City" value="" />
                {cities?.map(c => (
                  <Picker.Item key={c.pk_CityId} label={c.cityName} value={c.pk_CityId} />
                ))}
              </Picker>
              {touched.city && errors.city && <Text style={styles.error}>{errors.city}</Text>}
            </View>

            <TextInput
              label="Pin Code"
              value={values.pincode}
              onChangeText={handleChange('pincode')}
              onBlur={handleBlur('pincode')}
              mode="outlined"
              style={styles.input}
              error={touched.pincode && !!errors.pincode}
            />
            {touched.pincode && errors.pincode && <Text style={styles.error}>{errors.pincode}</Text>}

            <TextInput
              label="Street Address"
              value={values.streetAddress}
              onChangeText={handleChange('streetAddress')}
              onBlur={handleBlur('streetAddress')}
              mode="outlined"
              style={styles.input}
              error={touched.streetAddress && !!errors.streetAddress}
            />
            {touched.streetAddress && errors.streetAddress && <Text style={styles.error}>{errors.streetAddress}</Text>}

            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
              loading={loading}
              disabled={loading}
              buttonColor="#000000"
              textColor="#ffffff"
            >
              {addressData ? 'Update Address' : 'Save Address'}
            </Button>
          </ScrollView>
        )}
      </Formik>
    </>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 15, marginVertical: 12, fontWeight: '600' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
    marginBottom: 10
  },
  input: { marginBottom: 12, backgroundColor: '#fff' },
  button: { marginTop: 20, padding: 8 },
  title: { margin: 10, fontWeight: '650', fontSize: 20 },
  dropdownContainer: {
    marginBottom: 12,
  },
  picker: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginBottom: 8,
  }
});

export default AddAddressScreen;
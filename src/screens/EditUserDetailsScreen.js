import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserProfile, updateUserProfile } from '../redux/slices/editUserProfileDetailSlice';
import { getUserId } from '../api/auth';
import Icon from 'react-native-vector-icons/Ionicons';

const EditUserDetailsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector(
    (state) => state.editUserProfileDetailSlice
  );
  const [middleName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(profile) && profile.length > 0) {
      const user = profile[0];
      setName(user.middleName || '');
      setEmail(user.email || '');
      setPhoneNumber(user.phoneNumber || '');
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      const userId = await getUserId();
      if (!userId) {
        throw new Error('User not logged in');
      }
      
      const userDetails = {
        userId,
        updatedBy: userId,
        firstName,
        lastName,
        middleName,
        email,
        phoneNumber,
      };

      const result = await dispatch(updateUserProfile(userDetails));

      if (updateUserProfile.fulfilled.match(result)) {
        Alert.alert('Success', 'Your details have been updated!');
        navigation.goBack();
      } else {
        throw new Error(result.payload || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Update error:', err);
      Alert.alert('Error', err.message || 'Something went wrong');
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: 'center' }}
      />
    );
  }

  if (error) {
    return <Text style={{ color: 'red', padding: 16 }}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      {/* ✅ Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.screenTitle}>Edit Profile</Text>

      <Text style={styles.label}>User Name:</Text>
      <TextInput
        value={middleName}
        onChangeText={setName}
        style={[styles.input, styles.disabledInput]}
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        value={email}
        editable={false}
        style={[styles.input, styles.disabledInput]}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        value={phoneNumber}
        editable={false}
        style={[styles.input, styles.disabledInput]}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>First Name:</Text>
      <TextInput
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />

      <Text style={styles.label}>Last Name:</Text>
      <TextInput
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditUserDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
    marginTop: 50, // extra space to avoid overlapping with back button
  },
  label: {
    fontWeight: '600',
    marginTop: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 12,
    paddingVertical: 8,
  },
  disabledInput: {
    backgroundColor: '#f2f2f2',
    color: '#999',
  },
  saveButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
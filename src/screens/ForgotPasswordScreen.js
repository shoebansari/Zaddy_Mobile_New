import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp } from '../redux/slices/forgotPasswordSlice';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

const ForgotPasswordScreen = () => {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading } = useSelector((state) => state.forgotPasswordSlice);

  const handleResetPassword = async () => {
    if (!username.trim()) {
      setUsernameError('Username is required.');
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Username is required.',
      });
      return;
    }

    setUsernameError('');
    const response = await dispatch(sendOtp(username));

    if (response.payload) {
      Toast.show({
        type: 'success',
        text1: 'OTP Sent',
        text2: 'Check your email or phone for the OTP.',
      });
      navigation.navigate('VerifyOtp', { username });
    } else {
      const errorMsg = response.payload?.message || 'Please try again.';
      Toast.show({
        type: 'error',
        text1: 'Send Failed',
        text2: errorMsg,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Centered Form */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Forgot Password</Text>

        <TextInput
          style={[styles.input, usernameError && styles.inputError]}
          placeholder="Enter your Username"
          placeholderTextColor="#888"
          autoCapitalize="none"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            if (usernameError) setUsernameError('');
          }}
        />
        {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleResetPassword}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Sending...' : 'Send OTP'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
    fontSize: 16,
  },
  inputError: {
    borderColor: 'red',
  },
  button: {
    height: 50,
    backgroundColor: '#000',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 5,
  },
});

export default ForgotPasswordScreen;

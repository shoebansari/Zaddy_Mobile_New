import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp } from '../redux/slices/verifyOtpSlice';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

const VerifyOtpScreen = ({ route }) => {
  const { username } = route.params;
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading } = useSelector((state) => state.verifyOtpSlice);

  const handleVerify = async () => {
    if (!otp.trim()) {
      setOtpError('OTP is required');
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'OTP is required.',
      });
      return;
    }

    setOtpError('');
    try {
      const result = await dispatch(verifyOtp({ username, otp }));

      if (verifyOtp.fulfilled.match(result)) {
        // Handle successful OTP verification even if payload is null
        // This means the API call was successful but returned no data
        // In this case, we can proceed with the password reset
        Toast.show({
          type: 'success',
          text1: 'OTP Verified',
          text2: 'You will be redirected to reset your password.',
        });
        navigation.navigate('ResetPassword', { username });
      } else {
        // Handle rejection case
        const errorMessage = result.payload?.message || 'Invalid OTP. Please try again.';
        setOtpError(errorMessage);
        Toast.show({
          type: 'error',
          text1: 'Verification Failed',
          text2: errorMessage,
        });
      }
    } catch (error) {
      // Handle any unexpected errors
      const errorMessage = 'Something went wrong. Please try again.';
      setOtpError(errorMessage);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
  onPress={() => navigation.navigate('SignInScreen')}
  style={styles.backButton}
>
  <Ionicons name="arrow-back" size={24} color="#000" />
</TouchableOpacity>


      {/* Centered Form */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.info}>OTP sent to: {username}</Text>

        <TextInput
          style={[styles.input, otpError && styles.inputError]}
          placeholder="Enter OTP"
          keyboardType="numeric"
          value={otp}
          onChangeText={(text) => {
            setOtp(text);
            if (otpError) setOtpError('');
          }}
        />
        {otpError ? <Text style={styles.errorText}>{otpError}</Text> : null}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleVerify}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Verify OTP</Text>
          )}
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
    marginBottom: 20,
    textAlign: 'center',
  },
  info: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
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
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 5,
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
});

export default VerifyOtpScreen;

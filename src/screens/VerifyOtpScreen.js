import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp } from '../redux/slices/verifyOtpSlice';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

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
    const response = await dispatch(verifyOtp({ username, otp }));

    if (response.payload) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'OTP verified successfully.',
      });
      navigation.navigate('ResetPassword', { username });
    } else {
      const errorMsg = response.payload?.message || 'Invalid OTP. Please try again.';
      setOtpError(errorMsg);
      Toast.show({
        type: 'error',
        text1: 'Verification Failed',
        text2: errorMsg,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
          placeholderTextColor="#888"
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#222',
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 15,
    color: '#333',
  },
  inputError: {
    borderColor: '#ff0000',
  },
  errorText: {
    color: '#ff0000',
    fontSize: 14,
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  button: {
    backgroundColor: '#007AFF',
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default VerifyOtpScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp } from '../redux/slices/forgotPasswordSlice';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

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
    <SafeAreaView style={styles.container}>
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
    marginBottom: 30,
    color: '#222',
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
    backgroundColor: '#000',
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

export default ForgotPasswordScreen;

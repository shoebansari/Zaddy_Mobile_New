import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { resetPassword } from '../redux/slices/resetPasswordSlice';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons'; 

const ResetPasswordScreen = ({ route }) => {
  const { username } = route.params;
  const [password, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { loading } = useSelector((state) => state.resetPasswordSlice);

  const handleReset = async () => {
    if (!password.trim()) {
      setPasswordError('Password is required');
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Password is required',
      });
      return;
    }

    setPasswordError('');

    const result = await dispatch(resetPassword({ username, password }));

    if (resetPassword.fulfilled.match(result)) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Password has been reset',
      });
      navigation.navigate('SignIn');
    } else {
      const errorMessage = result.payload || 'Something went wrong';
      setPasswordError(errorMessage);
      Toast.show({
        type: 'error',
        text1: 'Reset Failed',
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

      <Text style={styles.title}>Reset Password</Text>

      <TextInput
        style={[styles.input, passwordError && styles.inputError]}
        placeholder="New Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setNewPassword(text);
          if (passwordError) setPasswordError('');
        }}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleReset}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Reset Password</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 8,
  },
  inputError: {
    borderColor: 'red',
  },
   backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 12,
    marginLeft: 5,
  },
  button: {
    height: 45,
    backgroundColor: '#000',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#888',
  },
  buttonText: { color: '#fff', fontSize: 15 },
});

export default ResetPasswordScreen;

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { resetPassword } from '../redux/slices/resetPasswordSlice';
import Toast from 'react-native-toast-message';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Reset Password</Text>

        <TextInput
          style={[styles.input, passwordError && styles.inputError]}
          placeholder="New Password"
          placeholderTextColor="#888"
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

export default ResetPasswordScreen;

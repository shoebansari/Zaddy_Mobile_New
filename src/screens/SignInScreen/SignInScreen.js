import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView } from 'react-native';
import styles from './SignInStyle';
import { onLogin } from '../../redux/slices/signInSlice';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

export default function SignInScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const navigation = useNavigation();

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 5) {
      newErrors.password = 'Password must be at least 5 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const onSubmit = () => {
    setAuthError(''); // Clear any previous auth error
    if (validate()) {
      dispatch(onLogin({ username, password }))
        .unwrap()
        .then((res) => {
          console.log("Login Success:", res);
          if(res.isAuthenticated){
            navigation.navigate("Cart");
          } else {
            setAuthError('Invalid username or password');
          }
        })
        .catch((err) => {
          console.log("Login Failed:", err);
          setAuthError('Invalid username or password');
        });
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.innerContainer}>
            <Text style={styles.welcomeText}>Welcome Back!</Text>

            <Text style={styles.label}>User Name</Text>
            <TextInput
              style={[styles.input, errors.username && styles.inputError]}
              placeholder="Enter Username"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                setAuthError(''); // Clear auth error when user types
              }}
              autoCapitalize="none"
            />
            {errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setAuthError(''); // Clear auth error when user types
              }}
              autoCapitalize="none"
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity 
              style={styles.button} 
              onPress={onSubmit}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            {authError ? (
              <Text style={[styles.errorText, styles.authErrorText]}>{authError}</Text>
            ) : null}

            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signInText}>Don't Have An Account? Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.signInText}>Forgot Password</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
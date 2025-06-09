import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import styles from './SignInStyle';
import { onLogin } from '../../redux/slices/signInSlice';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

export default function SignInScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
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
    if (validate()) {
      dispatch(onLogin({ username, password }))
        .unwrap()
        .then((res) => {
          navigation.navigate("Cart");
        })
        .catch((err) => {
          console.log("Login Failed:", err);
        });
    }
  };

  return (
    <View style={styles.wrapper} accessible={true}>
      {/* Scrollable Content with Keyboard Handling */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back Button */}
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
            accessible={true}
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>

          <View style={styles.innerContainer}>
            <Text style={styles.welcomeText}>Welcome Back!</Text>

            <View accessible={true} accessibilityRole="form">
              <Text style={styles.label}>User Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Username"
                value={username}
                onChangeText={setUsername}
                accessibilityLabel="Username input"
                accessibilityHint="Enter your username"
                autoCapitalize="none"
                autoComplete="username"
              />
              {errors.username && (
                <Text style={styles.errorText} accessibilityRole="alert">
                  {errors.username}
                </Text>
              )}

              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                accessibilityLabel="Password input"
                accessibilityHint="Enter your password"
                autoCapitalize="none"
                autoComplete="password"
              />
              {errors.password && (
                <Text style={styles.errorText} accessibilityRole="alert">
                  {errors.password}
                </Text>
              )}

              <TouchableOpacity 
                style={styles.button} 
                onPress={onSubmit}
                accessible={true}
                accessibilityLabel="Sign in"
                accessibilityRole="button"
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              onPress={() => navigation.navigate('SignUp')}
              accessible={true}
              accessibilityLabel="Sign up"
              accessibilityRole="link"
            >
              <Text style={styles.signInText}>Don't Have An Account? Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => navigation.navigate('ForgotPassword')}
              accessible={true}
              accessibilityLabel="Forgot password"
              accessibilityRole="link"
            >
              <Text style={styles.signInText}>Forgot Password</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
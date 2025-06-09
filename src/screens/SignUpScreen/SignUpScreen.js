import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from './SignUpStyle';
import { onRegister } from '../../redux/slices/signupSlice';

export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    name: Yup.string().required('Name is required'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  });

  const handleRegister = (values, { setSubmitting }) => {
    dispatch(onRegister(values))
      .unwrap()
      .then((res) => {
        Alert.alert("Account Created Successfully!");
        navigation.replace('Tab');
      })
      .catch((err) => {
        Alert.alert("Registration Failed. Please try again.");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Formik
        initialValues={{ username: '', name: '', phoneNumber: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Back Button */}
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.replace('Tab', { screen: 'Account' })}
              accessible={true}
              accessibilityLabel="Go back to Account screen"
              accessibilityRole="button"
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <View style={styles.formContainer} accessible={true} accessibilityRole="form">
              <Text style={styles.headerTitle}>Create Account</Text>

              <TouchableOpacity 
                onPress={() => navigation.navigate('SignIn')}
                accessible={true}
                accessibilityLabel="Sign in to existing account"
                accessibilityRole="link"
              >
                <Text style={styles.signUpText}>Already have an account? Sign In</Text>
              </TouchableOpacity>

              {/* Username */}
              <Text style={styles.label}>User Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter User Name"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                autoCapitalize="none"
                autoComplete="username"
                accessibilityLabel="Username input"
                accessibilityHint="Enter your username"
              />
              {touched.username && errors.username && (
                <Text style={styles.error} accessibilityRole="alert">{errors.username}</Text>
              )}

              {/* Name */}
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Name"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                autoComplete="name"
                accessibilityLabel="Name input"
                accessibilityHint="Enter your full name"
              />
              {touched.name && errors.name && (
                <Text style={styles.error} accessibilityRole="alert">{errors.name}</Text>
              )}

              {/* Phone Number */}
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.countryCode}>+91</Text>
                <TextInput
                  style={styles.inputWithoutBorder}
                  placeholder="Enter phone number"
                  keyboardType="phone-pad"
                  value={values.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  autoComplete="tel"
                  accessibilityLabel="Phone number input"
                  accessibilityHint="Enter your 10-digit phone number"
                />
              </View>
              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={styles.error} accessibilityRole="alert">{errors.phoneNumber}</Text>
              )}

              {/* Email */}
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter email address"
                keyboardType="email-address"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                autoCapitalize="none"
                autoComplete="email"
                accessibilityLabel="Email input"
                accessibilityHint="Enter your email address"
              />
              {touched.email && errors.email && (
                <Text style={styles.error} accessibilityRole="alert">{errors.email}</Text>
              )}

              {/* Password */}
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter password"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                autoCapitalize="none"
                autoComplete="password-new"
                accessibilityLabel="Password input"
                accessibilityHint="Enter a password with at least 6 characters"
              />
              {touched.password && errors.password && (
                <Text style={styles.error} accessibilityRole="alert">{errors.password}</Text>
              )}

              <View style={styles.spacing} />

              {/* Submit Button */}
              <TouchableOpacity
                style={[styles.button, styles.createAccountButton]}
                onPress={handleSubmit}
                disabled={isSubmitting}
                accessible={true}
                accessibilityLabel="Create account"
                accessibilityRole="button"
                accessibilityState={{ disabled: isSubmitting }}
              >
                <Text style={styles.buttonText}>
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
}

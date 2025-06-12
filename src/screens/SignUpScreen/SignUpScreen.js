import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, SafeAreaView } from 'react-native';
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
            <Text style={styles.headerTitle}>Create Account</Text>

            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.signUpText}>Already have an account? Sign In</Text>
            </TouchableOpacity>

            <Text style={styles.label}>User Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter User Name"
              value={values.username}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              autoCapitalize="none"
            />
            {touched.username && errors.username && (
              <Text style={styles.error}>{errors.username}</Text>
            )}

            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
            />
            {touched.name && errors.name && (
              <Text style={styles.error}>{errors.name}</Text>
            )}

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
              />
            </View>
            {touched.phoneNumber && errors.phoneNumber && (
              <Text style={styles.error}>{errors.phoneNumber}</Text>
            )}

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email address"
              keyboardType="email-address"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              autoCapitalize="none"
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              autoCapitalize="none"
            />
            {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <View style={styles.spacing} />

            <TouchableOpacity
              style={[styles.button, styles.createAccountButton]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonText}>
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
}

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from './SignUpStyle';
import { onRegister } from '../../redux/slices/signupSlice';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing the Ionicons icon set

export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true); // Track password visibility

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    name: Yup.string().required('Name is required'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Minimum 6 characters')
      .required('Password is required')
      .matches(/(?=.*[0-9])/, 'Password must contain a number')
      .matches(/(?=.*[!@#$%^&*])/, 'Password must contain a special character')
      .matches(/(?=.*[A-Za-z])/, 'Password must contain a letter'),
  });

  const handleRegister = (values, { setSubmitting }) => {
    dispatch(onRegister(values))
      .unwrap()
      .then((res) => {
        setIsSuccess(true);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Account created successfully!',
          visibilityTime: 3000,
          autoHide: true,
        });
      })
      .catch((err) => {
        Toast.show({
          type: 'error',
          text1: 'Registration Failed',
          text2: 'Please try again.',
          visibilityTime: 3000,
          autoHide: true,
        });
      })
      .finally(() => setSubmitting(false));
  };

  if (isSuccess) {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.successContainer}>
          <Text style={styles.successTitle}>Account Created Successfully!</Text>
          <Text style={styles.successMessage}>
            Your account has been created. You can now start exploring our app.
          </Text>
          <TouchableOpacity style={styles.goHomeButton} onPress={() => navigation.navigate('Tab')}>
            <Text style={styles.goHomeButtonText}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

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
            {touched.username && errors.username && <Text style={styles.error}>{errors.username}</Text>}

            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
            />
            {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

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
            {touched.phoneNumber && errors.phoneNumber && <Text style={styles.error}>{errors.phoneNumber}</Text>}

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
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter password"
                secureTextEntry={passwordVisibility}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeIconWrapper}
                onPress={() => setPasswordVisibility(!passwordVisibility)}
              >
                <Icon
                  name={passwordVisibility ? 'eye-off' : 'eye'}
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <View style={styles.spacing} />

            <TouchableOpacity
              style={[styles.button, styles.createAccountButton]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonText}>{isSubmitting ? 'Creating Account...' : 'Create Account'}</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView>
  );
}

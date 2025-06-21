import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  SafeAreaView,
  PermissionsAndroid,
  Button,
  Linking,
  Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

const FaceDetectScreen = () => {
  useEffect(() => {
    const requestCameraPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'This app needs camera access to detect your face.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.warn('Camera permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestCameraPermission();
  }, []);
  const route = useRoute();
  useEffect(() => { 
    console.log("Navigated via deep link to:", route.name);
  }, []);
  const openFaceDetectPage = async () => {
    const url = 'https://zaddycare.com/face-detect.html';
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Unable to open the face detection page.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonWrapper}>
        <Button title="Open Face Detection Page" onPress={openFaceDetectPage} />
      </View>
    </SafeAreaView>
  );
};

export default FaceDetectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  buttonWrapper: {
    paddingHorizontal: 20,
  },
});

import React from 'react';
import { View, ScrollView, Image, Text, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export default function ImageSlider() {

  return (
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.slider}>
            <View style={styles.slide}>
              <Image source={require('../../../assets/banner_1.jpeg')} style={styles.banner} />
              <Text style={styles.bannerText}>Glow Up with Our Bestsellers</Text>
            </View>
            <View style={styles.slide}>
              <Image source={require('../../../assets/banner_2.jpeg')} style={styles.banner} />
              <Text style={styles.bannerText}>Your Skin Deserves Better</Text>
            </View>
          </ScrollView>
  );
}

const styles = StyleSheet.create({
  slider: { height: 350 },
  slide: { width, alignItems: 'center', justifyContent: 'center' },
  banner: { width: width * 0.9, height: 350, borderRadius: 0 },
  bannerText: { textAlign: 'center', marginTop: 0, fontWeight: 'bold' },

});

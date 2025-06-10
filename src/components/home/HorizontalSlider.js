import React from 'react';
import { View, ScrollView, Image, Text, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export default function ImageSlider() {

  return (
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.slider}>
            <View style={styles.slide}>
              <Image source={require('../../../assets/img.png')} style={styles.banner} />
              <Text style={styles.bannerText}>Glow Up with Our Bestsellers</Text>
            </View>
            <View style={styles.slide}>
              <Image source={require('../../../assets/img2.png')} style={styles.banner} />
              <Text style={styles.bannerText}>Your Skin Deserves Better</Text>
            </View>
            <View style={styles.slide}>
              <Image source={require('../../../assets/img3.png')} style={styles.banner} />
              <Text style={styles.bannerText}>Best Product ever existed</Text>
            </View>
          </ScrollView>
  );
}

const styles = StyleSheet.create({
  slider: { height: 200 },
  slide: { width, alignItems: 'center', justifyContent: 'center' },
  banner: { width: width * 0.9, height: 150, borderRadius: 10 },
  bannerText: { textAlign: 'center', marginTop: 5, fontWeight: 'bold' },

});

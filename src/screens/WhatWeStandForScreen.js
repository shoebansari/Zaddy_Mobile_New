import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WhatWeStandForScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.mainContainer}>      
      <View style={styles.contentWrapper}>
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.title}>What We Stand For</Text>

            <Text style={styles.paragraph}>
              Founded in 2025, <Text style={styles.brand}>Zaddy</Text> was born from a belief that the beauty industry needs a reset—
              one rooted in transparency, truth, and trust. In a market saturated with hype, fear-based messaging, and misleading claims,
              it's easy for consumers to feel overwhelmed and misinformed.
            </Text>

            <Text style={styles.paragraph}>
              Take the rise of "natural" beauty products. Many assume that if it's natural, it's automatically better—
              and that anything with a chemical-sounding name must be dangerous. But that's simply not true.
            </Text>

            <Text style={styles.quote}>
              "Everything is made of chemicals—even water. The idea of chemical-free skincare is a myth."
            </Text>

            <Text style={styles.paragraph}>
              <Text style={styles.brand}>Zaddy</Text> was created to cut through the noise. No fluff. No fear tactics. Just straightforward,
              science-backed products that do exactly what they say—crafted with integrity, not marketing spin.
            </Text>

            <Text style={styles.paragraph}>
              <Text style={styles.brand}>Zaddy</Text> exists to simplify skincare—and to help you make confident, informed choices.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentWrapper: {
    flex: 1,
    position: 'relative',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#222',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    color: '#333',
    marginBottom: 16,
  },
  quote: {
    fontStyle: 'italic',
    fontSize: 16,
    color: '#666',
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
    paddingLeft: 12,
    marginVertical: 16,
  },
  brand: {
    fontWeight: 'bold',
    color: '#007AFF',
  }
});
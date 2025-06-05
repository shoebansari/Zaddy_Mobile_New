import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const SkinInsight = () => {
  const insights = [
    {
      id: 1,
      title: 'Understanding Your Skin Type',
      description: 'Learn how to identify and care for your skin type',
      image: 'https://via.placeholder.com/200x150',
    },
    {
      id: 2,
      title: 'Daily Skincare Routine',
      description: 'Essential steps for a healthy skincare routine',
      image: 'https://via.placeholder.com/200x150',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Skin Insights</Text>
      <View style={styles.insightsContainer}>
        {insights.map((insight) => (
          <TouchableOpacity key={insight.id} style={styles.insightCard}>
            <Image
              source={{ uri: insight.image }}
              style={styles.insightImage}
              resizeMode="cover"
            />
            <View style={styles.textContainer}>
              <Text style={styles.insightTitle}>{insight.title}</Text>
              <Text style={styles.insightDescription}>
                {insight.description}
              </Text>
              <Text style={styles.readMore}>Read More →</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  insightsContainer: {
    gap: 15,
  },
  insightCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  insightImage: {
    width: '100%',
    height: 150,
  },
  textContainer: {
    padding: 15,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  insightDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  readMore: {
    color: '#2ecc71',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SkinInsight; 
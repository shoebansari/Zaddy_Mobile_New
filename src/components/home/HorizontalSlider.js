import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';

const { width } = Dimensions.get('window');

const HorizontalSlider = () => {
  const slides = [
    {
      id: 1,
      image: 'https://via.placeholder.com/350x200',
      title: 'Summer Collection',
      description: 'Discover our new summer essentials',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/350x200',
      title: 'Special Offer',
      description: 'Get 30% off on selected items',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/350x200',
      title: 'New Arrivals',
      description: 'Check out our latest products',
    },
  ];

  const flatListRef = useRef(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (currentIndex.current < slides.length - 1) {
        currentIndex.current += 1;
      } else {
        currentIndex.current = 0;
      }

      flatListRef.current?.scrollToIndex({
        index: currentIndex.current,
        animated: true,
      });
    }, 5000);

    return () => clearInterval(scrollInterval);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.slide, { width: width - 32 }]}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={width - 32}
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={styles.listContainer}
        onScrollToIndexFailed={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    paddingHorizontal: 16,
  },
  listContainer: {
    alignItems: 'center',
  },
  slide: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
  },
  textContainer: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default HorizontalSlider; 
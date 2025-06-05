import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';

const { width } = Dimensions.get('window');

const NotificationSlider = () => {
  const notifications = [
    { id: 1, message: '🎉 New Summer Collection is here!' },
    { id: 2, message: '🔥 Get 20% off on all skincare products' },
    { id: 3, message: '✨ Free shipping on orders above $50' },
  ];

  const flatListRef = useRef(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (currentIndex.current < notifications.length - 1) {
        currentIndex.current += 1;
      } else {
        currentIndex.current = 0;
      }

      flatListRef.current?.scrollToIndex({
        index: currentIndex.current,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, []);

  const renderItem = ({ item }) => (
    <View style={[styles.notificationItem, { width: width - 32 }]}>
      <Text style={styles.notificationText}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={notifications}
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
    height: 50,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 16,
  },
  listContainer: {
    alignItems: 'center',
  },
  notificationItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  notificationText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});

export default NotificationSlider; 
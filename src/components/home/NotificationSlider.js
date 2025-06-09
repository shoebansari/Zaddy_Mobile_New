import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotification } from '../../redux/slices/homeSlice';

const HorizontalSliderBanner = () => {
  const dispatch = useDispatch();
  const notificationList2 = useSelector(state => state.homeSlice);
  console.log("notificationList2", notificationList2)
  const { notificationList, isLoader, isError } = useSelector(state => state.homeSlice);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeNotifications, setActiveNotifications] = useState([]);

  console.log("notificationList", notificationList)
  // Fetch notifications on mount
  useEffect(() => {
    console.log("fetchNotification")
    dispatch(fetchNotification());
  }, [dispatch]);

  // Filter only active notifications after data loads
  useEffect(() => {
    const filtered = notificationList.filter(item => item.active === true);
    setActiveNotifications(filtered);
    setCurrentIndex(0); // Reset index when list changes
  }, [notificationList]);

  // Auto slide every 2 seconds after notifications are ready
  useEffect(() => {
    if (activeNotifications.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === activeNotifications.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval); // Cleanup
  }, [activeNotifications]);

  // Loading / Error / No data handling
  if (isLoader) {
    return <Text style={styles.loaderText}>Loading...</Text>;
  }

  if (isError) {
    return <Text style={styles.errorText}>Failed to load notifications</Text>;
  }

  if (activeNotifications.length === 0) {
    return <Text style={styles.noDataText}>No active notifications available</Text>;
  }

  // Manual navigation
  const handleLeftArrowClick = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? activeNotifications.length - 1 : prevIndex - 1
    );
  };

  const handleRightArrowClick = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === activeNotifications.length - 1 ? 0 : prevIndex + 1
    );
  };

  const combinedText = `${activeNotifications[currentIndex]?.title} - ${activeNotifications[currentIndex]?.description}`;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.arrow} onPress={handleLeftArrowClick}>
        <AntDesign name="left" size={16} color="black" />
      </TouchableOpacity>

      <View style={styles.messageWrapper}>
        <Text style={styles.combinedText}>{combinedText}</Text>
      </View>

      <TouchableOpacity style={styles.arrow} onPress={handleRightArrowClick}>
        <AntDesign name="right" size={16} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default HorizontalSliderBanner;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1f202c',
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  arrow: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    marginHorizontal: 5,
  },
  messageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2a2b38',
    borderRadius: 8,
    marginHorizontal: 10,
    flex: 1,
    minWidth: 200,
  },
  combinedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loaderText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
  noDataText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

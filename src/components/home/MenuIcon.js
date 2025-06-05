import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const MenuIcon = () => {
  const menuItems = [
    { id: 1, title: 'Skincare', icon: '🧴' },
    { id: 2, title: 'Makeup', icon: '💄' },
    { id: 3, title: 'Hair', icon: '💇‍♀️' },
    { id: 4, title: 'Body', icon: '🧼' },
    { id: 5, title: 'Fragrance', icon: '🌸' },
    { id: 6, title: 'Tools', icon: '🔧' },
    { id: 7, title: 'Sets', icon: '🎁' },
    { id: 8, title: 'Sale', icon: '🏷️' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem}>
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.title}>{item.title}</Text>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '23%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 10,
  },
  icon: {
    fontSize: 24,
    marginBottom: 5,
  },
  title: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
});

export default MenuIcon; 
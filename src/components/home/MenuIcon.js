import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { fetchCategory } from '../../redux/slices/homeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'; 

export default function MenuIcons() {
  const categoryList = useSelector(state => state.homeSlice.categoryList?.menu || []);
  const dispatch = useDispatch();
  const navigation = useNavigation(); 

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

    const handlePress = (item) => {
     navigation.navigate('ProductsScreen', { 
       categoryId: item.id, 
       name: item.name
     });
   };
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={styles.menuRow}
    >
      {categoryList.map((item) => (
        <TouchableOpacity key={item.categoryId} style={styles.menuItem} onPress={() => handlePress(item)}>
          <Image source={{ uri: item.image }} style={styles.menuIcon} />
          <Text style={styles.menuText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  menuRow: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-around', 
    marginVertical: 15 
  },
  menuItem: { 
    alignItems: 'center', 
    margin: 10 ,
    
  },
  menuIcon: { 
    width: 50, 
    border:"1px solid black",
    height: 50, 
    marginBottom: 5, 
    borderRadius: 25, 
    resizeMode: 'cover' 
  },
  menuText: { 
    fontSize: 12, 
    textAlign: 'center' 
  },
});

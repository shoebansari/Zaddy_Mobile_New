import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  const currentRoute = useNavigationState(state => 
    state?.routes ? state.routes[state.routes.length - 1]?.name : null
  );

  const handleLogoPress = () => {
    // List of screens that are not in the tab navigator
    const nonTabScreens = ['ProductDetails', 'ProductsScreen', 'CartScreen'];
    
    const isInNonTabScreen = currentRoute && nonTabScreens.includes(currentRoute);

    if (isInNonTabScreen) {
      // If we're in a non-tab screen, navigate to Tab
      navigation.navigate('Tab');
    } else {
      // If we're in the tab navigator or state is not available, navigate to Home tab
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <TouchableOpacity style={styles.logoContainer} onPress={handleLogoPress}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Right Icons */}
      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => {}}>
          <Ionicons name="search-outline" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => {}}>
          <View style={styles.cartContainer}>
            <Ionicons name="cart-outline" size={24} color="#333" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>2</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  logoContainer: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 40,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  cartContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#2ecc71',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 4,
  },
});

export default Header; 
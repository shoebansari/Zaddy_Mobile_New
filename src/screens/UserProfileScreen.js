import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const UserProfileScreen = () => {
  const navigation = useNavigation();
  const loginDetail = useSelector((state) => state?.loginSlice);
  const user = loginDetail?.user ?? null;

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const MenuItem = ({ icon, title, subtitle, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.iconTextRow}>
        <Icon name={icon} size={24} color="#000" />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.menuTitle}>{title}</Text>
          <Text style={styles.menuSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <Icon name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Profile Section */}
        <TouchableOpacity onPress={() => navigation.navigate('EditUserDetails')}>
          <View style={styles.profile}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{getInitials(user?.firstName)}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Hello {user?.firstName || 'User'}</Text>
              <Text style={styles.userEmail}>{user?.email || 'No email provided'}</Text>
              <Text style={styles.userGender}>{user?.gender || 'Gender not specified'}</Text>
            </View>
          </View>
          <View style={styles.divider} />
        </TouchableOpacity>

        {/* Menu Items */}
        <MenuItem 
          icon="location-outline" 
          title="Address Book" 
          subtitle="Manage your saved addresses" 
          onPress={() => navigation.navigate('AddressList')}
        />
        <MenuItem 
          icon="time-outline" 
          title="Order History" 
          subtitle="View your past orders"
          onPress={() => navigation.navigate('OrderHistory')} 
        />   
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profile: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'flex-start',
  },
  avatar: {
    backgroundColor: '#000',
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  userGender: {
    fontSize: 14,
    color: '#666',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#777',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 10,
  }
});

export default UserProfileScreen;
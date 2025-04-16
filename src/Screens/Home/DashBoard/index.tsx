import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Header, Icon} from 'src/Components';
import {
  Orders,
  Addresses,
  AccountDetails,
  Logout,
  BackIcon,
} from 'assets/icons';
import {styles} from './styles';

const DashBoard = () => {
  const navigation = useNavigation();

  const menuItems = [
    {id: 1, title: 'Orders', icon: Orders, route: 'Orders'},
    {id: 2, title: 'Downloads', icon: Orders, route: 'Downloads'},
    {id: 3, title: 'Addresses', icon: Addresses, route: 'Addresses'},
    {id: 4, title: 'Account Details', icon: AccountDetails, route: 'AccountDetails'},
    {id: 5, title: 'Logout', icon: Logout, route: 'Logout'},
  ];

  const handleMenuPress = (route: string) => {
    if (route === 'Logout') {
      // Handle logout logic
      return;
    }
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
        <Header title='DashBoard' icon1={BackIcon}/>
      <View style={styles.mobileView}>
        {menuItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => handleMenuPress(item.route)}>
            <View style={styles.iconContainer}>
              <Icon name={item.icon} width={24} height={24} color='white'/>
            </View>
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default DashBoard;
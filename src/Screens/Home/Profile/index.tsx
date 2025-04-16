import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Header, Icon} from 'src/Components';
import {Profile as ProfileIcon, Paper, Buy, Heart, BackIcon, RightArrow, Edit, Dashboard, Orders, Invoices, Addresses, AccountDetails, Communication, Logout, BulkOrder} from 'assets/icons';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {
  ACCOUNTDETAILS,
  ADDRESSES,
  COMMUNICATION,
  DASHBOARD,
  ORDER_SCREEN,
  PAYMENT_METHOD,
  SETTING_SCREEN,
  WELCOME,
} from 'src/Navigation/home/routes';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const menuItems = [
    {id: 1, title: 'Dashboard', icon: Dashboard, screen: DASHBOARD},
    {id: 2, title: 'Bulk Order', icon: BulkOrder, screen: DASHBOARD},
    {id: 2, title: 'Orders', icon: Orders, screen: ORDER_SCREEN},
    {id: 3, title: 'Your Invoices', icon: Invoices, screen: ''},
    {id: 4, title: 'Addresses', icon: Addresses, screen: ADDRESSES},
    {id: 5, title: 'Account details', icon: AccountDetails, screen: ACCOUNTDETAILS},
    {id: 6, title: 'Communication', icon: Communication, screen: COMMUNICATION},
    {id: 7, title: 'Log out', icon: Logout, screen: WELCOME}
  ];

  const renderMenuItem = (item: any) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={() => {
        navigation.navigate(item.screen);
      }}>
      <View style={styles.menuItemLeft}>
        <Icon name={item.icon} width={28} height={28} color='white'/>
        <Text style={styles.menuItemText}>{item.title}</Text>
      </View>
      <Icon name={RightArrow} width={24} height={24} color={'#fff'}/>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title='Profile' />

      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('assets/images/user.png')}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editButton}>
            <Icon name={Edit} width={20} height={20} />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>Esther Howard</Text>
      </View>

      <View style={styles.menuContainer}>{menuItems.map(renderMenuItem)}</View>
    </View>
  );
};

export default ProfileScreen;

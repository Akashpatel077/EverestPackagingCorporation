import React from 'react';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import {Header, Icon} from 'src/Components';
import {
  Profile as ProfileIcon,
  Paper,
  Buy,
  Heart,
  BackIcon,
  RightArrow,
  Edit,
  Dashboard,
  Orders,
  Invoices,
  Addresses,
  AccountDetails,
  Communication,
  Logout,
  BulkOrder,
} from 'assets/icons';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {
  ACCOUNTDETAILS,
  ADDRESSES,
  BULKORDERS,
  COMMUNICATION,
  DASHBOARD,
  ORDER_SCREEN,
  PAYMENT_METHOD,
  SETTING_SCREEN,
  WELCOME,
} from 'src/Navigation/home/routes';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@reduxjs/toolkit/query';
import {logout} from 'src/store/slices/authSlice';
import {resetStartKey} from 'src/store/slices/startKeySlice';
import {clearCart} from 'src/store/slices/cartSlice';
import CSafeAreaView from 'src/Components/CSafeAreaView';
import {resetWishList} from 'src/store/slices/wishlistSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {clearCookies} from 'src/services/wooCommerceApi';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const {user} = useSelector((state: RootState) => state.auth);
  const {username, avatar_urls} = user || {};
  const dispatch = useDispatch();

  const menuItems = [
    // {id: 1, title: 'Dashboard', icon: Dashboard, screen: DASHBOARD},
    {
      id: 1,
      title: 'Account details',
      icon: AccountDetails,
      screen: ACCOUNTDETAILS,
    },
    {id: 2, title: 'Bulk Order', icon: BulkOrder, screen: BULKORDERS},
    {id: 3, title: 'Orders', icon: Orders, screen: ORDER_SCREEN},
    {id: 4, title: 'Your Invoices', icon: Invoices, screen: ''},
    {id: 5, title: 'Addresses', icon: Addresses, screen: ADDRESSES},
    {id: 6, title: 'Communication', icon: Communication, screen: COMMUNICATION},
    {id: 7, title: 'Log out', icon: Logout, screen: WELCOME},
  ];

  const onItemPress = (item: any) => {
    if (item.title === 'Log out') {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Logout',
            style: 'destructive',
            onPress: async () => {
              dispatch(logout());
              dispatch(resetStartKey());
              dispatch(clearCart());
              dispatch(resetWishList());
              clearCookies();
              await AsyncStorage.setItem('userToken', '');
            },
          },
        ],
        {cancelable: true},
      );
    } else {
      navigation.navigate(item.screen);
    }
  };

  const renderMenuItem = (item: any) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={() => onItemPress(item)}>
      <View style={styles.menuItemLeft}>
        <Icon name={item.icon} width={28} height={28} color="white" />
        <Text style={styles.menuItemText}>{item.title}</Text>
      </View>
      <Icon name={RightArrow} width={24} height={24} color={'#fff'} />
    </TouchableOpacity>
  );

  return (
    <CSafeAreaView removeBottomSafeArea>
      <View style={styles.container}>
        <Header title="Profile" />

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={
                avatar_urls
                  ? {uri: avatar_urls && avatar_urls[96]}
                  : require('assets/images/user.png')
              }
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editButton}>
              <Icon name={Edit} width={20} height={20} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{username ?? 'Guest'}</Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map(renderMenuItem)}
        </View>
      </View>
    </CSafeAreaView>
  );
};

export default ProfileScreen;

import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {CustomAlert, Header, Icon} from 'src/Components';
import {
  RightArrow,
  Edit,
  Orders,
  Invoices,
  Addresses,
  Profile,
  Communication,
  Logout,
  BulkOrder,
  ChangePassword,
} from 'assets/icons';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {
  ACCOUNTDETAILS,
  ADDRESSES,
  BULKORDERS,
  CHANGE_PASSWORD,
  COMMUNICATION,
  ORDER_SCREEN,
  WELCOME,
} from 'src/Navigation/home/routes';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@reduxjs/toolkit/query';
import {logout} from 'src/store/slices/authSlice';
import {resetStartKey, setShowWelcome} from 'src/store/slices/startKeySlice';
import {clearCart} from 'src/store/slices/cartSlice';
import CSafeAreaView from 'src/Components/CSafeAreaView';
import {resetWishList} from 'src/store/slices/wishlistSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {clearCookies} from 'src/services/wooCommerceApi';
import {ScrollView} from 'react-native-gesture-handler';
import {clearAddresses} from 'src/store/slices/addressSlice';
import {colors, metrics} from 'src/theme';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const {user} = useSelector((state: RootState) => state.auth);
  const {username, avatar_urls} = user || {};
  const {hasStarted} = useSelector((state: RootState) => state.startKey);
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);

  const getMenuItems = () => {
    const baseItems = [
      {id: 2, title: 'Bulk Order', icon: BulkOrder, screen: BULKORDERS},
      {id: 3, title: 'Orders', icon: Orders, screen: ORDER_SCREEN},
    ];

    const authenticatedItems = [
      {
        id: 1,
        title: 'Account Details',
        icon: Profile,
        screen: ACCOUNTDETAILS,
      },

      {id: 4, title: 'Your Invoices', icon: Invoices, screen: ''},
      {id: 5, title: 'Addresses', icon: Addresses, screen: ADDRESSES},
      {
        id: 6,
        title: 'Change Password',
        icon: ChangePassword,
        screen: CHANGE_PASSWORD,
      },
      {id: 7, title: 'Log out', icon: Logout, screen: WELCOME},
    ];

    return user
      ? [authenticatedItems[0], ...baseItems, ...authenticatedItems.slice(1)]
      : [
          ...baseItems,
          {id: 7, title: 'Log out', icon: Logout, screen: WELCOME},
        ];
  };

  const menuItems = getMenuItems();

  const onItemPress = (item: any) => {
    if (item.title === 'Log out') {
      if (hasStarted) {
        dispatch(logout());
        dispatch(resetStartKey());
        dispatch(setShowWelcome(false));
      } else {
        setShowAlert(true);
      }
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
        <Icon
          name={item.icon}
          width={metrics.iconSize.md}
          height={metrics.iconSize.md}
          color={colors.white}
        />
        <Text style={styles.menuItemText}>
          {item.title === 'Log out' && hasStarted ? 'Log in' : item.title}
        </Text>
      </View>
      <Icon
        name={RightArrow}
        width={metrics.iconSize.md}
        height={metrics.iconSize.md}
        color={colors.white}
      />
    </TouchableOpacity>
  );

  return (
    <CSafeAreaView removeBottomSafeArea>
      <Header title="Profile" />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
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
            {/* <TouchableOpacity style={styles.editButton}>
              <Icon
                name={Edit}
                width={metrics.iconSize.sm}
                height={metrics.iconSize.sm}
              />
            </TouchableOpacity> */}
          </View>
          <Text style={styles.userName}>{username ?? 'Guest'}</Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map(renderMenuItem)}
        </View>
      </ScrollView>
      <CustomAlert
        visible={showAlert}
        title="Logout"
        description="Are you sure you want to logout?"
        button1={{
          text: 'CANCEL',
          onPress: () => {
            setShowAlert(false);
          },
          color: colors.gainsBoro,
        }}
        button2={{
          text: 'LOGOUT',
          onPress: async () => {
            setShowAlert(false);
            dispatch(logout());
            dispatch(resetStartKey());
            dispatch(clearCart());
            dispatch(resetWishList());
            dispatch(setShowWelcome(true));
            dispatch(clearAddresses());
            clearCookies();
            await AsyncStorage.setItem('userToken', '');
          },
          color: colors.red,
        }}
      />
    </CSafeAreaView>
  );
};

export default ProfileScreen;

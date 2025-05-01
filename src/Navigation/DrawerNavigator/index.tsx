// src/navigation/DrawerNavigator.tsx
import React from 'react';
import HomeContainer from '../home';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {RootState} from '@reduxjs/toolkit/query';
import {useAppSelector} from 'src/store/hooks';
import {
  AccountDetails,
  Buy,
  Category,
  Heart,
  Home,
  Logout,
  Orders,
  RightArrow,
} from 'assets/icons';
import {ORDER_SCREEN} from '../home/routes';
import {Icon} from 'src/Components';
import {useDispatch} from 'react-redux';
import {logout} from 'src/store/slices/authSlice';
import {resetStartKey} from 'src/store/slices/startKeySlice';
import {clearCart} from 'src/store/slices/cartSlice';
import {resetWishList} from 'src/store/slices/wishlistSlice';
import {clearCookies} from 'src/services/wooCommerceApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CSafeAreaView from 'src/Components/CSafeAreaView';

const Drawer = createDrawerNavigator();

const menuItems = [
  {id: 1, title: 'Home', icon: Home, screen: 'Home'},
  {id: 2, title: 'Categories', icon: Category, screen: 'Category'},
  {id: 4, title: 'Wishlist', icon: Heart, screen: 'Wishlist'},
  {id: 3, title: 'Orders', icon: Orders, screen: ORDER_SCREEN},
  {id: 5, title: 'My Cart', icon: Buy, screen: 'Cart'},
  {id: 6, title: 'Profile', icon: AccountDetails, screen: 'Profile'},
  {id: 7, title: 'Log out', icon: Logout},
];

const CustomDrawerContent = (props: any) => {
  const {user} = useAppSelector((state: RootState) => state.auth);
  const {username, avatar_urls, email} = user || {};
  const dispatch = useDispatch();

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
      if (item.screen === ORDER_SCREEN) {
        props.navigation.navigate('Home', {
          screen: 'Profile',
          params: {
            screen: item.screen,
          },
        });
      } else {
        props.navigation.navigate('Home', {
          screen: item.screen,
        });
      }
    }
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContainer}>
      <CSafeAreaView removeBottomSafeArea>
        <View style={styles.profileContainer}>
          <Image
            source={
              avatar_urls
                ? {uri: avatar_urls && avatar_urls[96]}
                : require('assets/images/user.png')
            }
            style={styles.avatar}
          />
          <Text style={styles.profileName}>{username ?? 'Guest'}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>

        <View style={styles.separator} />

        <View style={styles.navItemsContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.navItem}
              onPress={() => onItemPress(item)}>
              <Icon name={item.icon} width={28} height={28} color="white" />
              <Text style={styles.navText}>{item.title}</Text>
              <Icon name={RightArrow} width={28} height={28} color="white" />
            </TouchableOpacity>
          ))}
        </View>
      </CSafeAreaView>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{headerShown: false, drawerStyle: {width: '75%'}}}>
      <Drawer.Screen name="Home" component={HomeContainer} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
  drawerContainer: {},
  profileContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    paddingTop: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
    marginBottom: 15,
  },
  navItemsContainer: {
    paddingHorizontal: 20,
  },
  navItem: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    paddingLeft: 12,
    paddingTop: 5,
    flex: 1,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    elevation: 5,
    backgroundColor: '#FFFFFF',
  },
  email: {
    fontSize: 14,
    color: '#777777',
    fontFamily: 'Poppins-Medium',
  },
});

// src/navigation/DrawerNavigator.tsx
import React, {useState} from 'react';
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
  Profile,
  Buy,
  Category,
  Heart,
  Home,
  Logout,
  Orders,
  RightArrow,
} from 'assets/icons';
import {ORDER_SCREEN} from '../home/routes';
import {CustomAlert, Icon} from 'src/Components';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from 'src/store/slices/authSlice';
import {resetStartKey, setShowWelcome} from 'src/store/slices/startKeySlice';
import {clearCart} from 'src/store/slices/cartSlice';
import {resetWishList} from 'src/store/slices/wishlistSlice';
import {clearCookies} from 'src/services/wooCommerceApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CSafeAreaView from 'src/Components/CSafeAreaView';
import {clearAddresses} from 'src/store/slices/addressSlice';
import {colors, metrics, scale, typography} from 'src/theme';

const Drawer = createDrawerNavigator();

const menuItems = [
  {id: 1, title: 'Home', icon: Home, screen: 'Home'},
  {id: 2, title: 'Categories', icon: Category, screen: 'Category'},
  {id: 4, title: 'Wishlist', icon: Heart, screen: 'Wishlist'},
  {id: 3, title: 'Orders', icon: Orders, screen: ORDER_SCREEN},
  {id: 5, title: 'My Cart', icon: Buy, screen: 'Cart'},
  {id: 6, title: 'Profile', icon: Profile, screen: 'Profile'},
  {id: 7, title: 'Log out', icon: Logout},
];

const CustomDrawerContent = (props: any) => {
  const {user} = useAppSelector((state: RootState) => state.auth);
  const {username, avatar_urls, email} = user || {};
  const {hasStarted} = useSelector((state: RootState) => state.startKey);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();

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
      showsVerticalScrollIndicator={false}
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
              <Icon
                name={item.icon}
                width={metrics.iconSize.md}
                height={metrics.iconSize.md}
                color="white"
              />
              <Text style={styles.navText}>
                {item.title === 'Log out' && hasStarted ? 'Log in' : item.title}
              </Text>
              <Icon
                name={RightArrow}
                width={metrics.iconSize.md}
                height={metrics.iconSize.md}
                color="white"
              />
            </TouchableOpacity>
          ))}
        </View>
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
    marginBottom: metrics.margin.md,
    paddingHorizontal: metrics.padding.md,
    alignItems: 'center',
  },
  profileName: {
    fontSize: typography.fontSize.xl,
    fontFamily: 'Poppins-Medium',
    paddingTop: metrics.padding.sm,
  },
  separator: {
    height: 1,
    backgroundColor: colors.gainsBoro,
    marginBottom: metrics.margin.sm,
  },
  navItemsContainer: {
    paddingHorizontal: metrics.padding.md,
  },
  navItem: {
    paddingVertical: metrics.padding.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navText: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Poppins-Medium',
    paddingLeft: metrics.padding.md,
    paddingTop: metrics.padding.xs,
    flex: 1,
  },
  avatar: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    elevation: 5,
    backgroundColor: colors.white,
  },
  email: {
    fontSize: typography.fontSize.xs,
    color: colors.dimGray,
    fontFamily: 'Poppins-Regular',
  },
});

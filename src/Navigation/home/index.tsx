import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  HomeScreen,
  ProductDetails,
  WishlistScreen,
  MyCart,
  ProfileScreen,
  SettingScreen,
  ShippingAddressScreen,
} from 'src/Screens/Home';
import {
  CHECKOUT,
  HOMESCREEN,
  MYCART,
  PAYMENT_METHOD,
  PRODUCT_DETAILS,
  PROFILE,
  SETTING_SCREEN,
  SHIPPING_ADDRESS,
  WISHLIST,
} from './routes';
import {SvgProps} from 'react-native-svg';
import {Home, Buy, Heart, Paper, Profile} from 'assets/icons';
import {Icon} from 'src/Components';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PaymentMethodScreen from 'src/Screens/Home/PaymentMethod';
import CheckoutScreen from 'src/Screens/Home/Checkout';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const screens = [
    {
      name: HOMESCREEN,
      component: HomeScreen,
    },
    {
      name: PRODUCT_DETAILS,
      component: ProductDetails,
    },
    {
      name: WISHLIST,
      component: WishlistScreen,
    },
    {
      name: MYCART,
      component: MyCart,
    },
  ];
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {screens.map((item, index) => {
        return (
          <Stack.Screen
            key={index}
            name={item.name}
            component={item.component}
          />
        );
      })}
    </Stack.Navigator>
  );
};

const WishlistStack = () => {
  const screens = [
    {
      name: WISHLIST,
      component: WishlistScreen,
    },
  ];
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {screens.map((item, index) => {
        return (
          <Stack.Screen
            key={index}
            name={item.name}
            component={item.component}
          />
        );
      })}
    </Stack.Navigator>
  );
};

const MyCartStack = () => {
  const screens = [
    {
      name: MYCART,
      component: MyCart,
    },
    {
      name: CHECKOUT,
      component: CheckoutScreen,
    },
    {
      name: SHIPPING_ADDRESS,
      component: ShippingAddressScreen,
    },
  ];
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {screens.map((item, index) => {
        return (
          <Stack.Screen
            key={index}
            name={item.name}
            component={item.component}
          />
        );
      })}
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  const screens = [
    {
      name: PROFILE,
      component: ProfileScreen,
    },
    {
      name: SETTING_SCREEN,
      component: SettingScreen,
    },
    {
      name: PAYMENT_METHOD,
      component: PaymentMethodScreen,
    },
  ];
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {screens.map((item, index) => {
        return (
          <Stack.Screen
            key={index}
            name={item.name}
            component={item.component}
          />
        );
      })}
    </Stack.Navigator>
  );
};
interface TabIconProps extends SvgProps {
  focused: boolean;
}

interface TabConfig {
  name: string;
  component: React.FC;
  label: string;
  icon: React.FC<TabIconProps>;
}

const tabConfig: TabConfig[] = [
  {
    name: HOMESCREEN,
    component: HomeStack,
    label: 'Home',
    icon: Home,
  },
  {
    name: 'Cart',
    component: MyCartStack,
    label: 'Cart',
    icon: Buy,
  },
  {
    name: 'Wishlist',
    component: WishlistStack,
    label: 'Wishlist',
    icon: Heart,
  },
  {
    name: 'Chat',
    component: HomeScreen,
    label: 'Chat',
    icon: Paper,
  },
  {
    name: 'Profile',
    component: ProfileStack,
    label: 'Profile',
    icon: Profile,
  },
];

const HomeContainer = () => {
  const getTabBarIcon = (name: React.FC<TabIconProps>) => {
    return <Icon width={24} height={24} name={name} />;
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5E5',
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#8B4513',
        tabBarInactiveTintColor: '#999999',
      }}>
      {tabConfig.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarLabel: tab.label,
            tabBarIcon: () => getTabBarIcon(tab.icon),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default HomeContainer;

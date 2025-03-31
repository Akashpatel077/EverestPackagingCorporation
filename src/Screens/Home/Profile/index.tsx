import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Icon} from 'src/Components';
import {Profile as ProfileIcon, Paper, Buy, Heart} from 'assets/icons';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {
  ORDER_SCREEN,
  PAYMENT_METHOD,
  SETTING_SCREEN,
} from 'src/Navigation/home/routes';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const menuItems = [
    {id: 1, title: 'Your profile', icon: ProfileIcon, screen: ''},
    {id: 2, title: 'Payment Methods', icon: Buy, screen: PAYMENT_METHOD},
    {id: 3, title: 'My Orders', icon: Paper, screen: ORDER_SCREEN},
    {id: 4, title: 'Settings', icon: ProfileIcon, screen: SETTING_SCREEN},
    {id: 5, title: 'Help Center', icon: Paper, screen: ''},
    {id: 6, title: 'Privacy Policy', icon: Paper, screen: ''},
    {id: 7, title: 'Invites Friends', icon: ProfileIcon, screen: ''},
    {id: 8, title: 'Log out', icon: ProfileIcon, screen: ''},
  ];

  const renderMenuItem = (item: any) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={() => {
        navigation.navigate(item.screen);
      }}>
      <View style={styles.menuItemLeft}>
        <Icon name={item.icon} width={24} height={24} />
        <Text style={styles.menuItemText}>{item.title}</Text>
      </View>
      <Icon name={Heart} width={24} height={24} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name={Heart} width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('assets/images/user.png')}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editButton}>
            <Icon name={Heart} width={20} height={20} />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>Esther Howard</Text>
      </View>

      <View style={styles.menuContainer}>{menuItems.map(renderMenuItem)}</View>
    </View>
  );
};

export default ProfileScreen;

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Header, Icon} from 'src/Components';
import {BackIcon, Heart, Notification, Profile} from 'assets/icons';
import {styles} from './styles';
import {PASSWORD_MANAGER} from 'src/Navigation/home/routes';
import {useNavigation} from '@react-navigation/native';

const SettingScreen = () => {
  const navigation = useNavigation();
  const menuItems = [
    {id: 1, title: 'Notification Settings', icon: Notification, name: ''},
    {id: 2, title: 'Password Manager', icon: Profile, name: PASSWORD_MANAGER},
    {id: 3, title: 'Delete Account', icon: Profile, name: ''},
  ];

  const renderMenuItem = (item: any) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={() => {
        navigation.navigate(item.name);
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
      <Header title="Settings" icon1={BackIcon} />
      <View style={styles.menuContainer}>{menuItems.map(renderMenuItem)}</View>
    </View>
  );
};

export default SettingScreen;

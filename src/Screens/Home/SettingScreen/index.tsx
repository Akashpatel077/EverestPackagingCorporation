import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'src/Components';
import {Heart, Notification, Profile} from 'assets/icons';
import {styles} from './styles';

const SettingScreen = () => {
  const menuItems = [
    {id: 1, title: 'Notification Settings', icon: Notification},
    {id: 2, title: 'Password Manager', icon: Profile},
    {id: 3, title: 'Delete Account', icon: Profile},
  ];

  const renderMenuItem = (item: any) => (
    <TouchableOpacity key={item.id} style={styles.menuItem}>
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
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <View style={styles.menuContainer}>{menuItems.map(renderMenuItem)}</View>
    </View>
  );
};

export default SettingScreen;

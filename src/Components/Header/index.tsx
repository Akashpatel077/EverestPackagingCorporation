import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '../Icons';

interface Props {
  title?: string;
  onPressSecond?: () => void;
  icon1?: string;
  icon2?: string;
}
 const Header: React.FC<Props> = ({ title, onPressSecond ,icon1,icon2}) => {
    const navigation = useNavigation();
  return (
    <View style={styles.header}>
        <TouchableOpacity
          style={icon1 && styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name={icon1} width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity
          style={[icon2 && styles.backButton]}
          onPress={() => {}}>
          <Icon name={icon2} width={24} height={24} />
        </TouchableOpacity>
      </View>
  )
}

export default Header;
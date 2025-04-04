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
  icon2Color:string
}
 const Header: React.FC<Props> = ({ title, onPressSecond ,icon1,icon2,icon2Color}) => {
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
          onPress={() => onPressSecond && onPressSecond()}>
          <Icon name={icon2} width={24} height={24} color={icon2Color} />
        </TouchableOpacity>
      </View>
  )
}

export default Header;
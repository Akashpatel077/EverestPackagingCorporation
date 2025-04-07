import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '../Icons';

interface Props {
  title?: string;
  onPressSecond?: () => void;
  onPressFirst?: () => void;
  icon1?: string;
  icon2?: string;
  icon2Color?:string
}
 const Header: React.FC<Props> = ({ title, onPressSecond ,icon1,icon2,icon2Color,onPressFirst}) => {
    const navigation = useNavigation();

    console.log('icon2Color',icon2Color);
    
  return (
    <View style={styles.header}>
        <TouchableOpacity
          style={icon1 ? styles.backButton : undefined}
          onPress={() => onPressFirst ? onPressFirst() : navigation.goBack()}>
          {icon1 && <Icon name={icon1} width={24} height={24} color='#FFF'/>}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity
          style={icon2 ? styles.backButton : undefined}
          onPress={() => onPressSecond && onPressSecond()}>
          {icon2 && <Icon name={icon2} width={24} height={24} color={icon2Color} />}
        </TouchableOpacity>
      </View>
  )
}

export default Header;
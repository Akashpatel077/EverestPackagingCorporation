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
  return (
    <View style={styles.header}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={icon1 ? styles.backButton : undefined}
          onPress={() => onPressFirst ? onPressFirst() : navigation.goBack()}>
          {icon1 && <Icon name={icon1} width={24} height={24} color='#FFF'/>}
        </TouchableOpacity>
        <Text style={[styles.headerTitle,{marginLeft: icon1 ? 16 : 0}]}>{title}</Text>
      </View>
        <TouchableOpacity
          style={[styles.RightButton,{display:icon2? 'flex':'none'}]}
          onPress={() => onPressSecond && onPressSecond()}>
          {icon2 && <Icon name={icon2} width={24} height={24} color={icon2Color} />}
        </TouchableOpacity>
      </View>
  )
}

export default Header;
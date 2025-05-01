import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '../Icons';
import {Buy, Heart} from 'assets/icons';

interface Props {
  onCartPress: () => void;
  title?: string;
  onPressSecond?: () => void;
  onPressFirst?: () => void;
  icon1?: string;
  icon2?: string;
  icon2Color?: string;
  showCartIcon?: boolean;
  badgeCount?: number;
}
const Header: React.FC<Props> = ({
  title,
  onPressSecond,
  icon1,
  icon2,
  icon2Color = '#FFF',
  onPressFirst,
  onCartPress,
  showCartIcon,
  badgeCount,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={[styles.headerContainer]}>
        <TouchableOpacity
          style={icon1 ? styles.backButton : undefined}
          onPress={() => (onPressFirst ? onPressFirst() : navigation.goBack())}>
          {icon1 && <Icon name={icon1} width={24} height={24} color="#FFF" />}
        </TouchableOpacity>
        <Text
          style={[styles.headerTitle, {marginLeft: icon1 ? 16 : 0}]}
          numberOfLines={1}>
          {title}
        </Text>
        {showCartIcon ? (
          <TouchableOpacity style={styles.RightButton} onPress={onCartPress}>
            <Icon name={Buy} width={24} height={24} color={'#ffffff'} />
            <View style={styles.cartBadgeStyle}>
              <Text numberOfLines={1} style={styles.cartBadgeText}>
                {badgeCount}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.RightButton, {display: icon2 ? 'flex' : 'none'}]}
            onPress={() => onPressSecond && onPressSecond()}>
            {icon2 && (
              <Icon name={icon2} width={24} height={24} color={icon2Color} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;

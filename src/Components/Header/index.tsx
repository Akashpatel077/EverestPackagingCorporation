import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {Icon} from '../Icons';
import {Heart} from 'assets/icons';

interface Props {
  title?: string;
  onPressSecond?: () => void;
  onPressFirst?: () => void;
  icon1?: string;
  icon2?: string;
  icon2Color?: string;
  showWishlistIcon?: boolean;
  isInWishlist?: boolean;
  onWishlistPress?: () => void;
}
const Header: React.FC<Props> = ({
  title,
  onPressSecond,
  icon1,
  icon2,
  icon2Color = '#FFF',
  onPressFirst,
  isInWishlist,
  onWishlistPress,
  showWishlistIcon,
}) => {
  const navigation = useNavigation();

  console.log('icon2Color', icon2Color);

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
        {showWishlistIcon ? (
          <TouchableOpacity
            style={styles.RightButton}
            onPress={onWishlistPress}>
            <Icon
              name={Heart}
              width={24}
              height={24}
              color={isInWishlist ? '#CC5656' : '#ffffff'}
            />
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

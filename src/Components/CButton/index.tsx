import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {Icon} from '../Icons';
import {scale, typography, metrics, colors} from '../../theme';

interface CButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  style?: object;
  textStyle?: object;
  icon?: any;
  iconPosition?: 'left' | 'right';
  iconStyle?: object;
}

const CButton: React.FC<CButtonProps> = ({
  title,
  onPress,
  disabled = false,
  isLoading = false,
  style,
  textStyle,
  icon,
  iconPosition = 'left',
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || isLoading}>
      {isLoading ? (
        <ActivityIndicator color={colors.primary} size="small" />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <Icon
              name={icon}
              width={metrics.iconSize.sm}
              height={metrics.iconSize.sm}
              color={colors.white}
            />
          )}
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <Icon
              name={icon}
              width={metrics.iconSize.sm}
              height={metrics.iconSize.sm}
              color={colors.white}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    height: scale(40),
    borderRadius: metrics.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: metrics.padding.md,
    flexDirection: 'row',
  },
  disabled: {
    backgroundColor: '#97ceea',
    // opacity: 0.7,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.fontSize.xs,
    fontFamily: 'Poppins-SemiBold',
  },
  icon: {
    width: metrics.iconSize.sm,
    height: metrics.iconSize.sm,
  },
  leftIcon: {
    marginRight: metrics.margin.xs,
  },
  rightIcon: {
    marginLeft: metrics.margin.xs,
  },
});

export default CButton;

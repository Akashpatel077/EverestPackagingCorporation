import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {scale, typography, metrics, colors} from '../../theme';

interface CButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  style?: object;
  textStyle?: object;
}

const CButton: React.FC<CButtonProps> = ({
  title,
  onPress,
  disabled = false,
  isLoading = false,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled || isLoading}>
      {isLoading ? (
        <ActivityIndicator color={colors.primary} size="small" />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
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
  },
  disabled: {
    backgroundColor: colors.suvaGray,
    opacity: 0.7,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.fontSize.xs,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default CButton;

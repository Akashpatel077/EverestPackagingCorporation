import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'src/Components';
import {scale, typography, verticalScale, metrics, colors} from '../../theme';

interface CustomTextInputProps extends TextInputProps {
  title: string;
  required?: boolean;
  helperText?: string;
  icon?: any;
  containerStyle?: any;
  onIconPress?: () => void;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  title,
  required = false,
  helperText,
  style,
  containerStyle,
  icon,
  onIconPress,
  ...props
}) => {
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <Text style={styles.label}>
        {title} {required && <Text style={styles.requiredStar}>*</Text>}
      </Text>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholderTextColor={colors.suvaGray}
          style={[styles.input, icon && styles.inputWithIcon, style]}
          {...props}
        />
        {icon && (
          <TouchableOpacity style={styles.iconContainer} onPress={onIconPress}>
            <Icon
              name={icon}
              width={metrics.iconSize.sm}
              height={metrics.iconSize.sm}
              color={colors.white}
            />
          </TouchableOpacity>
        )}
      </View>
      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: metrics.margin.md,
  },
  label: {
    fontSize: typography.fontSize.xs,
    color: colors.darkGray,
    marginBottom: metrics.margin.xs,
    fontFamily: 'Poppins-Regular',
  },
  requiredStar: {
    color: colors.red,
    fontFamily: 'Poppins-SemiBold',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.gainsBoro,
    borderRadius: metrics.borderRadius.md,
    padding: metrics.padding.sm,
    fontSize: typography.fontSize.xs,
    fontFamily: 'Poppins-Regular',
    height: verticalScale(35),
  },
  inputWithIcon: {
    paddingRight: metrics.padding.xxl,
  },
  iconContainer: {
    position: 'absolute',
    right: metrics.margin.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helperText: {
    fontSize: typography.fontSize.xs,
    color: colors.dimGray,
    marginTop: metrics.margin.xs,
    fontFamily: 'Poppins-SemiBold',
  },
});

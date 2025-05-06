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
          style={[styles.input, icon && styles.inputWithIcon, style]}
          {...props}
        />
        {icon && (
          <TouchableOpacity style={styles.iconContainer} onPress={onIconPress}>
            <Icon name={icon} width={24} height={24} color="#FFFFFF" />
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
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 3,
    fontFamily: 'Poppins-Regular',
  },
  requiredStar: {
    color: 'red',
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
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  inputWithIcon: {
    paddingRight: 40,
  },
  iconContainer: {
    position: 'absolute',
    right: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontFamily: 'Poppins-SemiBold',
  },
});

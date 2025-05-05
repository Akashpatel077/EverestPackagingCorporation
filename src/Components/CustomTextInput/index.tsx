import React from 'react';
import {View, Text, TextInput, StyleSheet, TextInputProps} from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  title: string;
  required?: boolean;
  helperText?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  title,
  required = false,
  helperText,
  style,
  ...props
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>
        {title} {required && <Text style={styles.requiredStar}>*</Text>}
      </Text>
      <TextInput style={[styles.input, style]} {...props} />
      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontFamily: 'Poppins-Regular',
  },
  requiredStar: {
    color: 'red',
    fontFamily: 'Poppins-SemiBold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontFamily: 'Poppins-SemiBold',
  },
});

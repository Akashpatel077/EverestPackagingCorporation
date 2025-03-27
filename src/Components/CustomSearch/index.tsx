import React from 'react';
import {View, TextInput, StyleSheet, TextInputProps, Image} from 'react-native';
import {search} from '../../Constants/images';

interface SearchBarProps extends TextInputProps {
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search here ...',
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Image source={search} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        {...props}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  icon: {
    marginRight: 8,
    width: 20,
    height: 20,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
});

import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  Image,
  TouchableOpacity,
} from 'react-native';
import {search} from '../../Constants/images';
import {useNavigation} from '@react-navigation/native';
import {SEARCH_SCREEN} from 'src/Navigation/home/routes';

interface SearchBarProps extends TextInputProps {
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search here ...',
  ...props
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate(SEARCH_SCREEN);
      }}>
      <Image source={search} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        {...props}
        editable={false}
      />
    </TouchableOpacity>
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

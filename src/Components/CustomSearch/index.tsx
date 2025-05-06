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
import {scale, typography, verticalScale, metrics, colors} from '../../theme';

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
    backgroundColor: colors.white,
    borderRadius: metrics.borderRadius.md,
    paddingHorizontal: metrics.padding.sm,
    height: verticalScale(40),
    borderWidth: 1,
    borderColor: colors.gainsBoro,
  },
  icon: {
    marginRight: metrics.margin.sm,
    width: metrics.iconSize.sm,
    height: metrics.iconSize.sm,
  },
  input: {
    flex: 1,
    fontSize: typography.fontSize.xs,
    color: colors.darkGray,
    fontFamily: 'Poppins-Regular',
  },
});

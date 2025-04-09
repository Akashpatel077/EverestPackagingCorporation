import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    paddingLeft: 12,
    paddingVertical: 12,
  },
  categoryWrapper: {
    width: (width - 34) / 2,
    margin: 5,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
    height: 180,
  },
  categoryImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  categoryName: {
    fontSize: 14,
    fontFamily: 'SchibstedGrotesk-Medium',
    color: '#333333',
    padding: 12,
    textAlign: 'center',
    flex: 1,
  },
});

export default styles;

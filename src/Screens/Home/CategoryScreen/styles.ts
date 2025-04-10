import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    padding: 16,
  },
  categoryWrapper: {
    width: '48%',
    margin: '1%',
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    height: 200,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  categoryImage: {
    width: '100%',
    height: 140,
    resizeMode: 'contain',
    backgroundColor: '#F8F9FB',
    padding: 10,
  },
  categoryName: {
    fontSize: 15,
    fontFamily: 'SchibstedGrotesk-Medium',
    color: '#1A1B1E',
    paddingHorizontal: 12,
    paddingVertical: 10,
    textAlign: 'center',
    flex: 1,
    lineHeight: 20,
  },
});

export default styles;

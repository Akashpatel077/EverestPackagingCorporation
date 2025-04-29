import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  contentContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
  },
  categoriesContainer: {
    padding: 8,
    paddingBottom: 30,
  },
  categoryWrapper: {
    width: '48%',
    margin: '1%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    height: 220,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  categoryCard: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 16,
  },
  categoryImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  categoryName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#1A1B1E',
    paddingHorizontal: 12,
    paddingTop: 4,
    textAlign: 'left',
  },
  categoryCount: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#666666',
    paddingHorizontal: 12,
    paddingBottom: 8,
    textAlign: 'left',
  },
});

export default styles;

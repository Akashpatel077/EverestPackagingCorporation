import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 2 cards per row with 16px padding on each side

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 30,
    backgroundColor: '#F8F4F1',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontFamily: 'SchibstedGrotesk-Bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#2D2D2D',
    lineHeight: 40,
  },
  titleHighlight: {
    color: '#0088cc',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'SchibstedGrotesk-Regular',
    color: '#666666',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    paddingTop: 24,
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: cardWidth,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    transform: [{scale: 1}],
  },
  categoryImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: 'SchibstedGrotesk-SemiBold',
    color: '#2D2D2D',
    marginBottom: 4,
    textAlign: 'center',
  },
  categoryDescription: {
    fontSize: 12,
    fontFamily: 'SchibstedGrotesk-Regular',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 16,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  button: {
    backgroundColor: '#0088cc',
    borderRadius: 12,
    width: '100%',
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#0088cc',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'SchibstedGrotesk-SemiBold',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  signInText: {
    color: '#666666',
    fontSize: 14,
    fontFamily: 'SchibstedGrotesk-Regular',
  },
  signInLink: {
    color: '#0088cc',
    fontSize: 14,
    marginLeft: 4,
    fontFamily: 'SchibstedGrotesk-SemiBold',
  },
});
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  categoryContainer: {
    marginVertical: 10,
  },
  categoryList: {
    paddingHorizontal: 15,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  categoryButtonActive: {
    backgroundColor: '#0088cc',
  },
  categoryText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'SchibstedGrotesk-Medium',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  productGrid: {
    paddingHorizontal: 12,
    paddingBottom: 20,
    gap: 10,
  },
  productCard: {
    flex: 1,
    margin: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  productImageContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'SchibstedGrotesk-Medium',
    color: '#333333',
    marginBottom: 8,
    height: 40,
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  regularPrice: {
    fontSize: 16,
    fontFamily: 'SchibstedGrotesk-Medium',
    color: '#666666',
    textDecorationLine: 'line-through',
  },
  salePrice: {
    fontSize: 18,
    fontFamily: 'SchibstedGrotesk-Bold',
    color: '#0088cc',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    color: '#FFD700',
    marginRight: 2,
  },
  ratingText: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'SchibstedGrotesk-Regular',
  },
});

export default styles;

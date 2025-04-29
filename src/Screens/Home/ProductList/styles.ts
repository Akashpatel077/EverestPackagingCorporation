import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  categoryContainer: {
    marginVertical: 10,
  },
  categoriesContainer: {
    padding: 6,
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
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
    fontFamily: 'Poppins-SemiBold',
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
    width: '48%',
    margin: '1%',
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
    fontFamily: 'Poppins-SemiBold',
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
    fontFamily: 'Poppins-SemiBold',
    color: '#666666',
    textDecorationLine: 'line-through',
  },
  salePrice: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
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
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  outOfStockText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
});

export default styles;

import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  emptyView: {
    width: 40,
  },
  categoryContainer: {
    marginVertical: 16,
  },
  categoryList: {
    paddingHorizontal: 16,
    gap: 10,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  categoryButtonActive: {
    backgroundColor: '#0088cc',
  },
  categoryText: {
    fontSize: 14,
    color: '#666666',
  },
  categoryTextActive: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  productGrid: {
    paddingHorizontal: 6,
    marginBottom: 20,
    gap: 10,
  },
  productCard: {
    width: '48%',
    // flex: 1,
    marginHorizontal: 5,
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
    // position: 'relative',
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
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
  favoriteIcon: {
    fontSize: 18,
    color: '#0088cc',
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

import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backIcon: {
    fontSize: 30,
    color: '#000000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mainImageContainer: {
    width: '100%',
    height: width,
    backgroundColor: '#F5F5F5',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  thumbnailContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  thumbnailList: {
    gap: 8,
  },
  thumbnailImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  productInfo: {
    padding: 16,
  },
  category: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  titleRow: {
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    lineHeight: 32,
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  starContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  starIcon: {
    color: '#FFD700',
    fontSize: 16,
    marginRight: 2,
  },
  reviewText: {
    fontSize: 14,
    color: '#666666',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  regularPrice: {
    fontSize: 18,
    color: '#666666',
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  salePrice: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 8,
  },
  readMore: {
    fontSize: 14,
    color: '#0088cc',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  optionContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  optionButton: {
    width: 85,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0088cc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#FAF3EE',
  },
  selectedItem: {
    backgroundColor: '#0088cc',
    borderColor: '#0088cc',
  },
  optionText: {
    fontSize: 14,
    color: '#000000',
  },
  selectedItemText: {
    color: '#FFFFFF',
  },
  colorSection: {
    marginBottom: 24,
  },
  colorContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 4,
    gap: 12,
  },
  colorButton: {
    width: 45,
    height: 45,
    borderRadius: 25,
    padding: 4,
    marginHorizontal: 6,
  },
  selectedColorButton: {
    borderColor: '#000000',
    borderWidth: 2,
    transform: [{scale: 1.1}],
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 0,
  },
  price: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#0088cc',
    borderRadius: 25,
    paddingVertical: 12,
    marginLeft: 16,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  alertLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
  },
  qtyContainer: {
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#AAAAAA',
  },
  incDecrButton: {
    paddingVertical: 5,
  },
  qtyCountText: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#AAAAAA',
    padding: 8,
    fontSize: 16,
  },
  plusMinusText: {
    fontSize: 20,
    width: 25,
    textAlign: 'center',
  },
});

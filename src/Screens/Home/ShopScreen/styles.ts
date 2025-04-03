import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  loader: {
    marginTop: 20,
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
  },
  searchContainer: {},
  bannerContainer: {
    marginBottom: 24,
    marginTop: 24,
    borderRadius: 12,
    overflow: 'hidden',
    height: 180,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  shopNowButton: {
    backgroundColor: '#8B4513',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  shopNowText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  categorySection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  seeAllButton: {
    fontSize: 14,
    color: '#8B4513',
  },
  categoryList: {
    paddingHorizontal: 12,
    justifyContent: 'space-around',
  },
  subCategoriesContainer: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 8,
    paddingVertical: 8,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
  },
  subCategoryIcon: {
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    // padding: 8,
  },
  categoryItem: {
    alignItems: 'center',
    position: 'relative',
    zIndex: 1000,
    // marginRight: 10,
    // paddingHorizontal: 4,
  },
  subCategoryList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  subCategoryItem: {
    // borderWidth: 1,
  },
  categoryIcon: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIconText: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 14,
    color: '#333333',
    flexWrap: 'wrap',
    textAlign: 'center',
    width: 90,
  },
  dropdownContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1001,
    width: 200,
    marginTop: 4,
    paddingVertical: 8,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownText: {
    fontSize: 12,
    color: '#333333',
  },
  flashSaleSection: {
    marginBottom: 24,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closingText: {
    fontSize: 14,
    color: '#666666',
  },
  timerText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
  },
  filterContainer: {
    paddingHorizontal: 12,
    marginBottom: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: '#F5F5F5',
  },
  filterActive: {
    backgroundColor: '#8B4513',
  },
  filterText: {
    fontSize: 14,
    color: '#666666',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  productGrid: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: (width - 70) / 2,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    elevation: 5,
    borderRadius: 12,
  },
  productImageContainer: {
    position: 'relative',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    fontSize: 20,
    color: '#666666',
  },
  productInfo: {
    paddingVertical: 12,
    paddingHorizontal: 5,
  },
  productName: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 4,
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#666666',
  },
});

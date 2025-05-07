import {StyleSheet, Dimensions} from 'react-native';
import {colors, metrics, scale, typography, verticalScale} from 'src/theme';

const {width} = Dimensions.get('window');
const CARD_WIDTH = (width - 36) / 2;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ghostWhite,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: metrics.borderRadius.md,
    marginHorizontal: metrics.margin.md,
    marginVertical: metrics.margin.sm,
    paddingHorizontal: metrics.padding.sm,
    height: verticalScale(35),
  },
  searchIcon: {
    marginRight: metrics.margin.xs,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    color: colors.darkGray,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: metrics.margin.md,
    marginBottom: metrics.margin.sm,
  },
  recentTitle: {
    fontSize: typography.fontSize.sm,
    color: colors.dimGray,
    fontFamily: 'Poppins-SemiBold',
  },
  clearButton: {
    padding: metrics.margin.xs,
  },
  clearText: {
    fontSize: typography.fontSize.xs,
    color: colors.primary,
  },
  searchItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: metrics.padding.sm,
    paddingHorizontal: metrics.padding.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gainsBoro,
  },
  searchText: {
    fontSize: typography.fontSize.sm,
    color: colors.dimGray,
  },
  deleteButton: {
    padding: metrics.padding.xs,
  },
  productGrid: {
    paddingHorizontal: metrics.padding.xs,
  },
  productCard: {
    width: '48%',
    margin: '1%',
    backgroundColor: colors.white,
    borderRadius: metrics.borderRadius.md,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  productImageContainer: {
    width: '100%',
    height: verticalScale(135),
    borderTopLeftRadius: metrics.borderRadius.md,
    borderTopRightRadius: metrics.borderRadius.md,
    overflow: 'hidden',
    position: 'relative',
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
    backgroundColor: colors.white,
    borderRadius: metrics.borderRadius.xl,
    width: scale(30),
    height: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productInfo: {
    paddingVertical: metrics.padding.md,
    paddingHorizontal: metrics.padding.sm,
  },
  productName: {
    fontSize: typography.fontSize.xs,
    fontFamily: 'Poppins-SemiBold',
    color: colors.darkGray,
    marginBottom: metrics.margin.xs,
  },
  productDetails: {
    flexDirection: 'row',
    alignItems: 'center',
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
  regularPrice: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Poppins-SemiBold',
    color: colors.dimGray,
    textDecorationLine: 'line-through',
  },
  salePrice: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Poppins-SemiBold',
    color: colors.primary,
    marginLeft: metrics.margin.xs,
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.outOfStockOverlay,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: metrics.borderRadius.md,
  },
  outOfStockText: {
    color: colors.white,
    fontSize: typography.fontSize.sm,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'uppercase',
    textShadowColor: colors.outOfStockOverlay,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
});

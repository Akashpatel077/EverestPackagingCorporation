import {StyleSheet} from 'react-native';
import {colors, metrics, scale, typography, verticalScale} from 'src/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ghostWhite,
  },
  categoriesContainer: {
    paddingHorizontal: metrics.padding.md,
    paddingVertical: metrics.padding.sm,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
  },
  productCard: {
    width: '48%',
    margin: '1.5%',
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
    height: verticalScale(220),
  },
  productImageContainer: {
    position: 'relative',
    width: '100%',
    height: verticalScale(135),
    borderTopLeftRadius: metrics.borderRadius.md,
    borderTopRightRadius: metrics.borderRadius.md,
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
    borderRadius: metrics.borderRadius.xl,
    width: scale(30),
    height: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
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
    justifyContent: 'space-between',
    alignItems: 'center',
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

export default styles;

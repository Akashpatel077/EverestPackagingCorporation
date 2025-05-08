import {StyleSheet, Dimensions} from 'react-native';
import {colors, metrics, typography, spacing, scale} from 'src/theme';

const {width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    position: 'relative',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
  },
  mainImageContainer: {
    width: '100%',
    height: width * 0.8,
    backgroundColor: colors.white,
  },
  mainImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  thumbnailContainer: {
    marginTop: metrics.margin.md,
    paddingHorizontal: metrics.padding.md,
    marginBottom: metrics.margin.md,
  },
  thumbnailList: {
    gap: metrics.margin.sm,
  },
  thumbnailImage: {
    width: scale(60),
    height: scale(60),
    borderRadius: metrics.borderRadius.md,
    backgroundColor: colors.white,
  },
  productInfo: {
    padding: metrics.padding.md,
  },
  titleRow: {
    marginBottom: metrics.margin.sm,
  },
  title: {
    fontSize: typography.fontSize.xl,
    color: colors.black,
    fontFamily: 'Poppins-SemiBold',
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  starContainer: {
    flexDirection: 'row',
    marginRight: spacing.sm,
  },
  starIcon: {
    color: '#FFD700',
    fontSize: typography.fontSize.md,
    marginRight: spacing.xxs,
    fontFamily: 'Poppins-SemiBold',
  },
  reviewText: {
    fontSize: typography.fontSize.sm,
    color: colors.dimGray,
    fontFamily: 'Poppins-SemiBold',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  regularPrice: {
    fontSize: typography.fontSize.lg,
    color: colors.dimGray,
    textDecorationLine: 'line-through',
    marginRight: metrics.margin.sm,
    fontFamily: 'Poppins-SemiBold',
  },
  salePrice: {
    fontSize: typography.fontSize.xxl,
    color: colors.primary,
    fontFamily: 'Poppins-SemiBold',
  },
  // description: {
  //   fontSize: typography.fontSize.md,
  //   color: colors.dimGray,
  //   marginBottom: spacing.sm,
  // },
  readMore: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    marginBottom: spacing.md,
    fontFamily: 'Poppins-SemiBold',
  },
  sectionTitle: {
    fontSize: typography.fontSize.sm,
    color: colors.black,
    fontFamily: 'Poppins-Medium',
    // marginBottom: metrics.margin.xxs,
  },
  optionContainer: {
    flexDirection: 'row',
    gap: metrics.margin.sm,
    marginBottom: metrics.margin.md,
  },
  optionButton: {
    width: scale(88),
    height: scale(40),
    borderRadius: metrics.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: metrics.margin.sm,
    backgroundColor: colors.white,
  },
  selectedItem: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderWidth: 0,
  },
  selectedItemText: {
    color: colors.white,
  },
  optionText: {
    fontSize: typography.fontSize.sm,
    color: colors.black,
    fontFamily: 'Poppins-Regular',
  },
  colorSection: {
    marginBottom: metrics.margin.sm,
  },
  colorContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  colorButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: metrics.borderRadius.xxl,
    marginRight: metrics.margin.sm,
  },
  selectedColorButton: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: metrics.padding.sm,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.WhisperE5,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.dimGray,
    marginBottom: metrics.margin.xxs,
    fontFamily: 'Poppins-Regular',
  },
  price: {
    fontSize: typography.fontSize.xl,
    color: colors.primary,
    fontFamily: 'Poppins-SemiBold',
  },
  wishListButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    marginRight: metrics.margin.sm,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  addToCartButton: {
    // flex: 1,
    height: scale(40),
    width: scale(130),
  },
  alertLabel: {
    color: colors.red,
    fontSize: typography.fontSize.xs,
    marginTop: metrics.margin.xxs,
    marginBottom: metrics.margin.md,
  },
  gstTitleText: {
    fontSize: typography.fontSize.xs,
    color: colors.dimGray,
    marginBottom: metrics.margin.sm,
    fontFamily: 'Poppins-Regular',
  },
  bulkDiscountTableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderTopLeftRadius: metrics.borderRadius.md,
    borderTopRightRadius: metrics.borderRadius.md,
    marginTop: metrics.margin.sm,
  },
  bulkDiscountTitleContainer: {
    padding: metrics.padding.xs,
    alignItems: 'center',
  },
  bulkDiscountTitleText: {
    color: colors.white,
    fontSize: typography.fontSize.xs,
    fontFamily: 'Poppins-Medium',
  },
  bulkDiscountTableRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.WhisperE5,
  },
  bulkDiscountRowContainer: {
    padding: metrics.padding.xs,
    alignItems: 'center',
  },
  bulkDiscountRowText: {
    fontSize: typography.fontSize.xs,
    color: colors.black,
    fontFamily: 'Poppins-Regular',
  },
  qtyContainer: {
    marginBottom: metrics.margin.xs,
    marginTop: metrics.margin.sm,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    borderRadius: metrics.borderRadius.md,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: colors.dimGray,
    overflow: 'hidden',
  },
  incButton: {
    paddingVertical: metrics.margin.sm,
    backgroundColor: colors.primary,
    borderLeftWidth: 0.5,
    borderColor: colors.dimGray,
  },
  decrButton: {
    paddingVertical: metrics.margin.sm,
    backgroundColor: colors.gainsBoro,
    borderRightWidth: 0.5,
    borderColor: colors.dimGray,
  },
  qtyCountText: {
    padding: metrics.padding.sm,
    fontSize: typography.fontSize.sm,
  },
  plusMinusText: {
    fontSize: typography.fontSize.md,
    width: scale(30),
    textAlign: 'center',
  },
});

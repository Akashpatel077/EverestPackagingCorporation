import {StyleSheet} from 'react-native';
import {colors, metrics, scale, typography} from 'src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ghostWhite,
    paddingHorizontal: metrics.padding.md,
    paddingTop: metrics.padding.md,
  },
  productImage: {
    width: scale(90),
    height: '100%',
    resizeMode: 'cover',
    borderRadius: metrics.borderRadius.md,
  },
  reviewTitle: {
    fontSize: typography.fontSize.xxl,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: metrics.margin.lg,
    color: colors.black,
  },
  ratingContainer: {
    alignItems: 'center',
    marginBottom: metrics.margin.lg,
  },
  ratingLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.dimGray,
    marginBottom: metrics.margin.md,
  },
  starContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  reviewInput: {
    height: scale(120),
    borderWidth: 1,
    borderColor: colors.gainsBoro,
    borderRadius: metrics.borderRadius.md,
    padding: metrics.padding.md,
    marginBottom: metrics.margin.lg,
    textAlignVertical: 'top',
    fontSize: typography.fontSize.sm,
    color: colors.black,
  },
  addPhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: metrics.margin.lg,
  },
  addPhotoText: {
    marginLeft: metrics.margin.sm,
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontFamily: 'Poppins-Medium',
    paddingTop: metrics.padding.xs,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: scale(20),
    position: 'absolute',
    left: 16,
    right: 16,
  },
  submitButton: {
    width: '48%',
  },
  orderItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: metrics.borderRadius.md,
    padding: metrics.padding.sm,
    marginBottom: metrics.margin.md,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemDetails: {
    flex: 1,
    marginLeft: metrics.margin.sm,
  },
  itemName: {
    fontSize: typography.fontSize.sm,
    color: colors.black,
    marginBottom: metrics.margin.xxs,
    fontFamily: 'Poppins-SemiBold',
  },
  itemInfo: {
    fontSize: typography.fontSize.xs,
    color: colors.dimGray,
    marginBottom: metrics.margin.xxs,
    fontFamily: 'Poppins-Regular',
  },
  itemPrice: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Poppins-SemiBold',
    color: colors.primary,
  },
  actionButton: {
    width: '50%',
    alignSelf: 'flex-end',
  },
});

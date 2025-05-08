import {StyleSheet} from 'react-native';
import {colors, metrics, scale, typography} from 'src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ghostWhite,
  },
  section: {
    marginBottom: metrics.margin.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.md,
    color: colors.black,
    marginBottom: metrics.margin.xs,
    fontFamily: 'Poppins-SemiBold',
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: metrics.padding.md,
    borderRadius: metrics.borderRadius.md,
  },
  addressLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  addressDetails: {
    marginLeft: metrics.margin.md,
    flex: 1,
  },
  addressType: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
    marginBottom: metrics.margin.xxs,
  },
  addressText: {
    fontSize: typography.fontSize.xs,
    color: colors.dimGray,
  },
  changeButton: {
    color: colors.primary,
    fontSize: typography.fontSize.xs,
    fontFamily: 'Poppins-SemiBold',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: metrics.padding.sm,
    borderRadius: metrics.borderRadius.md,
    marginVertical: metrics.margin.sm,
  },
  orderImage: {
    width: scale(100),
    height: '100%',
    resizeMode: 'contain',
    marginRight: metrics.margin.md,
  },
  orderDetails: {
    flex: 1,
  },
  orderTitle: {
    fontSize: typography.fontSize.sm,
    color: colors.black,
    marginBottom: metrics.margin.xxs,
    fontFamily: 'Poppins-SemiBold',
  },
  orderSize: {
    fontSize: typography.fontSize.xs,
    fontFamily: 'Poppins-Regular',
    color: colors.dimGray,
  },
  orderPrice: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontFamily: 'Poppins-SemiBold',
  },
  paymentButton: {
    alignItems: 'center',
    position: 'absolute',
    bottom: scale(20),
    left: 16,
    right: 16,
  },
  itemSize: {
    fontSize: typography.fontSize.xs,
    fontFamily: 'Poppins-Regular',
    color: colors.dimGray,
  },
});

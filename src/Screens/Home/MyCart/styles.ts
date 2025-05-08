// styles.js
import {StyleSheet} from 'react-native';
import {colors, metrics, scale, typography, verticalScale} from 'src/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ghostWhite,
  },
  cartItemsList: {
    marginBottom: metrics.margin.md,
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: metrics.margin.md,
    padding: metrics.padding.sm,
    backgroundColor: colors.white,
    borderRadius: metrics.borderRadius.md,
  },
  itemImage: {
    width: scale(70),
    height: scale(70),
    marginRight: metrics.margin.md,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Poppins-SemiBold',
  },
  itemSize: {
    fontSize: typography.fontSize.xs,
    fontFamily: 'Poppins-Regular',
    color: colors.dimGray,
  },
  itemPrice: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Poppins-Bold',
    color: colors.darkGray,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: metrics.margin.sm,
  },
  quantityButton: {
    width: scale(28),
    height: scale(28),
    backgroundColor: colors.gainsBoro,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: metrics.borderRadius.xl,
  },
  increaseButton: {
    backgroundColor: colors.primary,
  },
  quantityButtonText: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Poppins-Bold',
    paddingTop: metrics.padding.xs,
  },
  quantityText: {
    marginHorizontal: metrics.margin.sm,
    fontSize: typography.fontSize.sm,
    fontFamily: 'Poppins-SemiBold',
    paddingTop: metrics.padding.xs,
  },
  removeButton: {
    padding: metrics.padding.sm,
  },
  removeButtonText: {
    fontSize: typography.fontSize.xl,
  },
  promoContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
  },
  promoPlaceholder: {
    color: '#999',
  },
  promoApplyButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  promoApplyText: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  summaryContainer: {
    marginBottom: metrics.margin.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: metrics.margin.sm,
  },
  summaryLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.dimGray,
    fontFamily: 'Poppins-SemiBold',
  },
  summaryValue: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Poppins-Bold',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.gainsBoro,
    paddingTop: metrics.padding.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Poppins-Bold',
  },
  totalValue: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Poppins-Bold',
    color: colors.primary,
  },
  checkoutButton: {},
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: metrics.padding.md,
  },
  emptyCartTitle: {
    fontSize: typography.fontSize.xl,
    fontFamily: 'Poppins-Bold',
    color: colors.primary,
    marginBottom: metrics.margin.xs,
    textAlign: 'center',
  },
  emptyCartText: {
    fontSize: typography.fontSize.sm,
    color: colors.dimGray,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    marginBottom: metrics.margin.md,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.modalBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: metrics.borderRadius.md,
    padding: metrics.padding.md,
    width: '90%',
  },
  modalTitle: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    marginBottom: metrics.margin.md,
  },
  modalItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: metrics.margin.md,
    padding: metrics.padding.sm,
    backgroundColor: colors.whiteSmoke6,
    borderRadius: metrics.borderRadius.md,
  },
  modalItemImage: {
    width: scale(60),
    height: scale(60),
    marginRight: metrics.margin.md,
  },
  modalItemDetails: {
    flex: 1,
  },
  modalItemName: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Poppins-Bold',
  },
  modalItemSize: {
    fontSize: typography.fontSize.xs,
    color: colors.dimGray,
    fontFamily: 'Poppins-Medium',
  },
  modalItemPrice: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Poppins-Bold',
    color: colors.darkGray,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: metrics.margin.md,
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: colors.gainsBoro,
    borderRadius: metrics.borderRadius.md,
    marginRight: metrics.margin.sm,
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(35),
  },
  modalCancelButtonText: {
    color: colors.darkGray,
    fontSize: typography.fontSize.sm,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  modalRemoveButton: {
    flex: 1,
    backgroundColor: colors.red,
    borderRadius: metrics.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalRemoveButtonText: {
    color: 'white',
    fontSize: typography.fontSize.sm,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  subShippingText: {
    fontSize: typography.fontSize.xs,
    fontFamily: 'Poppins-Regular',
    color: colors.nobel9,
  },
  changePaymentMethodText: {
    fontSize: typography.fontSize.xs,
    color: colors.primary,
    marginBottom: metrics.margin.sm,
    fontFamily: 'Poppins-SemiBold',
  },
  changePaymentMethodButton: {
    alignItems: 'center',
  },
  shopNowButton: {
    width: '50%',
  },
});

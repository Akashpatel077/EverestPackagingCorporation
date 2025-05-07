import {StyleSheet} from 'react-native';
import {colors, metrics, scale, verticalScale, typography} from 'src/theme';

export const styles = StyleSheet.create({
  applyButton: {
    alignItems: 'center',
    position: 'absolute',
    bottom: scale(20),
    left: 16,
    right: 16,
  },
  container: {
    flex: 1,
    backgroundColor: colors.ghostWhite,
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginTop: metrics.margin.sm,
    padding: metrics.padding.md,
    borderRadius: metrics.borderRadius.md,
    marginBottom: metrics.margin.xs,
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
  addressRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  deleteButton: {
    padding: metrics.padding.xxs,
  },
  radioButton: {
    width: scale(18),
    height: scale(18),
    borderRadius: scale(9),
    borderWidth: 2,
    borderColor: colors.primary,
  },
  radioButtonSelected: {
    backgroundColor: colors.primary,
  },
  addButton: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    alignItems: 'center',
    position: 'absolute',
    bottom: scale(75),
    left: 16,
    right: 16,
    backgroundColor: colors.white,
  },
  addButtonText: {
    color: colors.primary,
  },
});

import {StyleSheet} from 'react-native';
import {colors, metrics, typography} from 'src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ghostWhite,
  },
  contentContainer: {
    flex: 1,
    padding: metrics.padding.md,
  },
  addressSection: {
    marginBottom: metrics.margin.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.md,
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
    marginBottom: metrics.margin.sm,
  },
  addressContainer: {
    backgroundColor: colors.white,
    borderRadius: metrics.borderRadius.lg,
    padding: metrics.padding.md,
    marginBottom: metrics.margin.md,
  },
  emptyStateText: {
    fontSize: typography.fontSize.sm,
    color: colors.dimGray,
    marginBottom: metrics.margin.sm,
    fontFamily: 'Poppins-Regular',
  },
  addressInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressDetails: {
    flex: 1,
  },
  addressType: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
    marginBottom: metrics.margin.xs,
  },
  addressText: {
    fontSize: typography.fontSize.xs,
    color: colors.dimGray,
    fontFamily: 'Poppins-Regular',
  },
});

import {StyleSheet} from 'react-native';
import {colors, metrics, scale, typography} from 'src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ghostWhite,
    padding: metrics.padding.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: metrics.margin.lg,
  },
  successTitle: {
    fontSize: typography.fontSize.xl,
    fontFamily: 'Poppins-SemiBold',
    color: colors.green,
    marginBottom: metrics.margin.md,
  },
  successMessage: {
    fontSize: typography.fontSize.sm,
    color: colors.dimGray,
    fontFamily: 'Poppins-Regular',
    marginBottom: metrics.margin.md,
  },
  successIcon: {
    height: scale(150),
    width: scale(150),
    marginBottom: metrics.margin.lg,
  },
});

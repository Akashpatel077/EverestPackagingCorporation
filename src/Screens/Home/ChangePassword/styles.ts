import {StyleSheet} from 'react-native';
import {colors, metrics, typography} from 'src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ghostWhite,
  },
  content: {
    flex: 1,
    padding: metrics.padding.md,
  },
  passwordSection: {
    marginTop: metrics.margin.sm,
    backgroundColor: colors.white,
    padding: metrics.padding.sm,
    borderRadius: metrics.borderRadius.md,
    marginBottom: metrics.margin.sm,
  },
  passwordTitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Poppins-SemiBold',
    color: colors.darkGray,
    marginBottom: metrics.margin.md,
  },
  saveChangesButton: {
    marginTop: metrics.margin.sm,
  },
});

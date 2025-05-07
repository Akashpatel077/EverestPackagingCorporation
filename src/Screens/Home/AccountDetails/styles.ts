import {StyleSheet} from 'react-native';
import {colors, metrics, typography, scale} from 'src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    padding: metrics.padding.md,
  },
  passwordSection: {
    marginTop: metrics.margin.sm,
    backgroundColor: colors.whiteSmoke6,
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

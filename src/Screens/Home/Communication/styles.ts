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
  title: {
    fontSize: typography.fontSize.sm,
    color: colors.darkGray,
    marginBottom: metrics.margin.md,
    fontFamily: 'Poppins-Regular',
  },
  emailText: {
    fontSize: typography.fontSize.xs,
    color: colors.dimGray,
    marginBottom: metrics.margin.md,
    fontFamily: 'Poppins-Regular',
  },
  preferencesContainer: {
    marginBottom: metrics.margin.md,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: metrics.margin.sm,
  },
  labelContainer: {
    flex: 1,
    paddingLeft: metrics.padding.sm,
  },
  checkboxLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.darkGray,
    marginBottom: metrics.margin.xxs,
    fontFamily: 'Poppins-Regular',
  },
  checkboxDescription: {
    fontSize: typography.fontSize.xs,
    color: colors.dimGray,
    fontFamily: 'Poppins-Regular',
  },
});

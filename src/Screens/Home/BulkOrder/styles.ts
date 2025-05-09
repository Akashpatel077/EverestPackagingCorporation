import {StyleSheet} from 'react-native';
import {colors, metrics, scale, typography} from 'src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ghostWhite,
  },
  contentContainer: {
    flex: 1,
    padding: metrics.padding.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontFamily: 'Poppins-SemiBold',
    color: colors.primary,
    marginBottom: metrics.margin.lg,
    textAlign: 'center',
  },
  message: {
    fontSize: typography.fontSize.md,
    color: colors.black,
    textAlign: 'center',
    lineHeight: scale(24),
    marginBottom: metrics.margin.xl,
  },
  highlightsContainer: {
    width: '100%',
    marginBottom: metrics.margin.xl,
  },
  highlight: {
    fontSize: typography.fontSize.md,
    color: colors.black,
    marginBottom: metrics.margin.md,
    paddingLeft: metrics.padding.sm,
  },
  contactButton: {
    alignItems: 'center',
    position: 'absolute',
    bottom: scale(200),
    left: 16,
    right: 16,
  },
});

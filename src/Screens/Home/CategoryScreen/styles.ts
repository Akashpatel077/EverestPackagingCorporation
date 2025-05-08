import {StyleSheet} from 'react-native';
import {colors, metrics, scale, typography} from 'src/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ghostWhite,
  },
  contentContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
  },
  categoriesContainer: {
    paddingHorizontal: metrics.padding.md,
    paddingVertical: metrics.padding.sm,
  },
  categoryWrapper: {
    width: '48%',
    margin: '1.5%',
    backgroundColor: colors.white,
    borderRadius: metrics.borderRadius.md,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    height: scale(200),
    borderWidth: 1,
    borderColor: colors.lightBorder,
  },
  categoryCard: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: metrics.borderRadius.md,
  },
  categoryImage: {
    width: '100%',
    height: scale(130),
    resizeMode: 'cover',
    backgroundColor: colors.white,
  },
  categoryName: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
    paddingHorizontal: metrics.padding.sm,
    paddingTop: metrics.padding.xxs,
    textAlign: 'left',
  },
  categoryCount: {
    fontSize: typography.fontSize.xs,
    fontFamily: 'Poppins-Regular',
    color: colors.dimGray,
    paddingHorizontal: metrics.padding.sm,
    textAlign: 'left',
  },
});

export default styles;

import {StyleSheet} from 'react-native';
import {colors, metrics, typography} from 'src/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ghostWhite,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: metrics.padding.md,
    marginBottom: metrics.margin.md,
  },
  tab: {
    flex: 1,
    paddingVertical: metrics.padding.sm,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: typography.fontSize.sm,
    color: colors.dimGray,
  },
  activeTabText: {
    color: colors.primary,
    fontFamily: 'Poppins-Medium',
  },
  ordersList: {
    paddingHorizontal: metrics.padding.md,
    // paddingBottom: metrics.padding.md,
  },
  orderItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: metrics.borderRadius.md,
    padding: metrics.padding.sm,
    marginBottom: metrics.margin.md,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemDetails: {
    flex: 1,
    marginLeft: metrics.margin.sm,
  },
  itemName: {
    fontSize: typography.fontSize.sm,
    color: colors.black,
    marginBottom: metrics.margin.xxs,
    fontFamily: 'Poppins-SemiBold',
  },
  itemInfo: {
    fontSize: typography.fontSize.xs,
    color: colors.dimGray,
    marginBottom: metrics.margin.xxs,
    fontFamily: 'Poppins-Regular',
  },
  itemPrice: {
    fontSize: typography.fontSize.sm,
    fontFamily: 'Poppins-SemiBold',
    color: colors.primary,
  },
  actionButton: {
    width: '40%',
  },
});

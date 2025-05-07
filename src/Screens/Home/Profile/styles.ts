import {StyleSheet} from 'react-native';
import {colors, metrics, scale, typography} from 'src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ghostWhite,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: metrics.margin.md,
    marginBottom: metrics.margin.md,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: metrics.margin.sm,
  },
  avatar: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    elevation: 5,
    backgroundColor: colors.white,
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    elevation: 4,
    zIndex: 1,
    borderRadius: metrics.borderRadius.xxl,
    padding: metrics.padding.sm,
  },
  userName: {
    fontSize: typography.fontSize.xl,
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
  },
  menuContainer: {
    paddingHorizontal: metrics.padding.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: colors.gainsBoro,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    marginLeft: metrics.margin.md,
    fontSize: typography.fontSize.md,
    color: colors.black,
    fontFamily: 'Poppins-Regular',
  },
});

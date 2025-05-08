import {StyleSheet} from 'react-native';
import {colors, metrics, scale, typography} from 'src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ghostWhite,
    paddingHorizontal: metrics.padding.md,
  },
  paymentOption: {
    paddingVertical: metrics.padding.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gainsBoro,
  },
  paymentOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentOptionText: {
    marginLeft: scale(10),
    fontSize: typography.fontSize.md,
    // color: '#000000',
    paddingTop: scale(5),
    fontFamily: 'Poppins-Medium',
  },
  razorPayTitle: {
    marginLeft: scale(10),
    fontSize: typography.fontSize.md,
    fontFamily: 'Poppins-Medium',
    paddingTop: scale(5),
  },
  paymentButton: {
    position: 'absolute',
    bottom: scale(20),
    left: 16,
    right: 16,
  },
});

import {StyleSheet} from 'react-native';
import {colors, metrics, scale} from 'src/theme';

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
    marginLeft: 10,
    fontSize: 16,
    color: '#000000',
    paddingTop: 5,
    fontFamily: 'Poppins-Medium',
  },
  razorPayTitle: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins-Medium',
    paddingTop: 5,
  },
  paymentButton: {
    position: 'absolute',
    bottom: scale(20),
    left: 16,
    right: 16,
  },
});

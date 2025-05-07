import {StyleSheet} from 'react-native';
import {colors, metrics} from 'src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ghostWhite,
  },
  paymentOption: {
    paddingVertical: metrics.padding.md,
    paddingHorizontal: metrics.padding.md,
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
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 8,
    left: 16,
    right: 16,
  },
  paymentButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

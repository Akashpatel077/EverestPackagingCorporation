import {StyleSheet} from 'react-native';
import {colors, metrics, typography} from 'src/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ghostWhite,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfField: {
    width: '48%',
  },
  field: {
    marginBottom: metrics.margin.md,
  },
  label: {
    fontSize: typography.fontSize.xs,
    color: colors.darkGray,
    marginBottom: metrics.margin.xs,
    fontFamily: 'Poppins-Regular',
  },
  required: {
    color: colors.red,
    fontFamily: 'Poppins-SemiBold',
  },
  makeThisAsShippingAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: metrics.margin.sm,
  },
  shippingCheckBoxText: {
    fontSize: typography.fontSize.xs,
    paddingLeft: metrics.padding.xs,
    color: colors.dimGray,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default styles;

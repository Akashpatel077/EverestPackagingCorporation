import {StyleSheet} from 'react-native';
import {colors, metrics, typography, scale, verticalScale} from 'src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  logo: {
    fontSize: typography.fontSize.xxl,
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
    textAlign: 'center',
    marginBottom: metrics.margin.lg,
  },
  welcomeText: {
    fontSize: typography.fontSize.sm,
    color: colors.dimGray,
    textAlign: 'center',
    marginBottom: metrics.margin.xxl,
    fontFamily: 'Poppins-Regular',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: metrics.margin.xl,
  },
  checkbox: {
    width: scale(20),
    height: scale(20),
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: metrics.borderRadius.sm,
    marginRight: metrics.margin.sm,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
  },
  termsText: {
    fontSize: typography.fontSize.sm,
    color: colors.dimGray,
    paddingLeft: metrics.padding.xs,
    fontFamily: 'Poppins-SemiBold',
  },
  termsLink: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: metrics.margin.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gainsBoro,
  },
  dividerText: {
    marginHorizontal: metrics.margin.md,
    color: colors.dimGray,
    fontSize: typography.fontSize.sm,
    fontFamily: 'Poppins-Medium',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: metrics.margin.lg,
  },
  socialButton: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    borderWidth: 1,
    borderColor: colors.gainsBoro,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: metrics.margin.xl,
  },
  signInText: {
    color: colors.dimGray,
    fontSize: typography.fontSize.sm,
    fontFamily: 'Poppins-Medium',
  },
  signInLink: {
    color: colors.primary,
    fontSize: typography.fontSize.sm,
    marginLeft: metrics.margin.xs,
    fontFamily: 'Poppins-Medium',
  },
});

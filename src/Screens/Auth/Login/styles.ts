import {StyleSheet} from 'react-native';
import {colors, metrics, typography, scale} from 'src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: metrics.padding.md,
  },
  logo: {
    fontSize: typography.fontSize.xxl,
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
    textAlign: 'center',
    marginTop: metrics.margin.xxxxl,
    marginBottom: metrics.margin.lg,
  },
  welcomeText: {
    fontSize: typography.fontSize.sm,
    color: colors.dimGray,
    textAlign: 'center',
    marginBottom: metrics.margin.xxl,
    fontFamily: 'Poppins-Regular',
  },
  label: {
    fontSize: typography.fontSize.sm,
    color: colors.darkGray,
    marginBottom: metrics.margin.sm,
    fontFamily: 'Poppins-Regular',
  },
  eyeIcon: {
    padding: metrics.padding.sm,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: metrics.margin.sm,
    marginBottom: metrics.margin.xl,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: typography.fontSize.sm,
    fontFamily: 'Poppins-Medium',
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
    width: scale(40),
    height: scale(40),
    borderRadius: scale(24),
    borderWidth: 1,
    borderColor: colors.gainsBoro,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: metrics.margin.xl,
  },
  signUpText: {
    color: colors.dimGray,
    fontSize: typography.fontSize.sm,
    fontFamily: 'Poppins-Regular',
  },
  signUpLink: {
    color: colors.primary,
    fontSize: typography.fontSize.sm,
    marginLeft: metrics.margin.xs,
    fontFamily: 'Poppins-Medium',
  },
});

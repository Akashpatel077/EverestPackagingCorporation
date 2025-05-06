import {
  ScaledSheet,
  scale,
  verticalScale,
  moderateScale,
} from 'react-native-size-matters';

const colors = {
  primary: '#0088cc',
  white: '#FFFFFF',
  black: '#000000',
  red: '#CC5656',
  dimGray: '#666666',
  darkGray: '#333333',
  nobel9: '#999999',
  suvaGray: '#909090',
  whiteSmoke6: '#F6F6F6',
  gainsBoro: '#E0E0E0',
  modalBackground: 'rgba(0,0,0,0.4)',
  WhisperE5: '#E5E5E5',
  background: {
    light: '#FFFFFF',
    dark: '#121212',
  },
  text: {
    light: '#000000',
    dark: '#FFFFFF',
  },
};

const spacing = {
  xs: scale(4),
  sm: scale(8),
  md: scale(16),
  lg: scale(24),
  xl: scale(32),
  xxl: scale(40),
};

const typography = {
  fontSize: {
    xxs: scale(10),
    xs: scale(12),
    sm: scale(14),
    md: scale(16),
    lg: scale(18),
    xl: scale(20),
    xxl: scale(24),
  },
  lineHeight: {
    xs: scale(16),
    sm: scale(20),
    md: scale(24),
    lg: scale(28),
    xl: scale(32),
    xxl: scale(36),
  },
};

const metrics = {
  borderRadius: {
    sm: scale(4),
    md: scale(8),
    lg: scale(12),
  },
  padding: spacing,
  margin: spacing,
  iconSize: {
    xs: scale(16),
    sm: scale(20),
    md: scale(24),
    lg: scale(32),
  },
};

const light = {
  colors: {
    ...colors,
    background: colors.background.light,
    text: colors.text.light,
  },
  spacing,
  typography,
  metrics,
};

const dark = {
  colors: {
    ...colors,
    background: colors.background.dark,
    text: colors.text.dark,
  },
  spacing,
  typography,
  metrics,
};

export const theme = {light, dark};
export {
  colors,
  spacing,
  typography,
  metrics,
  ScaledSheet,
  scale,
  verticalScale,
  moderateScale,
};

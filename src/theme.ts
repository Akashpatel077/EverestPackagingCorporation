import {Dimensions} from 'react-native';
import {scale} from 'react-native-size-matters';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#67C4A7',
  white: '#FFFFFF',
  black: '#000000',
  red: '#FF0000',
};

export const SIZES = {
  // global sizes
  radius: scale(12),
  padding: scale(15),

  // font sizes
  largeTitle: width > 700 ? scale(33) : scale(35),
  largeTitle1: width > 700 ? scale(28) : scale(30),
  h1: width > 700 ? scale(20) : scale(25),
  h2: width > 700 ? scale(20) : scale(22),
  h3: width > 700 ? scale(18) : scale(20),
  h4: width > 700 ? scale(16) : scale(18),
  h5: width > 700 ? scale(13) : scale(15),
  h6: width > 700 ? scale(12) : scale(14),
  body1: width > 700 ? scale(68) : scale(70),
  body2: width > 700 ? scale(33) : scale(35),
  body3: width > 700 ? scale(16) : scale(18),
  body4: width > 700 ? scale(14) : scale(16),
  body5: width > 700 ? scale(12) : scale(14),
  body6: width > 700 ? scale(10) : scale(12),
  body7: width > 700 ? scale(8) : scale(10),

  body0: width > 700 ? scale(21) : scale(23),

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {
    fontFamily: 'SchibstedGrotesk-Medium',
    fontSize: SIZES.largeTitle,
  },
  h1: {fontFamily: 'SchibstedGrotesk-Medium', fontSize: SIZES.h1},
  h2: {fontFamily: 'SchibstedGrotesk-Medium', fontSize: SIZES.h2},
  h3: {fontFamily: 'SchibstedGrotesk-Medium', fontSize: SIZES.h3},
  h4: {fontFamily: 'SchibstedGrotesk-Medium', fontSize: SIZES.h4},
  h5: {fontFamily: 'SchibstedGrotesk-Medium', fontSize: SIZES.h5},
  h6: {fontFamily: 'SchibstedGrotesk-Medium', fontSize: SIZES.h6},
  smallBtnText: {fontFamily: 'SchibstedGrotesk-Medium', fontSize: SIZES.body3},
  bigBtnText: {
    fontFamily: 'SchibstedGrotesk-Medium',
    fontSize: SIZES.largeTitle1,
  },
  body1: {fontFamily: 'SchibstedGrotesk-Regular', fontSize: SIZES.body1},
  body2: {fontFamily: 'SchibstedGrotesk-Regular', fontSize: SIZES.body2},
  body3: {fontFamily: 'SchibstedGrotesk-Regular', fontSize: SIZES.body3},
  body4: {fontFamily: 'SchibstedGrotesk-Regular', fontSize: SIZES.body4},
  body5: {fontFamily: 'SchibstedGrotesk-Regular', fontSize: SIZES.body5},
  body6: {fontFamily: 'SchibstedGrotesk-Regular', fontSize: SIZES.body6},
  body7: {fontFamily: 'SchibstedGrotesk-Regular', fontSize: SIZES.body7},
  body0: {fontFamily: 'SchibstedGrotesk-Regular', fontSize: SIZES.body0},
};

const light = {
  textInputText: COLORS.steelGrey,
  background: COLORS.white,
  smallBtn: COLORS.whisper,
  smallBtnText: COLORS.gunPowder,
  bigBtn: COLORS.whisper,
  bigBtnText: COLORS.gunPowder,
  countryText: COLORS.steelGrey,
  sipResultText: COLORS.dodgerBlue,
  bigtoBtn: COLORS.whiteSmoke0,
  displayText: COLORS.gunPowder,
  inputText: COLORS.spunPearl,
  otherCalculatorBtn: COLORS.lavender,
  otherCalculatorBtnText: COLORS.gunPowder,
  blueBtn: COLORS.dodgerBlue,
  headerText: COLORS.gunPowder,
  blockBox: COLORS.white,
  blockBoxText: COLORS.steelGrey,
  blockBoxSubText: COLORS.gray,
  blockBoxBorder: COLORS.whisperE,
  modalBackGround: COLORS.white,
  modalHeaderBorder: COLORS.whisperE,
  whiteText: COLORS.white,
  inputBackground: COLORS.white,
  inputBorder: COLORS.whiteSmoke6,
  placeHolder: COLORS.suvaGrey,
  answerText: COLORS.dodgerBlue,
  labelText: COLORS.suvaGrey,
  gunText: COLORS.gunPowder,
  wsColor: COLORS.whisperE,
  transparent: COLORS.transparent,
  tropicalBlue: COLORS.tropicalBlue,
  imageBackground: COLORS.gainsboro,
  unitSelectedBtn: COLORS.dodgerBlue,
  conditionText: COLORS.gray,
  redText: COLORS.red,
  kGreenText: COLORS.kellyGreen,
  underlay: COLORS.pinkSwan,
  blueUnderlay: COLORS.denim,
  keyBoardBackground: COLORS.whiteSmoke8,
  optionBox: COLORS.whisperE,
  headingLabel: COLORS.steelGrey,
  cardImageBackground: COLORS.whiteSmoke6,
  lineDevider: COLORS.gray,
  otherCalculatorBtnBorder: COLORS.gainsboro,
  toastBackground: COLORS.gainsboro,
  toastFontColor: COLORS.gunPowder,
  unitBtn: COLORS.silver,
  unitSelectedTxt: COLORS.steelGrey,
  unitTxt: COLORS.silver,
};
const dark = {
  unitTxt: COLORS.zambezi,
  unitSelectedTxt: COLORS.white,
  unitBtn: COLORS.zambezi,
  unitSelectedBtn: COLORS.white,
  textInputText: COLORS.silver,
  background: COLORS.black,
  smallBtn: COLORS.eclipse,
  smallBtnText: COLORS.white,
  bigBtn: COLORS.eclipse,
  bigBtnText: COLORS.white,
  sipResultText: COLORS.white,
  countryText: COLORS.white,
  bigtoBtn: COLORS.nero,
  displayText: COLORS.white,
  inputText: COLORS.gray,
  otherCalculatorBtn: COLORS.nero,
  otherCalculatorBtnText: COLORS.white,
  blueBtn: COLORS.dodgerBlue,
  headerText: COLORS.white,
  blockBox: COLORS.nero,
  blockBoxText: COLORS.white,
  blockBoxSubText: COLORS.whiteSmoke4,
  modalBackGround: COLORS.nero,
  modalHeaderBorder: COLORS.eclipse,
  blockBoxBorder: COLORS.eclipseDark,
  whiteText: COLORS.white,
  inputBackground: COLORS.nero,
  inputBorder: COLORS.eclipse,
  placeHolder: COLORS.spunPearl,
  answerText: COLORS.gainsboro,
  labelText: COLORS.white,
  gunText: COLORS.gunPowder,
  wsColor: COLORS.eclipse,
  transparent: COLORS.transparent,
  tropicalBlue: COLORS.tropicalBlue,
  imageBackground: COLORS.nero,
  conditionText: COLORS.gainsboro,
  redText: COLORS.red,
  kGreenText: COLORS.kellyGreen,
  underlay: COLORS.charcoal,
  blueUnderlay: COLORS.navyBlue,
  keyBoardBackground: COLORS.shadeBlack,
  optionBox: COLORS.eclipse,
  headingLabel: COLORS.white,
  cardImageBackground: COLORS.eclipse,
  lineDevider: COLORS.eclipse,
  otherCalculatorBtnBorder: COLORS.eclipse,
  toastBackground: COLORS.zambezi,
  toastFontColor: COLORS.white,
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
export const color = {light, dark};

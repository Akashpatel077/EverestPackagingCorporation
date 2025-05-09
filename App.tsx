import './gesture-handler';
import {StatusBar} from 'react-native';
import React from 'react';
import MainContainer from './src/Navigation';
import {I18nextProvider} from 'react-i18next';
import i18n from './src/Multilanguage';
import {Provider} from 'react-redux';
import store from '@store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import {colors, metrics, typography} from 'src/theme';

const toastConfig = {
  success: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: colors.green,
        width: '96%',
        backgroundColor: colors.black,
      }}
      // contentContainerStyle={{paddingHorizontal: metrics.padding.md}}
      text1Style={{
        fontSize: typography.fontSize.md,
        fontFamily: 'Poppins-Medium',
        color: colors.white,
      }}
      text2Style={{
        fontSize: typography.fontSize.sm,
        fontFamily: 'Poppins-Regular',
        color: colors.white,
      }}
    />
  ),

  error: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: colors.red,
        width: '96%',
        backgroundColor: colors.black,
      }}
      // contentContainerStyle={{paddingHorizontal: metrics.padding.md}}
      text1Style={{
        fontSize: typography.fontSize.md,
        fontFamily: 'Poppins-Medium',
        color: colors.white,
      }}
      text2Style={{
        fontSize: typography.fontSize.sm,
        fontFamily: 'Poppins-Regular',
        color: colors.white,
      }}
    />
  ),
};

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <MainContainer />
          <Toast config={toastConfig} />
        </I18nextProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;

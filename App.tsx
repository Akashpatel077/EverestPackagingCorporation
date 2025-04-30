import './gesture-handler';
import {StatusBar} from 'react-native';
import React from 'react';
import MainContainer from './src/Navigation';
import {I18nextProvider} from 'react-i18next';
import i18n from './src/Multilanguage';
import {Provider} from 'react-redux';
import store from '@store';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" translucent={false} />
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <MainContainer />
        </I18nextProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;

import {SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import MainContainer from './src/Navigation';
import {I18nextProvider} from 'react-i18next';
import i18n from './src/Multilanguage';
import {Provider} from 'react-redux';
import store from '@store';

const App = () => {
  return (
    <>
      <StatusBar
        backgroundColor="#ffffff"
        barStyle="dark-content"
      />
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <MainContainer />
          </I18nextProvider>
        </Provider>
      </SafeAreaView>
    </>
  );
};

export default App;

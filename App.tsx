import {SafeAreaView} from 'react-native';
import React from 'react';
import MainContainer from './src/Navigation';
import {I18nextProvider} from 'react-i18next';
import i18n from './src/Multilanguage';
import {Provider} from 'react-redux';
import store from '@store';

const App = () => {
  const images = [
    {id: '1', image: 'https://picsum.photos/800/600'},
    {id: '2', image: 'https://picsum.photos/801/600'},
    {id: '3', image: 'https://picsum.photos/802/600'},
    {id: '4', image: 'https://picsum.photos/802/600'},
    {id: '5', image: 'https://picsum.photos/802/600'},
  ];

  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <I18nextProvider i18n={i18n}>
          <MainContainer />
        </I18nextProvider>
      </SafeAreaView>
    </Provider>
  );
};

export default App;

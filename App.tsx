import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {FONTS} from './src/theme';

const App = () => {
  return (
    <SafeAreaView>
      <Text style={{...FONTS.h1}}>Delivery address</Text>
      <Text>Salatiga City, Central Java ⌵</Text>
    </SafeAreaView>
  );
};

export default App;

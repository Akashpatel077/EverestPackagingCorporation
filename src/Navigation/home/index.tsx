import React, { Component } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { HomeScreen } from 'src/Screens/Home';
import { HOMESCREEN } from './routes';

const HomeStack = createNativeStackNavigator();

const HomeContainer = () => {
  const screens = [
    {name:HOMESCREEN,Component : HomeScreen},
  ]
  return (
    <HomeStack.Navigator
      screenOptions={{headerShown: false}}
    >
      {screens.map((item,index) => {
        return <HomeStack.Screen key={index} name={item.name} component={item.Component} />
      })}
    </HomeStack.Navigator>
  );
};

export default HomeContainer;

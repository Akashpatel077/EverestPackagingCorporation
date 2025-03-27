import React, { Component } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { LOGIN, REGISTRATION } from './routes';
import { Login, Registration } from '../../Screens/Auth';

const AuthStack = createNativeStackNavigator();

const AuthContainer = () => {
  const screens = [
    {name:LOGIN,Component : Login},
    {name:REGISTRATION,Component : Registration}
  ]
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false}}
    >
      {screens.map((item,index) => {
        return <AuthStack.Screen key={index} name={item.name} component={item.Component} />
      })}
    </AuthStack.Navigator>
  );
};

export default AuthContainer;

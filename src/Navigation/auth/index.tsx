import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { LOGIN } from './routes';
import { Login } from '../../Screens/Auth';

const AuthStack = createNativeStackNavigator();

const AuthContainer = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false}}
    >
      <AuthStack.Screen name={LOGIN} component={Login} />
    </AuthStack.Navigator>
  );
};

export default AuthContainer;

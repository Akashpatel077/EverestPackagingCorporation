import React from 'react';
import AuthContainer from './auth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeContainer from './home';
import SplashScreen from '../Screens/SplashScreen';
import Welcome from '../Screens/Welcome';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

const MainStack = createNativeStackNavigator();

const MainContainer = () => {
  const {hasStarted} = useSelector((state: RootState) => state.startKey);
  const store = useSelector((state: RootState) => state);
  const {token} = useSelector((state: RootState) => state.auth);
  const isLoggedIn = Boolean(token);

  console.log('store', store);

  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{headerShown: false}}>
        {isLoggedIn || hasStarted ? (
          <MainStack.Screen name="Home" component={HomeContainer} />
        ) : (
          <>
            <MainStack.Screen name="Splash" component={SplashScreen} />
            <MainStack.Screen name="Auth" component={AuthContainer} />
            <MainStack.Screen name="Welcome" component={Welcome} />
          </>
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainContainer;

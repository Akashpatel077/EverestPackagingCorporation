import React from 'react';
import AuthContainer from './auth';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeContainer from './home';
import SplashScreen from '../Screens/SplashScreen';
import Welcome from '../Screens/Welcome';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {
  BILLING_ADDRESS,
  BILLING_ADDRESS_FORM,
  CHECKOUT,
  PAYMENT_METHOD,
  PAYMENT_WEBVIEW,
  PRODUCT_DETAILS,
  SHIPPING_ADDRESS,
  SHIPPING_ADDRESS_FORM,
} from './home/routes';
import PaymentWebView from 'src/Screens/Home/PaymentWebView/PaymentWebView';
import {
  BillingAddress,
  BillingAddressForm,
  ProductDetails,
  ShippingAddressForm,
  ShippingAddressScreen,
} from 'src/Screens/Home';
import CheckoutScreen from 'src/Screens/Home/Checkout';
import PaymentMethodScreen from 'src/Screens/Home/PaymentMethod';

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
          <>
            <MainStack.Screen name="Home" component={HomeContainer} />
            <MainStack.Screen
              name={PAYMENT_WEBVIEW}
              component={PaymentWebView}
            />
            <MainStack.Screen
              name={BILLING_ADDRESS_FORM}
              component={BillingAddressForm}
            />
            <MainStack.Screen
              name={SHIPPING_ADDRESS_FORM}
              component={ShippingAddressForm}
            />
            <MainStack.Screen name={CHECKOUT} component={CheckoutScreen} />
            <MainStack.Screen
              name={BILLING_ADDRESS}
              component={BillingAddress}
            />
            <MainStack.Screen
              name={SHIPPING_ADDRESS}
              component={ShippingAddressScreen}
            />
            <MainStack.Screen
              name={PAYMENT_METHOD}
              component={PaymentMethodScreen}
            />
            <MainStack.Screen
              name={PRODUCT_DETAILS}
              component={ProductDetails}
            />
          </>
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

import {CommonActions} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {BackHandler, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {useDispatch} from 'react-redux';
import CSafeAreaView from 'src/Components/CSafeAreaView';
import {MYCART} from 'src/Navigation/home/routes';
import {getCartListAction} from 'src/store/slices/cartSlice';

const PaymentWebView = ({navigation, route}) => {
  const {redirectUrl, orderId} = route.params;
  const webViewRef = useRef(null);
  const dispatch = useDispatch();
  const handleNavigationStateChange = navState => {
    const {url, canGoBack} = navState;

    console.log('url : ', url);

    if (canGoBack) {
      setTimeout(() => {
        dispatch(getCartListAction());
      }, 2000);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'Home',
              state: {
                index: 0,
                routes: [
                  {
                    name: 'Cart',
                    state: {
                      index: 0,
                      routes: [{name: MYCART}],
                    },
                  },
                ],
              },
            },
          ],
        }),
      );
    }

    // Razorpay Success URL (can vary, inspect actual return URLs)
    if (
      url.includes('order-received') &&
      url.includes('everestpackaging.co.in')
    ) {
      // Order completed successfully
      console.log('Payment Successful');
      // Optionally extract order ID from the URL
      const orderId = url.split('order-received/')[1]?.split('/')[0];
      // Navigate or show success
      navigation.goBack();
    }

    // Razorpay Failure URL or cancelled (based on your WooCommerce settings)
    else if (
      url.includes('order-cancelled') ||
      url.includes('cancel_order=true')
    ) {
      console.log('Payment Cancelled or Failed');
      navigation.goBack();
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true;
      },
    );

    return () => backHandler.remove();
  }, []);

  return (
    <CSafeAreaView>
      <WebView
        ref={webViewRef}
        source={{uri: redirectUrl}}
        onNavigationStateChange={handleNavigationStateChange}
        startInLoadingState={true}
      />
    </CSafeAreaView>
  );
};

export default PaymentWebView;

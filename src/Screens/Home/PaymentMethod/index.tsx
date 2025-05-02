import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {CustomAlert, Header, Icon} from 'src/Components';
import {
  Heart,
  CreditCard,
  PayPal,
  ApplePay,
  BackIcon,
  SelectedRadioButton,
  NotSelectedRadioButton,
} from 'assets/icons';
import {styles} from './styles';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {cartCheckout} from 'src/services/wooCommerceApi';
import {
  CHECKOUT,
  MYCART,
  PAYMENT_SUCCESS_SCREEN,
  PAYMENT_WEBVIEW,
} from 'src/Navigation/home/routes';
import CSafeAreaView from 'src/Components/CSafeAreaView';
import {clearCart} from 'src/store/slices/cartSlice';

const PaymentMethodScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    billingAddresses,
    shippingAddresses,
    selectedShippingAddressId,
    selectedBillingAddressId,
  } = useSelector(item => item.address);
  const {user} = useSelector(item => item.auth);

  const [isRazorPay, setIsRazorPay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const onPlaceOrder = async () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'HomeDrawer',
            state: {
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
                          routes: [
                            {
                              name: MYCART,
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      }),
    );

    // const selectedBillingAddress = billingAddresses.filter(
    //   item => item.id === selectedBillingAddressId,
    // );
    // const selectedShippingAddress = shippingAddresses.filter(
    //   item => item.id === selectedShippingAddressId,
    // );
    // if (
    //   selectedBillingAddress.length > 0 &&
    //   selectedShippingAddress.length > 0
    // ) {
    //   try {
    //     setLoading(true);
    //     const checkoutData = {
    //       // customer_id: user.id,
    //       billing_address: {
    //         ...selectedBillingAddress[0],
    //         country: 'IN',
    //         email: user.email ?? '',
    //         phone: user.billing.phone ?? '',
    //       },
    //       shipping_address: {
    //         ...selectedShippingAddress[0],
    //         country: 'IN',
    //       },
    //       customer_note: '',
    //       create_account: false,
    //       payment_method: isRazorPay ? 'razorpay' : 'cod',
    //       payment_data: [],
    //       extensions: {},
    //     };
    //     const checkoutResponse = await cartCheckout(checkoutData);
    //     console.log('res checkout : ', checkoutResponse);
    //     if (
    //       !isRazorPay &&
    //       checkoutResponse.payment_result.payment_status === 'success'
    //     ) {
    //       dispatch(clearCart());
    //       navigation.dispatch(
    //         CommonActions.reset({
    //           index: 0,
    //           routes: [
    //             {
    //               name: 'HomeDrawer',
    //               state: {
    //                 index: 0,
    //                 routes: [
    //                   {
    //                     name: 'Home',
    //                     state: {
    //                       index: 0,
    //                       routes: [
    //                         {
    //                           name: 'Cart',
    //                           state: {
    //                             index: 0,
    //                             routes: [
    //                               {
    //                                 name: PAYMENT_SUCCESS_SCREEN,
    //                               },
    //                             ],
    //                           },
    //                         },
    //                       ],
    //                     },
    //                   },
    //                 ],
    //               },
    //             },
    //           ],
    //         }),
    //       );
    //     } else if (
    //       checkoutResponse.status &&
    //       checkoutResponse.payment_result.redirect_url
    //     ) {
    //       navigation.navigate(PAYMENT_WEBVIEW, {
    //         redirectUrl: checkoutResponse.payment_result.redirect_url,
    //       });
    //     }
    //   } catch (error) {
    //     setAlertMessage(error?.response?.data?.message ?? error.message);
    //     setAlertVisible(true);
    //   } finally {
    //     setLoading(false);
    //   }
    // }
  };

  return (
    <CSafeAreaView>
      <View style={styles.container}>
        <Header title="Payment Methods" icon1={BackIcon} />

        <TouchableOpacity
          style={styles.paymentOption}
          activeOpacity={0.7}
          onPress={() => {
            setIsRazorPay(true);
          }}>
          <View style={styles.paymentOptionLeft}>
            <Icon
              name={isRazorPay ? SelectedRadioButton : NotSelectedRadioButton}
              width={24}
              height={24}
            />
            <Text style={styles.razorPayTitle}>Pay by Razorpay</Text>
          </View>
          {isRazorPay && (
            <Text
              style={[
                styles.paymentOptionText,
                {
                  fontSize: 14,
                  marginLeft: 35,
                  fontWeight: '500',
                  color: '#666666',
                },
              ]}>
              Pay securely by Credit or Debit card or Internet Banking through
              Razorpay.
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.paymentOption}
          onPress={() => setIsRazorPay(false)}>
          <View style={styles.paymentOptionLeft}>
            <Icon
              name={isRazorPay ? NotSelectedRadioButton : SelectedRadioButton}
              width={24}
              height={24}
            />
            <Text style={styles.paymentOptionText}>Cash on delivery</Text>
          </View>
          {!isRazorPay && (
            <Text
              style={[
                styles.paymentOptionText,
                {
                  fontSize: 14,
                  marginLeft: 35,
                  fontWeight: '500',
                  color: '#666666',
                },
              ]}>
              Pay with cash upon delivery.
            </Text>
          )}
        </TouchableOpacity>

        {/* <TouchableOpacity
        style={styles.paymentOption}
        onPress={() => {
          navigation.navigate(ADD_CARD_SCREEN);
        }}>
        <View style={styles.paymentOptionLeft}>
          <Icon name={CreditCard} width={24} height={24} color="#FFF" />
          <Text style={styles.paymentOptionText}>Add New Card</Text>
        </View>
        <Text style={styles.linkText}>Link</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>More Payment Options</Text>
      <TouchableOpacity style={styles.paymentOption}>
        <View style={styles.paymentOptionLeft}>
          <Icon name={PayPal} width={24} height={24} color="#FFF" />
          <Text style={styles.paymentOptionText}>Paypal</Text>
        </View>
        <Text style={styles.linkText}>Link</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.paymentOption}>
        <View style={styles.paymentOptionLeft}>
          <Icon name={ApplePay} width={24} height={24} color="#FFF" />
          <Text style={styles.paymentOptionText}>Apple Pay</Text>
        </View>
        <Text style={styles.linkText}>Link</Text>
      </TouchableOpacity> */}

        <TouchableOpacity
          style={[styles.paymentButton, {opacity: loading ? 0.7 : 1}]}
          disabled={loading}
          onPress={onPlaceOrder}>
          <Text style={styles.paymentButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
      <CustomAlert
        visible={alertVisible}
        title="Attention!"
        description={alertMessage}
        button2={{
          text: 'OK',
          onPress: () => setAlertVisible(false),
          color: '#007bff',
        }}
      />
    </CSafeAreaView>
  );
};

export default PaymentMethodScreen;

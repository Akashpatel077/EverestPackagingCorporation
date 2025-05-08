import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {CButton, Header, Icon} from 'src/Components';
import {
  BackIcon,
  SelectedRadioButton,
  NotSelectedRadioButton,
} from 'assets/icons';
import {styles} from './styles';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {MYCART} from 'src/Navigation/home/routes';
import CSafeAreaView from 'src/Components/CSafeAreaView';
import {colors, metrics, scale, typography} from 'src/theme';

const PaymentMethodScreen = () => {
  const navigation = useNavigation();

  const [isRazorPay, setIsRazorPay] = useState(false);

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
                              params: {isRazorPay},
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
  };

  return (
    <CSafeAreaView removeBottomSafeArea>
      <Header title="Payment Methods" icon1={BackIcon} />

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.paymentOption}
          activeOpacity={0.7}
          onPress={() => {
            setIsRazorPay(true);
          }}>
          <View style={styles.paymentOptionLeft}>
            <Icon
              name={isRazorPay ? SelectedRadioButton : NotSelectedRadioButton}
              width={metrics.iconSize.md}
              height={metrics.iconSize.md}
            />
            <Text style={styles.razorPayTitle}>Pay by Razorpay</Text>
          </View>
          {isRazorPay && (
            <Text
              style={[
                styles.paymentOptionText,
                {
                  fontSize: typography.fontSize.sm,
                  marginLeft: scale(33),
                  fontFamily: 'Poppins-Medium',
                  color: colors.dimGray,
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
              width={metrics.iconSize.md}
              height={metrics.iconSize.md}
            />
            <Text style={styles.paymentOptionText}>Cash on delivery</Text>
          </View>
          {!isRazorPay && (
            <Text
              style={[
                styles.paymentOptionText,
                {
                  fontSize: typography.fontSize.sm,
                  marginLeft: scale(33),
                  fontFamily: 'Poppins-Medium',
                  color: colors.dimGray,
                },
              ]}>
              Pay with cash upon delivery.
            </Text>
          )}
        </TouchableOpacity>

        {/* <TouchableOpacity style={[styles.paymentButton]} onPress={onPlaceOrder}>
          <Text style={styles.paymentButtonText}>Continue</Text>
        </TouchableOpacity> */}
        <CButton
          style={styles.paymentButton}
          title="Continue"
          onPress={onPlaceOrder}
        />
      </View>
    </CSafeAreaView>
  );
};

export default PaymentMethodScreen;

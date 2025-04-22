import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Header, Icon} from 'src/Components';
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
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {cartCheckout} from 'src/services/wooCommerceApi';
import {PAYMENT_WEBVIEW} from 'src/Navigation/home/routes';

const PaymentMethodScreen = () => {
  const navigation = useNavigation();
  const {
    billingAddresses,
    shippingAddresses,
    selectedShippingAddressId,
    selectedBillingAddressId,
  } = useSelector(item => item.address);

  const [isRazorPay, setIsRazorPay] = useState(false);

  const onPlaceOrder = async () => {
    const selectedBillingAddress = billingAddresses.filter(
      item => item.id === selectedBillingAddressId,
    );
    const selectedShippingAddress = shippingAddresses.filter(
      item => item.id === selectedShippingAddressId,
    );

    if (
      selectedBillingAddress.length > 0 &&
      selectedShippingAddress.length > 0
    ) {
      try {
        const checkoutData = {
          billing_address: {
            ...selectedBillingAddress[0],
            country: 'IN',
            state: 'WB',
            email: 'ravithakor.meritorious@gmail.com',
            phone: '4668888888',
          },
          shipping_address: {
            ...selectedShippingAddress[0],
            country: 'IN',
            state: 'WB',
          },
          customer_note: '',
          create_account: false,
          payment_method: 'razorpay',
          payment_data: [],
          extensions: {},
        };

        console.log('checkoutData : ', checkoutData);

        const checkoutResponse = await cartCheckout(checkoutData);

        console.log('checkoutResponse : ', checkoutResponse);

        if (
          checkoutResponse.status &&
          checkoutResponse.payment_result.redirect_url
        ) {
          navigation.navigate(PAYMENT_WEBVIEW, {
            redirectUrl: checkoutResponse.payment_result.redirect_url,
          });
        }
      } catch (error) {
        console.log('error : ', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Payment Methods" icon1={BackIcon} />

      <TouchableOpacity
        style={styles.paymentOption}
        activeOpacity={0.7}
        onPress={() => {
          // navigation.navigate(ADD_CARD_SCREEN);
          setIsRazorPay(true);
        }}>
        <View style={styles.paymentOptionLeft}>
          <Icon
            name={isRazorPay ? SelectedRadioButton : NotSelectedRadioButton}
            width={24}
            height={24}
          />
          <View>
            <Text style={[styles.paymentOptionText, {fontSize: 18}]}>
              Credit Card/Debit Card/NetBanking
            </Text>
            <View style={styles.razorPayIconContainer}>
              <Icon name={CreditCard} width={24} height={24} color="#FFF" />
              <View style={styles.razorPayTextContainer}>
                <Text style={styles.razorPayTitle}>Pay by Razorpay</Text>
                <Text style={styles.razorPaySubTitle}>
                  Cards, Netbanking, Wallet & UPI
                </Text>
              </View>
            </View>
          </View>
        </View>
        {isRazorPay && (
          <Text
            style={[
              styles.paymentOptionText,
              {
                fontSize: 17,
                marginLeft: 0,
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
        onPress={() => {
          // navigation.navigate(ADD_CARD_SCREEN);
          setIsRazorPay(false);
        }}>
        <View style={styles.paymentOptionLeft}>
          <Icon
            name={isRazorPay ? NotSelectedRadioButton : SelectedRadioButton}
            width={24}
            height={24}
          />
          <View>
            <Text style={styles.paymentOptionText}>Cash on delivery</Text>
          </View>
        </View>
        {!isRazorPay && (
          <Text
            style={[
              styles.paymentOptionText,
              {
                fontSize: 17,
                marginLeft: 0,
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

      <TouchableOpacity style={styles.paymentButton} onPress={onPlaceOrder}>
        <Text style={styles.paymentButtonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentMethodScreen;

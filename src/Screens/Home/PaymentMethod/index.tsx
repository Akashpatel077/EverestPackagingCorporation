import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Header, Icon} from 'src/Components';
import {Heart, CreditCard, PayPal, ApplePay, BackIcon} from 'assets/icons';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {ADD_CARD_SCREEN} from 'src/Navigation/home/routes';

const PaymentMethodScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      <Header title="Payment Methods" icon1={BackIcon}/>

      <Text style={styles.sectionTitle}>Credit & Debit Card</Text>
      <TouchableOpacity
        style={styles.paymentOption}
        onPress={() => {
          navigation.navigate(ADD_CARD_SCREEN);
        }}>
        <View style={styles.paymentOptionLeft}>
          <Icon name={CreditCard} width={24} height={24} />
          <Text style={styles.paymentOptionText}>Add New Card</Text>
        </View>
        <Text style={styles.linkText}>Link</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>More Payment Options</Text>
      <TouchableOpacity style={styles.paymentOption}>
        <View style={styles.paymentOptionLeft}>
          <Icon name={PayPal} width={24} height={24} />
          <Text style={styles.paymentOptionText}>Paypal</Text>
        </View>
        <Text style={styles.linkText}>Link</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.paymentOption}>
        <View style={styles.paymentOptionLeft}>
          <Icon name={ApplePay} width={24} height={24} />
          <Text style={styles.paymentOptionText}>Apple Pay</Text>
        </View>
        <Text style={styles.linkText}>Link</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentMethodScreen;

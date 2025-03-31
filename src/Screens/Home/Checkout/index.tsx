import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Icon} from 'src/Components';
import {Heart, Home} from 'assets/icons';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {PAYMENT_METHOD, SHIPPING_ADDRESS} from 'src/Navigation/home/routes';

const CheckoutScreen = ({route}) => {
  const navigation = useNavigation();
  const selectedAddress = route.params?.selectedAddress;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name={Heart} width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Address</Text>
        <View style={styles.addressContainer}>
          <View style={styles.addressLeft}>
            <Icon name={Home} width={24} height={24} />
            <View style={styles.addressDetails}>
              <Text style={styles.addressType}>
                {selectedAddress ? selectedAddress.type : 'Home'}
              </Text>
              <Text style={styles.addressText}>
                {selectedAddress
                  ? selectedAddress.address
                  : '1901 Thornridge Cir. Shiloh, Hawaii 81063'}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(SHIPPING_ADDRESS);
            }}>
            <Text style={styles.changeButton}>CHANGE</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Choose Shipping Type</Text>
        <View style={styles.shippingContainer}>
          <View style={styles.shippingLeft}>
            <Icon name={Home} width={24} height={24} />
            <View style={styles.shippingDetails}>
              <Text style={styles.shippingType}>Economy</Text>
              <Text style={styles.shippingDate}>
                Estimated Arrival 25 August 2023
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <Text style={styles.changeButton}>CHANGE</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order List</Text>
        {[
          {
            id: 1,
            title: 'Brown Jacket',
            size: 'XL',
            price: 83.97,
            image: require('assets/images/user.png'),
          },
          {
            id: 2,
            title: 'Brown Suite',
            size: 'XL',
            price: 120,
            image: require('assets/images/user.png'),
          },
          {
            id: 3,
            title: 'Brown Jacket',
            size: 'XL',
            price: 83.97,
            image: require('assets/images/user.png'),
          },
        ].map(item => (
          <View key={item.id} style={styles.orderItem}>
            <Image source={item.image} style={styles.orderImage} />
            <View style={styles.orderDetails}>
              <Text style={styles.orderTitle}>{item.title}</Text>
              <Text style={styles.orderSize}>Size : {item.size}</Text>
              <Text style={styles.orderPrice}>${item.price}</Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.paymentButton}
        onPress={() => {
          navigation.navigate(PAYMENT_METHOD);
        }}>
        <Text style={styles.paymentButtonText}>Continue to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutScreen;

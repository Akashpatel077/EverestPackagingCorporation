import React from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {Header, Icon} from 'src/Components';
import {BackIcon, Home} from 'assets/icons';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  PAYMENT_METHOD,
  SHIPPING_ADDRESS,
  BILLING_ADDRESS,
} from 'src/Navigation/home/routes';
import {selectCartItems} from 'src/store/slices/cartSlice';
import {RootState} from 'src/store';
import CSafeAreaView from 'src/Components/CSafeAreaView';

const getFormattedPrice = (price: string, currencyMinorUnit: number) => {
  const formattedPrice = (
    parseInt(price, 10) / Math.pow(10, currencyMinorUnit)
  ).toFixed(currencyMinorUnit);

  return formattedPrice;
};

const CheckoutScreen = ({route}) => {
  const navigation = useNavigation();
  const selectedShippingType = route.params?.selectedShipping;
  const {
    billingAddresses,
    selectedBillingAddressId,
    shippingAddresses,
    selectedShippingAddressId,
  } = useSelector((state: RootState) => state.address);
  const selectedBillingAddress = billingAddresses.find(
    address => address.id === selectedBillingAddressId,
  );
  const selectedAddress = shippingAddresses.find(
    address => address.id === selectedShippingAddressId,
  );

  const {items: cartItems} = useSelector(selectCartItems);

  return (
    <CSafeAreaView>
      <View style={styles.container}>
        <Header title="Checkout" icon1={BackIcon} />
        <View style={{flex: 1, paddingHorizontal: 16, marginTop: 12}}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Billing Address</Text>
            <View style={styles.addressContainer}>
              <View style={styles.addressLeft}>
                <Icon name={Home} width={24} height={24} />
                <View style={styles.addressDetails}>
                  <Text style={styles.addressType}>
                    {selectedBillingAddress && selectedBillingAddress.type}
                  </Text>
                  <Text style={styles.addressText}>
                    {selectedBillingAddress &&
                      `${selectedBillingAddress.street}, ${selectedBillingAddress.city}, ${selectedBillingAddress.state} ${selectedBillingAddress.postcode}, ${selectedBillingAddress.country}`}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(BILLING_ADDRESS);
                }}>
                <Text style={styles.changeButton}>CHANGE</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Shipping Address</Text>
            <View style={styles.addressContainer}>
              <View style={styles.addressLeft}>
                <Icon name={Home} width={24} height={24} />
                <View style={styles.addressDetails}>
                  <Text style={styles.addressType}>
                    {selectedAddress ? selectedAddress.name : 'Home'}
                  </Text>
                  <Text style={styles.addressText}>
                    {selectedAddress &&
                      `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.postcode}`}
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
            <Text style={styles.sectionTitle}>Order List</Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 380,
                justifyContent: 'center',
                alignItems: 'center',
                // width: '100%',
              }}>
              {cartItems.map(item => (
                <View
                  key={item.id}
                  style={[styles.orderItem, {marginRight: 12}]}>
                  <Image
                    source={item.images[0] && {uri: item.images[0].src}}
                    style={styles.orderImage}
                  />
                  <View style={styles.orderDetails}>
                    <Text style={styles.orderTitle}>{item.name}</Text>
                    {Array.isArray(item.attributes) &&
                      item.attributes
                        .filter(attr => attr.name !== 'HSN Code')
                        .map(attr => (
                          <Text key={attr.name} style={styles.orderSize}>
                            {attr.name}: {attr.value}
                          </Text>
                        ))}
                    <Text style={styles.orderPrice}>
                      ₹
                      {(
                        getFormattedPrice(
                          item.prices.sale_price,
                          item.prices.currency_minor_unit,
                        ) * item.quantity
                      ).toFixed(2)}
                    </Text>
                    <Text style={styles.quantity}>
                      Quantity: {item.quantity}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          <TouchableOpacity
            style={styles.paymentButton}
            onPress={() => {
              navigation.navigate(PAYMENT_METHOD);
            }}>
            <Text style={styles.paymentButtonText}>Continue to Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CSafeAreaView>
  );
};

export default CheckoutScreen;

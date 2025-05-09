import React from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {CButton, Header, Icon} from 'src/Components';
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
import {decode} from 'he';
import {metrics, scale} from 'src/theme';

const getFormattedPrice = (price: string, currencyMinorUnit: number) => {
  const formattedPrice = (
    parseInt(price, 10) / Math.pow(10, currencyMinorUnit)
  ).toFixed(currencyMinorUnit);

  return formattedPrice;
};

const CheckoutScreen = ({route}) => {
  const navigation = useNavigation();
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
    <CSafeAreaView removeBottomSafeArea>
      <View style={styles.container}>
        <Header title="Checkout" icon1={BackIcon} />
        <View
          style={{
            flex: 1,
            paddingHorizontal: metrics.padding.md,
            marginTop: metrics.margin.md,
          }}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Billing Address</Text>
            <View style={styles.addressContainer}>
              <View style={styles.addressLeft}>
                <Icon
                  name={Home}
                  width={metrics.iconSize.md}
                  height={metrics.iconSize.md}
                />
                <View style={styles.addressDetails}>
                  <Text style={styles.addressType}>
                    {selectedBillingAddress && selectedBillingAddress.name}
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
                <Icon
                  name={Home}
                  width={metrics.iconSize.md}
                  height={metrics.iconSize.md}
                />
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
                paddingBottom: scale(330),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {cartItems &&
                cartItems.map(
                  (item: {
                    id: React.Key | null | undefined;
                    images: {src: any}[];
                    name: any;
                    type: string;
                    variation: any[];
                    prices: {sale_price: string; currency_minor_unit: number};
                    quantity:
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactElement<
                          unknown,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | Promise<
                          | string
                          | number
                          | bigint
                          | boolean
                          | React.ReactPortal
                          | React.ReactElement<
                              unknown,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | null
                          | undefined
                        >
                      | null
                      | undefined;
                  }) => (
                    <View key={item.id} style={[styles.orderItem, {}]}>
                      <Image
                        source={item.images[0] && {uri: item.images[0].src}}
                        style={styles.orderImage}
                      />
                      <View style={styles.orderDetails}>
                        <Text style={styles.orderTitle}>
                          {decode(item.name)}
                        </Text>
                        {item.type === 'variation' &&
                          item.variation &&
                          item.variation.map(item => {
                            const decodedValue = decode(item.value);
                            return (
                              <Text style={styles.itemSize}>
                                {item.attribute} : {decodedValue}
                              </Text>
                            );
                          })}
                        {/* {Array.isArray(item.attributes) &&
                      item.attributes
                        .filter(attr => attr.name !== 'HSN Code')
                        .map(attr => (
                          <Text key={attr.name} style={styles.orderSize}>
                            {attr.name}: {attr.value}
                          </Text>
                        ))} */}
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
                  ),
                )}
            </ScrollView>
          </View>

          <CButton
            style={styles.paymentButton}
            onPress={() => {
              navigation.navigate(PAYMENT_METHOD);
            }}
            title={'Continue to Payment'}
          />
        </View>
      </View>
    </CSafeAreaView>
  );
};

export default CheckoutScreen;

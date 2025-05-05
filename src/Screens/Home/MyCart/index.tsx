import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import styles from './styles';
import {
  BILLING_ADDRESS_FORM,
  CATEGORY_SCREEN,
  CHECKOUT,
  PAYMENT_SUCCESS_SCREEN,
  PAYMENT_WEBVIEW,
  SHIPPING_ADDRESS_FORM,
} from 'src/Navigation/home/routes';
import {CustomAlert, Header} from 'src/Components';
import {decode} from 'he';
import {
  clearCart,
  removeFromCartAction,
  resetFlags,
  updateProductInCartAction,
} from 'src/store/slices/cartSlice';
import CSafeAreaView from 'src/Components/CSafeAreaView';
import {resetStartKey, setShowWelcome} from 'src/store/slices/startKeySlice';
import {cartCheckout} from 'src/services/wooCommerceApi';

interface CartItem {
  key: string;
  id: number;
  name: string;
  price: string;
  sale_price?: string;
  quantity: number;
  color?: string;
  attributes?: Array<{
    name: string;
    value: string;
  }>;
  image?: string;
  totalPrice: string;
  tax_status: string;
  tax_class: string;
}

const COD_CHARGE = 50;

const getFormattedPrice = (price: string, currencyMinorUnit: number) => {
  const formattedPrice = (
    parseInt(price, 10) / Math.pow(10, currencyMinorUnit)
  ).toFixed(currencyMinorUnit);

  return formattedPrice;
};

const MyCart = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();
  const {isRazorPay} = route.params || {};
  const addresses = useSelector((state: any) => state.address);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  useEffect(() => {
    if (isRazorPay !== undefined) {
      console.log('Payment Method:', isRazorPay ? 'Razorpay' : 'COD');
      setSelectedPaymentMethod(isRazorPay ? 'razorpay' : 'cod');
    }
  }, [isRazorPay]);

  const selectedShippingAddress = addresses.shippingAddresses.find(
    (address: any) => address.id === addresses.selectedShippingAddressId,
  );
  const selectedBillingAddress = addresses.billingAddresses.find(
    (address: any) => address.id === addresses.selectedBillingAddressId,
  );
  const dispatch = useDispatch();

  const {
    items: cartDetails,
    loading,
    isSuccess,
  } = useSelector(item => item.cart);
  const {hasStarted} = useSelector(item => item.startKey);

  const {totals, shipping_rates, items: cartItems, coupons} = cartDetails || {};
  const {
    tax_lines,
    total_items,
    currency_minor_unit,
    total_shipping,
    total_price,
  } = totals || {};

  const [promoCode, setPromoCode] = useState('');
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);
  const {
    billingAddresses,
    shippingAddresses,
    selectedShippingAddressId,
    selectedBillingAddressId,
  } = useSelector(item => item.address);
  const {user} = useSelector(item => item.auth);
  useEffect(() => {
    if (isSuccess) {
      setShowRemoveModal(false);
      setSelectedItem(null);
      dispatch(resetFlags());
    }
  }, [isSuccess]);

  // Handle quantity increase
  const increaseQuantity = (id: number) => {
    const item = cartItems.find(item => item.id === id);

    if (item && item.quantity < item.quantity_limits.maximum) {
      const quantity = item.quantity + Number(item.quantity_limits.multiple_of);

      dispatch(updateProductInCartAction({productKey: item.key, quantity}));
    }
  };

  // Handle quantity decrease
  const decreaseQuantity = (id: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item && item.quantity > item.quantity_limits.minimum) {
      const quantity = item.quantity - Number(item.quantity_limits.multiple_of);

      dispatch(updateProductInCartAction({productKey: item.key, quantity}));
    }
  };

  // Handle remove item
  const handleRemoveItem = () => {
    if (selectedItem) {
      dispatch(removeFromCartAction({productKey: selectedItem.key}));
    }
  };

  // Show remove confirmation modal
  const showRemoveConfirmation = (item: CartItem) => {
    setSelectedItem(item);
    setShowRemoveModal(true);
  };

  // useEffect(() => {
  //   dispatch(getCartListAction());
  // }, []);

  // Apply promo code
  const applyPromoCode = () => {
    // In a real app, you would validate the promo code here
    if (promoCode.trim() !== '') {
      // Apply a fixed discount for demo purposes
      // setDiscount(35);
      setPromoCode('');
    }
  };

  // Render cart item
  const renderCartItem = ({item}: {item: CartItem}) => {
    const decodedName = decode(item.name);

    return (
      <View style={styles.cartItemContainer}>
        <Image source={{uri: item.images[0].src}} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{decodedName}</Text>
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
          <Text style={styles.itemPrice}>
            ₹
            {(
              getFormattedPrice(
                item.prices.sale_price,
                item.prices.currency_minor_unit,
              ) * item.quantity
            ).toFixed(2)}
          </Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => decreaseQuantity(item.id)}>
              <Text style={[styles.quantityButtonText, {paddingBottom: 2}]}>
                -
              </Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity
              style={[styles.quantityButton, styles.increaseButton]}
              onPress={() => increaseQuantity(item.id)}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => showRemoveConfirmation(item)}>
          <Text style={styles.removeButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const processPayment = async () => {
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
        setPaymentLoading(true);
        const checkoutData = {
          // customer_id: user.id,
          billing_address: {
            ...selectedBillingAddress[0],
            country: 'IN',
            email: user.email ?? '',
            phone: user.billing.phone ?? '',
          },
          shipping_address: {
            ...selectedShippingAddress[0],
            country: 'IN',
          },
          customer_note: '',
          create_account: false,
          payment_method: selectedPaymentMethod,
          payment_data: [],
          extensions: {},
        };
        const checkoutResponse = await cartCheckout(checkoutData);

        if (
          selectedPaymentMethod === 'cod' &&
          checkoutResponse.payment_result.payment_status === 'success'
        ) {
          dispatch(clearCart());
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
                                    name: PAYMENT_SUCCESS_SCREEN,
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
        } else if (
          checkoutResponse.status &&
          checkoutResponse.payment_result.redirect_url
        ) {
          navigation.navigate(PAYMENT_WEBVIEW, {
            redirectUrl: checkoutResponse.payment_result.redirect_url,
          });
        }
      } catch (error) {
        setAlertMessage(error?.response?.data?.message ?? error.message);
        setAlertVisible(true);
      } finally {
        setPaymentLoading(false);
      }
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <CSafeAreaView removeBottomSafeArea>
        <View style={styles.container}>
          <Header title="My Cart" />
          <View style={styles.emptyCartContainer}>
            <Image
              source={require('assets/icons/Bags.svg')}
              style={styles.emptyCartImage}
            />
            <Text style={styles.emptyCartTitle}>Your Cart is Empty</Text>
            <Text style={styles.emptyCartText}>
              Looks like you haven't added anything to your cart yet
            </Text>
            <TouchableOpacity
              style={styles.shopNowButton}
              onPress={() => navigation.navigate(CATEGORY_SCREEN)}>
              <Text style={styles.shopNowButtonText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CSafeAreaView>
    );
  }

  return (
    <CSafeAreaView removeBottomSafeArea>
      <View style={styles.container}>
        <Header title="My Cart" />

        <View style={{paddingHorizontal: 16, flex: 1, paddingVertical: 8}}>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={item => item.id.toString()}
            style={styles.cartItemsList}
            showsVerticalScrollIndicator={false}
          />

          {/* Promo Code */}
          {/* <View style={styles.promoContainer}>
            <TextInput
              style={styles.promoInput}
              placeholder="Promo Code"
              placeholderTextColor="#999"
              value={promoCode}
              onChangeText={setPromoCode}
            />
            <TouchableOpacity
              style={styles.promoApplyButton}
              onPress={applyPromoCode}>
              <Text style={styles.promoApplyText}>Apply</Text>
            </TouchableOpacity>
          </View> */}

          {/* Price Summary */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Sub-Total</Text>
              <Text style={styles.summaryValue}>
                ₹{getFormattedPrice(total_items, currency_minor_unit)}
              </Text>
            </View>
            {Array.isArray(coupons) && coupons.length > 0 && (
              <View
                style={[
                  styles.summaryRow,
                  {
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: '#E0E0E0',
                    paddingVertical: 5,
                  },
                ]}>
                <Text
                  style={[
                    styles.summaryLabel,
                    {color: '#555555', fontWeight: '900'},
                  ]}>
                  Bulk Discount
                </Text>
                <Text style={styles.summaryValue}>
                  - ₹
                  {getFormattedPrice(
                    coupons[0].totals.total_discount,
                    coupons[0].totals.currency_minor_unit,
                  )}
                </Text>
              </View>
            )}
            <View style={styles.summaryRow}>
              <Text
                style={[
                  styles.summaryLabel,
                  {color: '#555555', fontWeight: '900'},
                ]}>
                Shipping
                <Text style={styles.subShippingText}>
                  ({shipping_rates?.[0]?.shipping_rates?.[0]?.name ?? ''})
                </Text>
              </Text>
              <Text style={styles.summaryValue}>
                ₹{getFormattedPrice(total_shipping, currency_minor_unit)}
              </Text>
            </View>

            {tax_lines?.length > 0 &&
              tax_lines.map((item, index) => {
                return (
                  <View key={index} style={styles.summaryRow}>
                    <Text
                      style={[
                        styles.summaryLabel,
                        {color: '#555555', fontWeight: '900'},
                      ]}>
                      {item.name && item.name?.trim()}
                    </Text>
                    <Text style={styles.summaryValue}>
                      ₹{getFormattedPrice(item.price, currency_minor_unit)}
                    </Text>
                  </View>
                );
              })}
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total Cost</Text>
              <Text style={styles.totalValue}>
                ₹{getFormattedPrice(total_price, currency_minor_unit)}
              </Text>
            </View>
          </View>

          {/* Checkout Button */}
          <TouchableOpacity
            disabled={paymentLoading}
            style={styles.checkoutButton}
            onPress={() => {
              if (selectedPaymentMethod) {
                processPayment();
              } else if (hasStarted) {
                dispatch(resetStartKey());
                dispatch(setShowWelcome(false));
              } else if (!selectedBillingAddress) {
                navigation.navigate(BILLING_ADDRESS_FORM);
              } else if (!selectedShippingAddress) {
                navigation.navigate(SHIPPING_ADDRESS_FORM);
              } else {
                navigation.navigate(CHECKOUT);
              }
            }}>
            <Text style={styles.checkoutButtonText}>
              {selectedPaymentMethod ? 'Place Order' : 'Proceed to Checkout'}
            </Text>
          </TouchableOpacity>

          {/* Remove Confirmation Modal */}
          <Modal
            visible={showRemoveModal}
            transparent={true}
            statusBarTranslucent
            animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Remove from Cart?</Text>
                {selectedItem && (
                  <View style={styles.modalItemContainer}>
                    <Image
                      source={{uri: selectedItem.images[0].src}}
                      style={styles.modalItemImage}
                    />
                    <View style={styles.modalItemDetails}>
                      <Text style={styles.modalItemName}>
                        {decode(selectedItem.name)}
                      </Text>
                      <Text style={styles.modalItemSize}>
                        Size : {selectedItem.size}
                      </Text>
                      <Text style={styles.modalItemPrice}>
                        ₹
                        {(
                          getFormattedPrice(
                            selectedItem.prices.sale_price,
                            selectedItem.prices.currency_minor_unit,
                          ) * selectedItem.quantity
                        ).toFixed(2)}
                      </Text>
                      <View style={styles.quantityControl}>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          disabled={true}>
                          <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>
                          {selectedItem.quantity}
                        </Text>
                        <TouchableOpacity
                          style={[styles.quantityButton, styles.increaseButton]}
                          disabled={true}>
                          <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
                <View style={styles.modalButtonsContainer}>
                  <TouchableOpacity
                    style={[
                      styles.modalCancelButton,
                      {opacity: loading ? 0.5 : 1},
                    ]}
                    disabled={loading}
                    onPress={() => setShowRemoveModal(false)}>
                    <Text style={styles.modalCancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.modalRemoveButton,
                      {opacity: loading ? 0.5 : 1},
                    ]}
                    disabled={loading}
                    onPress={handleRemoveItem}>
                    <Text style={styles.modalRemoveButtonText}>
                      Yes, Remove
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
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

export default MyCart;

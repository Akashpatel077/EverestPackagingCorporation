import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import styles from './styles';
import {
  BILLING_ADDRESS_FORM,
  CATEGORY_SCREEN,
  CHECKOUT,
  SHIPPING_ADDRESS_FORM,
} from 'src/Navigation/home/routes';
import {Header} from 'src/Components';
import {BackIcon} from 'assets/icons';
import {
  selectCartItems,
  selectCartTotal,
  updateQuantity,
  removeFromCart,
} from 'src/store/slices/cartSlice';
import {getAllTaxes} from 'src/services/wooCommerceApi';

interface CartItem {
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

const calculateTax = (
  cartItems: CartItem[],
  allTaxes,
  customerState: string,
  storeState = 'GJ',
) => {
  let totalTax = 0;
  const taxBreakdown = {};

  cartItems.forEach(product => {
    const {price, quantity, tax_status, tax_class} = product;

    if (tax_status !== 'taxable') return;

    const taxClass = tax_class || 'standard';
    const isSameState = customerState === storeState;

    const matchedTaxes = allTaxes.filter(
      tax =>
        tax.class === taxClass &&
        (isSameState ? tax.state === storeState : tax.state === ''),
    );

    matchedTaxes.forEach(tax => {
      const taxRate = parseFloat(tax.rate);
      const label = tax.name.trim(); // e.g., "9% CGST"
      const subtotal = price * quantity;
      const taxAmount = (subtotal * taxRate) / 100;

      totalTax += taxAmount;

      if (taxBreakdown[label]) {
        taxBreakdown[label] += taxAmount;
      } else {
        taxBreakdown[label] = taxAmount;
      }
    });
  });

  // Round each breakdown value
  Object.keys(taxBreakdown).forEach(label => {
    taxBreakdown[label] = parseFloat(taxBreakdown[label].toFixed(2));
  });

  return {
    totalTax: parseFloat(totalTax.toFixed(2)),
    breakdown: taxBreakdown,
  };
};

const MyCart = () => {
  const navigation = useNavigation();
  const addresses = useSelector((state: any) => state.address);
  const customerState = 'GJ';

  const selectedShippingAddress = addresses.shippingAddresses.find(
    (address: any) => address.id === addresses.selectedShippingAddressId,
  );
  const selectedBillingAddress = addresses.billingAddresses.find(
    (address: any) => address.id === addresses.selectedBillingAddressId,
  );
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  console.log('cartItems', cartItems);

  const [promoCode, setPromoCode] = useState('');
  // const [discount, setDiscount] = useState(35);
  const [shippingcharge, setShippingCharge] = useState(0);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);
  const [totalTax, setTotalTax] = useState(0);
  const [taxBreakdown, setTaxBreakdown] = useState({});

  const getAllTaxesAction = async () => {
    try {
      const allTaxes = await getAllTaxes();

      const {totalTax, breakdown} = calculateTax(
        cartItems,
        allTaxes,
        customerState,
      );
      setTaxBreakdown({...breakdown});
      setTotalTax(totalTax);
    } catch (e) {
      Alert.alert('Error : ', e.message);
    }
  };

  useEffect(() => {
    getAllTaxesAction();
  }, [cartItems]);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.sale_price * item.quantity,
    0,
  );

  // Calculate total
  const total = subtotal + shippingcharge + totalTax;

  // Handle quantity increase
  const increaseQuantity = (id: number) => {
    const item = cartItems.find(item => item.id === id);

    if (item && item.quantity < item.max_quantity) {
      const affectedQuantity = item.quantity + Number(item.product_step);

      dispatch(
        updateQuantity({
          id,
          quantity: affectedQuantity,
          totalPrice: affectedQuantity * item.sale_price,
        }),
      );
    }
  };

  // Handle quantity decrease
  const decreaseQuantity = (id: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item && item.quantity > item.min_quantity) {
      const affectedQuantity = item.quantity - Number(item.product_step);
      dispatch(
        updateQuantity({
          id,
          quantity: affectedQuantity,
          totalPrice: affectedQuantity * item.sale_price,
        }),
      );
    }
  };

  // Handle remove item
  const handleRemoveItem = () => {
    if (selectedItem) {
      dispatch(removeFromCart(selectedItem.id));
      setShowRemoveModal(false);
      setSelectedItem(null);
    }
  };

  // Show remove confirmation modal
  const showRemoveConfirmation = (item: CartItem) => {
    setSelectedItem(item);
    setShowRemoveModal(true);
  };

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
  const renderCartItem = ({item}: {item: CartItem}) => (
    <View style={styles.cartItemContainer}>
      <Image source={{uri: item.image}} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemSize}>Size : {item.size}</Text>
        <Text style={styles.itemPrice}>
          ₹{Number(item.totalPrice).toFixed(2)}
        </Text>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => decreaseQuantity(item.id)}>
            <Text style={styles.quantityButtonText}>-</Text>
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

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="My Cart" />
        <StatusBar barStyle="dark-content" />
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
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Cart" />

      <View style={{paddingHorizontal: 16, flex: 1, paddingVertical: 8}}>
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={item => item.id}
          style={styles.cartItemsList}
          showsVerticalScrollIndicator={false}
        />

        {/* Promo Code */}
        <View style={styles.promoContainer}>
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
        </View>

        {/* Price Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Sub-Total</Text>
            <Text style={styles.summaryValue}>₹{subtotal.toFixed(2)}</Text>
          </View>
          {/* <View style={styles.summaryRow}>
            <Text
              style={[
                styles.summaryLabel,
                {color: '#555555', fontWeight: '900'},
              ]}>
              Shipping
            </Text>
            <Text style={styles.summaryValue}>
              ₹{shippingcharge.toFixed(2)}
            </Text>
          </View> */}

          {Object.entries(taxBreakdown).map(([label, value], index) => (
            <View key={index} style={styles.summaryRow}>
              <Text
                style={[
                  styles.summaryLabel,
                  {color: '#555555', fontWeight: '900'},
                ]}>
                {label}
              </Text>
              <Text style={styles.summaryValue}>₹{value.toFixed(2)}</Text>
            </View>
          ))}
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Cost</Text>
            <Text style={styles.totalValue}>₹{total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Checkout Button */}
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => {
            if (!selectedBillingAddress) {
              navigation.navigate(BILLING_ADDRESS_FORM);
            } else if (!selectedShippingAddress) {
              navigation.navigate(SHIPPING_ADDRESS_FORM);
            } else {
              navigation.navigate(CHECKOUT);
            }
          }}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>

        {/* Remove Confirmation Modal */}
        <Modal
          visible={showRemoveModal}
          transparent={true}
          animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Remove from Cart?</Text>
              {selectedItem && (
                <View style={styles.modalItemContainer}>
                  <Image
                    source={{uri: selectedItem.image}}
                    style={styles.modalItemImage}
                  />
                  <View style={styles.modalItemDetails}>
                    <Text style={styles.modalItemName}>
                      {selectedItem.name}
                    </Text>
                    <Text style={styles.modalItemSize}>
                      Size : {selectedItem.size}
                    </Text>
                    <Text style={styles.modalItemPrice}>
                      ₹
                      {typeof selectedItem.price === 'string'
                        ? Number(selectedItem.price).toFixed(2)
                        : selectedItem.price.toFixed(2)}
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
                  style={styles.modalCancelButton}
                  onPress={() => setShowRemoveModal(false)}>
                  <Text style={styles.modalCancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalRemoveButton}
                  onPress={handleRemoveItem}>
                  <Text style={styles.modalRemoveButtonText}>Yes, Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default MyCart;

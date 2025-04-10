import React, {useState} from 'react';
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
}

const MyCart = () => {
  const navigation = useNavigation();
  const addresses = useSelector((state: any) => state.address);

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
  const [deliveryFee, setDeliveryFee] = useState(25);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Calculate total
  const total = subtotal + deliveryFee;

  // Handle quantity increase
  const increaseQuantity = (id: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      dispatch(updateQuantity({id, quantity: item.quantity + 1}));
    }
  };

  // Handle quantity decrease
  const decreaseQuantity = (id: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item && item.quantity > 1) {
      dispatch(updateQuantity({id, quantity: item.quantity - 1}));
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
        <Text style={styles.itemPrice}>₹{Number(item.price).toFixed(2)}</Text>
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
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>₹{deliveryFee.toFixed(2)}</Text>
          </View>
          {/* <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Discount</Text>
          <Text style={styles.summaryValue}>-${discount.toFixed(2)}</Text>
        </View> */}
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

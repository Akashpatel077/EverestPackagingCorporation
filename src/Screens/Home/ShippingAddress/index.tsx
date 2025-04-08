import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Header, Icon} from 'src/Components';
import {Home, Heart, BackIcon} from 'assets/icons';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {CHECKOUT, SHIPPING_ADDRESS_FORM} from 'src/Navigation/home/routes';
import {useSelector, useDispatch} from 'react-redux';
import {setSelectedShippingAddress} from 'src/store/slices/addressSlice';
import {RootState} from 'src/store';

const ShippingAddressScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {shippingAddresses, selectedShippingAddressId} = useSelector(
    (state: RootState) => state.address
  );

  console.log('shippingAddresses', shippingAddresses);
  
  
  const selectedAddressData = shippingAddresses.find(
    addr => addr.id === selectedShippingAddressId
  );

  return (
    <View style={styles.container}>
      <Header title="Shipping Address" icon1={BackIcon} />

      {shippingAddresses.length > 0 ? (
        shippingAddresses.map(address => (
          <TouchableOpacity
            key={address.id}
            style={styles.addressContainer}
            onPress={() => dispatch(setSelectedShippingAddress(address.id))}>
            <View style={styles.addressLeft}>
              <Icon name={Home} width={24} height={24} />
              <View style={styles.addressDetails}>
                <Text style={styles.addressType}>{address.type}</Text>
                <Text style={styles.addressText}>{address.street}</Text>
              </View>
            </View>
            <View
              style={[
                styles.radioButton,
                selectedShippingAddressId === address.id && styles.radioButtonSelected,
              ]}
            />
          </TouchableOpacity>
        ))
      ) : null}

      <TouchableOpacity 
        style={[styles.addButton, !shippingAddresses.length && {marginTop: 20}]} 
        onPress={() => {navigation.navigate(SHIPPING_ADDRESS_FORM)}}>
        <Text style={styles.addButtonText}>Add New Shipping Address</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.applyButton}
        onPress={() => {
          navigation.navigate(CHECKOUT, {
            selectedAddress: selectedAddressData,
          });
        }}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShippingAddressScreen;

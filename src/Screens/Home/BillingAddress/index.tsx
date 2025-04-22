import React from 'react';
import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Header, Icon} from 'src/Components';
import {BackIcon, Home, Close} from 'assets/icons';
import {styles} from './styles';
import {BILLING_ADDRESS_FORM} from 'src/Navigation/home/routes';
import {
  setSelectedBillingAddress,
  removeBillingAddress,
} from 'src/store/slices/addressSlice';
import {RootState} from 'src/store';
import type {Address} from 'src/store/slices/addressSlice';

const BillingAddress = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {billingAddresses, selectedBillingAddressId} = useSelector(
    (state: RootState) => state.address,
  );

  const selectedAddressData = billingAddresses.find(
    (addr: Address) => addr.id === selectedBillingAddressId,
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No billing addresses found</Text>
      <Text style={styles.emptySubText}>
        Add a new billing address to continue
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Billing Address"
        icon1={BackIcon}
        onPressFirst={() => {
          if (billingAddresses.length === 0) {
            Alert.alert('No Address', 'Please add a billing address first');
            return;
          }
          if (!selectedBillingAddressId) {
            Alert.alert('No Selection', 'Please select a billing address');
            return;
          }
          navigation.goBack();
        }}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{padding: 16, flex: 1}}
        showsVerticalScrollIndicator={false}>
        {billingAddresses.length > 0
          ? billingAddresses.map((address: Address) => (
              <TouchableOpacity
                key={address.id}
                style={styles.addressContainer}
                onPress={() => dispatch(setSelectedBillingAddress(address.id))}>
                <View style={styles.addressLeft}>
                  <Icon name={Home} width={24} height={24} />
                  <View style={styles.addressDetails}>
                    <Text style={styles.addressType}>{address.name}</Text>
                    <Text
                      style={
                        styles.addressText
                      }>{`${address.street}, ${address.city}, ${address.state} ${address.postcode}`}</Text>
                  </View>
                </View>
                <View style={styles.addressRight}>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => {
                      Alert.alert(
                        'Delete Address',
                        'Are you sure you want to delete this address?',
                        [
                          {text: 'Cancel', style: 'cancel'},
                          {
                            text: 'Delete',
                            style: 'destructive',
                            onPress: () =>
                              dispatch(removeBillingAddress(address.id)),
                          },
                        ],
                      );
                    }}>
                    <Icon name={Close} width={20} height={20} />
                  </TouchableOpacity>
                  <View
                    style={[
                      styles.radioButton,
                      selectedBillingAddressId === address.id &&
                        styles.radioButtonSelected,
                    ]}
                  />
                </View>
              </TouchableOpacity>
            ))
          : renderEmptyState()}

        <TouchableOpacity
          style={[
            styles.addButton,
            !billingAddresses.length && {marginTop: 20},
          ]}
          onPress={() => {
            navigation.navigate(BILLING_ADDRESS_FORM);
          }}>
          <Text style={styles.addButtonText}>Add New Billing Address</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.applyButton,
            !selectedAddressData && styles.disabledButton,
          ]}
          disabled={!selectedAddressData}
          onPress={() => {
            if (billingAddresses.length === 0) {
              Alert.alert('No Address', 'Please add a billing address first');
              return;
            }
            if (!selectedAddressData) {
              Alert.alert('No Selection', 'Please select a billing address');
              return;
            }
            navigation.goBack();
          }}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default BillingAddress;

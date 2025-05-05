import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Header, Icon, CustomAlert, CButton} from 'src/Components';
import {BackIcon, Home, Close} from 'assets/icons';
import {styles} from './styles';
import {BILLING_ADDRESS_FORM} from 'src/Navigation/home/routes';
import {
  setSelectedBillingAddress,
  removeBillingAddress,
} from 'src/store/slices/addressSlice';
import {RootState} from 'src/store';
import type {Address} from 'src/store/slices/addressSlice';
import CSafeAreaView from 'src/Components/CSafeAreaView';

const BillingAddress = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {billingAddresses, selectedBillingAddressId} = useSelector(
    (state: RootState) => state.address,
  );
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    buttons: [],
  });

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
    <CSafeAreaView removeBottomSafeArea>
      <View style={styles.container}>
        <Header
          title="Billing Address"
          icon1={BackIcon}
          onPressFirst={() => {
            if (billingAddresses.length === 0) {
              setAlertConfig({
                title: 'No Address',
                message: 'Please add a billing address first',
                buttons: [{text: 'OK', onPress: () => setShowAlert(false)}],
              });
              setShowAlert(true);
              return;
            }
            if (!selectedBillingAddressId) {
              setAlertConfig({
                title: 'No Selection',
                message: 'Please select a billing address',
                buttons: [{text: 'OK', onPress: () => setShowAlert(false)}],
              });
              setShowAlert(true);
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
                  onPress={() =>
                    dispatch(setSelectedBillingAddress(address.id))
                  }>
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
                    {billingAddresses.length > 1 && (
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => {
                          setAlertConfig({
                            title: 'Delete Address',
                            message:
                              'Are you sure you want to delete this address?',
                            buttons: [
                              {
                                text: 'Cancel',
                                onPress: () => setShowAlert(false),
                              },
                              {
                                text: 'Delete',
                                type: 'destructive',
                                onPress: () => {
                                  dispatch(removeBillingAddress(address.id));
                                  setShowAlert(false);
                                },
                              },
                            ],
                          });
                          setShowAlert(true);
                        }}>
                        <Icon name={Close} width={20} height={20} />
                      </TouchableOpacity>
                    )}
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

          <CButton
            textStyle={styles.addButtonText}
            style={[
              styles.addButton,
              !billingAddresses.length && {marginTop: 20},
            ]}
            onPress={() => {
              navigation.navigate(BILLING_ADDRESS_FORM, {hideCheckbox: true});
            }}
            title={'Add New Billing Address'}
          />
          <CButton
            style={styles.applyButton}
            disabled={!selectedAddressData}
            onPress={() => {
              if (billingAddresses.length === 0) {
                setAlertConfig({
                  title: 'No Address',
                  message: 'Please add a billing address first',
                  buttons: [{text: 'OK', onPress: () => setShowAlert(false)}],
                });
                setShowAlert(true);
                return;
              }
              if (!selectedAddressData) {
                setAlertConfig({
                  title: 'No Selection',
                  message: 'Please select a billing address',
                  buttons: [{text: 'OK', onPress: () => setShowAlert(false)}],
                });
                setShowAlert(true);
                return;
              }
              navigation.goBack();
            }}
            title={'Apply'}
          />
        </ScrollView>
      </View>
      <CustomAlert
        visible={showAlert}
        title={alertConfig.title}
        message={alertConfig.message}
        buttons={alertConfig.buttons}
      />
    </CSafeAreaView>
  );
};

export default BillingAddress;

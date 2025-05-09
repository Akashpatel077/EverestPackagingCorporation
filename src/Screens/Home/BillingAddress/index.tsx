import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Header, Icon, CustomAlert, CButton} from 'src/Components';
import {BackIcon, Home, Close} from 'assets/icons';
import {styles} from './styles';
import {BILLING_ADDRESS_FORM, CHECKOUT} from 'src/Navigation/home/routes';
import {
  setSelectedBillingAddress,
  removeBillingAddress,
} from 'src/store/slices/addressSlice';
import {RootState} from 'src/store';
import type {Address} from 'src/store/slices/addressSlice';
import CSafeAreaView from 'src/Components/CSafeAreaView';
import {colors, metrics, scale} from 'src/theme';

const BillingAddress = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {billingAddresses, selectedBillingAddressId} = useSelector(
    (state: RootState) => state.address,
  );
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{
    title: string;
    description: string;
    onConfirm: () => void;
  }>({
    title: '',
    description: '',
    onConfirm: () => {},
  });

  const selectedAddressData = billingAddresses.find(
    (addr: Address) => addr.id === selectedBillingAddressId,
  );

  return (
    <CSafeAreaView removeBottomSafeArea>
      <View style={styles.container}>
        <Header title="Billing Address" icon1={BackIcon} />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            padding: metrics.padding.md,
            // flex: 1,
            paddingBottom: scale(125),
          }}
          showsVerticalScrollIndicator={false}>
          {billingAddresses.length > 0 &&
            billingAddresses.map((address: Address) => (
              <TouchableOpacity
                key={address.id}
                style={styles.addressContainer}
                onPress={() => dispatch(setSelectedBillingAddress(address.id))}>
                <View style={styles.addressLeft}>
                  <Icon
                    name={Home}
                    width={metrics.iconSize.md}
                    height={metrics.iconSize.md}
                  />
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
                          description:
                            'Are you sure you want to delete this address?',
                          onConfirm: () =>
                            dispatch(removeBillingAddress(address.id)),
                        });
                        setAlertVisible(true);
                      }}>
                      <Icon
                        name={Close}
                        width={metrics.iconSize.sm}
                        height={metrics.iconSize.sm}
                      />
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
            ))}
        </ScrollView>
        <CButton
          textStyle={styles.addButtonText}
          style={[
            styles.addButton,
            !billingAddresses.length && {marginTop: scale(20)},
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
            navigation.navigate(CHECKOUT, {
              selectedAddress: selectedAddressData,
            });
          }}
          title={'Apply'}
        />
      </View>
      <CustomAlert
        visible={alertVisible}
        title={alertConfig.title}
        description={alertConfig.description}
        button1={{
          color: colors.gainsBoro,
          text: 'Cancel',
          onPress: () => setAlertVisible(false),
        }}
        button2={{
          text: 'Delete',
          color: colors.red,
          onPress: () => {
            alertConfig.onConfirm();
            setAlertVisible(false);
          },
        }}
      />
    </CSafeAreaView>
  );
};

export default BillingAddress;

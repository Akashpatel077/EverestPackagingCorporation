import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {CButton, CustomAlert, Header, Icon} from 'src/Components';
import {Home, BackIcon, Close} from 'assets/icons';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {CHECKOUT, SHIPPING_ADDRESS_FORM} from 'src/Navigation/home/routes';
import {useSelector, useDispatch} from 'react-redux';
import {
  setSelectedShippingAddress,
  removeShippingAddress,
} from 'src/store/slices/addressSlice';
import {RootState} from 'src/store';
import CSafeAreaView from 'src/Components/CSafeAreaView';
import {colors, metrics, scale} from 'src/theme';

const ShippingAddressScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {shippingAddresses, selectedShippingAddressId} = useSelector(
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
  const selectedAddressData = shippingAddresses.find(
    addr => addr.id === selectedShippingAddressId,
  );

  return (
    <CSafeAreaView removeBottomSafeArea>
      <View style={styles.container}>
        <Header title="Shipping Address" icon1={BackIcon} />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: metrics.padding.md,
            paddingBottom: scale(125),
            // flex: 1,
          }}
          showsVerticalScrollIndicator={false}>
          {shippingAddresses.length > 0
            ? shippingAddresses.map(address => (
                <TouchableOpacity
                  key={address.id}
                  style={styles.addressContainer}
                  onPress={() =>
                    dispatch(setSelectedShippingAddress(address.id))
                  }>
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
                    {shippingAddresses.length > 1 && (
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => {
                          setAlertConfig({
                            title: 'Delete Address',
                            description:
                              'Are you sure you want to delete this address?',
                            onConfirm: () =>
                              dispatch(removeShippingAddress(address.id)),
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
                        selectedShippingAddressId === address.id &&
                          styles.radioButtonSelected,
                      ]}
                    />
                  </View>
                </TouchableOpacity>
              ))
            : null}
        </ScrollView>
        <CButton
          textStyle={styles.addButtonText}
          style={[
            styles.addButton,
            !shippingAddresses.length && {marginTop: metrics.margin.md},
          ]}
          onPress={() => {
            navigation.navigate(SHIPPING_ADDRESS_FORM);
          }}
          title={'Add New Shipping Address'}
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

export default ShippingAddressScreen;

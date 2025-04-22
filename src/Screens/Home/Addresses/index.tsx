import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Header, Icon} from 'src/Components';
import {BackIcon, Home, Location} from 'assets/icons';
import {styles} from './styles';
import {
  BILLING_ADDRESS_FORM,
  SHIPPING_ADDRESS_FORM,
} from 'src/Navigation/home/routes';
import {RootState} from 'src/store';

const Addresses = () => {
  const navigation = useNavigation();
  const {billingAddresses, shippingAddresses} = useSelector(
    (state: RootState) => state.address,
  );

  const renderAddressSection = (
    title: string,
    addresses: any[],
    formRoute: string,
  ) => (
    <View style={styles.addressSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {addresses.length > 0 ? (
        addresses.map((address, index) => (
          <View key={index} style={styles.addressContainer}>
            <View style={styles.addressInfo}>
              <Icon
                name={Location}
                width={20}
                height={20}
                style={styles.locationIcon}
              />
              <View style={styles.addressDetails}>
                <Text style={styles.addressType}>{address.name}</Text>
                <Text style={styles.addressText}>
                  {`${address.street}, ${address.city}, ${address.state} ${address.postcode}`}
                </Text>
              </View>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.emptyStateText}>
          You have not set up this type of address yet.
        </Text>
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate(formRoute)}>
        <Text style={styles.addButtonText}>{`Add ${title}`}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        title="Addresses"
        icon1={BackIcon}
        onPressFirst={() => navigation.goBack()}
      />
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        {renderAddressSection(
          'Billing Address',
          billingAddresses,
          BILLING_ADDRESS_FORM,
        )}
        {renderAddressSection(
          'Shipping Address',
          shippingAddresses,
          SHIPPING_ADDRESS_FORM,
        )}
      </ScrollView>
    </View>
  );
};

export default Addresses;

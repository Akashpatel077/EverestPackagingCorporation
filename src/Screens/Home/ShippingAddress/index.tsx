import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Header, Icon} from 'src/Components';
import {Home, Heart, BackIcon} from 'assets/icons';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {CHECKOUT} from 'src/Navigation/home/routes';

const ShippingAddressScreen = () => {
  const navigation = useNavigation();
  const addresses = [
    {
      id: 1,
      type: 'Home',
      address: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
    },
    {
      id: 2,
      type: 'Office',
      address: '4517 Washington Ave. Manchester, Kentucky 39495',
    },
    {
      id: 3,
      type: "Parent's House",
      address: '8502 Preston Rd. Inglewood, Maine 98380',
    },
    {
      id: 4,
      type: "Friend's House",
      address: '2464 Royal Ln. Mesa, New Jersey 45463',
    },
  ];
  const [selectedAddress, setSelectedAddress] = useState(1);
  const selectedAddressData = addresses.find(
    addr => addr.id === selectedAddress,
  );

  return (
    <View style={styles.container}>
      <Header title="Shipping Address" icon1={BackIcon} />

      {addresses.map(address => (
        <TouchableOpacity
          key={address.id}
          style={styles.addressContainer}
          onPress={() => setSelectedAddress(address.id)}>
          <View style={styles.addressLeft}>
            <Icon name={Home} width={24} height={24} />
            <View style={styles.addressDetails}>
              <Text style={styles.addressType}>{address.type}</Text>
              <Text style={styles.addressText}>{address.address}</Text>
            </View>
          </View>
          <View
            style={[
              styles.radioButton,
              selectedAddress === address.id && styles.radioButtonSelected,
            ]}
          />
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.addButton}>
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

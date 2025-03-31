import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'src/Components';
import {Heart, Economy, Regular, Cargo, FriendsHouse} from 'assets/icons';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {CHECKOUT} from 'src/Navigation/home/routes';

const ShippingTypeScreen = () => {
  const navigation = useNavigation();
  const shippingTypes = [
    {
      id: 1,
      type: 'Economy',
      icon: Economy,
      estimatedArrival: '25 August 2023',
    },
    {
      id: 2,
      type: 'Regular',
      icon: Regular,
      estimatedArrival: '24 August 2023',
    },
    {
      id: 3,
      type: 'Cargo',
      icon: Cargo,
      estimatedArrival: '22 August 2023',
    },
  ];
  const [selectedType, setSelectedType] = useState(1);
  const selectedTypeData = shippingTypes.find(type => type.id === selectedType);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name={Heart} width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose Shipping</Text>
      </View>

      {shippingTypes.map(type => (
        <TouchableOpacity
          key={type.id}
          style={styles.shippingContainer}
          onPress={() => setSelectedType(type.id)}>
          <View style={styles.shippingLeft}>
            <Icon name={type.icon} width={24} height={24} />
            <View style={styles.shippingDetails}>
              <Text style={styles.shippingType}>{type.type}</Text>
              <Text style={styles.shippingInfo}>
                {type.estimatedArrival
                  ? `Estimated Arrival ${type.estimatedArrival}`
                  : type.address}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.radioButton,
              selectedType === type.id && styles.radioButtonSelected,
            ]}
          />
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.applyButton}
        onPress={() => {
          navigation.navigate(CHECKOUT, {
            selectedShipping: selectedTypeData,
          });
        }}>
        <Text style={styles.applyButtonText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShippingTypeScreen;

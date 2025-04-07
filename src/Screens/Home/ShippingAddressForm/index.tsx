import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addShippingAddress} from 'src/store/slices/addressSlice';
import styles from './styles';
import { Header } from 'src/Components';
import { BackIcon } from 'assets/icons';

const ShippingAddressForm: React.FC = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    companyName: '',
    streetAddress: '',
    apartment: '',
    townCity: '',
    stateCounty: '',
    postcode: '',
    countryRegion: 'India',
    addressType: 'Home',
  })

  const handleChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }
  const dispatch = useDispatch();

  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'streetAddress', 'townCity', 'stateCounty', 'postcode'];
    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
      Alert.alert('Error', 'Please fill in all required fields');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const addressData = {
      id: Date.now().toString(),
      name: `${formData.firstName} ${formData.lastName}`,
      street: formData.streetAddress + (formData.apartment ? `, ${formData.apartment}` : ''),
      city: formData.townCity,
      state: formData.stateCounty,
      zipCode: formData.postcode,
      country: formData.countryRegion,
      type: formData.addressType,
      phone: '',
    };

    dispatch(addShippingAddress(addressData));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header title="Shipping Address" icon1={BackIcon} />
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>

      <View style={styles.row}>
        <View style={styles.halfField}>
          <Text style={styles.label}>First name <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            value={formData.firstName}
            onChangeText={value => handleChange('firstName', value)}
            placeholder="First name"
          />
        </View>
        <View style={styles.halfField}>
          <Text style={styles.label}>Last name <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            value={formData.lastName}
            onChangeText={value => handleChange('lastName', value)}
            placeholder="Last name"
          />
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Company name (optional)</Text>
        <TextInput
          style={styles.input}
          value={formData.companyName}
          onChangeText={value => handleChange('companyName', value)}
          placeholder="Company name"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Country / Region <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          value={formData.countryRegion}
          onChangeText={value => handleChange('countryRegion', value)}
          placeholder="Country / Region"
          readOnly={true}
          editable={false}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Street address <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          value={formData.streetAddress}
          onChangeText={value => handleChange('streetAddress', value)}
          placeholder="House number and street name"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Apartment, suite, unit, etc. (optional)</Text>
        <TextInput
          style={styles.input}
          value={formData.apartment}
          onChangeText={value => handleChange('apartment', value)}
          placeholder="Apartment, suite, unit, etc."
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Town / City <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          value={formData.townCity}
          onChangeText={value => handleChange('townCity', value)}
          placeholder="Town / City"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>State / County <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          value={formData.stateCounty}
          onChangeText={value => handleChange('stateCounty', value)}
          placeholder="State / County"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Postcode / ZIP <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          value={formData.postcode}
          onChangeText={value => handleChange('postcode', value)}
          placeholder="Postcode / ZIP"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Address Type <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          value={formData.addressType}
          onChangeText={value => handleChange('addressType', value)}
          placeholder="Select address type"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>SAVE ADDRESS</Text>
      </TouchableOpacity>
      </ScrollView>
      
    </View>
  )
}


export default ShippingAddressForm;
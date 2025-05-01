import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  addShippingAddress,
  setSelectedShippingAddress,
} from 'src/store/slices/addressSlice';
import styles from './styles';
import {CDropdown, Header} from 'src/Components';
import {BackIcon} from 'assets/icons';
import {CHECKOUT} from 'src/Navigation/home/routes';
import {getStates} from 'src/services/wooCommerceApi';
import CSafeAreaView from 'src/Components/CSafeAreaView';

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
  });
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState<{
    label: string;
    value: string;
  }>();

  const handleChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  const dispatch = useDispatch();

  const validateForm = () => {
    const requiredFields = [
      'firstName',
      'lastName',
      'streetAddress',
      'townCity',
      'stateCounty',
      'postcode',
    ];
    const emptyFields = requiredFields.filter(field => !formData[field]);

    if (emptyFields.length > 0) {
      Alert.alert('Error', 'Please fill in all required fields');
      return false;
    }
    return true;
  };

  useEffect(() => {
    const fetchStates = async () => {
      const statesResponse = await getStates();
      if (statesResponse && statesResponse.states) {
        const updatedStates = statesResponse.states.map(
          ({code, name}: {code: string; name: string}) => ({
            value: code,
            label: name,
          }),
        );
        setStates(updatedStates);
      }
    };
    fetchStates();
  }, []);

  const handleSubmit = () => {
    if (!validateForm()) return;

    const addressData = {
      id: Date.now().toString(),
      first_name: formData.firstName,
      last_name: formData.lastName,
      company: formData.companyName,
      name: `${formData.firstName} ${formData.lastName}`,
      street:
        formData.streetAddress +
        (formData.apartment ? `, ${formData.apartment}` : ''),
      address_1:
        formData.streetAddress +
        (formData.apartment ? `, ${formData.apartment}` : ''),
      city: formData.townCity,
      state: formData.stateCounty,
      postcode: formData.postcode,
      country: formData.countryRegion,
      type: formData.addressType,
    };

    dispatch(addShippingAddress(addressData));
    dispatch(setSelectedShippingAddress(addressData.id));

    navigation.navigate(CHECKOUT);
  };

  return (
    <CSafeAreaView removeBottomSafeArea>
      <View style={styles.container}>
        <Header title="Shipping Address" icon1={BackIcon} />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{padding: 16, paddingBottom: 30}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.row}>
            <View style={styles.halfField}>
              <Text style={styles.label}>
                First name <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                value={formData.firstName}
                onChangeText={value => handleChange('firstName', value)}
                placeholder="First name"
              />
            </View>
            <View style={styles.halfField}>
              <Text style={styles.label}>
                Last name <Text style={styles.required}>*</Text>
              </Text>
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
            <Text style={styles.label}>
              Country / Region <Text style={styles.required}>*</Text>
            </Text>
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
            <Text style={styles.label}>
              Street address <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={formData.streetAddress}
              onChangeText={value => handleChange('streetAddress', value)}
              placeholder="House number and street name"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>
              Apartment, suite, unit, etc. (optional)
            </Text>
            <TextInput
              style={styles.input}
              value={formData.apartment}
              onChangeText={value => handleChange('apartment', value)}
              placeholder="Apartment, suite, unit, etc."
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>
              Town / City <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={formData.townCity}
              onChangeText={value => handleChange('townCity', value)}
              placeholder="Town / City"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>
              State / County <Text style={styles.required}>*</Text>
            </Text>
            <CDropdown
              data={states}
              dropDownStyle={{height: 50}}
              title="State / County"
              selectedItem={selectedState}
              onSelect={(itemObject: any) => {
                setSelectedState(itemObject);
                setFormData(prevData => ({
                  ...prevData,
                  stateCounty: itemObject.value,
                }));
              }}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>
              Postcode / ZIP <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={formData.postcode}
              onChangeText={value => handleChange('postcode', value)}
              placeholder="Postcode / ZIP"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>
              Address Type <Text style={styles.required}>*</Text>
            </Text>
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
    </CSafeAreaView>
  );
};

export default ShippingAddressForm;

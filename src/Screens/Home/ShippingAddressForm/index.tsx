import {colors, metrics, verticalScale} from 'src/theme';
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  addShippingAddress,
  setSelectedShippingAddress,
} from 'src/store/slices/addressSlice';
import styles from './styles';
import {
  CButton,
  CDropdown,
  CustomAlert,
  CustomTextInput,
  Header,
} from 'src/Components';
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
  const [showAlert, setShowAlert] = useState(false);

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
      setShowAlert(true);
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
          contentContainerStyle={{
            padding: metrics.padding.md,
            paddingBottom: metrics.padding.xl,
          }}
          showsVerticalScrollIndicator={false}>
          <View style={styles.row}>
            <CustomTextInput
              containerStyle={styles.halfField}
              title="First name"
              required
              value={formData.firstName}
              onChangeText={value => handleChange('firstName', value)}
              placeholder="First name"
            />
            <CustomTextInput
              containerStyle={styles.halfField}
              title="Last name"
              required
              value={formData.lastName}
              onChangeText={value => handleChange('lastName', value)}
              placeholder="Last name"
            />
          </View>

          <CustomTextInput
            title="Company name (optional)"
            value={formData.companyName}
            onChangeText={value => handleChange('companyName', value)}
            placeholder="Company name"
          />

          <CustomTextInput
            title="Country / Region"
            required
            value={formData.countryRegion}
            onChangeText={value => handleChange('countryRegion', value)}
            placeholder="Country / Region"
            editable={false}
          />

          <CustomTextInput
            title="Street address"
            required
            value={formData.streetAddress}
            onChangeText={value => handleChange('streetAddress', value)}
            placeholder="House number and street name"
          />

          <CustomTextInput
            title="Apartment, suite, unit, etc. (optional)"
            value={formData.apartment}
            onChangeText={value => handleChange('apartment', value)}
            placeholder="Apartment, suite, unit, etc."
          />

          <CustomTextInput
            required
            title="Town / City"
            value={formData.townCity}
            onChangeText={value => handleChange('townCity', value)}
            placeholder="Town / City"
          />

          <View style={styles.field}>
            <Text style={styles.label}>
              State / County <Text style={styles.required}>*</Text>
            </Text>
            <CDropdown
              data={states}
              dropDownStyle={{height: verticalScale(35)}}
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

          <CustomTextInput
            title="Postcode / ZIP"
            required
            value={formData.postcode}
            keyboardType="numeric"
            onChangeText={value => handleChange('postcode', value)}
            placeholder="Postcode / ZIP"
          />

          <CustomTextInput
            title="Address Type"
            required
            value={formData.addressType}
            onChangeText={value => handleChange('addressType', value)}
            placeholder="Select address type"
          />

          <CButton onPress={handleSubmit} title={'SAVE ADDRESS'} />
        </ScrollView>
      </View>
      <CustomAlert
        visible={showAlert}
        title="Error"
        description="Please fill in all required fields"
        button2={{
          text: 'OK',
          onPress: () => setShowAlert(false),
          color: colors.primary,
        }}
      />
    </CSafeAreaView>
  );
};

export default ShippingAddressForm;

import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  addBillingAddress,
  addShippingAddress,
  setSelectedBillingAddress,
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
import {CHECKOUT, SHIPPING_ADDRESS_FORM} from 'src/Navigation/home/routes';
import {Icon} from '../../../Components';
import {CheckSquare, UncheckSquareNew} from '../../../../assets/icons';
import {getStates} from 'src/services/wooCommerceApi';
import CSafeAreaView from 'src/Components/CSafeAreaView';
import {colors, metrics} from 'src/theme';

const BillingAddressForm: React.FC = ({route}) => {
  const navigation = useNavigation();
  const {hideCheckbox, fromAddresses} = route.params || {};
  console.log('route', route);

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
  const [isShippingAddressSame, SetIsShippingAddressSame] = useState(false);
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

    if (!isShippingAddressSame) {
      dispatch(addBillingAddress(addressData));
      dispatch(addShippingAddress(addressData));
      dispatch(setSelectedBillingAddress(addressData.id));
      dispatch(setSelectedShippingAddress(addressData.id));
      fromAddresses ? navigation.goBack() : navigation.navigate(CHECKOUT);
      // navigation.navigate(CHECKOUT);
    } else {
      dispatch(addBillingAddress(addressData));
      dispatch(setSelectedBillingAddress(addressData.id));
      navigation.navigate(SHIPPING_ADDRESS_FORM);
    }
  };

  return (
    <CSafeAreaView removeBottomSafeArea>
      <View style={styles.container}>
        <Header title="Billing Address" icon1={BackIcon} />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: metrics.padding.md,
            paddingBottom: metrics.padding.lg,
          }}>
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

          {/* {!hideCheckbox && ( */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.makeThisAsShippingAddress}
            onPress={() => SetIsShippingAddressSame(prevValue => !prevValue)}>
            {isShippingAddressSame ? (
              <Icon
                name={CheckSquare}
                height={metrics.iconSize.md}
                width={metrics.iconSize.md}
              />
            ) : (
              <Icon
                name={UncheckSquareNew}
                height={metrics.iconSize.md}
                width={metrics.iconSize.md}
              />
            )}
            <Text style={styles.shippingCheckBoxText}>
              Ship to a different address?
            </Text>
          </TouchableOpacity>
          {/* )} */}

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

export default BillingAddressForm;

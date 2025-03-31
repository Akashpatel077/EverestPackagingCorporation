import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {Header, Icon} from 'src/Components';
import {BackIcon, Heart} from 'assets/icons';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';

const AddCardScreen = () => {
  const navigation = useNavigation();
  const [cardNumber, setCardNumber] = useState('4716 9627 1635 8047');
  const [cardHolder, setCardHolder] = useState('Esther Howard');
  const [expiryDate, setExpiryDate] = useState('02/30');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(true);

  return (
    <View style={styles.container}>

      <Header title='Add Card' icon1={BackIcon}/>

      <View style={styles.cardPreview}>
        <Text style={styles.cardNumber}>{cardNumber}</Text>
        <View style={styles.cardDetails}>
          <View>
            <Text style={styles.cardLabel}>Card holder name</Text>
            <Text style={styles.cardValue}>{cardHolder}</Text>
          </View>
          <View>
            <Text style={styles.cardLabel}>Expiry date</Text>
            <Text style={styles.cardValue}>{expiryDate}</Text>
          </View>
        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Card Holder Name</Text>
          <TextInput
            style={styles.input}
            value={cardHolder}
            onChangeText={setCardHolder}
            placeholder="Enter card holder name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Card Number</Text>
          <TextInput
            style={styles.input}
            value={cardNumber}
            onChangeText={setCardNumber}
            placeholder="Enter card number"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Expiry Date</Text>
            <TextInput
              style={styles.input}
              value={expiryDate}
              onChangeText={setExpiryDate}
              placeholder="MM/YY"
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.input}
              value={cvv}
              onChangeText={setCvv}
              placeholder="000"
              keyboardType="numeric"
              secureTextEntry
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.saveCardContainer}
          onPress={() => setSaveCard(!saveCard)}>
          <View style={[styles.checkbox, saveCard && styles.checkboxChecked]} />
          <Text style={styles.saveCardText}>Save Card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('PaymentSuccessScreen')}>
          <Text style={styles.addButtonText}>Add Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddCardScreen;

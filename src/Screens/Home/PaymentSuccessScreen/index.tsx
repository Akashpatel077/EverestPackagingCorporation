import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Header, Icon} from 'src/Components';
import {BackIcon, Heart} from 'assets/icons';
import {styles} from './styles';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {ORDER_SCREEN} from 'src/Navigation/home/routes';

const PaymentSuccessScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header title="Payment" icon1={BackIcon} />

      <View style={styles.content}>
        <View style={styles.successIcon}>
          <Icon name={Heart} width={32} height={32} color="#FFFFFF" />
        </View>
        <Text style={styles.successTitle}>Payment Successful!</Text>
        <Text style={styles.successMessage}>Thank you for your purchase.</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: 'HomeDrawer',
                    state: {
                      index: 0,
                      routes: [
                        {
                          name: 'Home',
                          state: {
                            index: 0,
                            routes: [
                              {
                                name: 'Profile',
                                state: {
                                  index: 0,
                                  routes: [
                                    {
                                      name: ORDER_SCREEN,
                                    },
                                  ],
                                },
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                ],
              }),
            );
          }}>
          <Text style={styles.buttonText}>View Order</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate('Receipt')}>
          <Text style={styles.linkButtonText}>View E-Receipt</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default PaymentSuccessScreen;

import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {CButton, Header, Icon} from 'src/Components';
import {BackIcon, Heart} from 'assets/icons';
import {styles} from './styles';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {ORDER_SCREEN} from 'src/Navigation/home/routes';
import {paymentSuccess} from 'src/Constants/images';
import CSafeAreaView from 'src/Components/CSafeAreaView';

const PaymentSuccessScreen = () => {
  const navigation = useNavigation();

  return (
    <CSafeAreaView>
      <Header title="Payment" icon1={BackIcon} />

      <View style={styles.container}>
        <Image source={paymentSuccess} style={styles.successIcon} />
        <Text style={styles.successTitle}>Payment Successful!</Text>
        <Text style={styles.successMessage}>Thank you for your purchase.</Text>

        <CButton
          title="View Order"
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
          }}
        />
      </View>
    </CSafeAreaView>
  );
};

export default PaymentSuccessScreen;

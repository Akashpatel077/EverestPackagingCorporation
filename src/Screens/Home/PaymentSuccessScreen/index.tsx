import React from 'react';
import {View, Text} from 'react-native';
import {CButton} from 'src/Components';
import {styles} from './styles';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {ORDER_SCREEN, PROFILE} from 'src/Navigation/home/routes';
import CSafeAreaView from 'src/Components/CSafeAreaView';
import LottieView from 'lottie-react-native';
import successAnim from '../../../../assets/animations/successAnim.json';

const PaymentSuccessScreen = () => {
  const navigation = useNavigation();

  return (
    <CSafeAreaView>
      <View style={styles.container}>
        <LottieView
          source={successAnim}
          autoPlay
          loop={false}
          style={styles.successIcon}
        />
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
                                  index: 1,
                                  routes: [
                                    {
                                      name: PROFILE,
                                    },
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

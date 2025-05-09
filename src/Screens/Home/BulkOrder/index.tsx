import React from 'react';
import {View, Text, Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BackIcon, WhatsApp} from 'assets/icons';
import {styles} from './styles';
import {CButton, Header} from 'src/Components';
import CSafeAreaView from 'src/Components/CSafeAreaView';
import Toast from 'react-native-toast-message';
import {metrics, typography} from 'src/theme';

const BulkOrder = () => {
  const navigation = useNavigation();

  const handleContactUs = async () => {
    const whatsappMessage = 'Hi, I would like to inquire about bulk orders.';
    const whatsappUrl = `whatsapp://send?phone=+919173300810&text=${encodeURIComponent(
      whatsappMessage,
    )}`;

    try {
      await Linking.openURL(whatsappUrl);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'WhatsApp is not installed!',
        position: 'bottom',
      });
    }
  };

  return (
    <CSafeAreaView removeBottomSafeArea>
      <View style={styles.container}>
        <Header title="Bulk Order" icon1={BackIcon} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Bulk Orders Made Easy!</Text>
          <Text style={styles.message}>
            Save more when you order in bulk! Get exclusive discounts, dedicated
            support, and customized packaging solutions for your business needs.
          </Text>
          <View style={styles.highlightsContainer}>
            <Text style={styles.highlight}>✓ Volume-based discounts</Text>
            <Text style={styles.highlight}>
              ✓ Customized packaging solutions
            </Text>
            <Text style={styles.highlight}>✓ Dedicated support team</Text>
            <Text style={styles.highlight}>✓ Fast turnaround time</Text>
          </View>
        </View>
        <CButton
          style={styles.contactButton}
          title="Contact Us on WhatsApp"
          onPress={handleContactUs}
          icon={WhatsApp}
          textStyle={{
            marginRight: metrics.margin.md,
            fontSize: typography.fontSize.sm,
          }}
          iconPosition="right"
        />
      </View>
    </CSafeAreaView>
  );
};

export default BulkOrder;

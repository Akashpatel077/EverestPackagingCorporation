import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Header, Icon} from 'src/Components';
import {
  Heart,
  OrderPlaced,
  InProgress,
  Shipped,
  Delivered,
  BackIcon,
} from 'assets/icons';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';

const TrackOrderScreen = ({route}) => {
  const navigation = useNavigation();
  const orderDetails = {
    name: 'Brown Suite',
    size: 'XL',
    quantity: 10,
    price: 120,
    image: require('assets/images/user.png'),
    expectedDelivery: '03 Sep 2023',
    trackingId: 'TRK452126542',
    status: [
      {
        title: 'Order Placed',
        time: '23 Aug 2023, 04:25 PM',
        icon: OrderPlaced,
        completed: true,
      },
      {
        title: 'In Progress',
        time: '23 Aug 2023, 03:54 PM',
        icon: InProgress,
        completed: true,
      },
      {
        title: 'Shipped',
        time: 'Expected 02 Sep 2023',
        icon: Shipped,
        completed: false,
      },
      {
        title: 'Delivered',
        time: '23 Aug 2023, 2023',
        icon: Delivered,
        completed: false,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Header title="Track Order" icon1={BackIcon} />
      <View style={styles.productSection}>
        <Image source={orderDetails.image} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{orderDetails.name}</Text>
          <Text style={styles.productInfo}>
            Size : {orderDetails.size} | Qty : {orderDetails.quantity}pcs
          </Text>
          <Text style={styles.productPrice}>${orderDetails.price}</Text>
        </View>
      </View>

      <View style={styles.orderDetailsSection}>
        <View style={styles.orderDetailRow}>
          <Text style={styles.orderDetailLabel}>Expected Delivery Date</Text>
          <Text style={styles.orderDetailValue}>
            {orderDetails.expectedDelivery}
          </Text>
        </View>
        <View style={styles.orderDetailRow}>
          <Text style={styles.orderDetailLabel}>Tracking ID</Text>
          <Text style={styles.orderDetailValue}>{orderDetails.trackingId}</Text>
        </View>
      </View>

      <View style={styles.statusSection}>
        <Text style={styles.statusTitle}>Order Status</Text>
        {orderDetails.status.map((status, index) => (
          <View key={status.title} style={styles.statusItem}>
            <View style={styles.statusIconContainer}>
              <View
                style={[
                  styles.statusIcon,
                  status.completed && styles.completedStatusIcon,
                ]}>
                <Icon
                  name={status.icon}
                  width={24}
                  height={24}
                  color={status.completed ? '#FFFFFF' : '#9B9B9B'}
                />
              </View>
              {index < orderDetails.status.length - 1 && (
                <View
                  style={[
                    styles.statusLine,
                    status.completed && styles.completedStatusLine,
                  ]}
                />
              )}
            </View>
            <View style={styles.statusContent}>
              <Text
                style={[
                  styles.statusText,
                  status.completed && styles.completedStatusText,
                ]}>
                {status.title}
              </Text>
              <Text style={styles.statusTime}>{status.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default TrackOrderScreen;

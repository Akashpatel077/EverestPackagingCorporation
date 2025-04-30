import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BackIcon, Heart} from 'assets/icons';
import styles from './styles';
import {REVIEW_SCREEN, TRACK_ORDER_SCREEN} from 'src/Navigation/home/routes';
import {Header} from 'src/Components';
import {useDispatch, useSelector} from 'react-redux';
import {fetchOrders} from 'src/store/slices/ordersSlice';
import {AppDispatch} from '@store';
import CSafeAreaView from 'src/Components/CSafeAreaView';

interface OrderItem {
  id: string;
  name: string;
  size: string;
  quantity: number;
  price: number;
  image: any;
  status: 'active' | 'completed' | 'cancelled';
}

const OrderScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const {user} = useSelector(state => state.auth);

  const [activeTab, setActiveTab] = useState<
    'active' | 'completed' | 'cancelled'
  >('active');

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchOrders({id: user.id}));
    }
  }, []);

  const [orders] = useState<OrderItem[]>([
    {
      id: '1',
      name: 'Brown Jacket',
      size: 'XL',
      quantity: 10,
      price: 83.97,
      image: require('../../../../assets/images/user.png'),
      status: 'active',
    },
    {
      id: '2',
      name: 'Brown Suite',
      size: 'XL',
      quantity: 10,
      price: 120,
      image: require('../../../../assets/images/user.png'),
      status: 'active',
    },
    {
      id: '3',
      name: 'Brown Jacket',
      size: 'XL',
      quantity: 10,
      price: 83.97,
      image: require('../../../../assets/images/user.png'),
      status: 'completed',
    },
    {
      id: '4',
      name: 'Brown Suite',
      size: 'XL',
      quantity: 10,
      price: 120,
      image: require('../../../../assets/images/user.png'),
      status: 'cancelled',
    },
  ]);

  const filteredOrders = orders.filter(order => order.status === activeTab);

  const getActionButton = (status: string, item: OrderItem) => {
    switch (status) {
      case 'active':
        return (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              navigation.navigate(TRACK_ORDER_SCREEN);
            }}>
            <Text style={styles.actionButtonText}>Track Order</Text>
          </TouchableOpacity>
        );
      case 'completed':
        return (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              navigation.navigate(REVIEW_SCREEN, {orderItem: item});
            }}>
            <Text style={styles.actionButtonText}>Leave Review</Text>
          </TouchableOpacity>
        );
      case 'cancelled':
        return (
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Re-Order</Text>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  const renderOrderItem = ({item}: {item: OrderItem}) => (
    <View style={styles.orderItemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemInfo}>
          Size : {item.size} | Qty : {item.quantity}pcs
        </Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
      {getActionButton(item.status, item)}
    </View>
  );

  return (
    <CSafeAreaView removeBottomSafeArea>
      <View style={styles.container}>
        <Header title="My Orders" icon1={BackIcon} />
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'active' && styles.activeTab]}
            onPress={() => setActiveTab('active')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'active' && styles.activeTabText,
              ]}>
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
            onPress={() => setActiveTab('completed')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'completed' && styles.activeTabText,
              ]}>
              Completed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'cancelled' && styles.activeTab]}
            onPress={() => setActiveTab('cancelled')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'cancelled' && styles.activeTabText,
              ]}>
              Cancelled
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredOrders}
          renderItem={renderOrderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.ordersList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </CSafeAreaView>
  );
};

export default OrderScreen;

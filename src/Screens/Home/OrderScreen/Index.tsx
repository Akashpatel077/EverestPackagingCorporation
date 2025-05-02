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
  status: 'active' | 'completed' | 'failed';
}

const OrderScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const {user} = useSelector(state => state.auth);
  const {orders} = useSelector(state => state.orders);

  const [activeTab, setActiveTab] = useState<
    'active' | 'completed' | 'cancelled'
  >('active');

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchOrders({id: user.id}));
    }
  }, []);

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'active') {
      return ['pending', 'processing'].includes(order.status);
    } else if (activeTab === 'completed') {
      return order.status === 'completed';
    } else if (activeTab === 'cancelled') {
      return ['failed', 'cancelled'].includes(order.status);
    }
    return false;
  });

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
      case 'failed':
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
      {/* <Image source={item.image} style={styles.itemImage} /> */}
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>Order : #{item.number}</Text>
        <Text style={styles.itemInfo}>Date : {item.date_modified}</Text>
        <Text style={styles.itemInfo}>Status : {item.status}</Text>
        <Text style={styles.itemPrice}>Total : ₹{item.total}</Text>
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
            style={[styles.tab, activeTab === 'failed' && styles.activeTab]}
            onPress={() => setActiveTab('cancelled')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'failed' && styles.activeTabText,
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

import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BackIcon} from 'assets/icons';
import styles from './styles';
import {REVIEW_SCREEN, TRACK_ORDER_SCREEN} from 'src/Navigation/home/routes';
import {resetStartKey} from 'src/store/slices/startKeySlice';
import {CButton, Header} from 'src/Components';
import {useDispatch, useSelector} from 'react-redux';
import {fetchOrders} from 'src/store/slices/ordersSlice';
import {AppDispatch} from '@store';
import CSafeAreaView from 'src/Components/CSafeAreaView';
import {formatDate} from 'src/utils/dateFormatter';

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
      case 'processing':
        return (
          <CButton
            style={styles.actionButton}
            onPress={() => {
              navigation.navigate(TRACK_ORDER_SCREEN);
            }}
            title={'Track Order'}
          />
        );
      case 'pending':
        return (
          <CButton
            style={styles.actionButton}
            onPress={() => {
              navigation.navigate(TRACK_ORDER_SCREEN);
            }}
            title={'Track Order'}
          />
        );
      case 'completed':
        return (
          <CButton
            onPress={() => {
              navigation.navigate(REVIEW_SCREEN, {orderItem: item});
            }}
            style={styles.actionButton}
            title={'Leave Review'}
          />
        );
      case 'cancelled':
        return <CButton style={styles.actionButton} title={'Re-Order'} />;
      case 'failed':
        return <CButton style={styles.actionButton} title={'Re-Order'} />;
      default:
        return null;
    }
  };

  const renderOrderItem = ({item}: {item: OrderItem}) => (
    <View style={styles.orderItemContainer}>
      {/* <Image source={item.image} style={styles.itemImage} /> */}
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>Order : #{item.number}</Text>
        <Text style={styles.itemInfo}>
          Date : {formatDate(item.date_modified)}
        </Text>
        <Text style={styles.itemInfo}>Status : {item.status}</Text>
        <Text style={styles.itemPrice}>Total : ₹{item.total}</Text>
      </View>
      {/* {getActionButton(item.status, item)} */}
    </View>
  );

  return (
    <CSafeAreaView removeBottomSafeArea>
      <View style={styles.container}>
        <Header title="My Orders" icon1={BackIcon} />
        {!user ? (
          <View style={styles.loginContainer}>
            <Text style={styles.loginTitle}>Login to view Your Orders</Text>
            <CButton
              style={styles.loginButton}
              onPress={() => dispatch(resetStartKey())}
              title={'Login'}
            />
          </View>
        ) : (
          <>
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
                style={[
                  styles.tab,
                  activeTab === 'completed' && styles.activeTab,
                ]}
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
                style={[
                  styles.tab,
                  activeTab === 'cancelled' && styles.activeTab,
                ]}
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
          </>
        )}
      </View>
    </CSafeAreaView>
  );
};

export default OrderScreen;

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Header} from '../../../Components';
import {BackIcon, Heart} from '../../../../assets/icons';
import {Icon} from '../../../Components/Icons';
import {PRODUCT_DETAILS} from '../../../Navigation/home/routes';
import {
  addToWishlist,
  removeFromWishlist,
  isProductInWishlist,
} from '../../../store/slices/wishlistSlice';
import styles from './styles';

const ProductList = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {category, products} = route.params || {category: 'All', products: []};
  const wishlistItems = useSelector(state => state.wishlist.items);

  const handleWishlistToggle = product => {
    const isInWishlist = wishlistItems.some(item => item.id === product.id);
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const renderProductItem = ({item}) => {
    const isInWishlist = wishlistItems.some(wishlistItem => wishlistItem.id === item.id);

    return (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() =>
          navigation.navigate(PRODUCT_DETAILS, {productId: item.id})
        }>
        <View style={styles.productImageContainer}>
          <Image
            source={item.images?.[0]?.src && {uri: item.images[0].src}}
            style={styles.productImage}
          />
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => handleWishlistToggle(item)}>
            <Icon name={Heart} width={25} height={25} color={isInWishlist ? '#CC5656' : '#ffffff'} />
          </TouchableOpacity>
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <View style={styles.productDetails}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {item.regular_price && (
                <Text style={styles.regularPrice}>₹{item.regular_price}</Text>
              )}
              <Text style={styles.salePrice}>
                {item.sale_price ? `₹${item.sale_price}` : `₹${item.price}`}
              </Text>
            </View>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingIcon}>⭐</Text>
              <Text style={styles.ratingText}>
                {item.average_rating || '0.0'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={`${category} Products`} icon1={BackIcon} />
      <FlatList
        data={products}
        renderItem={renderProductItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productGrid}
      />
    </SafeAreaView>
  );
};

export default ProductList;

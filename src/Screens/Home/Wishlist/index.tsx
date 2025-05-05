import React from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {styles} from './styles';
import {Heart} from 'assets/icons';
import {CButton, Header, Icon} from 'src/Components';
import {useNavigation} from '@react-navigation/native';
import {PRODUCT_DETAILS} from 'src/Navigation/home/routes';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectWishlistItems,
  removeFromWishlist,
} from 'src/store/slices/wishlistSlice';
import CSafeAreaView from 'src/Components/CSafeAreaView';
import {resetStartKey} from 'src/store/slices/startKeySlice';

const WishlistScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);

  const wishlistItems = useSelector(selectWishlistItems) || [];

  const handleRemoveFromWishlist = (productId: number) => {
    dispatch(removeFromWishlist(productId));
  };

  const renderWishlistItem = ({item, index}: any) => {
    const isOutOfStock = item.stock_status === 'outofstock';

    const isLastItem = index === wishlistItems.length - 1;
    const isInLastRow =
      Math.floor(index / 2) === Math.floor((wishlistItems.length - 1) / 2);
    const needsExtraMargin = isLastItem && wishlistItems.length % 2 === 1;
    return (
      <TouchableOpacity
        style={[
          styles.productCard,
          (isInLastRow || needsExtraMargin) && {marginBottom: 70},
          {opacity: isOutOfStock ? 0.7 : 1},
        ]}
        onPress={() =>
          navigation.navigate(PRODUCT_DETAILS, {productId: item.id})
        }>
        <View style={styles.productImageContainer}>
          <Image
            source={item.images?.[0]?.src && {uri: item.images[0].src}}
            style={styles.productImage}
          />
          {isOutOfStock && (
            <View style={styles.outOfStockOverlay}>
              <Text style={styles.outOfStockText}>Out of Stock</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => handleRemoveFromWishlist(item.id)}>
            <Icon name={Heart} width={20} height={20} color="#CC5656" />
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
            {/* <View style={styles.ratingContainer}>
              <Text style={styles.ratingIcon}>⭐</Text>
              <Text style={styles.ratingText}>
                {item.average_rating || '0.0'}
              </Text>
            </View> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <CSafeAreaView removeBottomSafeArea>
      <View style={[styles.container, {}]}>
        <Header title="My Wishlist" />
        {!user ? (
          <View style={styles.wishListContainer}>
            <Text style={styles.wishListTitle}>
              Login to add in Your Wishlist
            </Text>
            <CButton
              style={styles.loginButton}
              onPress={() => dispatch(resetStartKey())}
              title={'Login'}
            />
          </View>
        ) : (
          <FlatList
            data={wishlistItems}
            renderItem={renderWishlistItem}
            numColumns={2}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No items in Your Wishlist</Text>
              </View>
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productGrid}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </View>
    </CSafeAreaView>
  );
};

export default WishlistScreen;

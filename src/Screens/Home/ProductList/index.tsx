import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
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
import {useAppDispatch, useAppSelector} from 'src/store/hooks';
import {fetchProducts} from 'src/store/slices/productsSlice';

const ProductList = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    items: products,
    loading: productsLoading,
    error: productsError,
    paginationLoading,
    hasMore,
  } = useAppSelector(state => state.products);
  const {category, categoryId} = route.params || {
    category: 'All',
    products: [],
  };
  const wishlistItems = useSelector(state => state.wishlist.items);
  const handleWishlistToggle = product => {
    const isInWishlist = wishlistItems.some(item => item.id === product.id);
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };
  useEffect(() => {
    dispatch(fetchProducts({categoryId, currentPage}));
  }, [categoryId, currentPage]);

  const handleLoadMore = () => {
    if (!paginationLoading && hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const renderProductItem = ({item}) => {
    const isInWishlist = wishlistItems.some(
      wishlistItem => wishlistItem.id === item.id,
    );

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
            <Icon
              name={Heart}
              width={25}
              height={25}
              color={isInWishlist ? '#CC5656' : '#ffffff'}
            />
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
  if (productsLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={`${category} Products`} icon1={BackIcon} />
      <FlatList
        data={products}
        renderItem={renderProductItem}
        numColumns={2}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productGrid}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          paginationLoading ? (
            <ActivityIndicator size="small" style={{marginVertical: 10}} />
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default ProductList;

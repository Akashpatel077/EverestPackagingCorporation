import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {styles} from './styles';
import {BackIcon, Heart} from 'assets/icons';
import {Header, Icon} from 'src/Components';
import {useNavigation} from '@react-navigation/native';
import {PRODUCT_DETAILS} from 'src/Navigation/home/routes';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectWishlistItems,
  removeFromWishlist,
} from 'src/store/slices/wishlistSlice';

const WishlistScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const wishlistItems = useSelector(selectWishlistItems) || [];

  const categories = useMemo(() => {
    const uniqueCategories = new Set(['All']);
    if (Array.isArray(wishlistItems)) {
      wishlistItems.forEach(item => {
        if (
          item?.categories &&
          Array.isArray(item.categories) &&
          item.categories.length > 0
        ) {
          item.categories.forEach(
            cat => cat?.name && uniqueCategories.add(cat.name),
          );
        }
      });
    }
    return Array.from(uniqueCategories);
  }, [wishlistItems]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return wishlistItems;
    return wishlistItems.filter(item =>
      item.categories?.some(cat => cat.name === selectedCategory),
    );
  }, [selectedCategory, wishlistItems]);

  const handleRemoveFromWishlist = (productId: number) => {
    dispatch(removeFromWishlist(productId));
  };

  const renderWishlistItem = ({item, index}: any) => {
    const isLastItem = index === filteredItems.length - 1;
    return (
      <TouchableOpacity
        style={[styles.productCard, isLastItem && {marginBottom: 40}]}>
        <View style={styles.productImageContainer}>
          <Image
            source={item.images?.[0]?.src && {uri: item.images[0].src}}
            style={styles.productImage}
          />
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
    <SafeAreaView style={[styles.container, {paddingBottom: 30}]}>
      <Header title="My Wishlist" />
      <View style={{paddingTop: 8}}>
        {filteredItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items in wishlist</Text>
          </View>
        ) : (
          <FlatList
            data={filteredItems}
            renderItem={renderWishlistItem}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productGrid}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default WishlistScreen;

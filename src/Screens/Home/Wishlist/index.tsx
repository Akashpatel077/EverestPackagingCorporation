import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { styles } from './styles';
import { BackIcon, Heart } from 'assets/icons';
import { Header, Icon } from 'src/Components';
import { useNavigation } from '@react-navigation/native';
import { PRODUCT_DETAILS } from 'src/Navigation/home/routes';
import { useDispatch, useSelector } from 'react-redux';
import { selectWishlistItems, removeFromWishlist } from 'src/store/slices/wishlistSlice';

const WishlistScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const wishlistItems = useSelector(selectWishlistItems) || [];
  
  const categories = useMemo(() => {
    const uniqueCategories = new Set(['All']);
    if (Array.isArray(wishlistItems)) {
      wishlistItems.forEach(item => {
        if (item?.categories && Array.isArray(item.categories) && item.categories.length > 0) {
          item.categories.forEach(cat => cat?.name && uniqueCategories.add(cat.name));
        }
      });
    }
    return Array.from(uniqueCategories);
  }, [wishlistItems]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return wishlistItems;
    return wishlistItems.filter(item => 
      item.categories?.some(cat => cat.name === selectedCategory)
    );
  }, [selectedCategory, wishlistItems]);

  const handleRemoveFromWishlist = (productId: number) => {
    dispatch(removeFromWishlist(productId));
  };

  const renderWishlistItem = ({ item }:any) => (
    <TouchableOpacity 
      style={styles.productCard} 
      onPress={() => navigation.navigate(PRODUCT_DETAILS, { product: item })}
    >
      <View style={styles.productImageContainer}>
        <Image 
          source={
            item.images?.[0]?.src
              ? {uri: item.images[0].src}
              : require('../../../../assets/images/banner.png')
          } 
          style={styles.productImage} 
        />
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => handleRemoveFromWishlist(item.id)}
        >
          <Icon width={20} height={20} name={Heart} color="#CC5656" />
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.productDetails}>
          <Text style={styles.productPrice}>${item.price}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingIcon}>★</Text>
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Wishlist" icon1={BackIcon} />
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
    </SafeAreaView>
  );
};

export default WishlistScreen;
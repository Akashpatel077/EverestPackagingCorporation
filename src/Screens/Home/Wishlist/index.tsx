import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { styles } from './styles';
import { Heart } from 'assets/icons';
import { Icon } from 'src/Components';
import { useNavigation } from '@react-navigation/native';
import { PRODUCT_DETAILS } from 'src/Navigation/home/routes';

const WishlistScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('Jacket');

  const categories = ['All', 'Jacket', 'Shirt', 'Pant', 'T-Shirt'];

  const wishlistItems = [
    {
      id: '1',
      name: 'Brown Jacket',
      price: 83.97,
      rating: 4.9,
      image: require('../../../../assets/images/banner.png'),
      isFavorite: true,
    },
    {
      id: '2',
      name: 'Brown Suite',
      price: 120.00,
      rating: 5.0,
      image: require('../../../../assets/images/banner.png'),
      isFavorite: true,
    },
    {
      id: '3',
      name: 'Brown Jacket',
      price: 83.97,
      rating: 4.9,
      image: require('../../../../assets/images/banner.png'),
      isFavorite: true,
    },
    {
      id: '4',
      name: 'Yellow Shirt',
      price: 120.00,
      rating: 5.0,
      image: require('../../../../assets/images/banner.png'),
      isFavorite: true,
    },
    {
      id: '5',
      name: 'Brown Jacket',
      price: 83.97,
      rating: 4.9,
      image: require('../../../../assets/images/banner.png'),
      isFavorite: true,
    },
    {
      id: '6',
      name: 'Brown Hoodie',
      price: 120.00,
      rating: 5.0,
      image: require('../../../../assets/images/banner.png'),
      isFavorite: true,
    },
  ];

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryButton, selectedCategory === item && styles.categoryButtonActive]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text style={[styles.categoryText, selectedCategory === item && styles.categoryTextActive]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderWishlistItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard} 
      onPress={() => navigation.navigate(PRODUCT_DETAILS)}
    >
      <View style={styles.productImageContainer}>
        <Image source={item.image} style={styles.productImage} />
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => console.log('Toggle favorite')}
        >
          <Icon width={20} height={20} name={Heart} color={item.isFavorite ? '#8B4513' : '#FFFFFF'} />
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.productDetails}>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
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
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Wishlist</Text>
        <View style={styles.emptyView} />
      </View>

      <View style={styles.categoryContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />
      </View>

      <FlatList
        data={wishlistItems}
        renderItem={renderWishlistItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productGrid}
      />
    </SafeAreaView>
  );
};

export default WishlistScreen;
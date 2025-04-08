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
import {Header} from '../../../Components';
import {BackIcon, Heart} from '../../../../assets/icons';
import {Icon} from '../../../Components/Icons';
import {PRODUCT_DETAILS} from '../../../Navigation/home/routes';
import styles from './styles';

const ProductList = ({route}) => {
  const navigation = useNavigation();
  const {category, products} = route.params || {category: 'All', products: []};

  console.log("products",products,category);
  

  const renderProductItem = ({item}) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate(PRODUCT_DETAILS, {product: item})}>
        
      <View style={styles.productImageContainer}>
        <Image
          source={
            item.images?.[0]?.src
              && {uri: item.images[0].src}
          }
          style={styles.productImage}
        />
        <TouchableOpacity style={styles.favoriteButton}>
          <Icon icon={Heart} size={18} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.productDetails}>
          <Text style={styles.productPrice}>₹{item.price}</Text>
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

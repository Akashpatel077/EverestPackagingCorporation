import React, { useEffect, useState } from 'react';
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
import {useSelector, useDispatch} from 'react-redux';
import {Header} from 'src/Components';
import {BackIcon} from 'assets/icons';
import {PRODUCT_LIST} from 'src/Navigation/home/routes';
import {styles} from './styles';
import {RootState} from 'src/store';
import {Category} from 'src/store/slices/categorySlice';
import {fetchProducts} from 'src/store/slices/productsSlice';
import { getProducts } from 'src/services/wooCommerceApi';

const SubCategoryScreen = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { category, subCategories} = route.params;
  const {status} = useSelector((state: RootState) => state.categories);
  
  const renderSubCategoryItem = ({item}: {item: Category}) => {
    
    const handleSubCategoryPress = async () => {
      const response = await getProducts(item.id);
      console.log("response",response);
      
      navigation.navigate(PRODUCT_LIST, {
        category: item.name,
        products: response,
      });
    };

    return (
      <TouchableOpacity
        style={styles.productCard}
        onPress={handleSubCategoryPress}>
        <View style={styles.productImageContainer}>
          <Image
            source={
              item.image && item.image.src
                && {uri: item.image.src}
            }
            resizeMode='contain'
            style={styles.productImage}
          />
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (status === 'loading') {
    return (
      <SafeAreaView style={styles.container}>
        <Header title={category} icon1={BackIcon} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      </SafeAreaView>
    );
  }

  console.log("subCategories",subCategories);
  

  return (
    <SafeAreaView style={styles.container}>
      <Header title={category} icon1={BackIcon} />
      <FlatList
        data={subCategories}
        renderItem={renderSubCategoryItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.productGrid}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default SubCategoryScreen;
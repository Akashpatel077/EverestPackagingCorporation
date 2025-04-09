import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchCategories,
  fetchSubCategories,
} from '../../../store/slices/categorySlice';
import {RootState} from '../../../store';
import Header from '../../../Components/Header';
import styles from './styles';
import {BackIcon} from 'assets/icons';
import {PRODUCT_LIST, SUB_CATEGORY_SCREEN} from 'src/Navigation/home/routes';
import {getSubCategories} from 'src/services/wooCommerceApi';

const CategoryScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {categories, status} = useSelector(
    (state: RootState) => state.categories,
  );
  const [isLoading, setIsLoading] = useState(false);
  const isFocus = useIsFocused();
  useEffect(() => {
    if (isFocus) {
      setIsLoading(false);
    }
  }, [isFocus, dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubCategories(214));
  }, [dispatch]);

  const handleCategoryPress = async (category: any) => {
    try {
      setIsLoading(true);
      const subCategoryResponse = await getSubCategories(category.id);
      if (subCategoryResponse && subCategoryResponse.length > 0) {
        navigation.navigate(SUB_CATEGORY_SCREEN, {
          category: category.name,
          categoryId: category.id,
          subCategories: subCategoryResponse,
        });
      } else {
        navigation.navigate(PRODUCT_LIST, {
          category: category.name,
          categoryId: category.id,
        });
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  const renderCategoryItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.categoryWrapper}
      onPress={() => handleCategoryPress(item)}>
      <View style={styles.categoryCard}>
        <Image
          source={item.image?.src && {uri: item.image.src}}
          style={styles.categoryImage}
          resizeMode="contain"
        />
        <Text style={styles.categoryName} numberOfLines={2}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (status === 'loading' || isLoading) {
    return (
      <SafeAreaView
        style={[
          styles.container,
          {backgroundColor: 'rgba(255, 255, 255, 0.8)'},
        ]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Categories" />
      <FlatList
        data={categories.filter(category => category.count > 0)}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.categoriesContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default CategoryScreen;

import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from 'react-native';
import LoadingLogo from '../../../Components/LoadingLogo';
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
import CSafeAreaView from 'src/Components/CSafeAreaView';

const CategoryScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {categories, status} = useSelector(
    (state: RootState) => state.categories,
  );
  const [isLoading, setIsLoading] = useState(false);
  const isFocus = useIsFocused();
  const [subCategoriesList, setSubCategoriesList] = useState([]);
  useEffect(() => {
    if (isFocus) {
      setIsLoading(false);
    }
  }, [isFocus, dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubCategories(214));
  }, [dispatch]);

  useEffect(() => {
    const fetchSubCategoriesAction = async () => {
      try {
        const subCategories = await getSubCategories();
        setSubCategoriesList(subCategories);
      } catch (error) {
        Alert.alert('', error.message);
      }
    };

    fetchSubCategoriesAction();
  }, []);

  const handleCategoryPress = async (category: any) => {
    try {
      if (!subCategoriesList || subCategoriesList.length === 0) {
        navigation.navigate(PRODUCT_LIST, {
          category: category.name,
          categoryId: category.id,
        });
      } else {
        navigation.navigate(SUB_CATEGORY_SCREEN, {
          category: category.name,
          categoryId: category.id,
          subCategoriesList,
        });
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      navigation.navigate(PRODUCT_LIST, {
        category: category.name,
        categoryId: category.id,
      });
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
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryCount}>{item.count} Products</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <CSafeAreaView removeBottomSafeArea>
      <View style={styles.container}>
        <Header title="Categories" />
        <View style={styles.contentContainer}>
          {status === 'loading' || isLoading ? (
            <View style={styles.loadingContainer}>
              <LoadingLogo />
            </View>
          ) : (
            <FlatList
              data={categories
                .filter(category => category.count > 0)
                .sort((a, b) => (a.menu_order || 0) - (b.menu_order || 0))}
              renderItem={renderCategoryItem}
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              contentContainerStyle={styles.categoriesContainer}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </View>
    </CSafeAreaView>
  );
};

export default CategoryScreen;

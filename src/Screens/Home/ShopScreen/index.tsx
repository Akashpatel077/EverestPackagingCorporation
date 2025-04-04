import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {useAppDispatch, useAppSelector} from 'src/store/hooks';
import {fetchProducts} from 'src/store/slices/productsSlice';
import {
  fetchCategories,
  fetchSubCategories,
} from 'src/store/slices/categorySlice';
import SearchBar from '../../../Components/CustomSearch';
import {styles} from './styles.ts';
import {Icon} from 'src/Components/index.ts';
import {useNavigation} from '@react-navigation/native';
import {PRODUCT_DETAILS, PRODUCT_LIST} from 'src/Navigation/home/routes.ts';

const ShopScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(214);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(
    null,
  );
  const dispatch = useAppDispatch();
  const {
    items: products,
    loading: productsLoading,
    error: productsError,
  } = useAppSelector(state => state.products);
  const {
    categories,
    status: categoriesStatus,
    subCategoriesStatus,
    error: categoriesError,
  } = useAppSelector(state => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubCategories(214));
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find(cat => cat.id === selectedCategory);
      if (category) {
        const filtered = products.filter(product =>
          product.categories.some(
            cat =>
              cat.name.toLowerCase() !== 'uncategorized' &&
              cat.name.toLowerCase().includes(category.name.toLowerCase()),
          ),
        );
        setFilteredProducts(filtered);
      }
    } else {
      setFilteredProducts(
        products.filter(product =>
          product.categories.some(
            cat =>
              cat.name.toLowerCase() !== 'uncategorized' &&
              cat.name.toLowerCase() !== 'box strap roll',
          ),
        ),
      );
    }
  }, [products, selectedCategory, categories]);

  useEffect(() => {
    if (subCategoriesStatus === 'succeeded') {
      const category = categories.find(cat => cat.id === selectedCategory);
      if (category) {
        if (!category?.subCategories?.length) {
          dispatch(fetchProducts(selectedCategory));
        } else {
          setSelectedSubCategory(category?.subCategories[0].id);
          dispatch(fetchProducts(category?.subCategories[0].id));
        }
      }
    }
  }, [subCategoriesStatus]);

  const toggleCategory = (categoryId: number) => {
    setSelectedCategory(categoryId);
    dispatch(fetchSubCategories(categoryId));
  };

  const renderCategoryItem = ({item}: {item: any}) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.selectedCategory,
      ]}
      onPress={() => toggleCategory(item.id)}>
      <View
        style={[
          styles.categoryIcon,
          {
            backgroundColor:
              selectedCategory === item.id ? '#E7E7E7' : '#F5F5F5',
          },
        ]}>
        {item.image ? (
          <Image
            source={{uri: item.image.src}}
            style={{width: 30, height: 30}}
          />
        ) : (
          <Icon name="TShirt" width={30} height={30} />
        )}
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({item}: {item: any}) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => {
        navigation.navigate(PRODUCT_DETAILS, {productId: item.id});
      }}>
      <View style={styles.productImageContainer}>
        <Image
          source={
            item.images?.[0]?.src
              ? {uri: item.images[0].src}
              : require('../../../../assets/images/banner.png')
          }
          style={styles.productImage}
        />
        <TouchableOpacity style={styles.favoriteButton}>
          <Text style={styles.favoriteIcon}>♡</Text>
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

  const toggleSubCategory = (categoryId: number) => {
    dispatch(fetchProducts(categoryId));
    setSelectedSubCategory(categoryId);
  };

  const renderSubCategoryItem = ({item}: {item: any}) => {
    return (
      <View
        style={{
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={styles.categoryItem}
          onPress={() => {
            toggleSubCategory(item.id);
          }}>
          <View
            style={[
              styles.categoryIcon,
              {
                backgroundColor:
                  selectedSubCategory === item.id ? '#E7E7E7' : '#F5F5F5',
              },
            ]}>
            {item.image ? (
              <Image
                source={{uri: item.image.src}}
                style={{width: 30, height: 30}}
              />
            ) : (
              <Icon name="TShirt" width={30} height={30} />
            )}
          </View>
        </TouchableOpacity>
        <Text style={styles.categoryName}>{item.name}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        nestedScrollEnabled={true}>
        <View style={styles.searchContainer}>
          <SearchBar placeholder="Search" />
        </View>

        <View style={styles.categorySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Category</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllButton}>See All</Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              data={categories.filter(
                category =>
                  category.name.toLowerCase() !== 'uncategorized' &&
                  category.name.toLowerCase() !== 'box strap roll',
              )}
              renderItem={renderCategoryItem}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.categoryList}
              horizontal
              nestedScrollEnabled={true}
            />
            {categories.find(cat => cat.id === selectedCategory)?.subCategories
              ?.length &&
              selectedCategory && (
                <>
                  <View style={[styles.sectionHeader, {marginTop: 15}]}>
                    <Text style={styles.sectionTitle}>
                      {categories.find(cat => cat.id === selectedCategory)
                        ?.name || ''}
                    </Text>
                    <TouchableOpacity>
                      <Text style={styles.seeAllButton}>See All</Text>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={
                      categories.find(cat => cat.id === selectedCategory)
                        ?.subCategories || []
                    }
                    renderItem={renderSubCategoryItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={[
                      styles.subCategoryList,
                      {marginTop: 10},
                    ]}
                    nestedScrollEnabled={true}
                    horizontal
                  />
                </>
              )}
            {productsLoading ? (
              <View
                style={{
                  height: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator />
              </View>
            ) : (
              filteredProducts.length > 0 && (
                <>
                  <View style={[styles.sectionHeader, {marginTop: 20}]}>
                    <Text style={styles.sectionTitle}>Products</Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate(PRODUCT_LIST, {
                          category: selectedCategory
                            ? categories.find(
                                cat => cat.id === selectedCategory,
                              )?.name
                            : 'All',
                          products: filteredProducts,
                        });
                      }}>
                      <Text style={styles.seeAllButton}>See All</Text>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    style={{paddingHorizontal: 12}}
                    data={filteredProducts}
                    renderItem={renderProductItem}
                    numColumns={2}
                    keyExtractor={item => item.id.toString()}
                    columnWrapperStyle={styles.productGrid}
                  />
                </>
              )
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShopScreen;

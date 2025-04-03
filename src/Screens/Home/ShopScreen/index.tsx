import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
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
import {PRODUCT_LIST} from 'src/Navigation/home/routes';

const ShopScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(214);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const {
    items: products,
    loading: productsLoading,
    error: productsError,
  } = useAppSelector(state => state.products);
  const {
    categories,
    status: categoriesStatus,
    error: categoriesError,
  } = useAppSelector(state => state.categories);

  useEffect(() => {
    dispatch(fetchProducts());
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
  }, [selectedCategory, products, categories]);

  const toggleCategory = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (category) {
      dispatch(fetchSubCategories(categoryId));
      setSelectedCategory(categoryId);
    }
  };

  const renderCategoryItem = ({item}: {item: any}) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.selectedCategory,
      ]}
      onPress={() => toggleCategory(item.id)}>
      <View style={styles.categoryIcon}>
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

  const renderSubCategoryItem = ({item}: {item: any}) => (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity
        style={[
          styles.categoryItem,

          selectedCategory === item.id && styles.selectedCategory,
        ]}
        onPress={() => {
          // navigation.navigate();
        }}>
        <View style={[styles.categoryIcon, {marginRight: 12}]}>
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
      <Text style={[styles.categoryName]}>{item.name}</Text>
    </View>
  );
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
            {selectedCategory && (
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
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShopScreen;

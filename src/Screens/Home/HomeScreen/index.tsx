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

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
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
      setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
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
    <TouchableOpacity
      style={[
        styles.subCategoryItem,
        {
          backgroundColor: '#FFFFFF',
          padding: 12,
          borderRadius: 16,
          // marginRight: 12,
          flexDirection: 'row',
          alignItems: 'center',
          width: 400,
          height: 100,
          marginVertical: 8,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        },
        selectedCategory === item.id && styles.selectedCategory,
      ]}
      onPress={() => toggleCategory(item.id)}>
      <View style={[styles.subCategoryIcon, {marginRight: 12}]}>
        {item.image ? (
          <Image
            source={{uri: item.image.src}}
            style={{width: 80, height: 80, borderRadius: 12}}
          />
        ) : (
          <Icon name="TShirt" width={30} height={30} />
        )}
      </View>
      <Text
        style={[
          styles.categoryName,
          {color: '#222429', fontSize: 16, flex: 1},
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
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
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.categoryList}
            />
            {selectedCategory && (
              <>
                <View style={[styles.sectionHeader, {marginTop: 15}]}>
                  <Text style={styles.sectionTitle}>Sub Categories</Text>
                  <TouchableOpacity>
                    <Text style={styles.seeAllButton}>See All</Text>
                  </TouchableOpacity>
                </View>
                {/* <View style={styles.subCategoryBox}> */}
                <FlatList
                  data={
                    categories.find(cat => cat.id === selectedCategory)
                      ?.subCategories || []
                  }
                  renderItem={renderSubCategoryItem}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={item => item.id}
                  contentContainerStyle={[
                    styles.subCategoryList,
                    {marginTop: 10},
                  ]}
                />
                {/* </View> */}
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

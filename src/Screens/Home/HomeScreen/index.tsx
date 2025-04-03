import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
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
import {styles} from './styles.ts';
import {Icon} from 'src/Components/index.ts';

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
    status,
    error: categoriesError,
  } = useAppSelector(state => state.categories);

  console.log('categoriesss : ', status);

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
            style={{width: 150, height: 130, resizeMode: 'cover'}}
          />
        ) : (
          <Icon name="TShirt" width={80} height={80} />
        )}
      </View>
      <Text style={[styles.categoryName, {fontWeight: '500'}]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      {status === 'loading' ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={categories.filter(
            category =>
              category.name.toLowerCase() !== 'uncategorized' &&
              category.name.toLowerCase() !== 'box strap roll',
          )}
          renderItem={renderCategoryItem}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.container}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

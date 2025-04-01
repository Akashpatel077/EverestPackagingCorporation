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
import {fetchCategories} from 'src/store/slices/categorySlice';
import SearchBar from '../../../Components/CustomSearch';
import {styles} from './styles.ts';
import {Icon} from 'src/Components/index.ts';
import {useNavigation} from '@react-navigation/native';
import {PRODUCT_DETAILS} from 'src/Navigation/home/routes.ts';

const HomeScreen = () => {
  const [timeLeft, setTimeLeft] = useState(7200);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const navigation = useNavigation();
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
          product.categories.some(cat =>
            cat.name.toLowerCase().includes(category.name.toLowerCase()),
          ),
        );
        setFilteredProducts(filtered);
      }
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products, categories]);

  const defaultCategories = categories.filter(
    category => category.display === 'default',
  );

  const timer = setInterval(() => {
    setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
  }, 1000);

  const toggleCategory = (categoryId: number) => {
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        return {...category, isExpanded: !category.isExpanded};
      }
      return category;
    });
    dispatch({type: 'categories/updateCategories', payload: updatedCategories});
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  };

  const renderSubCategories = (subCategories: any[]) => {
    return (
      <View style={styles.dropdownContainer}>
        {subCategories.map(subCategory => (
          <TouchableOpacity
            key={subCategory.id}
            style={styles.dropdownItem}
            onPress={() => setSelectedCategory(subCategory.id)}>
            <Text style={styles.dropdownText}>{subCategory.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderCategoryItem = ({item}: {item: any}) => (
    <View>
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
      {item.isExpanded &&
        item.subCategories &&
        item.subCategories.length > 0 && (
          <View style={styles.subCategoriesContainer}>
            {item.subCategories.map((subCategory: any) => (
              <TouchableOpacity
                key={subCategory.id}
                style={[
                  styles.categoryItem,
                  selectedCategory === subCategory.id &&
                    styles.selectedCategory,
                ]}
                onPress={() => setSelectedCategory(subCategory.id)}>
                <View style={styles.categoryIcon}>
                  {subCategory.image ? (
                    <Image
                      source={{uri: subCategory.image.src}}
                      style={{width: 30, height: 30}}
                    />
                  ) : (
                    <Icon name="TShirt" width={30} height={30} />
                  )}
                </View>
                <Text style={styles.categoryName}>{subCategory.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
    </View>
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchBar placeholder="Search" />
        </View>

        <View style={styles.bannerContainer}>
          <Image
            source={require('../../../../assets/images/banner.png')}
            style={styles.bannerImage}
          />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>New Collection</Text>
            <Text style={styles.bannerSubtitle}>
              Discount 50% for{`\n`}the first transaction
            </Text>
            <TouchableOpacity style={styles.shopNowButton}>
              <Text style={styles.shopNowText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.categorySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Category</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllButton}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.categoryList}
          />
        </View>

        <View style={styles.flashSaleSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Flash Sale</Text>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={styles.filterContainer}
            horizontal>
            <TouchableOpacity
              style={[styles.filterButton, styles.filterActive]}>
              <Text style={[styles.filterText, styles.filterTextActive]}>
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Newest</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Popular</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Man</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Woman</Text>
            </TouchableOpacity>
          </ScrollView>
          {productsLoading || categoriesStatus === 'loading' ? (
            <ActivityIndicator
              size="large"
              color="#000"
              style={styles.loader}
            />
          ) : productsError || categoriesError ? (
            <Text style={styles.errorText}>
              {productsError || categoriesError}
            </Text>
          ) : (
            <FlatList
              style={{paddingHorizontal: 12}}
              data={filteredProducts}
              renderItem={renderProductItem}
              numColumns={2}
              keyExtractor={item => item.id.toString()}
              columnWrapperStyle={styles.productGrid}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const renderProductItem = ({item}: {item: any}) => (
  <TouchableOpacity
    style={styles.productCard}
    onPress={() => {
      navigation.navigate(PRODUCT_DETAILS, {product: item});
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
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingIcon}>⭐</Text>
          <Text style={styles.ratingText}>{item.average_rating || '0.0'}</Text>
        </View>
      </View>
      <Text style={styles.productPrice}>${item.price}</Text>
    </View>
  </TouchableOpacity>
);

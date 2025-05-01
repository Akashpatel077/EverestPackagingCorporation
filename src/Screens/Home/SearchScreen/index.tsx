import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Header, Icon} from 'src/Components';
import {Search, Close, Heart, BackIcon} from 'assets/icons';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector, useAppDispatch} from 'src/store/hooks';
import {PRODUCT_DETAILS} from '../../../Navigation/home/routes';
import {fetchAllProducts} from '../../../store/slices/productsSlice';
import {
  addToWishlist,
  removeFromWishlist,
} from '../../../store/slices/wishlistSlice';
import CSafeAreaView from 'src/Components/CSafeAreaView';

const SearchScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const {
    items: products,
    loading,
    error,
  } = useAppSelector(state => state.products);
  const wishlistItems = useAppSelector(state => state.wishlist.items);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const handleSearch = () => {
    if (searchText.trim()) {
      setRecentSearches(prevSearches => [
        searchText,
        ...prevSearches.filter(item => item !== searchText),
      ]);
      const filtered = products.filter(
        product =>
          product.name.toLowerCase().includes(searchText.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchText]);

  const clearAllSearches = () => {
    setRecentSearches([]);
  };

  const deleteSearch = (searchItem: string) => {
    setRecentSearches(prevSearches =>
      prevSearches.filter(item => item !== searchItem),
    );
  };

  const renderSearchItem = ({item}: {item: string}) => (
    <TouchableOpacity
      style={styles.searchItem}
      onPress={() => setSearchText(item)}>
      <Text style={styles.searchText}>{item}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteSearch(item)}>
        <Icon name={Close} width={20} height={20} color="#0088cc" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <CSafeAreaView removeBottomSafeArea>
      <View style={styles.container}>
        <Header title="Search" icon1={BackIcon} />

        <View style={styles.searchContainer}>
          <Icon
            name={Search}
            width={20}
            height={20}
            color="#333333"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0088cc" />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : searchText.trim() === '' ? (
          recentSearches.length > 0 && (
            <View>
              <View style={styles.recentHeader}>
                <Text style={styles.recentTitle}>Recent</Text>
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={clearAllSearches}>
                  <Text style={styles.clearText}>Clear All</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={recentSearches}
                renderItem={renderSearchItem}
                keyExtractor={(item, index) => `${item}-${index}`}
                showsVerticalScrollIndicator={false}
              />
            </View>
          )
        ) : (
          <FlatList
            data={filteredProducts}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.productCard}
                onPress={() =>
                  navigation.navigate(PRODUCT_DETAILS, {productId: item.id})
                }>
                <View style={styles.productImageContainer}>
                  <Image
                    source={
                      item.images?.[0]?.src
                        ? {uri: item.images[0].src}
                        : require('../../../../assets/images/banner.png')
                    }
                    style={styles.productImage}
                  />
                  <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => {
                      const isInWishlist = wishlistItems.some(
                        wishlistItem => wishlistItem.id === item.id,
                      );
                      if (isInWishlist) {
                        dispatch(removeFromWishlist(item.id));
                      } else {
                        dispatch(addToWishlist(item));
                      }
                    }}>
                    <Icon
                      name={Heart}
                      width={20}
                      height={20}
                      color={
                        wishlistItems.some(
                          wishlistItem => wishlistItem.id === item.id,
                        )
                          ? '#CC5656'
                          : '#FFFFFF'
                      }
                    />
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
            )}
            numColumns={2}
            keyExtractor={item => item.id.toString()}
            columnWrapperStyle={styles.productGrid}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </CSafeAreaView>
  );
};

export default SearchScreen;

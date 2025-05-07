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
import {CustomAlert, Header, Icon} from 'src/Components';
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
import {colors, metrics} from 'src/theme';
import {getProductVariations} from 'src/services/wooCommerceApi';

function findVariation(variations, selectedAttributes) {
  return variations.find(variation => {
    return variation.attributes.every(
      attr => selectedAttributes[attr.name] === attr.option,
    );
  });
}
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
        <Icon
          name={Close}
          width={metrics.iconSize.sm}
          height={metrics.iconSize.sm}
          color={colors.primary}
        />
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
            width={metrics.iconSize.sm}
            height={metrics.iconSize.sm}
            color="#ffffff"
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
            <ActivityIndicator size="large" color={colors.primary} />
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
              <ProductItemCard item={item} wishlistItems={wishlistItems} />
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

const ProductItemCard = React.memo(
  ({item, wishlistItems}: {item: {}; wishlistItems: {}}) => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const [regularPrice, setRegularPrice] = useState(
      item.regular_price ? parseFloat(item.regular_price).toFixed(2) : '0.00',
    );
    const [salePrice, setSalePrice] = useState(
      item.price ? parseFloat(item.price).toFixed(2) : '0.00',
    );
    const isOutOfStock = item.stock_status === 'outofstock';

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const handleWishlistToggle = product => {
      const isInWishlist = wishlistItems.some(item => item.id === product.id);
      if (isInWishlist) {
        dispatch(removeFromWishlist(product.id));
      } else {
        dispatch(addToWishlist(product));
      }
    };

    const isInWishlist = wishlistItems.some(
      wishlistItem => wishlistItem.id === item.id,
    );

    const getProductVariationList = async () => {
      try {
        let selectedAttributes = {};

        item.attributes?.map(attr => {
          selectedAttributes = {
            ...selectedAttributes,
            [attr.name]: attr.options[0],
          };
        });
        const variationList = await getProductVariations(item.id);

        if (variationList.length) {
          const productVariation = findVariation(
            variationList,
            selectedAttributes,
          );

          if (productVariation) {
            setRegularPrice(
              productVariation.regular_price
                ? (parseFloat(productVariation.regular_price) / 100).toFixed(2)
                : '0.00',
            );
            setSalePrice(
              productVariation.sale_price
                ? (parseFloat(productVariation.sale_price) / 100).toFixed(2)
                : '0.00',
            );
          }
        }
      } catch (e) {
        setAlertMessage(e.message || 'Something went wrong');
        setAlertVisible(true);
      }
    };

    useEffect(() => {
      if (item?.variations?.length) {
        getProductVariationList();
      }
    }, [item]);

    return (
      <TouchableOpacity
        style={[styles.productCard, {opacity: isOutOfStock ? 0.7 : 1}]}
        onPress={() =>
          navigation.navigate(PRODUCT_DETAILS, {productId: item.id})
        }>
        <View style={styles.productImageContainer}>
          <Image
            source={item.images?.[0]?.src && {uri: item.images[0].src}}
            style={styles.productImage}
            resizeMode="contain"
          />
          {isOutOfStock && (
            <View style={styles.outOfStockOverlay}>
              <Text style={styles.outOfStockText}>Out of Stock</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => handleWishlistToggle(item)}>
            <Icon
              name={Heart}
              width={metrics.iconSize.sm}
              height={metrics.iconSize.sm}
              color={isInWishlist ? colors.red : colors.white}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.name}
          </Text>
          <View style={styles.productDetails}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.regularPrice}>₹{regularPrice}</Text>
              <Text style={styles.salePrice}>₹{salePrice}</Text>
            </View>
          </View>
        </View>
        <CustomAlert
          visible={alertVisible}
          title="Attention!"
          description={alertMessage}
          button2={{
            text: 'OK',
            onPress: () => setAlertVisible(false),
            color: colors.primary,
          }}
        />
      </TouchableOpacity>
    );
  },
);

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {Header} from '../../../Components';
import {BackIcon, Heart} from '../../../../assets/icons';
import {Icon} from '../../../Components/Icons';
import {PRODUCT_DETAILS} from '../../../Navigation/home/routes';
import {
  addToWishlist,
  removeFromWishlist,
  isProductInWishlist,
} from '../../../store/slices/wishlistSlice';
import styles from './styles';
import {useAppDispatch, useAppSelector} from 'src/store/hooks';
import {fetchProducts} from 'src/store/slices/productsSlice';
import {getProductVariations} from 'src/services/wooCommerceApi';
import LoadingLogo from 'src/Components/LoadingLogo';
import CSafeAreaView from 'src/Components/CSafeAreaView';

function findVariation(variations, selectedAttributes) {
  return variations.find(variation => {
    return variation.attributes.every(
      attr => selectedAttributes[attr.name] === attr.option,
    );
  });
}

type ProductItem = {
  status: 'publish' | 'private';
};

const ProductList = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const {
    items: products,
    loading: productsLoading,
    error: productsError,
    paginationLoading,
    hasMore,
  } = useAppSelector(state => state.products);
  const {category, categoryId} = route.params || {
    category: 'All',
    products: [],
  };
  const wishlistItems = useSelector(state => state.wishlist.items);

  useEffect(() => {
    dispatch(fetchProducts({categoryId, currentPage}));
  }, [categoryId, currentPage]);

  useEffect(() => {
    if (products) {
      const filteredProductsData = products.filter(
        (item: ProductItem) => item.status === 'publish',
      );
      setFilteredProducts([...filteredProductsData]);
    }
  }, [products]);

  const handleLoadMore = () => {
    if (!paginationLoading && hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const renderProductItem = ({item}) => {
    return <ProductItemCard item={item} wishlistItems={wishlistItems} />;
  };

  return (
    <CSafeAreaView removeBottomSafeArea>
      <View style={styles.container}>
        <Header title={`${category} Products`} icon1={BackIcon} />
        {productsLoading ? (
          <View style={styles.loadingContainer}>
            <LoadingLogo size={120} />
          </View>
        ) : (
          <FlatList
            data={filteredProducts}
            renderItem={renderProductItem}
            numColumns={2}
            keyExtractor={(item, index) =>
              item.id?.toString() || index.toString()
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() =>
              paginationLoading ? (
                <ActivityIndicator size="small" style={{marginVertical: 10}} />
              ) : null
            }
          />
        )}
      </View>
    </CSafeAreaView>
  );
};

export default ProductList;

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
        Alert.alert('Error : ', e.message);
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
              width={25}
              height={25}
              color={isInWishlist ? '#CC5656' : '#ffffff'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
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
            {/* <View style={styles.ratingContainer}>
              <Text style={styles.ratingIcon}>⭐</Text>
              <Text style={styles.ratingText}>
                {item.average_rating || '0.0'}
              </Text>
            </View> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

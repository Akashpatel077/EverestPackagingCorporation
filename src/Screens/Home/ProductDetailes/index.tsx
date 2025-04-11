import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {styles} from './styles';
import {BackIcon, Heart} from 'assets/icons';
import {Header, Icon} from 'src/Components';
import {useAppDispatch, useAppSelector} from 'src/store/hooks';
import {fetchProductDetails} from '../../../store/slices/productDetailsSlice';
import {
  addToWishlist,
  removeFromWishlist,
  isProductInWishlist,
} from '../../../store/slices/wishlistSlice';
import {addToCart} from '../../../store/slices/cartSlice';
import RenderHtml from 'react-native-render-html';
import {getProductVariations} from 'src/services/wooCommerceApi';
import RNPickerSelect from 'react-native-picker-select';
import {FilePicker} from '../../../Components';
import LoadingLogo from 'src/Components/LoadingLogo';

function findVariation(variations, selectedAttributes) {
  return variations.find(variation => {
    return variation.attributes.every(
      attr => selectedAttributes[attr.name] === attr.option,
    );
  });
}

const keysToExtract = [
  'min_quantity',
  'max_quantity',
  'default_quantity',
  'product_step',
];

const ProductDetails = ({route}) => {
  const {productId} = route.params;
  const [selectedColor, setSelectedColor] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [productVariations, setProductVariations] = useState([]);
  const [isVariationNotAvailable, setIsVariationNotAvailable] = useState(false);
  const [filteredMetaData, setFilteredMetaData] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [selectedCustomExtraFields, setSelectedCustomExtraFields] = useState(
    {},
  );
  const isInWishlist = useAppSelector(state =>
    isProductInWishlist(state, productId),
  );

  console.log('selectedCustomExtraFields  : ', selectedAttributes);

  const dispatch = useAppDispatch();
  const {loading, productDetails, error} = useAppSelector(
    state => state.productDetails,
  );
  const [regularPrice, setRegularPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');

  const getProductVariationList = async () => {
    try {
      const variationList = await getProductVariations(productId);
      setProductVariations([...variationList]);
    } catch (e) {
      Alert.alert('Error : ', e.message);
    }
  };

  console.log('products : ', productDetails);

  useEffect(() => {
    setSalePrice(productDetails.price);
    setRegularPrice(productDetails.regular_price);
    if (productDetails?.variations?.length) {
      getProductVariationList();
    }
    if (productDetails?.meta_data?.length) {
      const extractedObject = productDetails.meta_data.reduce((acc, item) => {
        if (keysToExtract.includes(item.key)) {
          acc[item.key] = item.value;
        }
        return acc;
      }, {});
      const isOjectValuesEmpty = !Object.values(extractedObject).every(
        value => value === '',
      );

      if (isOjectValuesEmpty) {
        setQuantity(Number(extractedObject.default_quantity));
        setFilteredMetaData(extractedObject);
      }
    }
  }, [productDetails]);

  useEffect(() => {
    if (productVariations.length) {
      const productVariation = findVariation(
        productVariations,
        selectedAttributes,
      );

      if (productVariation) {
        setRegularPrice(productVariation.regular_price);
        setSalePrice(productVariation.sale_price);
        setIsVariationNotAvailable(false);
      } else {
        setIsVariationNotAvailable(true);
      }
    }
  }, [selectedAttributes, productVariations]);

  useEffect(() => {
    dispatch(fetchProductDetails(productId));
  }, [productId]);

  const colorOptions =
    productDetails.wcpa_form_fields?.fields.find(
      field => field.type === 'color-group',
    )?.values || [];

  useEffect(() => {
    if (colorOptions.length > 0) {
      const defaultColor =
        colorOptions.find(color => color.selected)?.value ||
        colorOptions[0].value;
      setSelectedColor(defaultColor);
    }
  }, [colorOptions]);

  const images = productDetails.images;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const renderImageItem = ({item, index}: any) => (
    <TouchableOpacity onPress={() => setCurrentImageIndex(index)}>
      <Image
        source={{uri: item?.src}}
        style={[
          styles.thumbnailImage,
          currentImageIndex === index && {
            borderColor: '#0088cc',
            borderWidth: 2,
          },
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Product Details"
        icon1={BackIcon}
        showWishlistIcon
        isInWishlist={isInWishlist}
        onWishlistPress={() => {
          if (isInWishlist) {
            dispatch(removeFromWishlist(productId));
          } else {
            dispatch(addToWishlist(productDetails));
          }
        }}
        icon2Color={isInWishlist ? '#CC5656' : '#FFF'}
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <LoadingLogo/>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{flex: 1}}
            contentContainerStyle={{paddingTop: 60}}>
            <View style={styles.mainImageContainer}>
              <Image
                source={{
                  uri: images.length ? images[currentImageIndex].src : '',
                }}
                style={styles.mainImage}
              />
            </View>

            <View style={styles.thumbnailContainer}>
              <FlatList
                data={images}
                renderItem={renderImageItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.thumbnailList}
              />
            </View>

            <View style={styles.productInfo}>
              <View style={styles.titleRow}>
                <Text style={styles.title}>{productDetails.name}</Text>
              </View>
              <View style={styles.reviewContainer}>
                <View style={styles.starContainer}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <Text key={star} style={styles.starIcon}>
                      {Number(productDetails.average_rating) >= star
                        ? '★'
                        : '☆'}
                    </Text>
                  ))}
                </View>
                <Text style={styles.reviewText}>
                  ( There are no reviews yet. )
                </Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.regularPrice}>₹{regularPrice}</Text>
                <Text style={styles.salePrice}>₹{salePrice}</Text>
              </View>

              {productDetails.attributes.length > 0 &&
                productDetails.attributes.map(
                  item =>
                    !(item.name === 'HSN Code') && (
                      <RenderAttributes
                        item={item}
                        setSelectedAttributes={setSelectedAttributes}
                      />
                    ),
                )}

              {colorOptions.length > 0 && (
                <View style={styles.colorSection}>
                  <Text style={styles.sectionTitle}>
                    Select Color
                    {selectedColor && (
                      <Text style={[styles.sectionTitle, {color: '#0088cc'}]}>
                        {` : ${selectedColor}`}
                      </Text>
                    )}
                  </Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.colorContainer}>
                    {colorOptions.map(({color, value}: any) => (
                      <TouchableOpacity
                        key={value}
                        style={[
                          styles.colorButton,
                          {backgroundColor: color},
                          selectedColor === value && styles.selectedColorButton,
                        ]}
                        onPress={() => setSelectedColor(value)}
                      />
                    ))}
                  </ScrollView>
                </View>
              )}

              {productDetails?.wcpa_form_fields?.fields?.length > 0 &&
                productDetails.wcpa_form_fields?.fields.map(item => (
                  <RenderCustomExtraFields
                    setSelectedCustomExtraFields={setSelectedCustomExtraFields}
                    item={item}
                  />
                ))}

              {/* {productDetails.price_html && (
                <View style={{paddingBottom: 10}}>
                  <RenderHtml source={{html: productDetails.price_html}} />
                </View>
              )} */}

              {Object.keys(filteredMetaData).length > 0 && (
                <QuantitySelector
                  filteredMetaData={filteredMetaData}
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
              )}

              {isVariationNotAvailable && (
                <Text style={styles.alertLabel}>
                  Sorry!, no products matched your selection. Please choose a
                  different combination.
                </Text>
              )}
              <View
                style={{
                  maxHeight: isExpanded ? 'auto' : 92,
                  overflow: 'hidden',
                }}>
                <RenderHtml source={{html: productDetails.description}} />
              </View>
              <TouchableOpacity
                onPress={() => setIsExpanded(prevValue => !prevValue)}>
                <Text style={styles.readMore}>
                  {isExpanded ? 'Read less' : 'Read more'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={styles.bottomContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Total Price</Text>
              <Text style={styles.price}>₹{salePrice}</Text>
            </View>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => {
                const selectedAttributes =
                  productDetails.attributes?.map(attr => ({
                    name: attr.name,
                    value: attr.options[0],
                  })) || [];

                dispatch(
                  addToCart({
                    id: productDetails.id,
                    quantity: 1,
                    name: productDetails.name,
                    price: productDetails.price,
                    sale_price: productDetails.sale_price,
                    color: selectedColor,
                    attributes: selectedAttributes,
                    image: productDetails.images?.[0]?.src,
                  }),
                );
              }}>
              <Text style={styles.addToCartText}>🛍 Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProductDetails;

type AttributeItem = {
  options: string[];
  name: string;
};

const RenderAttributes = ({
  item,
  setSelectedAttributes,
}: {
  item: AttributeItem;
  setSelectedAttributes: (value: {}) => void;
}) => {
  const defaultValue = item.options[0];

  const [selectedItem, setSelectedItem] = useState(defaultValue);

  useEffect(() => {
    setSelectedAttributes(prevValue => ({
      ...prevValue,
      [item.name]: defaultValue,
    }));
  }, []);

  return (
    <>
      <Text style={styles.sectionTitle}>
        {item.name}
        {selectedItem && (
          <Text style={[styles.sectionTitle, {color: '#0088cc'}]}>
            {` : ${selectedItem}`}
          </Text>
        )}
      </Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.optionContainer}>
        {item?.options &&
          item.options.map((option: any, index: any) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedItem === option && styles.selectedItem,
              ]}
              onPress={() => {
                setSelectedAttributes(prevValue => ({
                  ...prevValue,
                  [item.name]: option,
                }));
                setSelectedItem(option);
              }}>
              <Text
                style={[
                  styles.optionText,
                  selectedItem === option && styles.selectedItemText,
                ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </>
  );
};

type QuantityItemType = {
  quantity: number;
  setQuantity: (prevValue: any) => void;
  filteredMetaData: {
    min_quantity: number;
    product_step: number;
    max_quantity: number;
    default_quantity: number;
  };
};

const QuantitySelector = ({
  quantity,
  setQuantity,
  filteredMetaData,
}: QuantityItemType) => {
  return (
    <View style={styles.qtyContainer}>
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={quantity <= filteredMetaData.min_quantity}
        style={styles.incDecrButton}
        onPress={() =>
          setQuantity(
            prevValue => prevValue - Number(filteredMetaData.product_step),
          )
        }>
        <Text style={styles.plusMinusText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.qtyCountText}>{quantity}</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={quantity >= filteredMetaData.max_quantity}
        onPress={() =>
          setQuantity(
            prevValue => prevValue + Number(filteredMetaData.product_step),
          )
        }
        style={styles.incDecrButton}>
        <Text style={styles.plusMinusText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

type CustomExtraFieldsTypes = {
  label: string;
  values: {label: string; value: string; selected?: boolean}[];
  type: string;
  form_id: string;
};

const RenderCustomExtraFields = ({
  item,
  setSelectedCustomExtraFields,
}: {
  item: CustomExtraFieldsTypes;
  setSelectedCustomExtraFields: (val: any) => void;
}) => {
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    if (item.values?.length) {
      const selectedItemIndex = item.values?.findIndex(item => item.selected);
      const selectedItem = item.values[selectedItemIndex].value;
      setSelectedValue(selectedItem);
    }
  }, []);

  return item.type === 'select' ? (
    <>
      <Text style={[styles.sectionTitle, {marginBottom: 0}]}>{item.label}</Text>
      <RNPickerSelect
        value={selectedValue}
        itemKey={selectedValue}
        onValueChange={(value: string) => {
          setSelectedCustomExtraFields(prevValue => ({
            ...prevValue,
            [item.label]: value,
          }));
          setSelectedValue(value);
        }}
        items={item.values}
      />
    </>
  ) : item.type === 'file' ? (
    <>
      <Text style={[styles.sectionTitle, {marginBottom: 0}]}>{item.label}</Text>
      <FilePicker
        onUpdateFile={(fileObject: any) => {
          setSelectedCustomExtraFields(prevValue => ({
            ...prevValue,
            [item.label]: fileObject,
          }));
        }}
      />
    </>
  ) : null;
};

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {styles} from './styles';
import {BackIcon, Heart} from 'assets/icons';
import {CDropdown, Header, Icon, CustomAlert, CButton} from 'src/Components';
import {useAppDispatch, useAppSelector} from 'src/store/hooks';
import {fetchProductDetails} from '../../../store/slices/productDetailsSlice';
import {
  addToWishlist,
  removeFromWishlist,
  isProductInWishlist,
} from '../../../store/slices/wishlistSlice';
import {
  addToCartAction,
  resetFlags,
  selectCartItems,
} from '../../../store/slices/cartSlice';
import RenderHtml from 'react-native-render-html';
import {getCartItems, getProductVariations} from 'src/services/wooCommerceApi';
import {FilePicker} from '../../../Components';
import LoadingLogo from 'src/Components/LoadingLogo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MYCART} from 'src/Navigation/home/routes';
import {CommonActions} from '@react-navigation/native';
import CSafeAreaView from 'src/Components/CSafeAreaView';
import {useSelector} from 'react-redux';
import {colors, metrics, scale, typography, verticalScale} from 'src/theme';

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

const variationNotAvailableText =
  'Sorry!, no products matched your selection. Please choose a different combination.';

const ProductDetails = ({navigation, route}) => {
  const {productId} = route.params;
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [productVariations, setProductVariations] = useState([]);
  const [productVariationData, setProductVariationData] = useState({});
  const [isVariationNotAvailable, setIsVariationNotAvailable] = useState(false);
  const [filteredMetaData, setFilteredMetaData] = useState({});
  const [quantity, setQuantity] = useState(1);
  const {items} = useSelector(selectCartItems);
  const cartItemsCount = items
    ? items.reduce((total, item) => total + item.quantity, 0)
    : 0;
  const [selectedCustomExtraFields, setSelectedCustomExtraFields] = useState(
    {},
  );
  const isInWishlist = useAppSelector(state =>
    isProductInWishlist(state, productId),
  );

  const dispatch = useAppDispatch();
  const {loading, productDetails, error} = useAppSelector(
    state => state.productDetails,
  );
  const {
    isAddSuccess,
    loading: isLoading,
    error: addToCartError,
  } = useAppSelector(state => state.cart);
  const [regularPrice, setRegularPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const totalPrice = quantity * Number(salePrice);
  const isOutOfStock = productDetails.stock_status === 'outofstock';
  const [finalVariation, setFinalVariation] = useState([]);
  const {ranges} = productDetails.bulk_adjustments || {};

  useEffect(() => {
    if (addToCartError) {
      setAlertTitle('Attention!');
      setAlertMessage(addToCartError);
      setShowAlert(true);
    }
  }, [addToCartError]);

  useEffect(() => {
    if (isAddSuccess) {
      setAlertTitle('Success');
      setAlertMessage('Product added to cart');
      setShowAlert(true);

      dispatch(resetFlags());
    }
  }, [isAddSuccess]);

  useEffect(() => {
    const variation = Object.entries(selectedAttributes).map(
      ([key, value]) => ({
        attribute: key,
        value: value,
      }),
    );

    setFinalVariation(variation);
  }, [selectedAttributes]);

  const getProductVariationList = async () => {
    try {
      const variationList = await getProductVariations(productId);

      setProductVariations([...variationList]);
    } catch (e) {
      setAlertTitle('Error');
      setAlertMessage(e.message);
      setShowAlert(true);
    }
  };

  const cleanedHTML =
    productDetails.description &&
    productDetails.description.replace(/<h3>Product Description:<\/h3>/i, '');

  const storeToken = async (token: string) => {
    try {
      await AsyncStorage.setItem('userToken', token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };

  useEffect(() => {
    const fetchNonceToken = async () => {
      try {
        const cartItemsObject = await getCartItems();
        if (
          cartItemsObject.status === 200 &&
          cartItemsObject.headers['cart-token']
        ) {
          storeToken(cartItemsObject.headers['cart-token']);
        }
      } catch (error) {
        setAlertTitle('Error');
        setAlertMessage(error.message);
        setShowAlert(true);
      }
    };

    fetchNonceToken();
  }, []);

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
        setProductVariationData(productVariation);
        setRegularPrice(productVariation.regular_price);
        setSalePrice(productVariation.sale_price ?? productVariation.price);
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
            borderColor: colors.primary,
            borderWidth: 2,
          },
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <CSafeAreaView>
      <View style={styles.container}>
        <Header
          title="Product Details"
          icon1={BackIcon}
          badgeCount={cartItemsCount ?? 0}
          showCartIcon
          onCartPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: 'HomeDrawer',
                    state: {
                      index: 0,
                      routes: [
                        {
                          name: 'Home',
                          state: {
                            index: 0,
                            routes: [
                              {
                                name: 'Cart',
                                state: {
                                  index: 0,
                                  routes: [{name: 'MYCART'}],
                                },
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                ],
              }),
            );
          }}
          icon2Color={isInWishlist ? colors.red : colors.white}
        />
        {loading ? (
          <View style={styles.loadingContainer}>
            <LoadingLogo />
          </View>
        ) : (
          <View style={{flex: 1}}>
            <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
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
                {/* <View style={styles.reviewContainer}>
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
                </View> */}
                <View style={styles.priceRow}>
                  <Text style={styles.regularPrice}>₹{regularPrice}</Text>
                  <Text style={styles.salePrice}>₹{salePrice}</Text>
                </View>

                <Text style={styles.gstTitleText}>
                  GST and Shipping are calculated at checkout.
                </Text>

                {ranges && (
                  <View style={styles.bulkDiscountTableHeader}>
                    <View
                      style={[
                        styles.bulkDiscountTitleContainer,
                        {width: '40%'},
                      ]}>
                      <Text style={styles.bulkDiscountTitleText}>Qty(pcs)</Text>
                    </View>
                    <View
                      style={[styles.bulkDiscountTitleContainer, {flex: 1}]}>
                      <Text style={styles.bulkDiscountTitleText}>
                        Per Piece Price
                      </Text>
                    </View>
                  </View>
                )}
                {ranges &&
                  Object.values(ranges).map(item => {
                    const {from, value} = item;
                    const priceAfterDiscount = (
                      salePrice -
                      (salePrice * value) / 100
                    ).toFixed(2);
                    return (
                      <View style={styles.bulkDiscountTableRow}>
                        <View
                          style={[
                            styles.bulkDiscountRowContainer,
                            {width: '40%'},
                          ]}>
                          <Text style={styles.bulkDiscountRowText}>
                            Buy {from}
                          </Text>
                        </View>
                        <View
                          style={[styles.bulkDiscountRowContainer, {flex: 1}]}>
                          <Text
                            style={[
                              styles.bulkDiscountRowText,
                              {color: colors.red},
                            ]}>
                            ₹{priceAfterDiscount}
                          </Text>
                        </View>
                      </View>
                    );
                  })}

                {productDetails.type === 'variable' &&
                  productDetails.attributes.length > 0 &&
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
                        <Text
                          style={[
                            styles.sectionTitle,
                            {color: colors.dimGray},
                          ]}>
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
                            selectedColor === value &&
                              styles.selectedColorButton,
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
                      setSelectedCustomExtraFields={
                        setSelectedCustomExtraFields
                      }
                      item={item}
                    />
                  ))}

                {Object.keys(filteredMetaData).length > 0 && (
                  <QuantitySelector
                    filteredMetaData={filteredMetaData}
                    quantity={quantity}
                    setQuantity={setQuantity}
                  />
                )}

                {isVariationNotAvailable && (
                  <Text style={styles.alertLabel}>
                    {variationNotAvailableText}
                  </Text>
                )}
                {cleanedHTML && (
                  <>
                    <Text
                      style={[
                        styles.sectionTitle,
                        {marginTop: metrics.margin.sm},
                      ]}>
                      Product Description:
                    </Text>
                    <View
                      style={{
                        maxHeight: isExpanded ? 'auto' : scale(100),
                        overflow: 'hidden',
                        borderRadius: metrics.borderRadius.md,
                        marginHorizontal: metrics.margin.xxs,
                      }}>
                      <RenderHtml
                        contentWidth={300}
                        source={{html: cleanedHTML}}
                        tagsStyles={{
                          body: {
                            color: colors.dimGray,
                            fontSize: typography.fontSize.xs,
                            lineHeight: scale(18),
                          },
                          p: {
                            marginBottom: metrics.margin.xs,
                          },
                          ul: {
                            marginLeft: metrics.margin.md,
                          },
                          li: {
                            marginBottom: metrics.margin.xxs,
                          },
                          strong: {
                            color: colors.darkGray,
                            fontFamily: 'Poppins-Bold',
                            fontWeight: '700',
                          },
                          b: {
                            fontWeight: '700',
                            color: colors.darkGray,
                            fontFamily: 'Poppins-Bold',
                          },
                        }}
                      />
                    </View>
                    <TouchableOpacity
                      style={{
                        alignItems: 'flex-start',
                        paddingTop: metrics.padding.xs,
                      }}
                      onPress={() => setIsExpanded(prevValue => !prevValue)}>
                      <Text style={[styles.readMore, {color: colors.primary}]}>
                        {isExpanded ? 'Read less' : 'Read more'}
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </ScrollView>
            <View style={styles.bottomContainer}>
              <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>Total Price</Text>
                <Text style={styles.price}>₹{totalPrice.toFixed(2)}</Text>
              </View>
              <TouchableOpacity
                style={styles.wishListButton}
                onPress={() => {
                  if (isInWishlist) {
                    dispatch(removeFromWishlist(productId));
                  } else {
                    dispatch(addToWishlist(productDetails));
                  }
                }}>
                <Icon
                  name={Heart}
                  width={metrics.iconSize.sm}
                  height={metrics.iconSize.sm}
                  color={isInWishlist ? colors.red : colors.white}
                />
              </TouchableOpacity>
              <CButton
                disabled={isLoading}
                isLoading={isLoading}
                style={styles.addToCartButton}
                onPress={() => {
                  if (isOutOfStock) {
                  } else if (isVariationNotAvailable) {
                    setAlertTitle('Attention!');
                    setAlertMessage(variationNotAvailableText);
                    setShowAlert(true);
                  } else {
                    dispatch(
                      addToCartAction({
                        productId,
                        quantity,
                        variation: finalVariation,
                      }),
                    );
                  }
                }}
                title={isOutOfStock ? 'Out of Stock' : '🛍 Add to Cart'}
              />
            </View>
          </View>
        )}
      </View>
      <CustomAlert
        visible={showAlert}
        title={alertTitle}
        description={alertMessage}
        button2={{
          text: 'OK',
          onPress: () => {
            setShowAlert(false);
            if (
              alertTitle === 'Attention!' &&
              alertMessage === addToCartError
            ) {
              dispatch(resetFlags());
            }
          },
          color: colors.primary,
        }}
      />
    </CSafeAreaView>
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
          <Text style={[styles.sectionTitle, {color: colors.dimGray}]}>
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
        style={styles.decrButton}
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
        style={styles.incButton}>
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
  placeholder: string;
};

const RenderCustomExtraFields = ({
  item,
  setSelectedCustomExtraFields,
}: {
  item: CustomExtraFieldsTypes;
  setSelectedCustomExtraFields: (val: any) => void;
}) => {
  const [selectedValue, setSelectedValue] = useState({
    label: '',
    value: '',
    selected: false,
  });

  useEffect(() => {
    if (item.values?.length) {
      const selectedItemIndex = item.values?.findIndex(item => item.selected);
      const selectedItem = item.values[selectedItemIndex];
      setSelectedValue({...selectedItem});
    }
  }, []);

  return item.type === 'select' ? (
    <>
      <Text style={[styles.sectionTitle, {}]}>{item.label}</Text>
      <CDropdown
        data={item.values}
        dropDownStyle={{
          height: verticalScale(35),
          marginBottom: metrics.margin.md,
        }}
        selectedItem={selectedValue}
        onSelect={(itemObject: any) => {
          setSelectedCustomExtraFields(prevValue => ({
            ...prevValue,
            [item.label]: itemObject.value,
          }));
          setSelectedValue(itemObject);
        }}
      />
    </>
  ) : item.type === 'file' ? (
    <>
      <Text style={[styles.sectionTitle, {}]}>{item.label}</Text>
      <FilePicker
        placeHolder={item.placeholder}
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

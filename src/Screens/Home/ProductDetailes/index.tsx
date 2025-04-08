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
} from 'react-native';
import {styles} from './styles';
import {BackIcon, Heart} from 'assets/icons';
import {Header, Icon} from 'src/Components';
import {useAppDispatch, useAppSelector} from 'src/store/hooks';
import {
  addToWishlist,
  removeFromWishlist,
  isProductInWishlist,
} from '../../../store/slices/wishlistSlice';
import {addToCart} from '../../../store/slices/cartSlice';
import RenderHtml from 'react-native-render-html';

const ProductDetails = ({route}) => {
  const {product} = route.params;
  const [selectedColor, setSelectedColor] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isInWishlist = useAppSelector(state =>
    isProductInWishlist(state, product.id),
  );
  const dispatch = useAppDispatch();

  const colorOptions =
    product.wcpa_form_fields?.fields.find(field => field.type === 'color-group')
      ?.values || [];

  useEffect(() => {
    if (colorOptions.length > 0) {
      const defaultColor =
        colorOptions.find(color => color.selected)?.value ||
        colorOptions[0].value;
      setSelectedColor(defaultColor);
    }
  }, [colorOptions]);

  const images = product.images;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const renderImageItem = ({item, index}: any) => (
    <TouchableOpacity onPress={() => setCurrentImageIndex(index)}>
      <Image
        source={{uri: item?.src}}
        style={[
          styles.thumbnailImage,
          currentImageIndex === index && {
            borderColor: '#8B4513',
            borderWidth: 2,
          },
        ]}
      />
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <Header
          title="Product Details"
          icon1={BackIcon}
          icon2={Heart}
          onPressSecond={() => {
            if (isInWishlist) {
              dispatch(removeFromWishlist(product.id));
            } else {
              dispatch(addToWishlist(product));
            }
          }}
          icon2Color={isInWishlist ? '#CC5656' : '#333333'}
        />
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
            <Text style={styles.title}>{product.name}</Text>
          </View>
          <View style={styles.reviewContainer}>
            <View style={styles.starContainer}>
              {[1, 2, 3, 4, 5].map((star: any, index: any) => (
                <Text key={index} style={styles.starIcon}>
                  {Number(product.average_rating) >= star ? '★' : '☆'}
                </Text>
              ))}
            </View>
            <Text style={styles.reviewText}>( There are no reviews yet. )</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.regularPrice}>
              {product.regular_price ? `₹${product.regular_price}` : ''}
            </Text>
            <Text style={styles.salePrice}>
              {product.sale_price
                ? `₹${product.sale_price}`
                : `₹${product.price}`}
            </Text>
          </View>

          <View
            style={{maxHeight: isExpanded ? 'auto' : 92, overflow: 'hidden'}}>
            <RenderHtml source={{html: product.description}} />
          </View>
          {/* <Text style={styles.description}>{productDetails.description}</Text> */}
          <TouchableOpacity
            onPress={() => setIsExpanded(prevValue => !prevValue)}>
            <Text style={styles.readMore}>
              {isExpanded ? 'Read less' : 'Read more'}
            </Text>
          </TouchableOpacity>

          {product.attributes?.length > 0 &&
            product.attributes.map((item: any, index: any) => (
              <RenderAttributes item={item} key={index} />
            ))}

          {colorOptions.length > 0 && (
            <View style={styles.colorSection}>
              <Text style={styles.sectionTitle}>
                Select Color : {selectedColor}
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
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Total Price</Text>
          <Text style={styles.price}>
            ₹{product.sale_price || product.price}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => {
            const selectedAttributes =
              product.attributes?.map(attr => ({
                name: attr.name,
                value: attr.options[0], // Using first option as default if not selected
              })) || [];

            dispatch(
              addToCart({
                id: product.id,
                quantity: 1,
                name: product.name,
                price: product.price,
                sale_price: product.sale_price,
                color: selectedColor,
                attributes: selectedAttributes,
                image: product.images?.[0]?.src,
              }),
            );
          }}>
          <Text style={styles.addToCartText}>🛍 Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;

type AttributeItem = {
  options: string[];
  name: string;
};

const RenderAttributes = ({item}: {item: AttributeItem}) => {
  const defaultValue =
    item.name === 'Non woven sizes'
      ? '8x10'
      : item.name === 'Quantity'
      ? '100 pcs'
      : item.name === 'Printing Side'
      ? 'Single Side'
      : item.options[0];
  const [selectedItem, setSelectedItem] = useState(defaultValue);

  return (
    <>
      <Text style={styles.sectionTitle}>
        {item.name}
        {selectedItem ? ` : ${selectedItem}` : ''}
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
              onPress={() => setSelectedItem(option)}>
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

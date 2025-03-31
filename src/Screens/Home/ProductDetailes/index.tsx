import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { styles } from './styles';
import { BackIcon, Heart } from 'assets/icons';
import { Header, Icon } from 'src/Components';

const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Brown');
  const [isFavorite, setIsFavorite] = useState(false);

  const sizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const colors = ['#E6C7B8', '#8B4513', '#DEB887', '#A0522D', '#CD853F', '#000000'];

  const images = [
    require('assets/images/banner.png'),
    require('assets/images/banner.png'),
    require('assets/images/banner.png'),
    require('assets/images/banner.png'),
    require('assets/images/banner.png'),
    require('assets/images/banner.png'),
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const renderImageItem = ({ item, index }:any) => (
    <TouchableOpacity onPress={() => setCurrentImageIndex(index)}>
      <Image 
        source={item} 
        style={[styles.thumbnailImage, currentImageIndex === index && {
          borderColor: '#8B4513',
          borderWidth: 2,
        }]} 
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Product Details</Text>
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <Icon width={24} height={24} name={Heart} />
          </TouchableOpacity>
        </View> */}

        <Header title='Product Details' icon1={BackIcon} icon2={Heart}/>

        <View style={styles.mainImageContainer}>
          <Image 
            source={images[currentImageIndex]} 
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
          <Text style={styles.category}>Female's Style</Text>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Light Brown Jacket</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingIcon}>★</Text>
              <Text style={styles.rating}>4.5</Text>
            </View>
          </View>

          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua
          </Text>
          <TouchableOpacity>
            <Text style={styles.readMore}>Read more</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Select Size</Text>
          <View style={styles.sizeContainer}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[styles.sizeButton, selectedSize === size && styles.selectedSize]}
                onPress={() => setSelectedSize(size)}
              >
                <Text style={[styles.sizeText, selectedSize === size && styles.selectedSizeText]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.colorSection}>
            <Text style={styles.sectionTitle}>Select Color : {selectedColor}</Text>
            <View style={styles.colorContainer}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[styles.colorButton, { backgroundColor: color }]}
                  onPress={() => setSelectedColor(color === '#8B4513' ? 'Brown' : color)}
                />
              ))}
            </View>
          </View>

          <View style={styles.bottomContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Total Price</Text>
              <Text style={styles.price}>$83.97</Text>
            </View>
            <TouchableOpacity style={styles.addToCartButton}>
              <Text style={styles.addToCartText}>🛍 Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;
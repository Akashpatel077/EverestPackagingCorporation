import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import SearchBar from '../../../Components/CustomSearch';
import {styles} from './styles.ts';
import {ic_Bags, ic_Boxes, ic_Tapes} from 'assets/icons/index.ts';
import {Icon} from 'src/Components/index.ts';
import {useNavigation} from '@react-navigation/native';
import {PRODUCT_DETAILS} from 'src/Navigation/home/routes.ts';

const categoryData = [
  {
    id: '1',
    name: 'Bags',
    Icon: ic_Bags,
    subCategories: [
      'COURIER BAGS',
      'CUSTOM PRINTED COURIER BAGS',
      'FROSTED ZIPPER BAGS',
      'NON WOVEN BAGS',
      'CARRY BAG',
      'ZIP LOCK POUCHES',
      'BUBBLE POSTAL ENVELOPES',
    ],
  },
  {id: '2', name: 'Boxes', Icon: ic_Boxes},
  {id: '3', name: 'Tapes', Icon: ic_Tapes},
];

const productsData = [
  {
    id: '1',
    name: 'Brown Jacket',
    price: 83.97,
    rating: 4.9,
    image: require('../../../../assets/images/banner.png'),
  },
  {
    id: '2',
    name: 'Brown Suite',
    price: 120.0,
    rating: 5.0,
    image: require('../../../../assets/images/banner.png'),
  },
  {
    id: '3',
    name: 'Brown Jacket',
    price: 83.97,
    rating: 4.9,
    image: require('../../../../assets/images/banner.png'),
  },
  {
    id: '4',
    name: 'Yellow Shirt',
    price: 120.0,
    rating: 5.0,
    image: require('../../../../assets/images/banner.png'),
  },
];

const HomeScreen = () => {
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(
      2,
      '0',
    )} : ${String(secs).padStart(2, '0')}`;
  };

  const renderCategoryItem = ({item}: {item: any}) => (
    <View>
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() =>
          setSelectedCategory(selectedCategory === item.id ? null : item.id)
        }>
        <View style={styles.categoryIcon}>
          <Icon name={item.Icon} width={30} height={30} />
        </View>
        <Text style={styles.categoryName}>{item.name}</Text>
      </TouchableOpacity>
      {selectedCategory === item.id && item.subCategories && (
        <View style={styles.dropdownContainer}>
          {item.subCategories.map((subCategory: string, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownItem}
              onPress={() => console.log(subCategory)}>
              <Text style={styles.dropdownText}>{subCategory}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  const renderProductItem = ({item}: {item: any}) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => {
        navigation.navigate(PRODUCT_DETAILS);
      }}>
      <View style={styles.productImageContainer}>
        <Image source={item.image} style={styles.productImage} />
        <TouchableOpacity style={styles.favoriteButton}>
          <Text style={styles.favoriteIcon}>♡</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingIcon}>⭐</Text>
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
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
          data={categoryData}
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
          <View style={styles.timerContainer}>
            <Text style={styles.closingText}>Closing in : </Text>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          </View>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          horizontal>
          <TouchableOpacity style={[styles.filterButton, styles.filterActive]}>
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
        <FlatList
          style={{paddingHorizontal: 12}}
          data={productsData}
          renderItem={renderProductItem}
          numColumns={2}
          keyExtractor={item => item.id}
          columnWrapperStyle={styles.productGrid}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Header} from 'src/Components';
import {BackIcon} from 'assets/icons';
import {PRODUCT_LIST} from 'src/Navigation/home/routes';
import {styles} from './styles';
import {RootState} from 'src/store';
import {Category} from 'src/store/slices/categorySlice';
import {getSubCategories} from 'src/services/wooCommerceApi';

const SubCategoryScreen = ({route}) => {
  const navigation = useNavigation();
  const {category, categoryId} = route.params;
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await getSubCategories(categoryId);
        setSubCategories(response);
        if (!response || response.length === 0) {
          navigation.replace(PRODUCT_LIST, {
            category,
            categoryId,
          });
        }
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        navigation.replace(PRODUCT_LIST, {
          category,
          categoryId,
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubCategories();
  }, [categoryId, category, navigation]);

  const renderSubCategoryItem = ({item}: {item: Category}) => {
    const handleSubCategoryPress = async () => {
      navigation.navigate(PRODUCT_LIST, {
        category: item.name,
        categoryId: item.id,
      });
    };

    return (
      <TouchableOpacity
        style={styles.productCard}
        onPress={handleSubCategoryPress}>
        <View style={styles.productImageContainer}>
          <Image
            source={item.image && item.image.src && {uri: item.image.src}}
            resizeMode="contain"
            style={styles.productImage}
          />
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={category} icon1={BackIcon} />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0088cc" />
        </View>
      ) : (
        <FlatList
          data={subCategories}
          renderItem={renderSubCategoryItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.productGrid}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </SafeAreaView>
  );
};

export default SubCategoryScreen;

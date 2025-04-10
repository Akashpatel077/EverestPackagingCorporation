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
import styles from './styles';
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
    const handleSubCategoryPress = async (item: Category) => {
      navigation.navigate(PRODUCT_LIST, {
        category: item.name,
        categoryId: item.id,
      });
    };

    return (
      <TouchableOpacity
        style={styles.categoryWrapper}
        onPress={() => handleSubCategoryPress(item)}>
        <View style={styles.categoryCard}>
          <Image
            source={item.image?.src && {uri: item.image.src}}
            style={styles.categoryImage}
            resizeMode="contain"
          />
          <Text style={styles.categoryName}>{item.name}</Text>
          <Text style={styles.categoryCount}>{item.count} products</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={category} icon1={BackIcon} />
      <View style={styles.contentContainer}>
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
            contentContainerStyle={styles.categoriesContainer}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SubCategoryScreen;

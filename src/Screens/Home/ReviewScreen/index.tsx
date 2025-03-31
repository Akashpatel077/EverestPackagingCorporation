import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {Icon} from 'src/Components';
import {Heart, Camera, Star} from 'assets/icons';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';

const ReviewScreen = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);

  const renderStar = (index: number) => (
    <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
      <Icon
        name={Star}
        width={32}
        height={32}
        color={index < rating ? '#FFD700' : '#E0E0E0'}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name={Heart} width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leave Review</Text>
      </View>

      <View style={styles.productContainer}>
        <Image
          source={require('assets/images/banner.png')}
          style={styles.productImage}
        />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>Brown Jacket</Text>
          <Text style={styles.productDetails}>Size : XL | Qty : 10pcs</Text>
          <Text style={styles.price}>$83.97</Text>
          <TouchableOpacity style={styles.reorderButton}>
            <Text style={styles.reorderText}>Re-Order</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.reviewTitle}>How is your order?</Text>

      <Text style={styles.ratingLabel}>Your overall rating</Text>
      <View style={styles.ratingContainer}>
        <View style={styles.starContainer}>
          {[0, 1, 2, 3, 4].map(renderStar)}
        </View>
      </View>

      <TextInput
        style={styles.reviewInput}
        placeholder="Add detailed review"
        multiline
        placeholderTextColor="#666666"
      />

      <TouchableOpacity style={styles.addPhotoButton}>
        <Icon name={Camera} width={24} height={24} color="#8B4513" />
        <Text style={styles.addPhotoText}>add photo</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ReviewScreen;

import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import {CButton, Header, Icon} from 'src/Components';
import {Camera, Star, BackIcon} from 'assets/icons';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import CSafeAreaView from 'src/Components/CSafeAreaView';
import {colors, metrics} from 'src/theme';

const ReviewScreen = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);

  const renderStar = (index: number) => (
    <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
      <Icon
        name={Star}
        width={metrics.iconSize.lg}
        height={metrics.iconSize.lg}
        color={index < rating ? colors.gold : colors.gainsBoro}
      />
    </TouchableOpacity>
  );

  return (
    <CSafeAreaView removeBottomSafeArea>
      <Header title="Leave Review" icon1={BackIcon} />
      <View style={styles.container}>
        <View style={styles.orderItemContainer}>
          <Image
            source={require('assets/images/banner.png')}
            style={styles.productImage}
          />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>Order : #73423</Text>
            <Text style={styles.itemInfo}>Date : 13/23/2033</Text>
            <Text style={styles.itemInfo}>Status : completed</Text>
            <Text style={styles.itemPrice}>Total : ₹156.00</Text>
            <CButton style={styles.actionButton} title={'Re-Order'} />
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
          placeholder="Enter here"
          multiline
          placeholderTextColor="#666666"
        />

        <TouchableOpacity style={styles.addPhotoButton}>
          <Icon
            name={Camera}
            width={metrics.iconSize.sm}
            height={metrics.iconSize.sm}
            color={colors.primary}
          />
          <Text style={styles.addPhotoText}>Add photo</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <CButton
            style={styles.submitButton}
            title={'Cancel'}
            onPress={() => navigation.goBack()}
          />
          <CButton
            style={styles.submitButton}
            title={'Submit'}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </CSafeAreaView>
  );
};

export default ReviewScreen;

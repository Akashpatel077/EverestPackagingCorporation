import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import { HOMESCREEN } from 'src/Navigation/home/routes';
import { LOGIN } from 'src/Navigation/auth/routes';
import { useDispatch } from 'react-redux';
import { setStartKey } from 'src/store/slices/startKeySlice';

const categories = [
  {
    id: '1',
    title: 'Courier Bag',
    icon: 'package-variant',
    description: 'Durable bags for secure shipping',
    imageUrl: 'https://images.unsplash.com/photo-1605164599901-db560c18d19d?w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Envelopes',
    icon: 'email',
    description: 'Professional mailing solutions',
    imageUrl: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Pouches',
    icon: 'bag-personal',
    description: 'Versatile storage options',
    imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Cover',
    icon: 'shield-outline',
    description: 'Protective packaging covers',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop',
  },
  {
    id: '5',
    title: 'Mailing Bags',
    icon: 'mailbox',
    description: 'Secure postal packaging',
    imageUrl: 'https://images.unsplash.com/photo-1597168509336-d417e6428c24?w=800&auto=format&fit=crop',
  },
  {
    id: '6',
    title: 'Plastic Poly-bags',
    icon: 'shopping',
    description: 'Multi-purpose poly bags',
    imageUrl: 'https://images.unsplash.com/photo-1591079406666-108b8cc0e707?w=800&auto=format&fit=crop',
  },
  {
    id: '7',
    title: 'Polythene Bags',
    icon: 'shopping-outline',
    description: 'Quality polythene solutions',
    imageUrl: 'https://images.unsplash.com/photo-1591079406231-2846c05f4e60?w=800&auto=format&fit=crop'
  },
];

const Welcome = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heroSection}>
        <Text style={styles.title}>
          Packaging <Text style={styles.titleHighlight}>Solutions</Text>
        </Text>
        <Text style={styles.subtitle}>
          Discover our premium range of packaging products for all your business needs
        </Text>
      </View>

      <View style={styles.categoryGrid}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => {navigation.navigate('Home', { screen: HOMESCREEN })}}>
            <View style={styles.categoryContent}>
              <Image 
                source={{ uri: category.imageUrl }}
                style={styles.categoryImage}
                // defaultSource={require('assets/images/placeholder.png')}
              />
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Text style={styles.categoryDescription}>
                {category.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

       <View style={styles.bottomSection}>
         <TouchableOpacity
           style={styles.button}
           onPress={() => {
             dispatch(setStartKey('user'));
             navigation.navigate('Home', { screen: HOMESCREEN });
           }}>
           <Text style={styles.buttonText}>Explore All Products</Text>
         </TouchableOpacity>

         <View style={styles.signInContainer}>
           <Text style={styles.signInText}>Already have an account?</Text>
           <TouchableOpacity onPress={() => navigation.navigate(LOGIN)}>
             <Text style={styles.signInLink}>Sign In</Text>
           </TouchableOpacity>
         </View>
       </View>
     </ScrollView>
   );
 };

export default Welcome;
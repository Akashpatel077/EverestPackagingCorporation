import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HOMESCREEN} from 'src/Navigation/home/routes';
import {LOGIN} from 'src/Navigation/auth/routes';
import {useDispatch} from 'react-redux';
import {setStartKey} from 'src/store/slices/startKeySlice';

const fashionImages = [
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800',
  'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800',
];

const categories = [
  {
    id: '1',
    title: 'Courier Bag',
    icon: 'package-variant',
    description: 'Durable bags for secure shipping',
    imageUrl:
      'https://images.unsplash.com/photo-1605164599901-db560c18d19d?w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Envelopes',
    icon: 'email',
    description: 'Professional mailing solutions',
    imageUrl:
      'https://images.unsplash.com/photo-1579751626657-72bc17010498?w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Pouches',
    icon: 'bag-personal',
    description: 'Versatile storage options',
    imageUrl:
      'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Cover',
    icon: 'shield-outline',
    description: 'Protective packaging covers',
    imageUrl:
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop',
  },
  {
    id: '5',
    title: 'Mailing Bags',
    icon: 'mailbox',
    description: 'Secure postal packaging',
    imageUrl:
      'https://images.unsplash.com/photo-1597168509336-d417e6428c24?w=800&auto=format&fit=crop',
  },
  {
    id: '6',
    title: 'Plastic Poly-bags',
    icon: 'shopping',
    description: 'Multi-purpose poly bags',
    imageUrl:
      'https://images.unsplash.com/photo-1591079406666-108b8cc0e707?w=800&auto=format&fit=crop',
  },
  {
    id: '7',
    title: 'Polythene Bags',
    icon: 'shopping-outline',
    description: 'Quality polythene solutions',
    imageUrl:
      'https://images.unsplash.com/photo-1591079406231-2846c05f4e60?w=800&auto=format&fit=crop',
  },
];

const Welcome = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageLayout}>
        <Image
          source={{uri: fashionImages[0]}}
          style={styles.mainImage}
          resizeMode="cover"
        />
        <View style={styles.smallImagesContainer}>
          <Image
            source={{uri: fashionImages[1]}}
            style={styles.smallImage}
            resizeMode="cover"
          />
          <Image
            source={{uri: fashionImages[2]}}
            style={styles.smallImage}
            resizeMode="cover"
          />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          The <Text style={styles.titleHighlight}>Fashion App</Text> That
        </Text>
        <Text style={styles.subtitle}>Makes You Look Your Best</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            dispatch(setStartKey('user'));
            navigation.navigate('Home', {screen: HOMESCREEN});
          }}>
          <Text style={styles.buttonText}>Let's Get Started</Text>
        </TouchableOpacity>

        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate(LOGIN)}>
            <Text style={styles.signInLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageLayout: {
    flex: 1,
    width: '100%',
    height: Dimensions.get('window').height * 0.6,
    flexDirection: 'row',
    padding: 16,
  },
  mainImage: {
    flex: 1,
    borderRadius: 24,
    marginRight: 8,
  },
  smallImagesContainer: {
    width: '40%',
    justifyContent: 'space-between',
  },
  smallImage: {
    height: '48%',
    borderRadius: 24,
  },
  contentContainer: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
  },
  titleHighlight: {
    color: '#0088cc',
  },
  subtitle: {
    fontSize: 24,
    color: '#000000',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#0088cc',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: '100%',
    marginBottom: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontSize: 16,
    color: '#666666',
  },
  signInLink: {
    fontSize: 16,
    color: '#0088cc',
    fontWeight: '600',
  },
});

export default Welcome;
//             <View style={styles.categoryContent}>
//               <Image
//                 source={{ uri: category.imageUrl }}
//                 style={styles.categoryImage}
//                 // defaultSource={require('assets/images/placeholder.png')}
//               />
//               <Text style={styles.categoryTitle}>{category.title}</Text>
//               <Text style={styles.categoryDescription}>
//                 {category.description}
//               </Text>
//             </View>
//           </TouchableOpacity>
//         ))}
//       </View>

//        <View style={styles.bottomSection}>
//          <TouchableOpacity
//            style={styles.button}
//            onPress={() => {
//              dispatch(setStartKey('user'));
//              navigation.navigate('Home', { screen: HOMESCREEN });
//            }}>
//            <Text style={styles.buttonText}>Explore All Products</Text>
//          </TouchableOpacity>

//          <View style={styles.signInContainer}>
//            <Text style={styles.signInText}>Already have an account?</Text>
//            <TouchableOpacity onPress={() => navigation.navigate(LOGIN)}>
//              <Text style={styles.signInLink}>Sign In</Text>
//            </TouchableOpacity>
//          </View>
//        </View>
//      </ScrollView>
//    );
//  };

// export default Welcome;

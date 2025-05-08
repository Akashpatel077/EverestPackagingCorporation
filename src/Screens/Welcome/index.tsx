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
import {verticalScale, moderateScale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';
import {setShowWelcome, setStartKey} from 'src/store/slices/startKeySlice';
import {CButton} from 'src/Components';
import {colors, metrics, typography} from 'src/theme';
import CSafeAreaView from 'src/Components/CSafeAreaView';

const fashionImages = [
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800',
  'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800',
];

const Welcome = () => {
  const dispatch = useDispatch();

  return (
    <CSafeAreaView removeBottomSafeArea>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
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

          <CButton
            style={styles.getStartedButton}
            onPress={() => {
              dispatch(setStartKey('user'));
              dispatch(setShowWelcome(false));
            }}
            title={"Let's Get Started"}
          />

          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => dispatch(setShowWelcome(false))}>
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </CSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: metrics.padding.xl,
    backgroundColor: colors.background.light,
  },
  imageLayout: {
    flex: 1,
    width: '100%',
    height: Dimensions.get('window').height * 0.6,
    flexDirection: 'row',
    paddingHorizontal: metrics.padding.lg,
  },
  mainImage: {
    flex: 1,
    borderRadius: metrics.borderRadius.md,
    marginRight: metrics.margin.sm,
  },
  smallImagesContainer: {
    width: '40%',
    justifyContent: 'space-between',
  },
  smallImage: {
    height: '49%',
    borderRadius: metrics.borderRadius.md,
  },
  contentContainer: {
    paddingHorizontal: metrics.padding.md,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text.light,
    textAlign: 'center',
  },
  titleHighlight: {
    color: colors.primary,
  },
  subtitle: {
    fontSize: typography.fontSize.xl,
    color: colors.text.light,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  },
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.dimGray,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(24),
  },
  signInText: {
    fontSize: moderateScale(16),
    color: colors.dimGray,
    fontFamily: 'Poppins-Regular',
  },
  signInLink: {
    fontSize: moderateScale(16),
    color: colors.primary,
    fontFamily: 'Poppins-SemiBold',
  },
  getStartedButton: {
    width: '100%',
  },
});

export default Welcome;

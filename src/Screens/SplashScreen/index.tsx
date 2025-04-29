import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ic_Boxes, ic_Tapes, ic_Bags} from '../../../assets/icons';
import Logo from '../../../assets/images/Logo.png';
import {Icon} from 'src/Components';
import {WELCOME, HOMESCREEN} from 'src/Navigation/home/routes';
import {useSelector} from 'react-redux';
import {RootState} from 'src/store';

const {width, height} = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation();
  const startKey = useSelector((state: RootState) => state.startKey.value);
  const logoScale = new Animated.Value(0);
  const fadeAnim = new Animated.Value(0);
  const iconPosition = new Animated.Value(height);
  const iconScale = new Animated.Value(0);
  const iconBubbles = [
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ];

  useEffect(() => {
    // Animate logo scaling
    Animated.spring(logoScale, {
      toValue: 1,
      tension: 10,
      friction: 2,
      useNativeDriver: true,
    }).start();

    // Animate text fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Animate icons sliding up and scaling with bubbles
    Animated.sequence([
      Animated.delay(500), // Delay before starting icon animations
      Animated.parallel([
        Animated.spring(iconPosition, {
          toValue: height / 2 + 50,
          tension: 30,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(iconScale, {
          toValue: 1,
          tension: 30,
          friction: 8,
          useNativeDriver: true,
        }),
        ...iconBubbles.map((bubble, index) =>
          Animated.sequence([
            Animated.delay(index * 300),
            Animated.spring(bubble, {
              toValue: 1,
              tension: 40,
              friction: 6,
              useNativeDriver: true,
            }),
          ]),
        ),
      ]),
    ]).start();

    // Navigate based on startKey after animations
    const timer = setTimeout(() => {
      navigation.replace(startKey ? 'Home' : 'Welcome');
    }, 4500);

    return () => clearTimeout(timer);
  }, [navigation, startKey]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.logoContainer, {transform: [{scale: logoScale}]}]}>
        <Image source={Logo} style={styles.logoImage} resizeMode="contain" />
      </Animated.View>

      {/* <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        Everest Packaging Corporation
      </Animated.Text> */}

      <Animated.View
        style={[
          styles.iconContainer,
          {
            transform: [{translateY: iconPosition}, {scale: iconScale}],
          },
        ]}>
        {[ic_Boxes, ic_Bags, ic_Tapes].map((icon, index) => (
          <Animated.View
            key={index}
            style={{
              transform: [{scale: iconBubbles[index]}],
              backgroundColor: ['#2196F3', '#4CAF50', '#FF9800'][index],
              borderRadius: 30,
              padding: 12,
              marginHorizontal: 8,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
            <Icon name={icon} width={40} height={40} color="#FFFFFF" />
          </Animated.View>
        ))}
      </Animated.View>

      <Animated.Text style={[styles.tagline, {opacity: fadeAnim}]}>
        Your Complete Packaging Solution
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 250,
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    color: '#1976D2',
    fontFamily: 'SchibstedGrotesk-Bold',
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.9,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 25,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    backdropFilter: 'blur(10px)',
  },
  tagline: {
    position: 'absolute',
    bottom: 50,
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default SplashScreen;

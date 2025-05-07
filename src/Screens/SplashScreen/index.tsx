import React, {useEffect} from 'react';
import {View, StyleSheet, Animated, Dimensions, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Logo from '../../../assets/images/logo.png';
import {useSelector} from 'react-redux';
import {RootState} from 'src/store';
import {colors, scale, typography} from 'src/theme';

const {height} = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation();
  const startKey = useSelector((state: RootState) => state.startKey.hasStarted);
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
  }, [navigation, startKey]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.logoContainer, {transform: [{scale: logoScale}]}]}>
        <Image source={Logo} style={styles.logoImage} resizeMode="contain" />
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
    backgroundColor: colors.ghostWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {},
  logoImage: {
    width: scale(300),
    height: scale(250),
    resizeMode: 'contain',
  },
  tagline: {
    position: 'absolute',
    bottom: scale(45),
    fontSize: typography.fontSize.sm,
    color: colors.dimGray,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default SplashScreen;

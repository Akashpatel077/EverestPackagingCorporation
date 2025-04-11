import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Image, Easing} from 'react-native';

interface LoadingLogoProps {
  size?: number;
}

const LoadingLogo: React.FC<LoadingLogoProps> = ({size = 100}) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: -20,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.bezier(0.4, 0, 0.2, 1),
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.bounce,
          }),
        ]),
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0.6,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, []);

  return (
    <View style={[styles.container, {width: size, height: size}]}>
      <Animated.Image
        source={require('../../../assets/images/Logo.png')}
        style={[
          styles.logo,
          {
            width: size,
            height: size,
            transform: [{translateY: bounceAnim}],
            opacity: fadeAnim,
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});

export default LoadingLogo;
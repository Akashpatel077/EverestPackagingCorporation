import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {colors} from 'src/theme';

interface LoadingLogoProps {
  size?: number;
}

const LoadingLogo: React.FC<LoadingLogoProps> = ({size = 100}) => {
  return (
    <View style={[styles.container, {width: size, height: size}]}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingLogo;

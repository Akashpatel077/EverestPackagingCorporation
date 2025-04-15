import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

interface LoadingLogoProps {
  size?: number;
}

const LoadingLogo: React.FC<LoadingLogoProps> = ({size = 100}) => {
  return (
    <View style={[styles.container, {width: size, height: size}]}>
      <ActivityIndicator size="large" color="#1976D2" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
  },
});

export default LoadingLogo;

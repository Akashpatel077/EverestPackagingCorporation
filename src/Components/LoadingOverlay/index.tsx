import React from 'react';
import {
  Modal,
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');

interface LoadingOverlayProps {
  visible: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({visible}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => {}}>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#0088cc" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)', // Dark transparent background
    justifyContent: 'center',
    alignItems: 'center',
    width,
    height,
  },
});

export default LoadingOverlay;

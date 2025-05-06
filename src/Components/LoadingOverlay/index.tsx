import React from 'react';
import {
  Modal,
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {colors} from 'src/theme';

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
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.modalBackground, // Dark transparent background
    justifyContent: 'center',
    alignItems: 'center',
    width,
    height,
  },
});

export default LoadingOverlay;

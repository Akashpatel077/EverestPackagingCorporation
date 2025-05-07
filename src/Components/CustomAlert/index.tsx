import React from 'react';
import {Modal, View, Text, StyleSheet} from 'react-native';
import CButton from '../CButton';
import {scale, typography, verticalScale, metrics, colors} from '../../theme';

interface ButtonProps {
  text: string;
  onPress: () => void;
  color?: string;
}

interface CustomAlertProps {
  visible: boolean;
  title: string;
  description: string;
  button1?: ButtonProps;
  button2?: ButtonProps;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  description,
  button1,
  button2,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.buttonContainer}>
            {button1 && (
              <CButton
                style={[
                  styles.button,
                  {backgroundColor: button1.color || colors.primary},
                ]}
                textStyle={styles.buttonText}
                onPress={button1.onPress}
                title={button1.text}
              />
            )}
            {button2 && (
              <CButton
                style={[
                  styles.button,
                  {backgroundColor: button2.color || colors.primary},
                ]}
                onPress={button2.onPress}
                title={button2.text}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.modalBackground,
    justifyContent: 'center',
    alignItems: 'center',
    padding: metrics.padding.md,
  },
  container: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: metrics.borderRadius.lg,
    padding: metrics.padding.lg,
    elevation: 5,
  },
  title: {
    fontSize: typography.fontSize.md,
    marginBottom: metrics.margin.sm,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  description: {
    fontSize: typography.fontSize.sm,
    marginBottom: metrics.margin.lg,
    textAlign: 'center',
    color: colors.dimGray,
    fontFamily: 'Poppins-Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: scale(120),
    height: verticalScale(35),
  },
  buttonText: {
    color: colors.black,
    fontFamily: 'Poppins-SemiBold',
  },
});

import React from 'react';
import {Modal, View, Text, StyleSheet, Dimensions} from 'react-native';
import CButton from '../CButton';

const {width} = Dimensions.get('window');

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
                  {backgroundColor: button1.color || '#007bff'},
                ]}
                textStyle={styles.buttonText}
                onPress={button1.onPress}
                title={button1.text}
              />
            )}
            {button2 && (
              <CButton
                style={styles.button}
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
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  description: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
    fontFamily: 'Poppins-Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: '40%',
  },
  buttonText: {
    color: '#000000',
    fontFamily: 'Poppins-SemiBold',
  },
});

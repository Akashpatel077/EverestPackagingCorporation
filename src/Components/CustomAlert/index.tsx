import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

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
    <Modal visible={visible} transparent animationType="none">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.buttonContainer}>
            {button1 && (
              <TouchableOpacity
                style={[
                  styles.button,
                  {backgroundColor: button1.color || '#007bff'},
                ]}
                onPress={button1.onPress}>
                <Text style={[styles.buttonText, {color: '#000000'}]}>
                  {button1.text}
                </Text>
              </TouchableOpacity>
            )}
            {button2 && (
              <TouchableOpacity
                style={[
                  styles.button,
                  {backgroundColor: button2.color || '#6c757d'},
                ]}
                onPress={button2.onPress}>
                <Text style={styles.buttonText}>{button2.text}</Text>
              </TouchableOpacity>
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
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
});

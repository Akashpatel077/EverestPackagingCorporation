import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {pick} from '@react-native-documents/picker';

interface FilePickerProps {
  onUpdateFile: (val: any) => void;
  placeHolder: string;
}

const FilePicker: React.FC<FilePickerProps> = ({onUpdateFile, placeHolder}) => {
  const [fileResponse, setFileResponse] = useState({});

  const onFileSelect = useCallback(async () => {
    try {
      const [pickResult] = await pick();
      setFileResponse(pickResult);
      onUpdateFile(pickResult);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.container}
        onPress={onFileSelect}>
        <View style={styles.fileNamecontainer}>
          <Text
            numberOfLines={1}
            style={[styles.buttonText, {color: '#000000'}]}>
            {fileResponse.name || placeHolder}
          </Text>
        </View>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonText}>Choose File</Text>
        </View>
      </TouchableOpacity>
      {fileResponse.name && (
        <Text
          onPress={() => {
            setFileResponse({});
            onUpdateFile({});
          }}
          style={styles.cancelText}>
          ❌ Remove
        </Text>
      )}
    </>
  );
};

export default FilePicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#AAAAAA',
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 10,
    height: 40,
  },
  buttonText: {
    paddingHorizontal: 10,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
  },
  buttonTextContainer: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0088cc',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  fileNamecontainer: {
    flex: 1,
    padding: 5,
    paddingRight: 15,
    flexDirection: 'row',
  },
  cancelText: {
    color: '#FF0000',
    marginBottom: 10,
    textAlign: 'right',
    fontFamily: 'Poppins-Regular',
  },
});

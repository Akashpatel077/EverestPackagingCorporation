import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {pick} from '@react-native-documents/picker';

interface FilePickerProps {
  onUpdateFile: (val: any) => void;
}

const FilePicker: React.FC<FilePickerProps> = ({onUpdateFile}) => {
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
          <Text numberOfLines={1}>{fileResponse.name}</Text>
        </View>
        <Text style={styles.buttonText}>Choose File</Text>
      </TouchableOpacity>
      {fileResponse.name && (
        <Text
          onPress={() => {
            setFileResponse({});
            onUpdateFile({});
          }}
          style={styles.cancelText}>
          remove
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
  },
  buttonText: {
    backgroundColor: 'lightblue',
    paddingVertical: 5,
    padding: 10,
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
  },
});

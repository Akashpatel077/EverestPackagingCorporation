import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {pick} from '@react-native-documents/picker';
import {scale, typography, verticalScale, metrics, colors} from '../../theme';

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
        <View style={styles.fileNameContainer}>
          <Text
            numberOfLines={1}
            style={[styles.buttonText, {color: colors.black}]}>
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
    borderColor: colors.gainsBoro,
    marginVertical: metrics.margin.xs,
    alignItems: 'center',
    borderRadius: metrics.borderRadius.md,
    height: verticalScale(33),
  },
  buttonText: {
    paddingHorizontal: metrics.padding.sm,
    color: colors.white,
    fontFamily: 'Poppins-Regular',
    fontSize: typography.fontSize.xs,
  },
  buttonTextContainer: {
    height: verticalScale(33),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderTopRightRadius: metrics.borderRadius.md,
    borderBottomRightRadius: metrics.borderRadius.md,
  },
  fileNameContainer: {
    flex: 1,
    padding: metrics.padding.xs,
    paddingRight: metrics.padding.md,
    flexDirection: 'row',
  },
  cancelText: {
    color: colors.red,
    marginBottom: metrics.margin.sm,
    textAlign: 'right',
    fontFamily: 'Poppins-Regular',
    fontSize: typography.fontSize.xs,
  },
});

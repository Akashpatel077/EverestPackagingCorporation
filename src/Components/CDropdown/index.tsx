import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

interface DropdownItem {
  label: string;
  value: string | number;
}

interface CDropdownProps {
  data: DropdownItem[];
  onSelect: (item: DropdownItem) => void;
  selectedItem?: DropdownItem | null;
  title: string;
}

const CDropdown: React.FC<CDropdownProps> = ({
  data,
  onSelect,
  selectedItem,
  title,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleSelect = (item: DropdownItem) => {
    onSelect(item);
    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.dropdown}
        onPress={() => setVisible(true)}>
        <Text style={styles.selectedText}>
          {selectedItem?.label || title || 'Select an option'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        statusBarTranslucent
        presentationStyle="fullScreen">
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <FlatList
                  data={data}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.option}
                      onPress={() => handleSelect(item)}>
                      <Text style={styles.optionText}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    borderColor: '#AAAAAA',
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginTop: 5,
    marginBottom: 10,
  },
  selectedText: {fontSize: 16, color: '#333'},
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center', // Center vertically
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    maxHeight: '70%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    elevation: 5,
  },
  option: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {fontSize: 16},
});

export default CDropdown;

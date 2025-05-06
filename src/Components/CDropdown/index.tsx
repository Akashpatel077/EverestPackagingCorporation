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
import {Icon} from '../Icons';
import {DropDown} from 'assets/icons';
import {scale, typography, verticalScale, metrics, colors} from '../../theme';

interface DropdownItem {
  label: string;
  value: string | number;
}

interface CDropdownProps {
  data: DropdownItem[];
  onSelect: (item: DropdownItem) => void;
  title: string;
  selectedItem?: DropdownItem | null;
  dropDownStyle?: {};
}

const CDropdown: React.FC<CDropdownProps> = ({
  data,
  onSelect,
  selectedItem,
  title,
  dropDownStyle,
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
        style={[styles.dropdown, dropDownStyle]}
        onPress={() => setVisible(true)}>
        <Text style={styles.selectedText}>
          {selectedItem?.label || title || 'Select an option'}
        </Text>
        <Icon
          name={DropDown}
          width={metrics.iconSize.sm}
          height={metrics.iconSize.sm}
          color={colors.white}
        />
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
                  showsVerticalScrollIndicator={false}
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
    borderColor: colors.gainsBoro,
    paddingHorizontal: metrics.padding.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: metrics.borderRadius.md,
    height: verticalScale(33),
  },
  selectedText: {
    fontSize: typography.fontSize.xs,
    color: colors.darkGray,
    fontFamily: 'Poppins-Regular',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.modalBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    maxHeight: '70%',
    backgroundColor: colors.white,
    borderRadius: metrics.borderRadius.md,
    paddingHorizontal: metrics.padding.md,
    elevation: 5,
  },
  option: {
    paddingVertical: metrics.padding.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gainsBoro,
  },
  optionText: {
    fontSize: typography.fontSize.xs,
    fontFamily: 'Poppins-Regular',
    color: colors.darkGray,
  },
});

export default CDropdown;

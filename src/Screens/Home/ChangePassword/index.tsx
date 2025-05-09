import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {CButton, CustomAlert, CustomTextInput, Header} from 'src/Components';
import {BackIcon, Eye, Password_Hide} from 'assets/icons';
import {styles} from './styles';
import CSafeAreaView from 'src/Components/CSafeAreaView';
import {useAppSelector} from 'src/store/hooks';
import {changePassword} from 'src/services/wooCommerceApi';
import {colors} from 'src/theme';

const ChangePassword = () => {
  const {token} = useAppSelector((state: RootState) => state.auth);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    description: '',
    buttonText: '',
    onPress: () => {},
  });

  const handlePasswordChange = async () => {
    try {
      setChangePasswordLoading(true);
      if (newPassword !== confirmPassword) {
        setAlertConfig({
          title: 'Attention',
          description: 'Passwords do not match',
          buttonText: 'OK',
          onPress: () => setShowAlert(false),
        });
        setShowAlert(true);
        return;
      }

      const response = await changePassword(
        currentPassword,
        newPassword,
        token,
      );

      if (response.success) {
        setAlertConfig({
          title: 'Success',
          description: response.message,
          buttonText: 'OK',
          onPress: () => setShowAlert(false),
        });
        setShowAlert(true);
        return;
      } else {
        setAlertConfig({
          title: 'Error',
          description: response.message,
          buttonText: 'OK',
          onPress: () => setShowAlert(false),
        });
        setShowAlert(true);
      }
    } catch (error) {
      setAlertConfig({
        title: 'Error',
        description: error.response.data.message,
        buttonText: 'OK',
        onPress: () => setShowAlert(false),
      });
      setShowAlert(true);
    } finally {
      setChangePasswordLoading(false);
    }
  };

  return (
    <CSafeAreaView removeBottomSafeArea>
      <Header title="Password Change" icon1={BackIcon} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <CustomTextInput
            title="Current Password"
            placeholder="Enter Here..."
            required
            numberOfLines={1}
            icon={showCurrentPassword ? Password_Hide : Eye}
            onIconPress={() => setShowCurrentPassword(!showCurrentPassword)}
            secureTextEntry={!showCurrentPassword}
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />

          <CustomTextInput
            title="New Password"
            numberOfLines={1}
            placeholder="Enter Here..."
            required
            icon={showNewPassword ? Password_Hide : Eye}
            onIconPress={() => setShowNewPassword(!showNewPassword)}
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <CustomTextInput
            title="Confirm Password"
            placeholder="Enter Here..."
            numberOfLines={1}
            required
            icon={showConfirmPassword ? Password_Hide : Eye}
            onIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <CButton
            // disabled={disableSavePasswordButton || changePasswordLoading}
            isLoading={changePasswordLoading}
            onPress={handlePasswordChange}
            title={'CHANGE PASSWORD'}
          />
        </View>
      </ScrollView>
      <CustomAlert
        visible={showAlert}
        title={alertConfig.title}
        description={alertConfig.description}
        button2={{
          text: alertConfig.buttonText,
          onPress: alertConfig.onPress,
          color: alertConfig.title === 'Success' ? colors.primary : colors.red,
        }}
      />
    </CSafeAreaView>
  );
};

export default ChangePassword;

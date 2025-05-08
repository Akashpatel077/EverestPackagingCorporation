import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {CButton, CustomAlert, CustomTextInput, Header} from 'src/Components';
import {BackIcon, Eye, Password_Hide} from 'assets/icons';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import CSafeAreaView from 'src/Components/CSafeAreaView';
import {useAppDispatch, useAppSelector} from 'src/store/hooks';
import {changePassword, updateProfile} from 'src/services/wooCommerceApi';
import {updateUserProfile} from 'src/store/slices/authSlice';
import {colors} from 'src/theme';

const AccountDetails = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const {user, token} = useAppSelector((state: RootState) => state.auth);
  const {first_name, last_name, username, email} = user || {};
  const [formData, setFormData] = useState({
    firstName: first_name,
    lastName: last_name,
    displayName: username,
    email: email,
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [updateProfileLoading, setUpdateProfileLoading] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    description: '',
    buttonText: '',
    onPress: () => {},
  });

  const disableSaveChangesButton =
    !formData.firstName || !formData.lastName || !formData.displayName;

  const disableSavePasswordButton =
    !currentPassword || !newPassword || !confirmPassword;

  const handleSaveChanges = async () => {
    try {
      setUpdateProfileLoading(true);

      const updatedUserData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        display_name: formData.displayName,
      };

      const response = await updateProfile(token, updatedUserData);

      console.log('res update profile : ', response);

      if (response.success) {
        // Update user details in Redux store
        await dispatch(updateUserProfile({token}));

        setAlertConfig({
          title: 'Success',
          description: response.message,
          buttonText: 'OK',
          onPress: () => setShowAlert(false),
        });
        setShowAlert(true);
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
    } finally {
      setUpdateProfileLoading(false);
    }
  };

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
      <Header title="Account details" icon1={BackIcon} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <CustomTextInput
            title="First name"
            required
            value={formData.firstName}
            onChangeText={text => setFormData({...formData, firstName: text})}
            placeholder="Enter your first name"
          />

          <CustomTextInput
            title="Last name"
            required
            value={formData.lastName}
            onChangeText={text => setFormData({...formData, lastName: text})}
            placeholder="Enter your last name"
          />

          <CustomTextInput
            title="Display name"
            required
            value={formData.displayName}
            onChangeText={text => setFormData({...formData, displayName: text})}
            helperText="This will be how your name will be displayed in the account section and in reviews"
          />

          <CustomTextInput
            title="Email address"
            required
            style={{color: colors.dimGray}}
            editable={false}
            value={formData.email}
            onChangeText={text => setFormData({...formData, email: text})}
            keyboardType="email-address"
          />

          <View style={styles.passwordSection}>
            <Text style={styles.passwordTitle}>PASSWORD CHANGE</Text>

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
          </View>

          <CButton
            disabled={disableSavePasswordButton || changePasswordLoading}
            isLoading={changePasswordLoading}
            onPress={handlePasswordChange}
            title={'CHANGE PASSWORD'}
          />

          <CButton
            disabled={disableSaveChangesButton || updateProfileLoading}
            isLoading={updateProfileLoading}
            style={styles.saveChangesButton}
            onPress={handleSaveChanges}
            title={'SAVE CHANGES'}
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

export default AccountDetails;

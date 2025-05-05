import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {CButton, CustomAlert, Header, Icon} from 'src/Components';
import {BackIcon, Eye, Password_Hide} from 'assets/icons';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import CSafeAreaView from 'src/Components/CSafeAreaView';
import {useAppDispatch, useAppSelector} from 'src/store/hooks';
import {changePassword, updateProfile} from 'src/services/wooCommerceApi';
import {fetchUserProfile, updateUserProfile} from 'src/store/slices/authSlice';

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
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              First name <Text style={styles.requiredStar}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={formData.firstName}
              onChangeText={text => setFormData({...formData, firstName: text})}
              placeholder="Enter your first name"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Last name <Text style={styles.requiredStar}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={formData.lastName}
              onChangeText={text => setFormData({...formData, lastName: text})}
              placeholder="Enter your last name"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Display name <Text style={styles.requiredStar}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={formData.displayName}
              onChangeText={text =>
                setFormData({...formData, displayName: text})
              }
            />
            <Text style={styles.helperText}>
              This will be how your name will be displayed in the account
              section and in reviews
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Email address <Text style={styles.requiredStar}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, {color: '#666666'}]}
              editable={false}
              value={formData.email}
              onChangeText={text => setFormData({...formData, email: text})}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.passwordSection}>
            <Text style={styles.passwordTitle}>PASSWORD CHANGE</Text>

            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.input}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry={!showCurrentPassword}
                placeholder="Current password (leave blank to leave unchanged)"
              />
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
                <Icon
                  name={showCurrentPassword ? Password_Hide : Eye}
                  width={24}
                  height={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!showNewPassword}
                placeholder="New password (leave blank to leave unchanged)"
              />
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setShowNewPassword(!showNewPassword)}>
                <Icon
                  name={showNewPassword ? Password_Hide : Eye}
                  width={24}
                  height={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                placeholder="Confirm new password"
              />
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Icon
                  name={showConfirmPassword ? Password_Hide : Eye}
                  width={24}
                  height={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
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
          color: alertConfig.title === 'Success' ? '#0088cc' : '#CC5656',
        }}
      />
    </CSafeAreaView>
  );
};

export default AccountDetails;

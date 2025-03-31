import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {Header, Icon} from 'src/Components';
import {Heart, Eye, Password_Hide, BackIcon} from 'assets/icons';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';

const PasswordManager = () => {
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = () => {
    // Implement password change logic here
    console.log('Change password');
  };

  return (
    <View style={styles.container}>
    <Header title='Password Manager' icon1={BackIcon}/>

      <View style={styles.content}>
        <Text style={styles.label}>Current Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry={!showCurrentPassword}
            placeholder="Enter current password"
          />
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
            {showCurrentPassword ? (
              <Icon name={Password_Hide} width={24} height={24} />
            ) : (
              <Icon name={Eye} width={24} height={24} />
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>New Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showNewPassword}
            placeholder="Enter new password"
          />
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setShowNewPassword(!showNewPassword)}>
            {showNewPassword ? (
              <Icon name={Password_Hide} width={24} height={24} />
            ) : (
              <Icon name={Eye} width={24} height={24} />
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirm New Password</Text>
        <View style={styles.inputContainer}>
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
            {showConfirmPassword ? (
              <Icon name={Password_Hide} width={24} height={24} />
            ) : (
              <Icon name={Eye} width={24} height={24} />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordManager;

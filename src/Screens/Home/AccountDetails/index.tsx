import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Header, Icon} from 'src/Components';
import {BackIcon, Eye, Password_Hide} from 'assets/icons';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';

const AccountDetails = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    displayName: 'mit.ashishkher',
    email: 'mit.ashishkher@gmail.com',
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSaveChanges = () => {
    // Implement save changes logic here
  };

  return (
    <View style={styles.container}>
      <Header title="Account details" icon1={BackIcon} />
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            First name <Text style={styles.requiredStar}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={formData.firstName}
            onChangeText={(text) => setFormData({...formData, firstName: text})}
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
            onChangeText={(text) => setFormData({...formData, lastName: text})}
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
            onChangeText={(text) => setFormData({...formData, displayName: text})}
          />
          <Text style={styles.helperText}>
            This will be how your name will be displayed in the account section and in reviews
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            Email address <Text style={styles.requiredStar}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
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
                color='white'
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
                color='white'
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
                color='white'
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>SAVE CHANGES</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountDetails;
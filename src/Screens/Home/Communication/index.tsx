import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Header, Icon} from 'src/Components';
import {BackIcon, CheckSquare, UncheckSquareNew} from 'assets/icons';
import {styles} from './styles';
import CSafeAreaView from 'src/Components/CSafeAreaView';

const CommunicationScreen = () => {
  const [accountInfo, setAccountInfo] = useState(true);

  const handleSavePreferences = () => {
    // Handle saving preferences
    console.log('Preferences saved:', {accountInfo});
  };

  return (
    <CSafeAreaView removeBottomSafeArea>
      <View style={styles.container}>
        <Header title="Communication" icon1={BackIcon} />
        <View style={styles.content}>
          <Text style={styles.title}>
            You can choose to opt out of any of the following types of email
            communications we send.
          </Text>

          <Text style={styles.emailText}>
            You are managing preferences for mit.ashishkher@gmail.com.
          </Text>

          <View style={styles.preferencesContainer}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setAccountInfo(!accountInfo)}>
              {accountInfo ? (
                <Icon name={CheckSquare} height={25} width={25} />
              ) : (
                <Icon name={UncheckSquareNew} height={25} width={25} />
              )}
              <View style={styles.labelContainer}>
                <Text style={styles.checkboxLabel}>
                  Account and order information
                </Text>
                <Text style={styles.checkboxDescription}>
                  Receive important information about your orders and account.
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSavePreferences}>
            <Text style={styles.saveButtonText}>Save preferences</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CSafeAreaView>
  );
};

export default CommunicationScreen;

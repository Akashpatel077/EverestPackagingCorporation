import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {CButton, Header, Icon} from 'src/Components';
import {BackIcon, CheckSquare, UncheckSquareNew} from 'assets/icons';
import {styles} from './styles';
import CSafeAreaView from 'src/Components/CSafeAreaView';
import {useAppSelector} from 'src/store/hooks';
import {metrics} from 'src/theme';

const CommunicationScreen = () => {
  const [accountInfo, setAccountInfo] = useState(true);
  const {user} = useAppSelector((state: RootState) => state.auth);
  const {email} = user || {};

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
            You are managing preferences for {email}.
          </Text>

          <View style={styles.preferencesContainer}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setAccountInfo(!accountInfo)}>
              {accountInfo ? (
                <Icon
                  name={CheckSquare}
                  height={metrics.iconSize.md}
                  width={metrics.iconSize.md}
                />
              ) : (
                <Icon
                  name={UncheckSquareNew}
                  height={metrics.iconSize.md}
                  width={metrics.iconSize.md}
                />
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

          <CButton onPress={handleSavePreferences} title={'Save preferences'} />
        </View>
      </View>
    </CSafeAreaView>
  );
};

export default CommunicationScreen;

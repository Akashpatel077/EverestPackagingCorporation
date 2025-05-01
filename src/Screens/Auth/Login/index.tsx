import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  BackHandler,
  ScrollView,
} from 'react-native';
import {styles} from './styles';
import {useTranslation} from 'react-i18next';
import {CustomAlert, Icon, LoadingOverlay} from '../../../Components';
import {ic_Apple, ic_Facebook, ic_Google} from '../../../../assets/icons';
import {loginWithGoogle} from 'src/services/firebase-services';
import {useNavigation} from '@react-navigation/native';
import {REGISTRATION} from 'src/Navigation/auth/routes';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser, logout} from 'src/store/slices/authSlice';
import {RootState} from 'src/store';
import {setShowWelcome} from 'src/store/slices/startKeySlice';
import CSafeAreaView from 'src/Components/CSafeAreaView';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {loading, error} = useSelector((state: RootState) => state.auth);
  const isButtonDisabled = !email || !password || loading;
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (error && error.code && error.code.includes('authentication_failed')) {
      setShowAlert(true);
    }
  }, [error]);

  useEffect(() => {
    const backAction = () => {
      dispatch(setShowWelcome(true));
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // clean up on unmount
  }, []);

  const handleLogin = async () => {
    dispatch(loginUser({username: email, password}));
  };

  return (
    <CSafeAreaView removeBottomSafeArea style={styles.container}>
      <ScrollView
        contentContainerStyle={{paddingTop: 20, paddingBottom: 50}}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.logo}>{t('login.heading')}</Text>
        <Text style={styles.welcomeText}>{t('login.subTitle')}</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t('login.email')}</Text>
          <TextInput
            style={styles.input}
            placeholder="example@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t('login.password')}</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="****************"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}>
              <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>
            {t('login.forgotPassword')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={isButtonDisabled}
          style={[styles.signInButton, {opacity: isButtonDisabled ? 0.7 : 1}]}
          onPress={handleLogin}>
          <Text style={styles.signInText}>{t('common.signIn')}</Text>
        </TouchableOpacity>
        {/* {error && <Text style={styles.errorText}>{error}</Text>} */}
        {/* {loading && <ActivityIndicator size="large" color="#0000ff" />} */}

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>{t('login.breackText')}</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Icon name={ic_Apple} height={30} width={30} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => {
              loginWithGoogle();
            }}>
            <Icon name={ic_Google} height={30} width={30} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Icon name={ic_Facebook} height={30} width={30} />
          </TouchableOpacity>
        </View>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>{t('login.signUpText')}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(REGISTRATION);
            }}>
            <Text style={styles.signUpLink}>{t('common.signUp')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <CustomAlert
        visible={showAlert}
        title="Everest Packaging"
        description="Username or Password is incorrect!"
        button2={{
          text: 'Ok',
          onPress: () => {
            setShowAlert(false);
            dispatch(logout());
          },
          color: '#0088cc',
        }}
      />
      <LoadingOverlay visible={loading} />
    </CSafeAreaView>
  );
};

export default Login;

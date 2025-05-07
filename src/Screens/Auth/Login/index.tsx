import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  BackHandler,
  ScrollView,
} from 'react-native';
import {styles} from './styles';
import {useTranslation} from 'react-i18next';
import {CButton, CustomAlert, CustomTextInput, Icon} from '../../../Components';
import {
  Eye,
  ic_Apple,
  ic_Facebook,
  ic_Google,
  Password_Hide,
} from '../../../../assets/icons';
import {loginWithGoogle} from 'src/services/firebase-services';
import {useNavigation} from '@react-navigation/native';
import {REGISTRATION} from 'src/Navigation/auth/routes';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser, logout} from 'src/store/slices/authSlice';
import {RootState} from 'src/store';
import {setShowWelcome} from 'src/store/slices/startKeySlice';
import CSafeAreaView from 'src/Components/CSafeAreaView';
import {colors, metrics} from 'src/theme';

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
        contentContainerStyle={{
          paddingTop: metrics.padding.lg,
          paddingBottom: metrics.padding.xxl,
        }}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.logo}>{t('login.heading')}</Text>
        <Text style={styles.welcomeText}>{t('login.subTitle')}</Text>

        <CustomTextInput
          title={t('login.email')}
          required
          value={email}
          onChangeText={setEmail}
          placeholder="example@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <CustomTextInput
          title={t('login.password')}
          required
          value={password}
          onChangeText={setPassword}
          placeholder="****************"
          secureTextEntry={!showPassword}
          icon={showPassword ? Password_Hide : Eye}
          onIconPress={() => setShowPassword(!showPassword)}
        />

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>
            {t('login.forgotPassword')}
          </Text>
        </TouchableOpacity>

        <CButton
          isLoading={loading}
          onPress={handleLogin}
          disabled={isButtonDisabled}
          title={t('common.signIn')}
        />

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>{t('login.breackText')}</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Icon
              name={ic_Apple}
              height={metrics.iconSize.md}
              width={metrics.iconSize.md}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => {
              loginWithGoogle();
            }}>
            <Icon
              name={ic_Google}
              height={metrics.iconSize.md}
              width={metrics.iconSize.md}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Icon
              name={ic_Facebook}
              height={metrics.iconSize.md}
              width={metrics.iconSize.md}
            />
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
          color: colors.primary,
        }}
      />
    </CSafeAreaView>
  );
};

export default Login;

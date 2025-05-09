import React, {useState} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from './styles';
import {useTranslation} from 'react-i18next';
import {Icon, CustomAlert, CButton, CustomTextInput} from '../../../Components';
import {
  CheckSquare,
  Eye,
  Password_Hide,
  UncheckSquareNew,
  ic_Apple,
  ic_Facebook,
  ic_Google,
} from '../../../../assets/icons';
import {loginWithGoogle} from 'src/services/firebase-services';
import {useNavigation} from '@react-navigation/native';
import {LOGIN} from 'src/Navigation/auth/routes';
import {registerUserApi} from 'src/services/wooCommerceApi';
import CSafeAreaView from 'src/Components/CSafeAreaView';
import {colors, metrics} from 'src/theme';

const Registration = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    description: '',
    buttonText: '',
    onPress: () => {},
  });
  const {t} = useTranslation();
  const navigation = useNavigation();

  const isSignUpDisabled =
    !firstName ||
    !lastName ||
    !name ||
    !email ||
    !password ||
    !agreeToTerms ||
    isLoading;

  const handleSignUp = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setAlertConfig({
        title: 'Attention',
        description: 'Please enter a valid email address',
        buttonText: 'OK',
        onPress: () => setShowAlert(false),
      });
      setShowAlert(true);
      return;
    }

    if (password.length < 6) {
      setAlertConfig({
        title: 'Attention',
        description: 'Password must be at least 6 characters long',
        buttonText: 'OK',
        onPress: () => setShowAlert(false),
      });
      setShowAlert(true);
      return;
    }

    try {
      setIsLoading(true);
      await registerUserApi(firstName, lastName, name, email, password);

      setAlertConfig({
        title: 'Success',
        description: 'Registration successful',
        buttonText: 'OK',
        onPress: () => navigation.navigate(LOGIN),
      });
      setShowAlert(true);
    } catch (error) {
      setAlertConfig({
        title: 'Attention',
        description: error.response?.data?.message || 'Registration failed',
        buttonText: 'OK',
        onPress: () => setShowAlert(false),
      });
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CSafeAreaView removeBottomSafeArea>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: metrics.padding.md,
            paddingBottom: metrics.padding.xl,
          }}>
          <Text style={styles.logo}>
            {t('registration.heading') || 'Create Account'}
          </Text>
          <Text style={styles.welcomeText}>
            {t('registration.subTitle') ||
              'Fill your information below or register with your social account.'}
          </Text>

          <CustomTextInput
            title="First Name"
            required
            value={firstName}
            onChangeText={setFirstName}
            placeholder="John"
            autoCapitalize="words"
          />

          <CustomTextInput
            title="Last Name"
            required
            value={lastName}
            onChangeText={setLastName}
            placeholder="Doe"
            autoCapitalize="words"
          />

          <CustomTextInput
            title="User Name"
            required
            value={name}
            onChangeText={setName}
            placeholder="John Doe"
            autoCapitalize="words"
          />

          <CustomTextInput
            title={t('registration.email') || 'Email'}
            required
            value={email}
            onChangeText={setEmail}
            placeholder="example@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <CustomTextInput
            title={t('registration.password') || 'Password'}
            required
            value={password}
            onChangeText={setPassword}
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            secureTextEntry={!showPassword}
            icon={showPassword ? Password_Hide : Eye}
            onIconPress={() => setShowPassword(!showPassword)}
          />

          <TouchableOpacity
            style={styles.termsContainer}
            onPress={() => setAgreeToTerms(!agreeToTerms)}>
            {agreeToTerms ? (
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

            <Text style={styles.termsText}>
              {t('registration.agreeWith') || 'Agree with'}{' '}
              <Text style={styles.termsLink}>
                {t('registration.terms') || 'Terms & Condition'}
              </Text>
            </Text>
          </TouchableOpacity>

          <CButton
            isLoading={isLoading}
            onPress={handleSignUp}
            disabled={isSignUpDisabled}
            title={t('common.signUp') || 'Sign Up'}
          />

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>
              {t('registration.orSignUpWith') || 'Or sign up with'}
            </Text>
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

          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>
              {t('registration.alreadyHaveAccount') ||
                'Already have an account?'}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(LOGIN);
              }}>
              <Text style={styles.signInLink}>
                {t('common.signIn') || 'Sign In'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
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

export default Registration;

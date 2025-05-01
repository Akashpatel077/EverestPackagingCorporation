import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import {styles} from './styles';
import {useTranslation} from 'react-i18next';
import {Icon} from '../../../Components';
import {
  CheckSquare,
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

const Registration = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      Alert.alert('Attention', 'Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Attention', 'Password must be at least 6 characters long');
      return;
    }

    try {
      setIsLoading(true);
      await registerUserApi(firstName, lastName, name, email, password);

      Alert.alert('Success', 'Registration successful', [
        {text: 'OK', onPress: () => navigation.navigate(LOGIN)},
      ]);
    } catch (error) {
      Alert.alert(
        'Attention',
        error.response?.data?.message || 'Registration failed',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CSafeAreaView removeBottomSafeArea>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{padding: 15, paddingBottom: 30}}>
          <Text style={styles.logo}>
            {t('registration.heading') || 'Create Account'}
          </Text>
          <Text style={styles.welcomeText}>
            {t('registration.subTitle') ||
              'Fill your information below or register with your social account.'}
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="John"
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Doe"
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>User Name</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              {t('registration.email') || 'Email'}
            </Text>
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
            <Text style={styles.label}>
              {t('registration.password') || 'Password'}
            </Text>
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

          <TouchableOpacity
            style={styles.termsContainer}
            onPress={() => setAgreeToTerms(!agreeToTerms)}>
            {agreeToTerms ? (
              <Icon name={CheckSquare} height={30} width={30} />
            ) : (
              <Icon name={UncheckSquareNew} height={30} width={30} />
            )}

            <Text style={styles.termsText}>
              {t('registration.agreeWith') || 'Agree with'}{' '}
              <Text style={styles.termsLink}>
                {t('registration.terms') || 'Terms & Condition'}
              </Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.signUpButton,
              isSignUpDisabled && styles.signUpButtonDisabled,
            ]}
            disabled={isSignUpDisabled}
            onPress={handleSignUp}>
            {isLoading ? (
              <ActivityIndicator color="#0088cc" />
            ) : (
              <Text style={styles.signUpButtonText}>
                {t('common.signUp') || 'Sign Up'}
              </Text>
            )}
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>
              {t('registration.orSignUpWith') || 'Or sign up with'}
            </Text>
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
    </CSafeAreaView>
  );
};

export default Registration;

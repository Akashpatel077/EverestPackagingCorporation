import React, { useState } from 'react';
import { SafeAreaView, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';
import { Icon } from '../../../Components';
import { ic_Apple, ic_Facebook, ic_Google } from '../../../../assets/icons';
import { loginWithGoogle } from 'src/services/firebase-services';
import { useNavigation } from '@react-navigation/native';
import { LOGIN } from 'src/Navigation/auth/routes';

const Registration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const { t } = useTranslation();
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.logo}>{t("registration.heading") || "Create Account"}</Text>
            <Text style={styles.welcomeText}>{t("registration.subTitle") || "Fill your information below or register with your social account."}</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>{t("registration.name") || "Name"}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="John Doe"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>{t("registration.email") || "Email"}</Text>
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
                <Text style={styles.label}>{t("registration.password") || "Password"}</Text>
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
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity 
                style={styles.termsContainer} 
                onPress={() => setAgreeToTerms(!agreeToTerms)}
            >
                <View style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]} />
                <Text style={styles.termsText}>
                    {t("registration.agreeWith") || "Agree with"}{' '}
                    <Text style={styles.termsLink}>{t("registration.terms") || "Terms & Condition"}</Text>
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.signUpButton, !agreeToTerms && styles.signUpButtonDisabled]} 
                disabled={!agreeToTerms}
            >
                <Text style={styles.signUpButtonText}>{t("common.signUp") || "Sign Up"}</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>{t("registration.orSignUpWith") || "Or sign up with"}</Text>
                <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.socialButton}>
                    <Icon name={ic_Apple} height={30} width={30} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton} onPress={() => {loginWithGoogle()}}>
                    <Icon name={ic_Google} height={30} width={30} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Icon name={ic_Facebook} height={30} width={30} />
                </TouchableOpacity>
            </View>

            <View style={styles.signInContainer}>
                <Text style={styles.signInText}>{t("registration.alreadyHaveAccount") || "Already have an account?"}</Text>
                <TouchableOpacity onPress={() => {navigation.navigate(LOGIN)}}>
                    <Text style={styles.signInLink}>{t("common.signIn") || "Sign In"}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Registration;
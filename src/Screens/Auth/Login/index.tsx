import React, { useState } from 'react';
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';
import { Icon } from '../../../Components';
import { ic_Apple, ic_Facebook, ic_Google } from '../../../../assets/icons';
import { loginWithGoogle } from 'src/services/firebase-services';
import { useNavigation } from '@react-navigation/native';
import { REGISTRATION } from 'src/Navigation/auth/routes';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useTranslation()
    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.logo}>{t("login.heading")}</Text>
            <Text style={styles.welcomeText}>{t("login.subTitle")}</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>{t("login.email")}</Text>
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
                <Text style={styles.label}>{t("login.password")}</Text>
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

            <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>{t("login.forgotPassword")}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signInButton} onPress={() => {loginWithGoogle()}}>
                <Text style={styles.signInText}>{t("common.signIn")}</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>{t("login.breackText")}</Text>
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

            <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>{t("login.signUpText")}</Text>
                <TouchableOpacity onPress={() => {navigation.navigate(REGISTRATION)}}>
                    <Text style={styles.signUpLink}>{t("common.signUp")}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Login;
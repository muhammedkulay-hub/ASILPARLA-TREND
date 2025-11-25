import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/forms/Button';
import Input from '../../components/forms/Input';
import { colors } from '../../constants/colors';
import Toast from 'react-native-toast-message';

const LoginScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: t('auth.email') + ' ve ' + t('auth.password') + ' gerekli',
      });
      return;
    }

    try {
      await login(email, password);
      Toast.show({
        type: 'success',
        text1: t('auth.loginSuccess'),
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: t('auth.loginError'),
        text2: error || err.message,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.title}>AsilParla</Text>
          <Text style={styles.subtitle}>v1.17.02</Text>

          <View style={styles.form}>
            <Input
              label={t('auth.email')}
              value={email}
              onChangeText={setEmail}
              placeholder="ornek@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              label={t('auth.password')}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry
            />

            <Button
              title={t('auth.login')}
              onPress={handleLogin}
              loading={isLoading}
              style={styles.loginButton}
            />

            <Button
              title={t('auth.forgotPassword')}
              onPress={() => navigation.navigate('ForgotPassword')}
              variant="text"
              style={styles.forgotButton}
            />

            <Button
              title={t('auth.register')}
              onPress={() => navigation.navigate('Register')}
              variant="outline"
              style={styles.registerButton}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
  loginButton: {
    marginTop: 20,
  },
  forgotButton: {
    marginTop: 16,
  },
  registerButton: {
    marginTop: 16,
  },
});

export default LoginScreen;


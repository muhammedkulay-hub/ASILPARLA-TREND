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

const RegisterScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: 'Tüm alanlar doldurulmalı',
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Toast.show({
        type: 'error',
        text1: t('common.error'),
        text2: 'Şifreler eşleşmiyor',
      });
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      Toast.show({
        type: 'success',
        text1: 'Kayıt başarılı',
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Kayıt başarısız',
        text2: err.message,
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
          <Text style={styles.title}>Kayıt Ol</Text>

          <View style={styles.form}>
            <Input
              label="Ad Soyad"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Adınız ve soyadınız"
            />

            <Input
              label={t('auth.email')}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              placeholder="ornek@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              label={t('auth.password')}
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              placeholder="••••••••"
              secureTextEntry
            />

            <Input
              label="Şifre Tekrar"
              value={formData.confirmPassword}
              onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
              placeholder="••••••••"
              secureTextEntry
            />

            <Button
              title={t('auth.register')}
              onPress={handleRegister}
              loading={isLoading}
              style={styles.registerButton}
            />

            <Button
              title={t('auth.login')}
              onPress={() => navigation.navigate('Login')}
              variant="text"
              style={styles.loginButton}
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
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
  registerButton: {
    marginTop: 20,
  },
  loginButton: {
    marginTop: 16,
  },
});

export default RegisterScreen;


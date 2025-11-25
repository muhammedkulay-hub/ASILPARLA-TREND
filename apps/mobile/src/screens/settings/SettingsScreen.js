import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/common/Card';
import { colors } from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingsScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { logout } = useAuth();

  const settingsItems = [
    {
      id: 'profile',
      title: t('settings.profile'),
      icon: 'account',
      screen: 'Profile',
    },
    {
      id: 'notifications',
      title: t('settings.notifications'),
      icon: 'bell',
      screen: 'NotificationSettings',
    },
    {
      id: 'language',
      title: t('settings.language'),
      icon: 'translate',
      screen: null,
    },
    {
      id: 'theme',
      title: t('settings.theme'),
      icon: 'theme-light-dark',
      screen: null,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {settingsItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => item.screen && navigation.navigate(item.screen)}
          >
            <Card>
              <View style={styles.itemRow}>
                <Icon name={item.icon} size={24} color={colors.primary} />
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Icon name="chevron-right" size={24} color={colors.textSecondary} />
              </View>
            </Card>
          </TouchableOpacity>
        ))}

        <TouchableOpacity onPress={logout}>
          <Card style={styles.logoutCard}>
            <View style={styles.itemRow}>
              <Icon name="logout" size={24} color={colors.error} />
              <Text style={[styles.itemTitle, styles.logoutText]}>
                {t('auth.logout')}
              </Text>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  itemTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  logoutCard: {
    marginTop: 20,
  },
  logoutText: {
    color: colors.error,
  },
});

export default SettingsScreen;


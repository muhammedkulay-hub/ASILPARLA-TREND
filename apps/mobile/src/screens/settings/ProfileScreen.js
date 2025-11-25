import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/common/Card';
import { colors } from '../../constants/colors';

const ProfileScreen = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card>
          <Text style={styles.label}>Ad Soyad</Text>
          <Text style={styles.value}>{user?.name || 'N/A'}</Text>
        </Card>

        <Card>
          <Text style={styles.label}>E-posta</Text>
          <Text style={styles.value}>{user?.email || 'N/A'}</Text>
        </Card>

        <Card>
          <Text style={styles.label}>Üyelik Tarihi</Text>
          <Text style={styles.value}>
            {user?.created_at ? new Date(user.created_at).toLocaleDateString('tr-TR') : 'N/A'}
          </Text>
        </Card>
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
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
});

export default ProfileScreen;


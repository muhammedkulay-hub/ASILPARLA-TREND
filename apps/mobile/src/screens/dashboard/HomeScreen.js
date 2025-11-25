import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/common/Card';
import { colors } from '../../constants/colors';
import { formatCurrency } from '../../utils/helpers';

const HomeScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // TODO: Refresh dashboard data
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.content}>
        <Text style={styles.welcome}>Hoş geldiniz, {user?.name || 'Kullanıcı'}!</Text>

        <View style={styles.stats}>
          <Card style={styles.statCard}>
            <Text style={styles.statLabel}>Toplam Sipariş</Text>
            <Text style={styles.statValue}>0</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statLabel}>Toplam Gelir</Text>
            <Text style={styles.statValue}>{formatCurrency(0)}</Text>
          </Card>
        </View>

        <Card>
          <Text style={styles.sectionTitle}>Hızlı İşlemler</Text>
          {/* Add quick actions here */}
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
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 24,
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
});

export default HomeScreen;


import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useOrders } from '../../hooks/useOrders';
import Card from '../../components/common/Card';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import { colors } from '../../constants/colors';
import { formatCurrency, formatDate } from '../../utils/helpers';

const OrderDetailScreen = ({ route }) => {
  const { t } = useTranslation();
  const { orderId } = route.params;
  const { currentOrder, loadOrder, isLoading } = useOrders();

  useEffect(() => {
    if (orderId) {
      loadOrder(orderId);
    }
  }, [orderId, loadOrder]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const order = currentOrder || {};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card>
          <Text style={styles.title}>Sipariş #{order.id || 'N/A'}</Text>
          <Text style={styles.date}>
            {formatDate(order.created_at || new Date())}
          </Text>
          <Text style={styles.total}>
            Toplam: {formatCurrency(order.total || 0)}
          </Text>
          <Text style={styles.status}>
            Durum: {order.status || 'Bilinmiyor'}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  total: {
    fontSize: 20,
    color: colors.primary,
    marginBottom: 8,
  },
  status: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});

export default OrderDetailScreen;


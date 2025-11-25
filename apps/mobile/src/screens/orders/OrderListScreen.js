import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useOrders } from '../../hooks/useOrders';
import { useNavigation } from '@react-navigation/native';
import Card from '../../components/common/Card';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import { colors } from '../../constants/colors';
import { formatCurrency, formatDate } from '../../utils/helpers';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const OrderListScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { orders, isLoading, loadOrders } = useOrders();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  };

  const renderOrder = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('OrderDetail', { orderId: item.id })}
    >
      <Card>
        <View style={styles.orderRow}>
          <View style={styles.orderInfo}>
            <Text style={styles.orderId}>Sipariş #{item.id || 'N/A'}</Text>
            <Text style={styles.orderDate}>
              {formatDate(item.created_at || new Date())}
            </Text>
            <Text style={styles.orderTotal}>
              {formatCurrency(item.total || 0)}
            </Text>
          </View>
          <Icon name="chevron-right" size={24} color={colors.textSecondary} />
        </View>
      </Card>
    </TouchableOpacity>
  );

  if (isLoading && !refreshing) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>{t('orders.noOrders')}</Text>
          </View>
        }
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: 16,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  orderTotal: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  empty: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});

export default OrderListScreen;


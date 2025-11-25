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
import { useNotifications } from '../../hooks/useNotifications';
import Card from '../../components/common/Card';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import Button from '../../components/forms/Button';
import { colors } from '../../constants/colors';
import { formatDate } from '../../utils/helpers';

const NotificationScreen = () => {
  const { t } = useTranslation();
  const {
    notifications,
    unreadCount,
    isLoading,
    loadNotifications,
    markAsRead,
    markAllAsRead,
  } = useNotifications();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadNotifications();
    setRefreshing(false);
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      onPress={() => !item.read && markAsRead(item.id)}
    >
      <Card style={[!item.read && styles.unread]}>
        <Text style={styles.title}>{item.title || 'Bildirim'}</Text>
        <Text style={styles.message}>{item.message || ''}</Text>
        <Text style={styles.date}>
          {formatDate(item.created_at || new Date())}
        </Text>
      </Card>
    </TouchableOpacity>
  );

  if (isLoading && !refreshing) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      {unreadCount > 0 && (
        <View style={styles.header}>
          <Button
            title={t('notifications.markAllRead')}
            onPress={markAllAsRead}
            variant="outline"
            style={styles.markAllButton}
          />
        </View>
      )}
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>{t('notifications.noNotifications')}</Text>
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
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  markAllButton: {
    alignSelf: 'flex-end',
  },
  list: {
    padding: 16,
  },
  unread: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: colors.textTertiary,
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

export default NotificationScreen;


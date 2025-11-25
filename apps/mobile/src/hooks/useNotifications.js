import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import {
  fetchNotifications,
  markAsRead,
  markAllAsRead,
} from '../store/notificationSlice';

export const useNotifications = () => {
  const dispatch = useAppDispatch();
  const { notifications, unreadCount, isLoading, error } = useAppSelector(
    (state) => state.notifications
  );

  const loadNotifications = useCallback(async () => {
    return dispatch(fetchNotifications());
  }, [dispatch]);

  const markNotificationAsRead = useCallback(
    async (id) => {
      return dispatch(markAsRead(id));
    },
    [dispatch]
  );

  const markAllNotificationsAsRead = useCallback(async () => {
    return dispatch(markAllAsRead());
  }, [dispatch]);

  useEffect(() => {
    loadNotifications();
    // Set up polling or WebSocket connection here if needed
    const interval = setInterval(() => {
      loadNotifications();
    }, 60000); // Poll every minute

    return () => clearInterval(interval);
  }, [loadNotifications]);

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    loadNotifications,
    markAsRead: markNotificationAsRead,
    markAllAsRead: markAllNotificationsAsRead,
  };
};


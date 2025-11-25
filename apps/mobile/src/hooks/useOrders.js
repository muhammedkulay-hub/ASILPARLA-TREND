import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import {
  fetchOrders,
  fetchOrderById,
  createOrder,
  updateOrder,
  setFilters,
  clearFilters,
} from '../store/orderSlice';

export const useOrders = () => {
  const dispatch = useAppDispatch();
  const { orders, currentOrder, isLoading, error, filters, pagination } =
    useAppSelector((state) => state.orders);

  const loadOrders = useCallback(
    async (params) => {
      return dispatch(fetchOrders(params || filters));
    },
    [dispatch, filters]
  );

  const loadOrder = useCallback(
    async (id) => {
      return dispatch(fetchOrderById(id));
    },
    [dispatch]
  );

  const addOrder = useCallback(
    async (orderData) => {
      return dispatch(createOrder(orderData));
    },
    [dispatch]
  );

  const editOrder = useCallback(
    async (id, orderData) => {
      return dispatch(updateOrder({ id, data: orderData }));
    },
    [dispatch]
  );

  const updateFilters = useCallback(
    (newFilters) => {
      dispatch(setFilters(newFilters));
    },
    [dispatch]
  );

  const resetFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  useEffect(() => {
    loadOrders();
  }, [filters]);

  return {
    orders,
    currentOrder,
    isLoading,
    error,
    filters,
    pagination,
    loadOrders,
    loadOrder,
    addOrder,
    editOrder,
    updateFilters,
    resetFilters,
  };
};


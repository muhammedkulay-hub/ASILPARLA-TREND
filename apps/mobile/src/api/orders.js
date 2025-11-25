import apiClient from './auth';
import { API_ENDPOINTS } from '../constants/config';

export const getOrders = async (params = {}) => {
  return apiClient.get(API_ENDPOINTS.ORDERS.LIST, { params });
};

export const getOrderById = async (id) => {
  return apiClient.get(API_ENDPOINTS.ORDERS.DETAIL(id));
};

export const createOrder = async (orderData) => {
  return apiClient.post(API_ENDPOINTS.ORDERS.CREATE, orderData);
};

export const updateOrder = async (id, orderData) => {
  return apiClient.put(API_ENDPOINTS.ORDERS.UPDATE(id), orderData);
};


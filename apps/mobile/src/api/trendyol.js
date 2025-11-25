import apiClient from './auth';
import { API_BASE_URL } from '../constants/config';

export const syncTrendyolOrders = async () => {
  return apiClient.post(`${API_BASE_URL}/api/trendyol/orders/sync`);
};

export const getTrendyolProducts = async (params = {}) => {
  return apiClient.get(`${API_BASE_URL}/api/trendyol/products`, { params });
};

export const updateTrendyolStock = async (productId, stock) => {
  return apiClient.put(`${API_BASE_URL}/api/trendyol/products/${productId}/stock`, {
    stock,
  });
};

export const getTrendyolReports = async (params = {}) => {
  return apiClient.get(`${API_BASE_URL}/api/trendyol/reports`, { params });
};


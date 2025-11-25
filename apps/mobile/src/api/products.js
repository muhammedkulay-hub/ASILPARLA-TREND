import apiClient from './auth';
import { API_ENDPOINTS } from '../constants/config';

export const getProducts = async (params = {}) => {
  return apiClient.get(API_ENDPOINTS.PRODUCTS.LIST, { params });
};

export const getProductById = async (id) => {
  return apiClient.get(API_ENDPOINTS.PRODUCTS.DETAIL(id));
};

export const createProduct = async (productData) => {
  return apiClient.post(API_ENDPOINTS.PRODUCTS.CREATE, productData);
};

export const updateProduct = async (id, productData) => {
  return apiClient.put(API_ENDPOINTS.PRODUCTS.UPDATE(id), productData);
};

export const deleteProduct = async (id) => {
  return apiClient.delete(API_ENDPOINTS.PRODUCTS.DELETE(id));
};


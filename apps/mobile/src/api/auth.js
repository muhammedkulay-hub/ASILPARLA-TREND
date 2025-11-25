import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      // You might want to dispatch a logout action here
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const login = async (email, password) => {
  return apiClient.post(API_ENDPOINTS.AUTH.LOGIN, {
    email,
    password,
  });
};

export const register = async (userData) => {
  return apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
};

export const logout = async () => {
  return apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
};

export const refreshToken = async () => {
  return apiClient.post(API_ENDPOINTS.AUTH.REFRESH);
};

export const getCurrentUser = async () => {
  return apiClient.get(API_ENDPOINTS.AUTH.ME);
};

export default apiClient;


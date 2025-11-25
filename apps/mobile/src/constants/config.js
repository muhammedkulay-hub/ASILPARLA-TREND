// API Configuration
export const API_BASE_URL = __DEV__
  ? 'http://localhost:8000'
  : 'https://api.asilparla.com';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    ME: '/api/auth/me',
  },
  PRODUCTS: {
    LIST: '/api/products',
    DETAIL: (id) => `/api/products/${id}`,
    CREATE: '/api/products',
    UPDATE: (id) => `/api/products/${id}`,
    DELETE: (id) => `/api/products/${id}`,
  },
  ORDERS: {
    LIST: '/api/orders',
    DETAIL: (id) => `/api/orders/${id}`,
    CREATE: '/api/orders',
    UPDATE: (id) => `/api/orders/${id}`,
  },
  REPORTS: {
    LIST: '/api/reports',
    GENERATE: '/api/reports/generate',
    DETAIL: (id) => `/api/reports/${id}`,
  },
  NOTIFICATIONS: {
    LIST: '/api/notifications',
    MARK_READ: (id) => `/api/notifications/${id}/read`,
    MARK_ALL_READ: '/api/notifications/read-all',
  },
};

// App Configuration
export const APP_CONFIG = {
  VERSION: '1.17.02',
  NAME: 'AsilParla',
  DEFAULT_LANGUAGE: 'tr',
  DEFAULT_THEME: 'dark',
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
  },
};

// Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  SETTINGS: 'settings',
  LANGUAGE: 'language',
  THEME: 'theme',
};


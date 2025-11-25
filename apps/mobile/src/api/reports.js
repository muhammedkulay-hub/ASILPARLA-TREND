import apiClient from './auth';
import { API_ENDPOINTS } from '../constants/config';

export const getReports = async (params = {}) => {
  return apiClient.get(API_ENDPOINTS.REPORTS.LIST, { params });
};

export const getReportById = async (id) => {
  return apiClient.get(API_ENDPOINTS.REPORTS.DETAIL(id));
};

export const generateReport = async (reportData) => {
  return apiClient.post(API_ENDPOINTS.REPORTS.GENERATE, reportData);
};


import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import {
  fetchReports,
  generateReport,
  setFilters,
  clearFilters,
} from '../store/reportSlice';

export const useReports = () => {
  const dispatch = useAppDispatch();
  const { reports, currentReport, isLoading, error, filters } = useAppSelector(
    (state) => state.reports
  );

  const loadReports = useCallback(
    async (params) => {
      return dispatch(fetchReports(params || filters));
    },
    [dispatch, filters]
  );

  const createReport = useCallback(
    async (reportData) => {
      return dispatch(generateReport(reportData));
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
    loadReports();
  }, [filters]);

  return {
    reports,
    currentReport,
    isLoading,
    error,
    filters,
    loadReports,
    createReport,
    updateFilters,
    resetFilters,
  };
};


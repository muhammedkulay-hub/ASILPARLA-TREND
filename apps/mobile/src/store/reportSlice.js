import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as reportAPI from '../api/reports';

const initialState = {
  reports: [],
  currentReport: null,
  isLoading: false,
  error: null,
  filters: {
    type: '',
    dateFrom: '',
    dateTo: '',
  },
};

// Async thunks
export const fetchReports = createAsyncThunk(
  'reports/fetchReports',
  async (params, { rejectWithValue }) => {
    try {
      const response = await reportAPI.getReports(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch reports');
    }
  }
);

export const generateReport = createAsyncThunk(
  'reports/generateReport',
  async (reportData, { rejectWithValue }) => {
    try {
      const response = await reportAPI.generateReport(reportData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to generate report');
    }
  }
);

const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setCurrentReport: (state, action) => {
      state.currentReport = action.payload;
    },
    clearCurrentReport: (state) => {
      state.currentReport = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reports = action.payload.items || action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(generateReport.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(generateReport.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reports.unshift(action.payload);
        state.currentReport = action.payload;
      })
      .addCase(generateReport.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, clearFilters, setCurrentReport, clearCurrentReport } = reportSlice.actions;
export default reportSlice.reducer;


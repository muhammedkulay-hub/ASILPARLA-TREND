import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  theme: 'dark',
  language: 'tr',
  notifications: {
    enabled: true,
    sound: true,
    vibration: true,
  },
  isLoading: false,
  error: null,
};

// Load settings from storage
export const loadSettings = createAsyncThunk(
  'settings/loadSettings',
  async (_, { rejectWithValue }) => {
    try {
      const settingsStr = await AsyncStorage.getItem('settings');
      if (settingsStr) {
        return JSON.parse(settingsStr);
      }
      return initialState;
    } catch (error) {
      return rejectWithValue('Failed to load settings');
    }
  }
);

// Save settings to storage
export const saveSettings = createAsyncThunk(
  'settings/saveSettings',
  async (settings, { rejectWithValue }) => {
    try {
      await AsyncStorage.setItem('settings', JSON.stringify(settings));
      return settings;
    } catch (error) {
      return rejectWithValue('Failed to save settings');
    }
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    updateNotifications: (state, action) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSettings.fulfilled, (state, action) => {
        return { ...state, ...action.payload };
      })
      .addCase(saveSettings.fulfilled, (state, action) => {
        return { ...state, ...action.payload };
      });
  },
});

export const { setTheme, setLanguage, updateNotifications } = settingsSlice.actions;
export default settingsSlice.reducer;


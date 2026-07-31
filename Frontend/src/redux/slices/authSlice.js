import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as authService from '../../services/authService';

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      
      const data = await authService.loginUser(username, password);   
      return data; // { user, access, refresh }
    } catch (error) {   
      return rejectWithValue(error.response?.data?.message || 'فشل تسجيل الدخول');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (UserData, { rejectWithValue }) => {
    try {
      const data = await authService.registerUser(UserData);
      console.log(data);
      return data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'فشل إنشاء الحساب');
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      if (!token) return rejectWithValue('لا يوجد توكن');
      const data = await authService.getCurrentUser();
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'فشل جلب المستخدم');
    }
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.access;
        localStorage.setItem('token', action.payload.access);
        localStorage.setItem('refreshToken', action.payload.refresh);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
    // Register
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
    // Fetch current user
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
// src/features/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';
import { AuthState, ILoginFormParam, ISignupFormParam } from '../../types/auth.interface';
import { RootState } from '../store';

const initialState: AuthState = {
  user: JSON.parse(sessionStorage.getItem('user') || 'null'),
  accessToken: sessionStorage.getItem('accessToken'),
  loading: false,
  error: null,
  isLoggedIn: !!sessionStorage.getItem('accessToken'), // Set true if accessToken exists
};


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: ILoginFormParam, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      return response.data; // { email, role, accessToken }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (data: ISignupFormParam, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/auth/signup', data);
      return response.data; // { email, role, accessToken }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isLoggedIn = false;
      sessionStorage.removeItem('user'); // Clear token
      sessionStorage.removeItem('accessToken'); // Clear token
    },
    setGlobalError: (state, action) => {
      state.error = action.payload; // Store the error in the global state
    },
    clearGlobalError: (state) => {
      state.error = null; // Clear the error
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { name: action.payload.name, email: action.payload.email, role: action.payload.role };
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true; // Set logged-in status
        sessionStorage.setItem('user', JSON.stringify(state.user)); // Clear token
        sessionStorage.setItem('accessToken', action.payload.accessToken); // Store token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string'
          ? action.payload
          : JSON.stringify(action.payload); // Convert object to string
        state.isLoggedIn = false;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { name: action.payload.name, email: action.payload.email, role: action.payload.role };
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true; // Set logged-in status
        sessionStorage.setItem('user', JSON.stringify(state.user)); // Clear token
        sessionStorage.setItem('accessToken', action.payload.accessToken); // Store token
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string'
          ? action.payload
          : JSON.stringify(action.payload); // Convert object to string
        state.isLoggedIn = false;
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

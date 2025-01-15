import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axios';
import { RootState } from '../store';
import { ISignupFormParam } from '../../types/auth.interface';
import { IEmployee } from '../../types/user.interface';

interface UserState {
  employeeCount: number;
  loading: boolean;
  error: string | null;
  employees: IEmployee[]
}

const initialState: UserState = {
  employeeCount: 0,
  loading: false,
  error: null,
  employees: []
};

// Fetch employee count
export const fetchEmployeeCount = createAsyncThunk(
  'users/fetchEmployeeCount',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/users/employees/count');
      return response.data; // Assuming the API response is { count: number }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch employee count');
    }
  }
);

// Async thunk to fetch the events
export const fetchEmployee = createAsyncThunk(
  'users/listEmployee',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/users/employees');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch employee');
    }
  }
);

export const createEmployee = createAsyncThunk(
  'users/addEmployee',
  async (data: ISignupFormParam, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/users/employees', data);
      return response.data; // { email, role, accessToken }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setGlobalError: (state, action) => {
      state.error = action.payload; // Store the error in the global state
    },
    clearGlobalError: (state) => {
      state.error = null; // Clear the error
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployeeCount.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeCount = action.payload.count;
      })
      .addCase(fetchEmployeeCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = [...state.employees, action.payload]
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;

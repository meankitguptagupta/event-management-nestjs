// src/redux/features/globalErrorSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlobalErrorState {
  message: string;
  type: "error" | "success" | "warning" | "info" | null;
}

const initialState: GlobalErrorState = {
  message: '',
  type: null,
};

const globalErrorSlice = createSlice({
  name: 'globalError',
  initialState,
  reducers: {
    setGlobalError(state, action: PayloadAction<GlobalErrorState>) {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearGlobalError(state) {
      state.message = '';
      state.type = null;
    },
  },
});

export const { setGlobalError, clearGlobalError } = globalErrorSlice.actions;
export default globalErrorSlice.reducer;

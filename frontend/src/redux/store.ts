// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import globalErrorReducer from './features/globalErrorSlice';
import { errorMiddleware } from './errorMiddleware';
import eventSlice from './features/eventSlice';
import userSlice from './features/userSlice';
import tagSlice from './features/tagSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    event: eventSlice,
    user: userSlice,
    tag: tagSlice,
    globalError: globalErrorReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(errorMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

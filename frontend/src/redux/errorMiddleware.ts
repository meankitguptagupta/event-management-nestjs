import { Middleware } from '@reduxjs/toolkit';
import { setGlobalError } from './features/globalErrorSlice';

export const errorMiddleware: Middleware = (store) => (next) => (action) => {
  if (typeof action === 'object' && action !== null && 'type' in action) {
    const { type, payload } = action as { type: string; payload?: any };

    if (type.endsWith('/rejected')) {
      console.error('API Request Failed:', payload);

      const normalizedError =
        typeof payload === 'string'
          ? payload
          : Array.isArray(payload)
          ? payload.join(', ')
          : typeof payload === 'object' && payload !== null
          ? Object.values(payload).join(', ')
          : 'An unknown error occurred.';

      // Dispatch the correct payload format for setGlobalError
      store.dispatch(setGlobalError({ message: normalizedError, type: 'error' }));
    }
  }

  return next(action);
};

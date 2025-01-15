import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { clearGlobalError } from '../redux/features/globalErrorSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify

const GlobalToaster: React.FC = () => {
  const { message, type = 'error' } = useSelector((state: RootState) => state.globalError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      // Show toast based on type (error, success, etc.)
      switch (type) {
        case 'success':
          toast.success(message);
          break;
        case 'warning':
          toast.warn(message);
          break;
        case 'info':
          toast.info(message);
          break;
        case 'error':
        default:
          toast.error(message);
      }

      // Automatically hide the toast after 5 seconds
      const timer = setTimeout(() => {
        dispatch(clearGlobalError());
      }, 5000); 

      return () => clearTimeout(timer); // Cleanup the timeout on unmount
    }
  }, [message, type, dispatch]);

  return null; // Toastify will handle the display automatically
};

export default GlobalToaster;

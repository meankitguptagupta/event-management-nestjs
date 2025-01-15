import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks'; // Custom Redux hooks

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  // Check if the token exists in sessionStorage
  const tokenInStorage = sessionStorage.getItem('accessToken');
  const tokenInState = useAppSelector((state) => state.auth.accessToken);

  // Check authentication based on token in sessionStorage or Redux state
  const isAuthenticated = !!tokenInStorage || !!tokenInState;

  if (!isAuthenticated) {
    // Redirect to login page if the user is not authenticated
    return <Navigate to="/" replace />;
  }

  return children; // Render child component if authenticated
};

export default PrivateRoute;

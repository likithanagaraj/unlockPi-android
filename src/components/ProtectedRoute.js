import React from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '../context/authContext';

export const ProtectedRoute = ({ children }) => {
  const { authToken } = useAuth();

  // Redirect to login if not authenticated
  if (!authToken) {
    return <Redirect href="/auth/login" />;
  }

  // Ensure `children` is properly wrapped or passed as JSX
  return <>{children}</>;
};

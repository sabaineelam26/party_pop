import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAdminAuth();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

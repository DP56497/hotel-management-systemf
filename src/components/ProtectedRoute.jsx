import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Not logged in, redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Logged in but doesn't have required role
    // Redirect to their respective dashboard
    if (user.role === 'Owner') return <Navigate to="/owner" replace />;
    if (user.role === 'Manager') return <Navigate to="/manager" replace />;
    return <Navigate to="/staff" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

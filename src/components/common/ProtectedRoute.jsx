import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isLoggedUsser = useSelector((state) => state.user.isLogged);

  if (isLoggedUsser) return <>{children}</>;
  else return <Navigate to="/login" replace state={{ location }} />;
};

export default ProtectedRoute;

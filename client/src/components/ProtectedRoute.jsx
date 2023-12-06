import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const userType = sessionStorage.getItem('userType');
  console.log(userType);

  return userType === 'ADMIN' ? <Outlet /> : <Navigate to='/unauthorized' />;
};

export default ProtectedRoutes;

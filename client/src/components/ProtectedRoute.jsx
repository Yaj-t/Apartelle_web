import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
  const userType = sessionStorage.getItem('userType');
  // console.log(userType);

  if (userType !== 'ADMIN') {
    return <Navigate to='/unauthorized' />;
  } 
  // Render the children if sessionStorage is not empty and userType is ADMIN
  return children;
};

export default ProtectedRoutes;

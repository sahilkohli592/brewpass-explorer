
import React from 'react';
import { Navigate } from 'react-router-dom';

const CafesList = () => {
  // Redirect to DineOut page
  return <Navigate to="/dineout" replace />;
};

export default CafesList;

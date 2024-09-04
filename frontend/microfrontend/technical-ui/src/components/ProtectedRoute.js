import React from 'react';
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, loggedIn, ...props }) => {
  return loggedIn ? element : <Navigate to="/signin" />;
};


export default ProtectedRoute;

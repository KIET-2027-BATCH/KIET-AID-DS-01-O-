import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import React from 'react';

const PrivateRoute = ({ children }: { children: React.JSX.Element }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;


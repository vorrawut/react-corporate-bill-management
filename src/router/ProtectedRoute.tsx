import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactElement;
}

const isAuthenticated = () => {
    // Replace with your actual authentication check logic
    return localStorage.getItem('isAuthenticated') === 'true';
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

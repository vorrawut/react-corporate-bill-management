// AppRouter.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import routes from './routes';

const AppRouter: React.FC = () => {
    return (
        <Routes>
            {routes.map((route, index) => {
                const RouteElement = route.isProtected ? (
                    <ProtectedRoute>{route.element}</ProtectedRoute>
                ) : (
                    route.element
                );
                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={RouteElement}
                    />
                );
            })}
        </Routes>
    );
};

export default AppRouter;

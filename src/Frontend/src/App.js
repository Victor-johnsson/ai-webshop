import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Webshop";
import AdminWebshop from "./Pages/Admin";
import AdminReviewsPage from "./Pages/AdminReviews";
import { AuthProvider } from "./Authentication/hooks/auth-provider";
import ProtectedRoute from "./Authentication/ProtectedRoute";
import AuthContext from "./Authentication/AuthContext";
import useAuth from "./Authentication/hooks/useAuth";
import UnauthorizedComponent from "./Components/UnauthorizedComponent";
const App = () => {
    return (React.createElement(AuthProvider, null,
        React.createElement(AuthConsumerApp, null)));
};
const AuthConsumerApp = () => {
    const { status, handleLogout, token } = useAuth();
    if (status.error) {
        return (React.createElement(UnauthorizedComponent, { error: status.error, onLogout: handleLogout }));
    }
    return (React.createElement(AuthContext.Provider, { value: { handleLogout } },
        React.createElement(BrowserRouter, null,
            React.createElement(Routes, null,
                React.createElement(Route, { path: "/", element: React.createElement(Home, null) }),
                React.createElement(Route, { element: React.createElement(ProtectedRoute, null) },
                    React.createElement(Route, { path: "/admin", element: React.createElement(AdminWebshop, { token: token }) }),
                    React.createElement(Route, { path: "/admin/reviews", element: React.createElement(AdminReviewsPage, null) }))))));
};
export default App;

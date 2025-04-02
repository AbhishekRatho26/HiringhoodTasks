import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
    const isAuthenticated = localStorage.getItem("email");
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

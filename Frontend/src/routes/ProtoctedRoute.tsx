import type { JSX } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../Store";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const authenticated = useSelector((state: RootState) => state.user.authenticated);

    if (!authenticated) {
        return <Navigate to="/login" replace />;
    }

    return children

}
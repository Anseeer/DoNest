import { Route, Routes } from "react-router-dom"
import { RegistrationPage } from "../pages/RegistrationPage"
import { LoginPage } from "../pages/LoginPage"
import { LandingPage } from "../pages/LandingPage"
import { HomePage } from "../pages/HomePage"
import { ProtectedRoute } from "./ProtoctedRoute"
import { GuestRoute } from "./GuestRoute"

export const AppRoute = () => {
    return (
        <>
            <Routes>

                <Route path="/" element={
                    <GuestRoute>
                        <LandingPage />
                    </GuestRoute>
                } />

                <Route path="/login" element={
                    <GuestRoute>
                        <LoginPage />
                    </GuestRoute>
                } />

                <Route path="/register" element={
                    <GuestRoute>
                        <RegistrationPage />
                    </GuestRoute>
                } />

                <Route path="/home" element={
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                } />

            </Routes>
        </>
    )
}
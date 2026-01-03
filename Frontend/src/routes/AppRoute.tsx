import { Route, Routes } from "react-router-dom"
import { RegistrationPage } from "../pages/RegistrationPage"
import { LoginPage } from "../pages/LoginPage"
import { LandingPage } from "../pages/LandingPage"
import { HomePage } from "../pages/HomePage"

export const AppRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/home" element={<HomePage />} />
            </Routes>
        </>
    )
}
import { ClipboardCheck, Menu, X } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "../Store";
import { logout } from "../services/userService";
import { cleanData } from "../slices/userSlice";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useAppDispatch } from "../utilities/AppDispatch";


export const Header = () => {
    const authenticated = useSelector(
        (state: RootState) => state.user.authenticated
    );

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        try {
            await logout();
            dispatch(cleanData());
            setIsOpen(false); // ✅ close mobile menu
            navigate("/", { replace: true });
            toast.success("Logout successfully");
        } catch (error) {
            const errMsg =
                error instanceof AxiosError ? error.message : String(error);
            toast.error(errMsg);
        }
    };

    return (
        <nav className="fixed top-0 w-full bg-amber-50/95 backdrop-blur-md border-b border-amber-200/50 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <div
                    onClick={() => navigate("/")}
                    className="flex cursor-pointer items-center gap-3"
                >
                    <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-700 to-amber-900 rounded-xl flex items-center justify-center shadow-lg">
                            <ClipboardCheck className="w-6 h-6 text-amber-50" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-orange-600 rounded-full border-2 border-amber-50" />
                    </div>
                    <span className="text-2xl font-serif text-amber-900">
                        DoNest
                    </span>
                </div>

                {/* Desktop Actions */}
                {!authenticated ? (
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            to="/login"
                            className="px-5 py-2.5 text-amber-800 hover:text-amber-950 font-light"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="px-6 py-2.5 bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 rounded-full hover:from-amber-800 hover:to-amber-900 transition-all hover:shadow-xl"
                        >
                            Sign Up
                        </Link>
                    </div>
                ) : (
                    <div className="hidden md:flex items-center gap-3">
                        <button
                            onClick={handleLogout}
                            className="px-6 py-2.5 bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 rounded-full hover:from-amber-800 hover:to-amber-900 transition-all hover:shadow-xl"
                        >
                            Logout
                        </button>
                    </div>
                )}

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-amber-900"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-amber-50 border-t border-amber-200 px-6 py-6 space-y-4 shadow-lg">
                    {!authenticated ? (
                        <div className="pt-4 flex flex-col gap-3">
                            <Link
                                to="/login"
                                className="w-full text-center px-4 py-2 border border-amber-300 rounded-lg text-amber-900"
                                onClick={() => setIsOpen(false)}
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="w-full text-center px-4 py-2 bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 rounded-lg"
                                onClick={() => setIsOpen(false)}
                            >
                                Sign Up
                            </Link>
                        </div>
                    ) : (
                        <div className="pt-4 flex flex-col gap-3">
                            <button
                                onClick={handleLogout}
                                className="w-full text-center px-4 py-2 bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 rounded-lg"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};
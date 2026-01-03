import { useState } from "react";
import { Formik } from "formik";
import { Eye, EyeOff, Mail, Lock, ClipboardCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../utilities/AppDispatch";
import { userLoginThunk } from "../slices/userSlice";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface LoginFormValues {
    email: string;
    password: string;
}

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const initialValues: LoginFormValues = {
        email: "",
        password: "",
    };

    const validate = (values: LoginFormValues) => {
        const errors: Partial<LoginFormValues> = {};

        if (!values.email) {
            errors.email = "Email is required";
        } else if (!/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/.test(values.email)) {
            errors.email = "Invalid email address";
        }

        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }

        return errors;
    };

    const handleSubmit = async (values: LoginFormValues) => {
        try {
            setLoading(true)
            await dispatch(userLoginThunk(values)).unwrap();
            toast.success("LoggedIn successfully");
            navigate('/home', { replace: true })
        } catch (error) {
            const errMsg = error instanceof AxiosError ? error.message : String(error);
            console.log(errMsg)
            toast.error(errMsg as string);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 px-4">
            <div className="w-full max-w-md bg-amber-50/90 backdrop-blur-md rounded-2xl shadow-xl border border-amber-200 p-8">

                {/* Header */}
                <div className="flex flex-col items-center gap-3 mb-6">
                    <div
                        onClick={() => navigate('/')}
                        className="w-12 h-12 bg-gradient-to-br from-amber-700 to-amber-900 rounded-xl flex items-center justify-center shadow-lg">
                        <ClipboardCheck className="w-6 h-6 text-amber-50" />
                    </div>
                    <h1 className="text-2xl font-serif text-amber-900">
                        Welcome back to DoNest
                    </h1>
                    <p className="text-sm text-amber-700 font-light">
                        Login to manage your tasks efficiently
                    </p>
                </div>

                {/* Form */}
                <Formik
                    initialValues={initialValues}
                    validate={validate}
                    onSubmit={handleSubmit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                    }) => (
                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Email */}
                            <div>
                                <label className="block text-sm text-amber-800 mb-1">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-600" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-amber-300 bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-600"
                                    />
                                </div>
                                {touched.email && errors.email && (
                                    <p className="text-xs text-red-600 mt-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm text-amber-800 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-600" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-amber-300 bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-600"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600 hover:text-amber-800"
                                    >
                                        {showPassword ? (
                                            <Eye className="w-4 h-4" />
                                        ) : (
                                            <EyeOff className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                                {touched.password && errors.password && (
                                    <p className="text-xs text-red-600 mt-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full py-2.5 bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 rounded-lg hover:from-amber-800 hover:to-amber-900 transition-all shadow-md"
                            >
                                {loading ? 'Loging...' : 'Login'}
                            </button>
                        </form>
                    )}
                </Formik>

                {/* Footer */}
                <p className="text-center text-sm text-amber-700 mt-6">
                    Don’t have an account?{" "}
                    <button
                        onClick={() => navigate("/register")}
                        className="text-amber-900 font-medium hover:underline"
                    >
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    );
};

import { useState } from "react";
import { Formik } from "formik";
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    ClipboardCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { userRegisterThunk } from "../slices/userSlice";
import { useAppDispatch } from "../utilities/AppDispatch";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

interface RegisterFormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const Registration = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dispatch = useAppDispatch()

    const initialValues: RegisterFormValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const validate = (values: RegisterFormValues) => {
        const errors: Partial<RegisterFormValues> = {};

        if (!values.name.trim()) {
            errors.name = "Name is required";
        }

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

        if (!values.confirmPassword) {
            errors.confirmPassword = "Confirm your password";
        } else if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        return errors;
    };

    const handleSubmit = async (values: RegisterFormValues) => {
        try {
            console.log("Register Data:", values);
            setLoading(true)
            await dispatch(userRegisterThunk(values)).unwrap();
            toast.success("Account created successfully");
            navigate('/home', { replace: true })
        } catch (error) {
            const errMsg = error instanceof AxiosError ? error.message : String(error);
            console.log(errMsg)
            toast.error(errMsg as string);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 px-4">
            <div className="w-full max-w-md bg-amber-50/90 backdrop-blur-md rounded-2xl shadow-xl border border-amber-200 m-5 p-5">

                {/* Header */}
                <div className="flex flex-col items-center gap-3 mb-6">
                    <div
                        onClick={() => navigate('/')}
                        className="w-12 h-12 bg-gradient-to-br from-amber-700 to-amber-900 rounded-xl flex items-center justify-center shadow-lg">
                        <ClipboardCheck className="w-6 h-6 text-amber-50" />
                    </div>
                    <h1 className="text-2xl font-serif text-amber-900">
                        Create your DoNest account
                    </h1>
                    <p className="text-sm text-amber-700 font-light text-center">
                        Start organizing tasks and collaborating in real-time
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

                            {/* Name */}
                            <div>
                                <label className="block text-sm text-amber-800 mb-1">
                                    Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-600" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-amber-300 bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-600"
                                    />
                                </div>
                                {touched.name && errors.name && (
                                    <p className="text-xs text-red-600 mt-1">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

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
                                        {showPassword ? <Eye /> : <EyeOff />}
                                    </button>
                                </div>
                                {touched.password && errors.password && (
                                    <p className="text-xs text-red-600 mt-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm text-amber-800 mb-1">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-600" />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-amber-300 bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-600"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-600 hover:text-amber-800"
                                    >
                                        {showConfirmPassword ? <Eye /> : <EyeOff />}
                                    </button>
                                </div>
                                {touched.confirmPassword && errors.confirmPassword && (
                                    <p className="text-xs text-red-600 mt-1">
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full py-2.5 bg-gradient-to-r from-amber-700 to-amber-800 text-amber-50 rounded-lg hover:from-amber-800 hover:to-amber-900 transition-all shadow-md"
                            >
                                {loading ? 'Creating...' : 'Create Account'}
                            </button>
                        </form>
                    )}
                </Formik>

                {/* Footer */}
                <p className="text-center text-sm text-amber-700 mt-4">
                    Already have an account?{" "}
                    <button
                        onClick={() => navigate("/login")}
                        className="text-amber-900 font-medium hover:underline"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

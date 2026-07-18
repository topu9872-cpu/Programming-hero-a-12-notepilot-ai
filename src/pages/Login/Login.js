import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Mail, Lock, Eye, EyeOff, Sparkles, Shield, ArrowRight, } from 'lucide-react';
import { authClient } from '../../lib/auth-client';
const highlights = [
    { icon: Sparkles, text: 'AI-powered note summaries' },
    { icon: Shield, text: 'End-to-end encrypted' },
    { icon: ArrowRight, text: 'Smart organization & insights' },
];
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: { rememberMe: false },
    });
    const navigate = useNavigate();
    const onSubmit = async (formData) => {
        setIsSubmitting(true);
        try {
            const { email, password } = formData;
            const { data: responseData, error } = await authClient.signIn.email({
                email,
                password,
                callbackURL: "/",
            });
            if (error) {
                toast.error(error.message || "Something went wrong during signup.");
                return;
            }
            toast.success("Account created! Redirecting to dashboard...");
            setTimeout(() => {
                navigate("/");
            }, 1000);
        }
        catch (err) {
            console.error("Signup error:", err);
            toast.error("An unexpected error occurred.");
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const handleGoogleLogin = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: import.meta.env.VITE_APP_URL,
            });
        }
        catch (err) {
            console.error("Google sign-in error:", err);
            toast.error("Failed to authenticate with Google.");
        }
    };
    return (_jsx("div", { className: "flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 pt-24 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 transition-colors", children: _jsxs("div", { className: "grid w-full max-w-5xl items-center gap-12 lg:grid-cols-2 lg:gap-16", children: [_jsxs("div", { className: "hidden flex-col lg:flex", children: [_jsxs("div", { className: "mb-6 inline-flex items-center gap-2", children: [_jsx(Sparkles, { className: "h-6 w-6 text-indigo-600" }), _jsxs("span", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: ["NotePilot ", _jsx("span", { className: "text-indigo-600", children: "AI" })] })] }), _jsxs("h2", { className: "text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white", children: ["Welcome Back to", ' ', _jsx("span", { className: "bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent", children: "Smarter Notes" })] }), _jsx("p", { className: "mt-4 text-base leading-relaxed text-gray-500 dark:text-gray-400", children: "Sign in to access your AI-powered notes, insights, and productivity tools." }), _jsx("div", { className: "mt-8 space-y-4", children: highlights.map((item) => {
                                const Icon = item.icon;
                                return (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900/20", children: _jsx(Icon, { className: "h-4 w-4 text-indigo-600 dark:text-indigo-400" }) }), _jsx("span", { className: "text-sm font-medium text-gray-700 dark:text-gray-300", children: item.text })] }, item.text));
                            }) })] }), _jsx("div", { className: "w-full max-w-md mx-auto lg:mx-0", children: _jsxs("div", { className: "rounded-2xl border border-gray-200 bg-white p-8 shadow-xl shadow-indigo-500/5 backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/60 dark:shadow-indigo-900/10", children: [_jsxs("div", { className: "mb-6 text-center lg:hidden", children: [_jsxs("div", { className: "mb-2 inline-flex items-center gap-2", children: [_jsx(Sparkles, { className: "h-5 w-5 text-indigo-600" }), _jsxs("span", { className: "text-xl font-bold text-gray-900 dark:text-white", children: ["NotePilot ", _jsx("span", { className: "text-indigo-600", children: "AI" })] })] }), _jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Sign In" })] }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" }), _jsx("input", { type: "email", ...register('email', { required: 'Email is required' }), className: "w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-indigo-500", placeholder: "you@example.com" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" }), _jsx("input", { type: showPassword ? 'text' : 'password', ...register('password', { required: 'Password is required' }), className: "w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-12 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white", placeholder: "Enter your password" }), _jsx("button", { type: "button", onClick: () => setShowPassword((prev) => !prev), className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300", children: showPassword ? _jsx(EyeOff, { className: "h-4 w-4" }) : _jsx(Eye, { className: "h-4 w-4" }) })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [_jsx("input", { type: "checkbox", ...register('rememberMe'), className: "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800" }), _jsx("span", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Remember me" })] }), _jsx(Link, { to: "/forgot-password", className: "text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400", children: "Forgot password?" })] }), _jsx("button", { type: "submit", disabled: isSubmitting, className: "w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60", children: isSubmitting ? 'Signing in...' : 'Sign In' })] }), _jsxs("div", { className: "relative my-6 flex items-center gap-3", children: [_jsx("div", { className: "flex-1 border-t border-gray-200 dark:border-gray-700" }), _jsx("span", { className: "text-xs text-gray-400", children: "or continue with" }), _jsx("div", { className: "flex-1 border-t border-gray-200 dark:border-gray-700" })] }), _jsxs("button", { onClick: handleGoogleLogin, className: "flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700", children: [_jsxs("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", children: [_jsx("path", { d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z", fill: "#4285F4" }), _jsx("path", { d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", fill: "#34A853" }), _jsx("path", { d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z", fill: "#FBBC05" }), _jsx("path", { d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", fill: "#EA4335" })] }), "Continue with Google"] }), _jsxs("p", { className: "mt-6 text-center text-sm text-gray-500 dark:text-gray-400", children: ["Don't have an account?", ' ', _jsx(Link, { to: "/signup", className: "font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400", children: "Create one" })] })] }) })] }) }));
};
export default Login;

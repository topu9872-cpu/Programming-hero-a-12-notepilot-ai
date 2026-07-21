import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Sparkles,
  Shield,
  ArrowRight,
} from "lucide-react";
import { authClient } from "../../lib/auth-client";

interface SignupFormData {
  name: string; // Synced with the input registration
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const highlights = [
  { icon: Sparkles, text: "AI-powered note summaries" },
  { icon: Shield, text: "End-to-end encrypted" },
  { icon: ArrowRight, text: "Smart organization & insights" },
];

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: { acceptTerms: false },
  });

  const password = watch("password");

  const onSubmit = async (formData: SignupFormData) => {
    setIsSubmitting(true);
    try {
      const { email, password, name } = formData;

      const { data: responseData, error } = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Something went wrong during signup.");
        return;
      }

      toast.success("Account created! Redirecting to Home...");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
       // Use FRONTEND URL when available, otherwise current origin
       callbackURL: (import.meta.env.VITE_FRONTEND_URL as string | undefined) ?? window.location.origin,
      });
    } catch (err) {
      console.error("Google sign-in error:", err);
      toast.error("Failed to authenticate with Google.");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white px-4 py-12 pt-24 dark:bg-gray-950 sm:px-6 lg:px-8">
      <div className="grid w-full max-w-5xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left - Branding */}
        <div className="hidden flex-col lg:flex">
          <div className="mb-6 inline-flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              NotePilot <span className="text-indigo-600">AI</span>
            </span>
          </div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Start Your Journey with{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI-Powered Notes
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Create your free account and start transforming the way you capture,
            organize, and act on your ideas.
          </p>
          <div className="mt-8 space-y-4">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900/20">
                    <Icon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right - Auth Card */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl shadow-indigo-500/5 backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/60 dark:shadow-indigo-900/10">
            <div className="mb-6 text-center lg:hidden">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Create Account
              </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name */}
              {/* Full Name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Full name is required" })}
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 transition focus:outline-hidden dark:bg-gray-800 dark:text-white ${
                    errors.name
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:focus:border-indigo-400"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 transition focus:outline-hidden dark:bg-gray-800 dark:text-white ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-700 dark:focus:border-indigo-400"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
              {/* Password */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 dark:bg-gray-800 dark:text-white ${errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-200 dark:border-gray-700"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-900 dark:bg-gray-800 dark:text-white ${errors.confirmPassword ? "border-red-500 focus:ring-red-500" : "border-gray-200 dark:border-gray-700"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Action Buttons & Links */}
              <div className="flex items-center justify-between pt-1">
                <Link
                  to="/forgot-password"
                  className="text-xs text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
              >
                {isSubmitting ? "Creating..." : "Create Account"}
              </button>

              <div className="relative flex items-center gap-3 py-2">
                <div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
                <span className="text-xs text-gray-400">or continue with</span>
                <div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
              </div>

              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleSignup}
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

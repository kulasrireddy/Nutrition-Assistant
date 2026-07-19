import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLeaf } from "react-icons/fa";

import useAuth from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const {
    login,
    isAuthenticated,
    loading: authLoading,
  } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [authLoading, isAuthenticated, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      await login(formData.email.trim(), formData.password);
      navigate("/dashboard", { replace: true });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to log in. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-green-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-200 border-t-green-600" />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-green-100 bg-white shadow-2xl lg:grid-cols-2">
        <section className="hidden flex-col justify-between bg-gradient-to-br from-green-700 to-emerald-500 p-12 text-white lg:flex">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
                <FaLeaf />
              </span>
              <span className="text-2xl font-black">NutriPulse</span>
            </Link>

            <div className="mt-20">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-100">
                Welcome back
              </p>
              <h1 className="mt-4 text-5xl font-black leading-tight">
                Continue your healthier lifestyle journey.
              </h1>
              <p className="mt-6 text-lg leading-8 text-green-50">
                Track meals, water, BMI and weekly progress
                from your personal dashboard.
              </p>
            </div>
          </div>
        </section>

        <section className="p-7 sm:p-10 lg:p-12">
          <div className="lg:hidden">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-white">
                <FaLeaf />
              </span>
              <span className="text-2xl font-black text-slate-900">
                NutriPulse
              </span>
            </Link>
          </div>

          <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-green-600 lg:mt-0">
            Account Login
          </p>
          <h2 className="mt-3 text-4xl font-black text-slate-900">
            Sign in to your account
          </h2>
          <p className="mt-3 text-slate-500">
            Enter your registered email and password.
          </p>

          {error && (
            <div className="mt-7 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-12 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-green-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-2xl bg-green-600 px-6 py-4 font-bold text-white shadow-lg shadow-green-200 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-600">
            Do not have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-green-600 hover:text-green-700"
            >
              Create an account
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

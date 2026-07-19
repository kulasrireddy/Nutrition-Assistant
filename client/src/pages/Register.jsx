import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLeaf } from "react-icons/fa";

import useAuth from "../hooks/useAuth";

const initialFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  profession: "Student",
  age: "",
  gender: "Prefer not to say",
  height: "",
  weight: "",
  goal: "Improve Health",
  activityLevel: "Sedentary",
};

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    isAuthenticated,
    loading: authLoading,
  } = useAuth();

  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
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

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password
    ) {
      setError("Name, email and password are required.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
      profession: formData.profession,
      gender: formData.gender,
      goal: formData.goal,
      activityLevel: formData.activityLevel,
    };

    if (formData.age) payload.age = Number(formData.age);
    if (formData.height) payload.height = Number(formData.height);
    if (formData.weight) payload.weight = Number(formData.weight);

    try {
      setSubmitting(true);
      setError("");
      await register(payload);
      navigate("/dashboard", { replace: true });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to create your account."
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
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4 py-12">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-green-100 bg-white shadow-2xl lg:grid-cols-[0.8fr_1.2fr]">
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
                Start your journey
              </p>
              <h1 className="mt-4 text-5xl font-black leading-tight">
                Build healthier habits with one dashboard.
              </h1>
              <p className="mt-6 text-lg leading-8 text-green-50">
                Create your account to track meals, water,
                BMI and weekly health progress.
              </p>
            </div>
          </div>
        </section>

        <section className="p-7 sm:p-10 lg:p-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
            Create account
          </p>
          <h2 className="mt-3 text-4xl font-black text-slate-900">
            Join NutriPulse
          </h2>
          <p className="mt-3 text-slate-500">
            Enter your information to personalize your dashboard.
          </p>

          {error && (
            <div className="mt-7 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Full name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Field
                label="Email address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <PasswordField
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                visible={showPassword}
                onToggle={() => setShowPassword((value) => !value)}
              />

              <PasswordField
                label="Confirm password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                visible={showConfirmPassword}
                onToggle={() =>
                  setShowConfirmPassword((value) => !value)
                }
              />

              <SelectField
                label="Profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                options={[
                  "Student",
                  "Software Professional",
                  "Teacher",
                  "Healthcare Professional",
                  "Business Professional",
                  "Homemaker",
                  "Other",
                ]}
              />
              <Field
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
              />
              <SelectField
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                options={[
                  "Male",
                  "Female",
                  "Other",
                  "Prefer not to say",
                ]}
              />
              <Field
                label="Height in cm"
                name="height"
                type="number"
                value={formData.height}
                onChange={handleChange}
              />
              <Field
                label="Weight in kg"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
              />
              <SelectField
                label="Health goal"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                options={[
                  "Lose Weight",
                  "Maintain Weight",
                  "Gain Weight",
                  "Build Muscle",
                  "Improve Health",
                ]}
              />
              <div className="sm:col-span-2">
                <SelectField
                  label="Activity level"
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleChange}
                  options={[
                    "Sedentary",
                    "Lightly Active",
                    "Moderately Active",
                    "Very Active",
                  ]}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-8 w-full rounded-2xl bg-green-600 px-6 py-4 font-bold text-white shadow-lg shadow-green-200 transition hover:bg-green-700 disabled:opacity-60"
            >
              {submitting ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-green-600"
            >
              Sign in
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function PasswordField({
  label,
  name,
  value,
  onChange,
  visible,
  onToggle,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <div className="relative">
        <input
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          required
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-12 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
          aria-label="Toggle password visibility"
        >
          {visible ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
}

import { useCallback, useEffect, useState } from "react";
import {
  FaBriefcase,
  FaBullseye,
  FaEnvelope,
  FaRunning,
  FaSave,
} from "react-icons/fa";

import API from "../api/api";
import useAuth from "../hooks/useAuth";

const initialProfile = {
  name: "",
  email: "",
  profession: "Student",
  age: "",
  gender: "Prefer not to say",
  height: "",
  weight: "",
  goal: "Improve Health",
  activityLevel: "Sedentary",
};

export default function Profile() {
  const { setUser } = useAuth();
  const [form, setForm] = useState(initialProfile);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const response = await API.get("/profile");
      const userData = response.data.user;

      setProfile(userData);
      setForm({
        name: userData?.name || "",
        email: userData?.email || "",
        profession: userData?.profession || "Student",
        age: userData?.age ?? "",
        gender:
          userData?.gender || "Prefer not to say",
        height: userData?.height ?? "",
        weight: userData?.weight ?? "",
        goal: userData?.goal || "Improve Health",
        activityLevel:
          userData?.activityLevel || "Sedentary",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Unable to load profile.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const change = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const submit = async (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      setMessage({
        type: "error",
        text: "Full name is required.",
      });
      return;
    }

    const payload = {
      name: form.name.trim(),
      profession: form.profession,
      gender: form.gender,
      goal: form.goal,
      activityLevel: form.activityLevel,
      age: form.age === "" ? "" : Number(form.age),
      height:
        form.height === "" ? "" : Number(form.height),
      weight:
        form.weight === "" ? "" : Number(form.weight),
    };

    try {
      setSaving(true);
      const response = await API.put("/profile", payload);
      const updatedUser = response.data.user;

      setProfile(updatedUser);
      setUser(updatedUser);
      localStorage.setItem(
        "nutripulse_user",
        JSON.stringify(updatedUser)
      );
      setMessage({
        type: "success",
        text:
          response.data.message ||
          "Profile updated successfully.",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Unable to update profile.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">
        Loading your profile...
      </div>
    );
  }

  const initial =
    profile?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <>
      <section className="rounded-3xl bg-gradient-to-r from-green-700 to-emerald-500 p-7 text-white shadow-lg sm:p-9">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-100">
          Account Management
        </p>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">
          My Profile
        </h1>
        <p className="mt-4 max-w-3xl text-green-50">
          Review and update your personal and health information.
        </p>
      </section>

      <Status message={message} />

      <section className="mt-7 grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="text-center">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-emerald-400 text-4xl font-black text-white">
              {initial}
            </div>
            <h2 className="mt-5 text-2xl font-black text-slate-900">
              {profile?.name || "NutriPulse User"}
            </h2>
            <p className="mt-2 text-slate-500">
              {profile?.email || ""}
            </p>
            <span className="mt-4 inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
              {profile?.profession || "User"}
            </span>
          </div>

          <div className="mt-8 space-y-4">
            <Info
              icon={<FaEnvelope />}
              label="Email"
              value={profile?.email}
            />
            <Info
              icon={<FaBriefcase />}
              label="Profession"
              value={profile?.profession}
            />
            <Info
              icon={<FaBullseye />}
              label="Health Goal"
              value={profile?.goal}
            />
            <Info
              icon={<FaRunning />}
              label="Activity Level"
              value={profile?.activityLevel}
            />
          </div>
        </article>

        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black text-slate-900">
            Edit Profile
          </h2>

          <form onSubmit={submit} className="mt-8">
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Full Name"
                name="name"
                value={form.name}
                onChange={change}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={change}
                disabled
              />
              <Select
                label="Profession"
                name="profession"
                value={form.profession}
                onChange={change}
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
                value={form.age}
                onChange={change}
              />
              <Select
                label="Gender"
                name="gender"
                value={form.gender}
                onChange={change}
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
                value={form.height}
                onChange={change}
              />
              <Field
                label="Weight in kg"
                name="weight"
                type="number"
                value={form.weight}
                onChange={change}
              />
              <Select
                label="Health Goal"
                name="goal"
                value={form.goal}
                onChange={change}
                options={[
                  "Lose Weight",
                  "Maintain Weight",
                  "Gain Weight",
                  "Build Muscle",
                  "Improve Health",
                ]}
              />
              <div className="md:col-span-2">
                <Select
                  label="Activity Level"
                  name="activityLevel"
                  value={form.activityLevel}
                  onChange={change}
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
              disabled={saving}
              className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-green-600 px-6 py-4 font-bold text-white"
            >
              <FaSave />
              {saving
                ? "Saving changes..."
                : "Save Profile Changes"}
            </button>
          </form>
        </article>
      </section>
    </>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </p>
        <p className="mt-1 font-bold text-slate-800">
          {value || "Not available"}
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  disabled = false,
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
        disabled={disabled}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none disabled:cursor-not-allowed disabled:bg-slate-100 focus:border-green-500 focus:ring-4 focus:ring-green-100"
      />
    </div>
  );
}

function Select({ label, name, value, onChange, options }) {
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

function Status({ message }) {
  if (!message.text) return null;

  return (
    <div
      className={`mt-6 rounded-2xl border px-5 py-4 ${
        message.type === "error"
          ? "border-red-200 bg-red-50 text-red-700"
          : "border-green-200 bg-green-50 text-green-700"
      }`}
    >
      {message.text}
    </div>
  );
}

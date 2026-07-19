import { useCallback, useEffect, useState } from "react";
import {
  FaAppleAlt,
  FaCalculator,
  FaFire,
  FaHeartbeat,
  FaTint,
  FaUtensils,
} from "react-icons/fa";

import API from "../api/api";
import Recommendations from "../components/Recommendations";

const initialData = {
  profile: null,
  summary: {
    totalMeals: 0,
    totalCalories: 0,
    totalProtein: 0,
    totalCarbohydrates: 0,
    totalFats: 0,
    totalWater: 0,
    calorieGoal: 2000,
    waterGoal: 2500,
    calorieProgress: 0,
    waterProgress: 0,
  },
  latestBmi: null,
  recentMeals: [],
  recommendations: [],
};

export default function Dashboard() {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await API.get("/dashboard");

      setData({
        profile: response.data.profile || null,
        summary: response.data.summary || initialData.summary,
        latestBmi: response.data.latestBmi || null,
        recentMeals: response.data.recentMeals || [],
        recommendations: response.data.recommendations || [],
      });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-green-200 border-t-green-600" />
          <p className="mt-5 text-slate-600">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  const {
    profile,
    summary,
    latestBmi,
    recentMeals,
    recommendations,
  } = data;

  const statistics = [
    {
      title: "Calories",
      value: `${summary.totalCalories || 0} kcal`,
      icon: <FaFire />,
      style: "bg-orange-100 text-orange-600",
    },
    {
      title: "Water Intake",
      value: `${summary.totalWater || 0} ml`,
      icon: <FaTint />,
      style: "bg-cyan-100 text-cyan-600",
    },
    {
      title: "Meals Logged",
      value: summary.totalMeals || 0,
      icon: <FaUtensils />,
      style: "bg-green-100 text-green-600",
    },
    {
      title: "Latest BMI",
      value: latestBmi?.bmi || "--",
      icon: <FaCalculator />,
      style: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <>
      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
          {error}
        </div>
      )}

      <section className="rounded-3xl bg-gradient-to-r from-green-700 to-emerald-500 p-7 text-white shadow-lg sm:p-9">
        <p className="font-semibold uppercase tracking-[0.2em] text-green-100">
          NutriPulse Dashboard
        </p>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">
          Welcome back, {profile?.name?.split(" ")[0] || "User"}
        </h1>
        <p className="mt-4 max-w-2xl text-green-50">
          Review meals, hydration, BMI and daily nutrition progress.
        </p>
        <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white/15 px-4 py-3">
          <FaHeartbeat />
          Health goal: {profile?.goal || "Improve Health"}
        </div>
      </section>

      <section className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((item) => (
          <article
            key={item.title}
            className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm"
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${item.style}`}
            >
              {item.icon}
            </div>
            <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-slate-500">
              {item.title}
            </p>
            <h2 className="mt-2 text-3xl font-black text-slate-900">
              {item.value}
            </h2>
          </article>
        ))}
      </section>

      <section className="mt-7 grid gap-6 xl:grid-cols-2">
        <Progress
          title="Daily Calorie Progress"
          value={summary.calorieProgress || 0}
          description={`${summary.totalCalories || 0} of ${
            summary.calorieGoal || 2000
          } kcal`}
          color="bg-orange-500"
        />
        <Progress
          title="Daily Water Progress"
          value={summary.waterProgress || 0}
          description={`${summary.totalWater || 0} of ${
            summary.waterGoal || 2500
          } ml`}
          color="bg-cyan-500"
        />
      </section>

      <section className="mt-7 grid gap-6 xl:grid-cols-2">
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <FaAppleAlt className="text-2xl text-green-600" />
            <h2 className="text-xl font-bold text-slate-900">
              Nutrition Summary
            </h2>
          </div>

          <div className="mt-6 space-y-4">
            <Nutrition label="Protein" value={`${summary.totalProtein || 0} g`} />
            <Nutrition
              label="Carbohydrates"
              value={`${summary.totalCarbohydrates || 0} g`}
            />
            <Nutrition label="Fats" value={`${summary.totalFats || 0} g`} />
            <Nutrition
              label="Calories"
              value={`${summary.totalCalories || 0} kcal`}
            />
          </div>
        </article>

        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Recent Meals
          </h2>

          {recentMeals.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center text-slate-500">
              No meals added today.
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {recentMeals.map((meal) => (
                <div
                  key={meal._id}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
                >
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {meal.foodName}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {meal.mealType}
                    </p>
                  </div>
                  <p className="font-bold text-orange-600">
                    {meal.calories} kcal
                  </p>
                </div>
              ))}
            </div>
          )}
        </article>
      </section>

      <Recommendations recommendations={recommendations} />
    </>
  );
}

function Progress({ title, value, description, color }) {
  const percent = Math.min(Math.max(Number(value) || 0, 0), 100);

  return (
    <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex justify-between gap-4">
        <div>
          <h2 className="font-bold text-slate-900">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        </div>
        <span className="text-xl font-black">{percent}%</span>
      </div>
      <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </article>
  );
}

function Nutrition({ label, value }) {
  return (
    <div className="flex justify-between rounded-2xl bg-slate-50 px-5 py-4">
      <span className="text-slate-600">{label}</span>
      <span className="font-black text-slate-900">{value}</span>
    </div>
  );
}

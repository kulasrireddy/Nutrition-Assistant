import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaChartLine,
  FaFire,
  FaHeartbeat,
  FaTint,
  FaUtensils,
} from "react-icons/fa";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import API from "../api/api";

const empty = {
  totals: {
    meals: 0,
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fats: 0,
    water: 0,
  },
  averages: {
    dailyCalories: 0,
    dailyWater: 0,
    dailyMeals: 0,
  },
  latestBmi: null,
  weeklyData: [],
};

const colors = ["#16a34a", "#2563eb", "#9333ea"];

export default function Analytics() {
  const [data, setData] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await API.get("/analytics/weekly");

      setData({
        totals: response.data.totals || empty.totals,
        averages: response.data.averages || empty.averages,
        latestBmi: response.data.latestBmi ?? null,
        weeklyData: response.data.weeklyData || [],
      });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to load analytics."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const nutrientData = useMemo(
    () => [
      { name: "Protein", value: data.totals.protein || 0 },
      {
        name: "Carbohydrates",
        value: data.totals.carbohydrates || 0,
      },
      { name: "Fats", value: data.totals.fats || 0 },
    ],
    [data.totals]
  );

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">
        Loading weekly analytics...
      </div>
    );
  }

  return (
    <>
      <section className="rounded-3xl bg-gradient-to-r from-emerald-700 to-green-500 p-7 text-white shadow-lg sm:p-9">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-100">
          Health Insights
        </p>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">
          Weekly Analytics
        </h1>
        <p className="mt-4 max-w-3xl text-green-50">
          Review meals, calories, hydration, nutrients and BMI.
        </p>
      </section>

      {error && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
          {error}
        </div>
      )}

      <section className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          title="Weekly Calories"
          value={`${format(data.totals.calories)} kcal`}
          icon={<FaFire />}
          style="bg-orange-100 text-orange-600"
        />
        <Metric
          title="Weekly Water"
          value={`${format(data.totals.water)} ml`}
          icon={<FaTint />}
          style="bg-cyan-100 text-cyan-600"
        />
        <Metric
          title="Meals Logged"
          value={data.totals.meals}
          icon={<FaUtensils />}
          style="bg-green-100 text-green-600"
        />
        <Metric
          title="Latest BMI"
          value={data.latestBmi ?? "--"}
          icon={<FaHeartbeat />}
          style="bg-purple-100 text-purple-600"
        />
      </section>

      <section className="mt-7 grid gap-6 xl:grid-cols-2">
        <Chart title="Daily Calories">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data.weeklyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="calories"
                fill="#f97316"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Chart>

        <Chart title="Daily Hydration">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={data.weeklyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="water"
                stroke="#06b6d4"
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>
        </Chart>
      </section>

      <section className="mt-7 grid gap-6 xl:grid-cols-2">
        <Chart title="Macronutrient Distribution">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={nutrientData}
                dataKey="value"
                nameKey="name"
                innerRadius={65}
                outerRadius={105}
                paddingAngle={4}
              >
                {nutrientData.map((item, index) => (
                  <Cell
                    key={item.name}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Chart>

        <Chart title="Meals Logged">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data.weeklyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar
                dataKey="meals"
                fill="#16a34a"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Chart>
      </section>

      <section className="mt-7 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-3">
          <FaChartLine className="text-2xl text-green-600" />
          <h2 className="text-2xl font-black text-slate-900">
            Daily Breakdown
          </h2>
        </div>

        <div className="mt-7 overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className="border-b border-slate-200">
                {[
                  "Day",
                  "Meals",
                  "Calories",
                  "Protein",
                  "Carbs",
                  "Fats",
                  "Water",
                  "BMI",
                ].map((label) => (
                  <th
                    key={label}
                    className="px-4 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.weeklyData.map((day) => (
                <tr
                  key={day.date}
                  className="border-b border-slate-100"
                >
                  <td className="px-4 py-5 font-bold">
                    {day.day} {day.fullDate}
                  </td>
                  <td className="px-4 py-5">{day.meals}</td>
                  <td className="px-4 py-5">
                    {format(day.calories)} kcal
                  </td>
                  <td className="px-4 py-5">
                    {format(day.protein)} g
                  </td>
                  <td className="px-4 py-5">
                    {format(day.carbohydrates)} g
                  </td>
                  <td className="px-4 py-5">
                    {format(day.fats)} g
                  </td>
                  <td className="px-4 py-5">
                    {format(day.water)} ml
                  </td>
                  <td className="px-4 py-5">
                    {day.bmi ?? "--"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function Metric({ title, value, icon, style }) {
  return (
    <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${style}`}>
        {icon}
      </div>
      <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </p>
      <h2 className="mt-2 text-3xl font-black text-slate-900">
        {value}
      </h2>
    </article>
  );
}

function Chart({ title, children }) {
  return (
    <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-xl font-black text-slate-900">
        {title}
      </h2>
      <div className="mt-7">{children}</div>
    </article>
  );
}

function format(value) {
  const number = Number(value) || 0;
  return Number.isInteger(number) ? number : number.toFixed(1);
}

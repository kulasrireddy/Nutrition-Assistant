import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  FaCalculator,
  FaHeartbeat,
  FaHistory,
  FaTrash,
} from "react-icons/fa";

import API from "../api/api";

export default function BmiCalculator() {
  const [form, setForm] = useState({
    height: "",
    weight: "",
  });
  const [records, setRecords] = useState([]);
  const [latest, setLatest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const response = await API.get("/bmi");
      setRecords(response.data.records || []);
      setLatest(response.data.latestBmi || null);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Unable to load BMI history.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (latest) {
      setForm({
        height: latest.height || "",
        weight: latest.weight || "",
      });
    }
  }, [latest]);

  const preview = useMemo(() => {
    const height = Number(form.height);
    const weight = Number(form.weight);

    if (!height || !weight) return null;

    const bmi = Number(
      (weight / ((height / 100) ** 2)).toFixed(1)
    );

    return {
      bmi,
      category: category(bmi),
    };
  }, [form.height, form.weight]);

  const submit = async (event) => {
    event.preventDefault();

    const height = Number(form.height);
    const weight = Number(form.weight);

    if (
      height < 50 ||
      height > 250 ||
      weight < 20 ||
      weight > 400
    ) {
      setMessage({
        type: "error",
        text: "Enter valid height and weight values.",
      });
      return;
    }

    try {
      setSaving(true);
      const response = await API.post("/bmi", {
        height,
        weight,
      });
      setLatest(response.data.bmi);
      setMessage({
        type: "success",
        text: "BMI calculated and saved.",
      });
      await load();
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Unable to calculate BMI.",
      });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this BMI record?")) return;

    try {
      await API.delete(`/bmi/${id}`);
      setMessage({
        type: "success",
        text: "BMI record deleted.",
      });
      await load();
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Unable to delete BMI record.",
      });
    }
  };

  const result = latest || preview;

  return (
    <>
      <section className="rounded-3xl bg-gradient-to-r from-purple-700 to-indigo-500 p-7 text-white shadow-lg sm:p-9">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-100">
          Health Assessment
        </p>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">
          BMI Calculator
        </h1>
        <p className="mt-4 max-w-3xl text-purple-50">
          Calculate and save your BMI history.
        </p>
      </section>

      <Status message={message} />

      <section className="mt-7 grid gap-6 xl:grid-cols-2">
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black text-slate-900">
            Calculate Your BMI
          </h2>

          <form onSubmit={submit} className="mt-8 space-y-6">
            <Input
              label="Height in centimetres"
              value={form.height}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  height: event.target.value,
                }))
              }
              unit="cm"
            />
            <Input
              label="Weight in kilograms"
              value={form.weight}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  weight: event.target.value,
                }))
              }
              unit="kg"
            />

            <button
              type="submit"
              disabled={saving}
              className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-purple-600 px-6 py-4 font-bold text-white"
            >
              <FaCalculator />
              {saving
                ? "Calculating..."
                : "Calculate and Save BMI"}
            </button>
          </form>
        </article>

        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-4">
            <FaHeartbeat className="text-3xl text-red-500" />
            <h2 className="text-2xl font-black text-slate-900">
              Your BMI Result
            </h2>
          </div>

          {result ? (
            <div
              className={`mt-8 rounded-3xl border p-7 text-center ${categoryStyle(
                result.category
              )}`}
            >
              <p className="text-sm font-bold uppercase tracking-[0.2em]">
                Body Mass Index
              </p>
              <h3 className="mt-3 text-6xl font-black">
                {result.bmi}
              </h3>
              <p className="mt-4 text-xl font-black">
                {result.category}
              </p>
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-5 py-14 text-center text-slate-500">
              Enter height and weight to view the result.
            </div>
          )}
        </article>
      </section>

      <section className="mt-7 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900">
            BMI History
          </h2>
          <FaHistory className="text-2xl text-purple-600" />
        </div>

        {loading ? (
          <div className="py-16 text-center text-slate-500">
            Loading BMI history...
          </div>
        ) : records.length === 0 ? (
          <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center text-slate-500">
            No BMI history available.
          </div>
        ) : (
          <div className="mt-7 overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  {[
                    "Date",
                    "Height",
                    "Weight",
                    "BMI",
                    "Category",
                    "Action",
                  ].map((label) => (
                    <th
                      key={label}
                      className="px-4 py-4 text-xs font-bold uppercase tracking-wider text-slate-500"
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr
                    key={record._id}
                    className="border-b border-slate-100"
                  >
                    <td className="px-4 py-5">
                      {dateText(
                        record.calculatedAt ||
                          record.createdAt
                      )}
                    </td>
                    <td className="px-4 py-5">
                      {record.height} cm
                    </td>
                    <td className="px-4 py-5">
                      {record.weight} kg
                    </td>
                    <td className="px-4 py-5 font-black text-purple-600">
                      {record.bmi}
                    </td>
                    <td className="px-4 py-5">
                      {record.category}
                    </td>
                    <td className="px-4 py-5">
                      <button
                        type="button"
                        onClick={() => remove(record._id)}
                        className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600"
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}

function Input({ label, value, onChange, unit }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          min="0"
          step="0.1"
          value={value}
          onChange={onChange}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-16 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
          {unit}
        </span>
      </div>
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

function category(value) {
  if (value < 18.5) return "Underweight";
  if (value < 25) return "Normal Weight";
  if (value < 30) return "Overweight";
  return "Obese";
}

function categoryStyle(value) {
  const styles = {
    Underweight: "border-blue-200 bg-blue-50 text-blue-700",
    "Normal Weight":
      "border-green-200 bg-green-50 text-green-700",
    Overweight:
      "border-yellow-200 bg-yellow-50 text-yellow-700",
    Obese: "border-red-200 bg-red-50 text-red-700",
  };

  return styles[value] || "border-slate-200 bg-slate-50";
}

function dateText(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unavailable";

  return date.toLocaleDateString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

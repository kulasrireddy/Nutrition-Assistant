import { useCallback, useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaPlus,
  FaTint,
  FaTrash,
} from "react-icons/fa";

import API from "../api/api";

const GOAL = 2500;
const quickAmounts = [250, 500, 750, 1000];

export default function WaterTracker() {
  const [records, setRecords] = useState([]);
  const [total, setTotal] = useState(0);
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const response = await API.get("/water");
      setTotal(Number(response.data.totalWater) || 0);
      setRecords(response.data.records || []);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Unable to load water records.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const add = async (amount) => {
    const value = Number(amount);

    if (!value || value <= 0) {
      setMessage({
        type: "error",
        text: "Enter a valid water amount.",
      });
      return;
    }

    try {
      setSaving(true);
      await API.post("/water", { amount: value });
      setCustomAmount("");
      setMessage({
        type: "success",
        text: `${value} ml added successfully.`,
      });
      await load();
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Unable to add water.",
      });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this water entry?")) return;

    try {
      await API.delete(`/water/${id}`);
      setMessage({
        type: "success",
        text: "Water entry deleted successfully.",
      });
      await load();
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Unable to delete water entry.",
      });
    }
  };

  const progress = Math.min(
    Math.round((total / GOAL) * 100),
    100
  );
  const remaining = Math.max(GOAL - total, 0);

  return (
    <>
      <section className="rounded-3xl bg-gradient-to-r from-cyan-700 to-blue-500 p-7 text-white shadow-lg sm:p-9">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">
          Hydration Tracking
        </p>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">
          Water Tracker
        </h1>
        <p className="mt-4 max-w-3xl text-cyan-50">
          Record water intake and monitor your daily goal.
        </p>
      </section>

      <Status message={message} />

      <section className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Summary title="Consumed" value={`${total} ml`} />
        <Summary title="Goal" value={`${GOAL} ml`} />
        <Summary title="Remaining" value={`${remaining} ml`} />
        <Summary title="Glasses" value={Math.round(total / 250)} />
      </section>

      <section className="mt-7 grid gap-6 xl:grid-cols-2">
        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-900">
                Daily Progress
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {total} of {GOAL} ml
              </p>
            </div>
            <span className="text-3xl font-black text-cyan-600">
              {progress}%
            </span>
          </div>

          <div className="mt-8 h-4 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-cyan-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-7 rounded-2xl bg-cyan-50 px-5 py-4 text-cyan-800">
            {progress >= 100
              ? "Excellent! Goal completed."
              : `Drink another ${remaining} ml today.`}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-black text-slate-900">
            Add Water
          </h2>

          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {quickAmounts.map((amount) => (
              <button
                key={amount}
                type="button"
                disabled={saving}
                onClick={() => add(amount)}
                className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-4 font-black text-cyan-700"
              >
                +{amount} ml
              </button>
            ))}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              add(customAmount);
            }}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="number"
              value={customAmount}
              onChange={(event) =>
                setCustomAmount(event.target.value)
              }
              placeholder="Custom amount"
              min="1"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            />
            <button
              type="submit"
              disabled={saving || !customAmount}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-600 px-6 py-3.5 font-bold text-white"
            >
              <FaPlus />
              Add Water
            </button>
          </form>
        </article>
      </section>

      <section className="mt-7 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-black text-slate-900">
          Today&apos;s Records
        </h2>

        {loading ? (
          <div className="py-16 text-center text-slate-500">
            Loading water records...
          </div>
        ) : records.length === 0 ? (
          <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center text-slate-500">
            No water recorded today.
          </div>
        ) : (
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {records.map((record) => (
              <article
                key={record._id}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-5"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600">
                    <FaTint />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">
                      {record.amount} ml
                    </h3>
                    <p className="text-sm text-slate-500">
                      {formatTime(record.date || record.createdAt)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => remove(record._id)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600"
                  aria-label="Delete record"
                >
                  <FaTrash />
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function Summary({ title, value }) {
  return (
    <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600">
        <FaTint />
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

function Status({ message }) {
  if (!message.text) return null;

  return (
    <div
      className={`mt-6 flex items-center gap-3 rounded-2xl border px-5 py-4 ${
        message.type === "error"
          ? "border-red-200 bg-red-50 text-red-700"
          : "border-green-200 bg-green-50 text-green-700"
      }`}
    >
      {message.type === "success" && <FaCheckCircle />}
      {message.text}
    </div>
  );
}

function formatTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unavailable";

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

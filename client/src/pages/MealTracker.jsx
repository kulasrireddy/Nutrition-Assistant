import { useCallback, useEffect, useState } from "react";
import {
  FaEdit,
  FaFire,
  FaPlus,
  FaSave,
  FaTimes,
  FaTrash,
  FaUtensils,
} from "react-icons/fa";

import API from "../api/api";

const today = () => {
  const date = new Date();
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset)
    .toISOString()
    .split("T")[0];
};

const blankForm = {
  mealType: "Breakfast",
  foodName: "",
  quantity: "",
  unit: "servings",
  calories: "",
  protein: "",
  carbohydrates: "",
  fats: "",
  notes: "",
  mealDate: today(),
};

export default function MealTracker() {
  const [meals, setMeals] = useState([]);
  const [totals, setTotals] = useState({
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fats: 0,
  });
  const [form, setForm] = useState(blankForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const loadMeals = useCallback(async () => {
    try {
      setLoading(true);
      const response = await API.get("/meals");
      setMeals(response.data.meals || []);
      setTotals(
        response.data.totals || {
          calories: 0,
          protein: 0,
          carbohydrates: 0,
          fats: 0,
        }
      );
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Unable to load meals.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMeals();
  }, [loadMeals]);

  const change = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const reset = () => {
    setForm({ ...blankForm, mealDate: today() });
    setEditingId(null);
    setShowForm(false);
  };

  const submit = async (event) => {
    event.preventDefault();

    if (
      !form.foodName.trim() ||
      Number(form.quantity) <= 0 ||
      Number(form.calories) < 0
    ) {
      setMessage({
        type: "error",
        text: "Enter valid meal details.",
      });
      return;
    }

    const payload = {
      mealType: form.mealType,
      foodName: form.foodName.trim(),
      quantity: Number(form.quantity),
      unit: form.unit,
      calories: Number(form.calories),
      protein: Number(form.protein) || 0,
      carbohydrates: Number(form.carbohydrates) || 0,
      fats: Number(form.fats) || 0,
      notes: form.notes.trim(),
      mealDate: new Date(
        `${form.mealDate}T12:00:00`
      ).toISOString(),
    };

    try {
      setSaving(true);

      if (editingId) {
        await API.put(`/meals/${editingId}`, payload);
      } else {
        await API.post("/meals", payload);
      }

      setMessage({
        type: "success",
        text: editingId
          ? "Meal updated successfully."
          : "Meal added successfully.",
      });
      reset();
      await loadMeals();
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Unable to save meal.",
      });
    } finally {
      setSaving(false);
    }
  };

  const edit = (meal) => {
    setForm({
      mealType: meal.mealType || "Breakfast",
      foodName: meal.foodName || "",
      quantity: meal.quantity ?? "",
      unit: meal.unit || "servings",
      calories: meal.calories ?? "",
      protein: meal.protein ?? "",
      carbohydrates: meal.carbohydrates ?? "",
      fats: meal.fats ?? "",
      notes: meal.notes || "",
      mealDate: meal.mealDate
        ? new Date(meal.mealDate).toISOString().split("T")[0]
        : today(),
    });
    setEditingId(meal._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this meal?")) return;

    try {
      await API.delete(`/meals/${id}`);
      setMessage({
        type: "success",
        text: "Meal deleted successfully.",
      });
      await loadMeals();
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Unable to delete meal.",
      });
    }
  };

  return (
    <>
      <section className="flex flex-col gap-5 rounded-3xl bg-gradient-to-r from-green-700 to-emerald-500 p-7 text-white shadow-lg sm:flex-row sm:items-center sm:justify-between sm:p-9">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-100">
            Nutrition Tracking
          </p>
          <h1 className="mt-3 text-3xl font-black sm:text-4xl">
            Meal Tracker
          </h1>
          <p className="mt-3 max-w-2xl text-green-50">
            Add meals and monitor calories and macronutrients.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            showForm ? reset() : setShowForm(true)
          }
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-bold text-green-700"
        >
          {showForm ? <FaTimes /> : <FaPlus />}
          {showForm ? "Close Form" : "Add Meal"}
        </button>
      </section>

      <Message message={message} />

      {showForm && (
        <section className="mt-7 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-black text-slate-900">
            {editingId ? "Edit Meal" : "Add New Meal"}
          </h2>

          <form onSubmit={submit} className="mt-7">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <Select
                label="Meal Type"
                name="mealType"
                value={form.mealType}
                onChange={change}
                options={[
                  "Breakfast",
                  "Lunch",
                  "Dinner",
                  "Snack",
                ]}
              />
              <Field
                label="Food Name"
                name="foodName"
                value={form.foodName}
                onChange={change}
                required
              />
              <Field
                label="Quantity"
                name="quantity"
                type="number"
                value={form.quantity}
                onChange={change}
                required
              />
              <Select
                label="Unit"
                name="unit"
                value={form.unit}
                onChange={change}
                options={[
                  "grams",
                  "ml",
                  "pieces",
                  "cups",
                  "servings",
                ]}
              />
              <Field
                label="Calories"
                name="calories"
                type="number"
                value={form.calories}
                onChange={change}
                required
              />
              <Field
                label="Protein (g)"
                name="protein"
                type="number"
                value={form.protein}
                onChange={change}
              />
              <Field
                label="Carbohydrates (g)"
                name="carbohydrates"
                type="number"
                value={form.carbohydrates}
                onChange={change}
              />
              <Field
                label="Fats (g)"
                name="fats"
                type="number"
                value={form.fats}
                onChange={change}
              />
              <Field
                label="Meal Date"
                name="mealDate"
                type="date"
                value={form.mealDate}
                onChange={change}
                required
              />
              <div className="md:col-span-2 xl:col-span-3">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={change}
                  rows="3"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
                />
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-6 py-3.5 font-bold text-white"
              >
                <FaSave />
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update Meal"
                    : "Save Meal"}
              </button>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-6 py-3.5 font-bold text-slate-700"
              >
                <FaTimes />
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          title="Total Calories"
          value={`${format(totals.calories)} kcal`}
          icon={<FaFire />}
          style="bg-orange-100 text-orange-600"
        />
        <Metric
          title="Protein"
          value={`${format(totals.protein)} g`}
          icon={<FaUtensils />}
          style="bg-green-100 text-green-600"
        />
        <Metric
          title="Carbohydrates"
          value={`${format(totals.carbohydrates)} g`}
          icon={<FaUtensils />}
          style="bg-blue-100 text-blue-600"
        />
        <Metric
          title="Fats"
          value={`${format(totals.fats)} g`}
          icon={<FaUtensils />}
          style="bg-purple-100 text-purple-600"
        />
      </section>

      <section className="mt-7 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-black text-slate-900">
          Your Meals
        </h2>

        {loading ? (
          <div className="py-16 text-center text-slate-500">
            Loading meals...
          </div>
        ) : meals.length === 0 ? (
          <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center text-slate-500">
            No meals found.
          </div>
        ) : (
          <div className="mt-7 grid gap-5 lg:grid-cols-2">
            {meals.map((meal) => (
              <article
                key={meal._id}
                className="rounded-3xl border border-slate-100 bg-slate-50 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-green-600">
                      {meal.mealType}
                    </p>
                    <h3 className="mt-1 text-xl font-black text-slate-900">
                      {meal.foodName}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {meal.quantity} {meal.unit}
                    </p>
                  </div>
                  <p className="font-black text-orange-600">
                    {format(meal.calories)} kcal
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  <Mini label="Protein" value={`${format(meal.protein)} g`} />
                  <Mini
                    label="Carbs"
                    value={`${format(meal.carbohydrates)} g`}
                  />
                  <Mini label="Fats" value={`${format(meal.fats)} g`} />
                </div>

                <div className="mt-5 flex gap-2 border-t border-slate-200 pt-4">
                  <button
                    type="button"
                    onClick={() => edit(meal)}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-sm font-bold text-blue-600"
                  >
                    <FaEdit />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(meal._id)}
                    className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600"
                  >
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
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
        min={type === "number" ? "0" : undefined}
        step={type === "number" ? "0.1" : undefined}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
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

function Mini({ label, value }) {
  return (
    <div className="rounded-xl bg-white p-3 text-center">
      <p className="text-xs font-bold uppercase text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-black text-slate-800">
        {value}
      </p>
    </div>
  );
}

function Message({ message }) {
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

function format(value) {
  const number = Number(value) || 0;
  return Number.isInteger(number) ? number : number.toFixed(1);
}

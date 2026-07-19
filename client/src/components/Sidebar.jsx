import { NavLink, useNavigate } from "react-router-dom";
import {
  FaCalculator,
  FaChartLine,
  FaHome,
  FaLeaf,
  FaSignOutAlt,
  FaTint,
  FaTimes,
  FaUser,
  FaUtensils,
} from "react-icons/fa";

import useAuth from "../hooks/useAuth";

const menuItems = [
  { path: "/dashboard", label: "Dashboard", icon: <FaHome /> },
  { path: "/meals", label: "Meal Tracker", icon: <FaUtensils /> },
  { path: "/water", label: "Water Tracker", icon: <FaTint /> },
  { path: "/bmi", label: "BMI Calculator", icon: <FaCalculator /> },
  { path: "/analytics", label: "Analytics", icon: <FaChartLine /> },
  { path: "/profile", label: "Profile", icon: <FaUser /> },
];

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-600 text-white">
              <FaLeaf />
            </span>
            <div>
              <h1 className="text-xl font-black text-slate-900">
                NutriPulse
              </h1>
              <p className="text-xs text-slate-500">
                Health Assistant
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 lg:hidden"
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        </div>

        <div className="px-5 py-5">
          <p className="text-sm font-semibold text-slate-800">
            {user?.name || "NutriPulse User"}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {user?.profession || "User"}
          </p>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-4 pb-5">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-2xl px-4 py-3.5 font-semibold transition ${
                  isActive
                    ? "bg-green-600 text-white shadow-lg shadow-green-100"
                    : "text-slate-600 hover:bg-green-50 hover:text-green-700"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-100 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 font-semibold text-red-600 transition hover:bg-red-50"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

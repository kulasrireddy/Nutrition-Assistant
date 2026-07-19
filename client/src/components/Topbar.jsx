import { FaBars, FaBell } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

export default function Topbar({ onMenuClick }) {
  const { user } = useAuth();
  const firstLetter =
    user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 lg:hidden"
            aria-label="Open menu"
          >
            <FaBars />
          </button>

          <div>
            <h2 className="text-lg font-black text-slate-900 sm:text-xl">
              NutriPulse
            </h2>
            <p className="hidden text-sm text-slate-500 sm:block">
              Manage your daily health progress
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            aria-label="Notifications"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-green-50 hover:text-green-600"
          >
            <FaBell />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 font-bold text-white">
              {firstLetter}
            </div>

            <div className="hidden sm:block">
              <p className="max-w-44 truncate font-bold text-slate-900">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-slate-500">
                {user?.profession || "NutriPulse User"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

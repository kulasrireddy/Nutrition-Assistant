import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaLeaf, FaTimes } from "react-icons/fa";

const links = [
  ["Home", "#home"],
  ["Features", "#features"],
  ["About", "#about"],
  ["Tips", "#tips"],
  ["Testimonials", "#testimonials"],
  ["FAQ", "#faq"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/60 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#home" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-600 text-white">
            <FaLeaf />
          </span>
          <div>
            <p className="text-xl font-black text-slate-900">
              NutriPulse
            </p>
            <p className="text-xs text-slate-500">
              Nutrition Assistant
            </p>
          </div>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="font-semibold text-slate-600 transition hover:text-green-600"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/login"
            className="rounded-xl px-5 py-3 font-bold text-slate-700 hover:bg-slate-100"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-xl bg-green-600 px-5 py-3 font-bold text-white shadow-lg shadow-green-200 transition hover:bg-green-700"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 lg:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-100 bg-white px-5 py-5 lg:hidden">
          <div className="space-y-2">
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 font-semibold text-slate-600 hover:bg-green-50 hover:text-green-700"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Link
              to="/login"
              className="rounded-xl border border-slate-200 px-4 py-3 text-center font-bold text-slate-700"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-xl bg-green-600 px-4 py-3 text-center font-bold text-white"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

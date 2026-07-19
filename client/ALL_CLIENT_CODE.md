# NutriPulse Client — Complete Source Code

## `.env.example`

```
VITE_API_URL=http://localhost:5000/api

```

## `.gitignore`

```
node_modules/
dist/
.env
.env.local
.vite/
*.log
.DS_Store
Thumbs.db

```

## `README.md`

```markdown
# NutriPulse Client

Complete rebuilt React frontend for the NutriPulse nutrition and health tracking application.

## Installation

Open a terminal inside the `NutriPulse_Rebuilt_Client` folder:

```bash
npm install
```

Create `.env` by copying `.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run the client:

```bash
npm run dev
```

Open:

```text
http://localhost:5174
```

Keep the backend running on:

```text
http://localhost:5000
```

The backend CORS configuration must allow `http://localhost:5174`.

## Pages

- Home
- Login
- Register
- Dashboard
- Meal Tracker
- Water Tracker
- BMI Calculator
- Analytics
- Profile

```

## `eslint.config.js`

```javascript
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }
      ],
    },
  },
];

```

## `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="NutriPulse nutrition and health tracker" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>NutriPulse</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

## `package.json`

```json
{
  "name": "nutripulse-client",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  },
  "dependencies": {
    "axios": "^1.10.0",
    "framer-motion": "^12.23.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.6.0",
    "recharts": "^3.1.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.30.0",
    "@vitejs/plugin-react": "^4.6.0",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.30.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^16.2.0",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17",
    "vite": "^7.0.0"
  }
}

```

## `postcss.config.js`

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

```

## `public/favicon.svg`

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="18" fill="#16a34a"/>
  <path d="M19 38c0-12 8-20 25-22-1 16-8 25-22 26" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
  <path d="M22 42c6-9 12-14 22-19" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
</svg>

```

## `src/App.jsx`

```jsx
import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MealTracker from "./pages/MealTracker";
import WaterTracker from "./pages/WaterTracker";
import BmiCalculator from "./pages/BmiCalculator";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/meals" element={<MealTracker />} />
          <Route path="/water" element={<WaterTracker />} />
          <Route path="/bmi" element={<BmiCalculator />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

```

## `src/api/api.js`

```javascript
import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("nutripulse_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;

```

## `src/components/About.jsx`

```jsx
import { FaCheckCircle, FaLeaf } from "react-icons/fa";

export default function About() {
  return (
    <section id="about" className="bg-slate-50 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <div className="rounded-[2rem] bg-gradient-to-br from-green-700 to-emerald-500 p-8 text-white shadow-2xl">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl">
            <FaLeaf />
          </div>
          <h2 className="mt-8 text-4xl font-black">
            Simple health tracking for everyday life
          </h2>
          <p className="mt-5 text-lg leading-8 text-green-50">
            NutriPulse helps users record important wellness
            information without complex tools.
          </p>
        </div>

        <div>
          <span className="font-semibold uppercase tracking-widest text-green-600">
            About NutriPulse
          </span>
          <h2 className="mt-4 text-4xl font-black text-slate-900 lg:text-5xl">
            A practical nutrition assistant
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            The application supports students, professionals and
            families who want a clear view of meals, hydration,
            BMI and weekly progress.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Responsive React and Tailwind CSS interface",
              "Secure JWT authentication and protected pages",
              "MongoDB-powered personal health records",
              "Personalized recommendations based on activity",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm"
              >
                <FaCheckCircle className="mt-1 shrink-0 text-green-600" />
                <p className="font-semibold text-slate-700">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

```

## `src/components/CTA.jsx`

```jsx
import { Link } from "react-router-dom";
import { FaArrowRight, FaLeaf } from "react-icons/fa";

export default function CTA() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-green-700 to-emerald-500 p-8 text-white shadow-2xl sm:p-12 lg:flex lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-2xl">
              <FaLeaf />
            </div>
            <h2 className="mt-6 text-3xl font-black sm:text-4xl">
              Start building healthier habits today
            </h2>
            <p className="mt-4 text-lg leading-8 text-green-50">
              Create your account and begin tracking your progress.
            </p>
          </div>

          <Link
            to="/register"
            className="mt-8 inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-7 py-4 font-black text-green-700 shadow-lg transition hover:bg-green-50 lg:mt-0"
          >
            Create Account
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

```

## `src/components/DashboardLayout.jsx`

```jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:ml-64">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

```

## `src/components/FAQ.jsx`

```jsx
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const questions = [
  {
    question: "What can I track in NutriPulse?",
    answer:
      "Meals, calories, macronutrients, water intake, BMI and weekly analytics.",
  },
  {
    question: "Are recommendations medical advice?",
    answer:
      "No. They provide general wellness guidance only.",
  },
  {
    question: "Is my account protected?",
    answer:
      "The backend uses JWT authentication and password hashing.",
  },
  {
    question: "Can I edit or delete records?",
    answer:
      "Yes. Meal, water and BMI records support the relevant actions.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-4xl px-5">
        <div className="text-center">
          <span className="font-semibold uppercase tracking-widest text-green-600">
            FAQ
          </span>
          <h2 className="mt-4 text-4xl font-black text-slate-900">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-12 space-y-4">
          {questions.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <article
                key={item.question}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(isOpen ? -1 : index)
                  }
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                >
                  <span className="font-bold text-slate-900">
                    {item.question}
                  </span>
                  <FaChevronDown
                    className={`shrink-0 text-green-600 transition ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <p className="border-t border-slate-100 px-5 py-5 leading-7 text-slate-600">
                    {item.answer}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

```

## `src/components/Features.jsx`

```jsx
import {
  FaCalculator,
  FaChartLine,
  FaLightbulb,
  FaTint,
  FaUserCircle,
  FaUtensils,
} from "react-icons/fa";

const features = [
  {
    icon: <FaUtensils />,
    title: "Meal Tracker",
    text: "Log meals, calories, protein, carbohydrates and fats.",
    style: "bg-green-100 text-green-600",
  },
  {
    icon: <FaTint />,
    title: "Water Tracker",
    text: "Track daily hydration with quick-add and progress tools.",
    style: "bg-cyan-100 text-cyan-600",
  },
  {
    icon: <FaCalculator />,
    title: "BMI Calculator",
    text: "Calculate BMI and maintain a useful measurement history.",
    style: "bg-purple-100 text-purple-600",
  },
  {
    icon: <FaChartLine />,
    title: "Weekly Analytics",
    text: "Review charts for calories, hydration, meals and nutrients.",
    style: "bg-blue-100 text-blue-600",
  },
  {
    icon: <FaLightbulb />,
    title: "Recommendations",
    text: "Receive personalized rule-based wellness suggestions.",
    style: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: <FaUserCircle />,
    title: "Personal Profile",
    text: "Store profession, goal, activity level and health details.",
    style: "bg-rose-100 text-rose-600",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-semibold uppercase tracking-widest text-green-600">
            Core Features
          </span>
          <h2 className="mt-4 text-4xl font-black text-slate-900 lg:text-5xl">
            Everything you need for daily wellness
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Essential tracking and analytics features in one
            responsive web application.
          </p>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-3xl border border-slate-100 bg-slate-50 p-7 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${feature.style}`}
              >
                {feature.icon}
              </div>
              <h3 className="mt-6 text-2xl font-black text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                {feature.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

```

## `src/components/Footer.jsx`

```jsx
import {
  FaArrowUp,
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLeaf,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-950 pt-20 text-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600">
                <FaLeaf />
              </div>
              <div>
                <h2 className="text-2xl font-black">NutriPulse</h2>
                <p className="text-sm text-slate-400">
                  Nutrition Assistant
                </p>
              </div>
            </div>
            <p className="mt-6 leading-7 text-slate-400">
              A full-stack health tracking application for meals,
              water, BMI, analytics and recommendations.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold">Quick Links</h3>
            <div className="mt-5 space-y-3 text-slate-400">
              {[
                ["Home", "#home"],
                ["Features", "#features"],
                ["About", "#about"],
                ["Health Tips", "#tips"],
                ["FAQ", "#faq"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="block hover:text-green-400"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold">Contact</h3>
            <div className="mt-5 space-y-4 text-slate-400">
              <p className="flex items-center gap-3">
                <FaEnvelope className="text-green-500" />
                support@nutripulse.com
              </p>
              <p className="flex items-center gap-3">
                <FaPhoneAlt className="text-green-500" />
                +91 98765 43210
              </p>
              <p className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-green-500" />
                India
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold">Newsletter</h3>
            <p className="mt-5 text-slate-400">
              Receive wellness tips and project updates.
            </p>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-5 w-full rounded-xl bg-white px-4 py-3 text-slate-900 outline-none"
            />
            <button
              type="button"
              className="mt-3 w-full rounded-xl bg-green-600 py-3 font-bold hover:bg-green-700"
            >
              Subscribe
            </button>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-slate-800 py-8 lg:flex-row">
          <p className="text-center text-slate-400">
            © {new Date().getFullYear()} NutriPulse. All rights reserved.
          </p>

          <div className="flex gap-5 text-xl">
            <a href="#" aria-label="Instagram" className="hover:text-green-400">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-green-400">
              <FaLinkedin />
            </a>
            <a href="#" aria-label="GitHub" className="hover:text-green-400">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      <a
        href="#home"
        aria-label="Scroll to top"
        className="fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-green-600 shadow-xl hover:bg-green-700"
      >
        <FaArrowUp />
      </a>
    </footer>
  );
}

```

## `src/components/HealthTips.jsx`

```jsx
import {
  FaAppleAlt,
  FaBed,
  FaRunning,
  FaTint,
} from "react-icons/fa";

const tips = [
  {
    icon: <FaTint />,
    title: "Hydrate consistently",
    text: "Drink water at regular intervals throughout the day.",
  },
  {
    icon: <FaAppleAlt />,
    title: "Choose balanced meals",
    text: "Include vegetables, protein, whole grains and healthy fats.",
  },
  {
    icon: <FaRunning />,
    title: "Move every day",
    text: "Include walking, stretching or suitable exercise.",
  },
  {
    icon: <FaBed />,
    title: "Protect your sleep",
    text: "Maintain a consistent sleep schedule for recovery.",
  },
];

export default function HealthTips() {
  return (
    <section id="tips" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <span className="font-semibold uppercase tracking-widest text-green-600">
            Daily Wellness
          </span>
          <h2 className="mt-4 text-4xl font-black text-slate-900 lg:text-5xl">
            Small habits create lasting progress
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tips.map((tip) => (
            <article
              key={tip.title}
              className="rounded-3xl border border-green-100 bg-green-50 p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl text-green-600 shadow-sm">
                {tip.icon}
              </div>
              <h3 className="mt-5 text-xl font-black text-slate-900">
                {tip.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                {tip.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

```

## `src/components/Hero.jsx`

```jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaCheckCircle,
  FaHeartbeat,
} from "react-icons/fa";

export default function Hero() {
  return (
    <section
      id="home"
      className="overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 pb-20 pt-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-bold text-green-700 shadow-sm">
            <FaHeartbeat />
            Your daily wellness companion
          </span>

          <h1 className="mt-6 text-4xl font-black leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Build healthier habits with{" "}
            <span className="text-green-600">NutriPulse</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Track meals, hydration, BMI and weekly progress
            from one simple dashboard designed for students,
            professionals and health-conscious users.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-green-600 px-7 py-4 font-bold text-white shadow-xl shadow-green-200 transition hover:bg-green-700"
            >
              Start Tracking
              <FaArrowRight />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-7 py-4 font-bold text-slate-700 transition hover:border-green-300 hover:text-green-700"
            >
              Explore Features
            </a>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              "Meal tracking",
              "Water tracking",
              "BMI insights",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm font-semibold text-slate-600"
              >
                <FaCheckCircle className="text-green-600" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-6 -z-10 rounded-full bg-green-200/50 blur-3xl" />
          <img
            src="/hero.png"
            alt="NutriPulse nutrition tracking application"
            className="w-full rounded-[2rem] border border-white bg-white object-cover shadow-2xl shadow-green-100"
          />
        </motion.div>
      </div>
    </section>
  );
}

```

## `src/components/Navbar.jsx`

```jsx
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

```

## `src/components/ProtectedRoute.jsx`

```jsx
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-green-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-green-200 border-t-green-600" />
          <p className="mt-4 font-medium text-slate-600">
            Loading NutriPulse...
          </p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}

```

## `src/components/Recommendations.jsx`

```jsx
import {
  FaAppleAlt,
  FaBullseye,
  FaHeartbeat,
  FaLightbulb,
  FaTint,
  FaUtensils,
} from "react-icons/fa";

const categoryConfig = {
  Water: {
    icon: <FaTint />,
    iconStyle: "bg-cyan-100 text-cyan-600",
  },
  Meals: {
    icon: <FaUtensils />,
    iconStyle: "bg-green-100 text-green-600",
  },
  Nutrition: {
    icon: <FaAppleAlt />,
    iconStyle: "bg-emerald-100 text-emerald-600",
  },
  Calories: {
    icon: <FaAppleAlt />,
    iconStyle: "bg-orange-100 text-orange-600",
  },
  BMI: {
    icon: <FaHeartbeat />,
    iconStyle: "bg-purple-100 text-purple-600",
  },
  Lifestyle: {
    icon: <FaLightbulb />,
    iconStyle: "bg-yellow-100 text-yellow-600",
  },
  Goal: {
    icon: <FaBullseye />,
    iconStyle: "bg-blue-100 text-blue-600",
  },
};

export default function Recommendations({
  recommendations = [],
}) {
  return (
    <section className="mt-7 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-yellow-100 text-2xl text-yellow-600">
          <FaLightbulb />
        </div>

        <div>
          <h2 className="text-2xl font-black text-slate-900">
            Personalized Recommendations
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Suggestions based on your profile, goal and today&apos;s records.
          </p>
        </div>
      </div>

      {recommendations.length === 0 ? (
        <div className="mt-7 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
          <FaLightbulb className="mx-auto text-5xl text-slate-300" />
          <h3 className="mt-5 text-lg font-black text-slate-700">
            No recommendations available
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Add meals, water intake and BMI information to receive
            personalized health recommendations.
          </p>
        </div>
      ) : (
        <div className="mt-7 grid gap-5 lg:grid-cols-2">
          {recommendations.map((item, index) => {
            const config =
              categoryConfig[item.category] ||
              categoryConfig.Lifestyle;

            return (
              <article
                key={item.id || `${item.title}-${index}`}
                className="rounded-3xl border border-slate-100 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-green-200 hover:bg-white hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl ${config.iconStyle}`}
                  >
                    {config.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-black text-slate-900">
                        {item.title}
                      </h3>
                      <PriorityBadge priority={item.priority} />
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {item.message}
                    </p>

                    <span className="mt-4 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-500">
                      {item.category || "Lifestyle"}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <div className="mt-7 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4">
        <p className="text-sm leading-6 text-blue-700">
          These recommendations provide general wellness guidance and do not
          replace professional medical or dietary advice.
        </p>
      </div>
    </section>
  );
}

function PriorityBadge({ priority = "low" }) {
  const styles = {
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${
        styles[priority] || styles.low
      }`}
    >
      {priority}
    </span>
  );
}

```

## `src/components/Sidebar.jsx`

```jsx
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

```

## `src/components/Statistics.jsx`

```jsx
import { motion } from "framer-motion";
import {
  FaAppleAlt,
  FaHeartbeat,
  FaUsers,
} from "react-icons/fa";
import { MdWaterDrop } from "react-icons/md";

const stats = [
  {
    number: "50K+",
    title: "Meals Logged",
    description: "Healthy meals tracked",
    icon: <FaAppleAlt />,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    number: "25K+",
    title: "Active Users",
    description: "Using NutriPulse daily",
    icon: <FaUsers />,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    number: "1M+",
    title: "Water Tracked",
    description: "Glasses of water logged",
    icon: <MdWaterDrop />,
    color: "text-cyan-600",
    bg: "bg-cyan-100",
  },
  {
    number: "98%",
    title: "Health Score",
    description: "Users achieving goals",
    icon: <FaHeartbeat />,
    color: "text-red-500",
    bg: "bg-red-100",
  },
];

export default function Statistics() {
  return (
    <section className="bg-gradient-to-b from-white to-green-50 py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <span className="font-semibold uppercase tracking-widest text-green-600">
            Our Statistics
          </span>
          <h2 className="mt-4 text-4xl font-extrabold text-slate-900 lg:text-5xl">
            Trusted by Thousands
          </h2>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="rounded-3xl border border-slate-100 bg-white p-7 shadow-soft"
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl ${item.bg} ${item.color}`}
              >
                {item.icon}
              </div>
              <h3 className="mt-6 text-4xl font-black text-slate-900">
                {item.number}
              </h3>
              <p className="mt-2 text-xl font-bold text-slate-800">
                {item.title}
              </p>
              <p className="mt-3 leading-7 text-slate-500">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

```

## `src/components/Testimonials.jsx`

```jsx
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Fitness Enthusiast",
    review: "NutriPulse made meal and water tracking simple and motivating.",
    color: "bg-pink-500",
  },
  {
    name: "Rahul Verma",
    role: "Software Engineer",
    review: "The dashboard and BMI history helped me understand my routine.",
    color: "bg-blue-500",
  },
  {
    name: "Sneha Reddy",
    role: "College Student",
    review: "The student wellness recommendations fit my college schedule.",
    color: "bg-green-500",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-gradient-to-b from-green-50 to-white py-24"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center">
          <span className="font-semibold uppercase tracking-widest text-green-600">
            Testimonials
          </span>
          <h2 className="mt-4 text-4xl font-black text-slate-900 lg:text-5xl">
            What users say
          </h2>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((user) => (
            <article
              key={user.name}
              className="rounded-3xl bg-white p-7 shadow-soft"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white ${user.color}`}
                >
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    {user.name}
                  </h3>
                  <p className="text-slate-500">{user.role}</p>
                </div>
              </div>

              <div className="mt-6 flex gap-1 text-yellow-400">
                {[0, 1, 2, 3, 4].map((star) => (
                  <FaStar key={star} />
                ))}
              </div>

              <p className="mt-5 leading-8 text-slate-600">
                “{user.review}”
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

```

## `src/components/Topbar.jsx`

```jsx
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

```

## `src/context/AuthContext.jsx`

```jsx
import { createContext } from "react";

const AuthContext = createContext(null);

export default AuthContext;

```

## `src/context/AuthProvider.jsx`

```jsx
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import API from "../api/api";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("nutripulse_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  const saveAuthentication = useCallback((token, userData) => {
    localStorage.setItem("nutripulse_token", token);
    localStorage.setItem(
      "nutripulse_user",
      JSON.stringify(userData)
    );
    setUser(userData);
  }, []);

  const clearAuthentication = useCallback(() => {
    localStorage.removeItem("nutripulse_token");
    localStorage.removeItem("nutripulse_user");
    setUser(null);
  }, []);

  const register = useCallback(
    async (payload) => {
      const response = await API.post("/auth/register", payload);
      saveAuthentication(response.data.token, response.data.user);
      return response.data;
    },
    [saveAuthentication]
  );

  const login = useCallback(
    async (email, password) => {
      const response = await API.post("/auth/login", {
        email,
        password,
      });
      saveAuthentication(response.data.token, response.data.user);
      return response.data;
    },
    [saveAuthentication]
  );

  const logout = useCallback(() => {
    clearAuthentication();
  }, [clearAuthentication]);

  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem("nutripulse_token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await API.get("/auth/me");
      const currentUser = response.data.user || response.data.profile;
      localStorage.setItem(
        "nutripulse_user",
        JSON.stringify(currentUser)
      );
      setUser(currentUser);
    } catch {
      clearAuthentication();
    } finally {
      setLoading(false);
    }
  }, [clearAuthentication]);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const value = useMemo(
    () => ({
      user,
      setUser,
      loading,
      isAuthenticated: Boolean(user),
      register,
      login,
      logout,
      refreshUser,
    }),
    [user, loading, register, login, logout, refreshUser]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

```

## `src/hooks/useAuth.js`

```javascript
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

```

## `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #0f172a;
  background: #f8fafc;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

html { scroll-behavior: smooth; }
body { margin: 0; min-width: 320px; min-height: 100vh; }
button, input, select, textarea { font: inherit; }
* { box-sizing: border-box; }
::selection { background: #bbf7d0; color: #14532d; }

```

## `src/main.jsx`

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import AuthProvider from "./context/AuthProvider";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

```

## `src/pages/Analytics.jsx`

```jsx
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

```

## `src/pages/BmiCalculator.jsx`

```jsx
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

```

## `src/pages/Dashboard.jsx`

```jsx
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

```

## `src/pages/Home.jsx`

```jsx
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Statistics from "../components/Statistics";
import Features from "../components/Features";
import About from "../components/About";
import HealthTips from "../components/HealthTips";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Statistics />
      <Features />
      <About />
      <HealthTips />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}

```

## `src/pages/Login.jsx`

```jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLeaf } from "react-icons/fa";

import useAuth from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const {
    login,
    isAuthenticated,
    loading: authLoading,
  } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
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

    if (!formData.email.trim() || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      await login(formData.email.trim(), formData.password);
      navigate("/dashboard", { replace: true });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to log in. Please try again."
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
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-green-100 bg-white shadow-2xl lg:grid-cols-2">
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
                Welcome back
              </p>
              <h1 className="mt-4 text-5xl font-black leading-tight">
                Continue your healthier lifestyle journey.
              </h1>
              <p className="mt-6 text-lg leading-8 text-green-50">
                Track meals, water, BMI and weekly progress
                from your personal dashboard.
              </p>
            </div>
          </div>
        </section>

        <section className="p-7 sm:p-10 lg:p-12">
          <div className="lg:hidden">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-white">
                <FaLeaf />
              </span>
              <span className="text-2xl font-black text-slate-900">
                NutriPulse
              </span>
            </Link>
          </div>

          <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-green-600 lg:mt-0">
            Account Login
          </p>
          <h2 className="mt-3 text-4xl font-black text-slate-900">
            Sign in to your account
          </h2>
          <p className="mt-3 text-slate-500">
            Enter your registered email and password.
          </p>

          {error && (
            <div className="mt-7 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-12 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-green-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-2xl bg-green-600 px-6 py-4 font-bold text-white shadow-lg shadow-green-200 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-600">
            Do not have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-green-600 hover:text-green-700"
            >
              Create an account
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

```

## `src/pages/MealTracker.jsx`

```jsx
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

```

## `src/pages/Profile.jsx`

```jsx
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

```

## `src/pages/Register.jsx`

```jsx
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

```

## `src/pages/WaterTracker.jsx`

```jsx
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

```

## `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 18px 45px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};

```

## `vite.config.js`

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 5174 },
});

```

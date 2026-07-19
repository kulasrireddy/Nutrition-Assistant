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

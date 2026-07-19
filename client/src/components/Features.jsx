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

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

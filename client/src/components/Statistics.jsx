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

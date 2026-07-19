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

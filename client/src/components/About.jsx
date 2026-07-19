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

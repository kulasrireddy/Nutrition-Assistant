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

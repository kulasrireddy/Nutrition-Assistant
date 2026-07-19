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

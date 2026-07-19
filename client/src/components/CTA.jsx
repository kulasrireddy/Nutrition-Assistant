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

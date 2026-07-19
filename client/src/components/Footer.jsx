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

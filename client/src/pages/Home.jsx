import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Statistics from "../components/Statistics";
import Features from "../components/Features";
import About from "../components/About";
import HealthTips from "../components/HealthTips";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Statistics />
      <Features />
      <About />
      <HealthTips />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}

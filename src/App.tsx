import { useEffect } from "react";
import TopNav from "./components/TopNav";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import CaseStudies from "./components/CaseStudies";
import Education from "./components/Education";
import SkillStack from "./components/SkillStack";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;

    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (!target) return;

      const root = document.documentElement;
      root.style.scrollBehavior = "auto";
      target.scrollIntoView();
      root.style.removeProperty("scroll-behavior");
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="site-shell" id="top">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <TopNav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <CaseStudies />
        <About />
        <Experience />
        <Education />
        <SkillStack />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

import { lazy, Suspense, useEffect } from "react";
import SiteHeader from "./components/SiteHeader";
import TypeInterface from "./type-interface/TypeInterface";
import WorkChapters from "./components/WorkChapters";
import Experience from "./components/Experience";
import About from "./components/About";
import Education from "./components/Education";
import SkillStack from "./components/SkillStack";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LabInvitation from "./components/LabInvitation";

const CodeTopologyLab = lazy(() => import("./topology/CodeTopologyLab").catch(() => ({ default: () => <LabLoading failed /> })));
function LabLoading({ failed = false }: { failed?: boolean }) {
  return <main className="container section-space"><a className="text-link" href={import.meta.env.BASE_URL + "#code-topology"}>← Back to portfolio</a><h1>Code Topology</h1><p role="status">{failed ? "The source map could not load. Please try again." : "Loading public-source map…"}</p>{failed && <a className="text-link" href={import.meta.env.BASE_URL + "?lab=code-topology"}>Reload Lab ↗</a>}</main>;
}

export default function App() {
  if (new URLSearchParams(location.search).get("lab") === "code-topology") {
    return <Suspense fallback={<LabLoading />}><CodeTopologyLab /></Suspense>;
  }
  return <Portfolio />;
}

function Portfolio() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (!target) return;
      const root = document.documentElement;
      root.style.scrollBehavior = "auto";
      target.scrollIntoView();
      if (id === "code-topology") target.focus({ preventScroll: true });
      root.style.removeProperty("scroll-behavior");
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return <div className="site-shell type-interface" id="top">
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <SiteHeader />
    <main id="main-content" tabIndex={-1}>
      <TypeInterface />
      <WorkChapters />
      <LabInvitation />
      <Experience />
      <About />
      <Education />
      <SkillStack />
      <Contact />
    </main>
    <Footer />
  </div>;
}

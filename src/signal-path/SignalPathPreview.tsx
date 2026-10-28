import { useEffect, useMemo, useState } from "react";
import { identity } from "./content";
import { MotionContext, prefersReducedMotion, usePrefersReducedMotion } from "./motion";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Experience from "./sections/Experience";
import Faultline from "./sections/Faultline";
import FeaturedProject from "./sections/FeaturedProject";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import PromptLock from "./sections/PromptLock";
import Recognition from "./sections/Recognition";
import RFinance from "./sections/RFinance";
import ReproSeed from "./sections/ReproSeed";
import SiteBar from "./sections/SiteBar";
import Skills from "./sections/Skills";
import VisualNovel from "./sections/VisualNovel";
import { sectionIds } from "./structure";
import { playedThisSession, portStyle, useSignalPath } from "./useSignalPath";
import "./styles/index.css";

/** Marks the document as the preview while it is mounted: paper background, title, no indexing. */
function usePreviewDocument() {
  useEffect(() => {
    const root = document.documentElement;
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const theme = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const scheme = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
    const before = { title: document.title, robots: robots?.content, theme: theme?.content, scheme: scheme?.content };
    root.dataset.preview = "signal-path";
    document.title = `${identity.name} — Software engineering (design preview)`;
    if (robots) robots.content = "noindex, follow";
    if (theme) theme.content = "#F0EDE6";
    if (scheme) scheme.content = "light";
    return () => {
      delete root.dataset.preview;
      document.title = before.title;
      if (robots && before.robots) robots.content = before.robots;
      if (theme && before.theme) theme.content = before.theme;
      if (scheme && before.scheme) scheme.content = before.scheme;
    };
  }, []);
}

/**
 * Lands on the section named in the URL's hash once the page has rendered. The page loads lazily, so
 * the browser's own jump on load finds nothing; this covers links such as /?preview=signal-path#skills
 * and the return from a case study.
 */
function useInitialHash() {
  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id || id === sectionIds.top) return;
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" }));
    });
    return () => cancelAnimationFrame(frame);
  }, []);
}

const isReturnVisit = () => (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined)?.type === "back_forward";

/**
 * The Signal Path page. Section order lives here; each section owns its presentation and reads its
 * facts from the content model through ./content.
 */
export default function SignalPathPreview() {
  usePreviewDocument();
  useInitialHash();
  const { refs, phase, name, flow, replay } = useSignalPath();
  const reduced = usePrefersReducedMotion();
  // First-visit reveals (the diagram draw-on, the film frame, the finale) play once per session, like
  // the opening, and never with reduced motion or on a back/forward return.
  const [firstVisit] = useState(() => !prefersReducedMotion() && !isReturnVisit() && !playedThisSession());
  const motion = useMemo(() => ({ reduced, reveals: firstVisit && !reduced }), [reduced, firstVisit]);

  return (
    <MotionContext.Provider value={motion}>
      <div className="sp" id={sectionIds.top} data-phase={phase}>
        <a className="sp-skip" href={`#${sectionIds.work}`}>Skip to selected work</a>
        <SiteBar />
        <main className="sp-flow" id="main" ref={refs.flow}>
          <Hero refs={refs} geometry={name} onReplay={reduced ? undefined : replay} />
          <div className="sp-work-set" id={sectionIds.work}>
            <FeaturedProject refs={refs} flow={flow} armed={phase === "ready"} animate={motion.reveals} />
            <ReproSeed />
            <Faultline />
            <RFinance />
            <VisualNovel />
            <PromptLock />
          </div>
          <Experience />
          <Recognition />
          <Skills />
          <About />
          <Contact />
          {/* Rendered once measured, so nothing appears in one place and then moves (a layout shift). */}
          {flow && (
            <>
              <svg className="sp-rail" data-route={flow.straight ? "straight" : "margin"} width={flow.w} height={flow.h} viewBox={`0 0 ${flow.w} ${flow.h}`} aria-hidden="true" focusable="false">
                <path ref={refs.rail} d={flow.rail} />
              </svg>
              <span className="sp-pulse" ref={refs.pulse} aria-hidden="true" />
              <span className="sp-port" ref={refs.port} style={portStyle(flow)} aria-hidden="true" />
            </>
          )}
        </main>
        <Footer />
      </div>
    </MotionContext.Provider>
  );
}

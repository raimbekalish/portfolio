import { createContext, useContext, useEffect, useState } from "react";

/**
 * Motion tokens for the Signal Path page. styles/tokens.css mirrors the CSS-facing values as custom
 * properties on .sp; keep the two in step.
 */
export const duration = {
  /** Hover, focus and press feedback. */
  feedback: 160,
  /** Small state changes, such as the period landing. */
  short: 260,
  /** Panel-level reveals. */
  medium: 440,
  /** The signal writing the name. */
  write: 1450,
  /** The same on narrow screens, where the name is a third of the size. */
  writeCompact: 1150,
  /** The rail from the period to the project stage: per pixel, within these bounds. */
  railPerPx: 1.1,
  railMin: 380,
  railMax: 760,
  /** One lane of the system diagram. */
  lane: 620,
  /** A pulse along a lane on hover. */
  pulse: 540,
  /** The request trace: the signal's move from one station to the next, then its pause there. */
  traceMove: 520,
  traceDwell: 1100,
  /** The film frame opening from a slit. */
  aperture: 900,
  /** Faultline's pen crossing the recorded run, at a constant paper speed. */
  record: 1600,
  /** The finale: the signal drawing under the address and landing as the period. */
  finale: 1100,
} as const;

export const easing = {
  /** Default for UI state changes. */
  standard: "cubic-bezier(.2, 0, 0, 1)",
  /** Arrivals: fast start, long soft settle. */
  out: "cubic-bezier(.16, 1, .3, 1)",
  /** Lines that draw from end to end. */
  draw: "cubic-bezier(.65, 0, .35, 1)",
  /** The period landing, with a small overshoot. */
  land: "cubic-bezier(.34, 1.4, .64, 1)",
} as const;

export const delay = {
  /** Pause on the first frame before the signal leaves the margin. */
  start: 220,
  /** Gap between the period landing and the rail leaving it. */
  rail: 140,
} as const;

export const stagger = {
  /** Between lanes of the system diagram. */
  lane: 140,
  /** Between stations inside a lane. */
  station: 120,
} as const;

/** Cubic ease for the signal head: gentle start, steady middle, soft arrival. */
export const signalEase = (t: number) => (t < 0.5 ? 2 * t * t * (1.5 - t) : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * How much motion this page view may use. `reduced` mirrors the visitor's setting; `reveals` allows
 * the few first-visit reveals (the diagram draw-on, the film frame, the finale) and is false with
 * reduced motion, on back/forward returns and after the session's first visit.
 */
export type MotionPolicy = { reduced: boolean; reveals: boolean };
export const MotionContext = createContext<MotionPolicy>({ reduced: false, reveals: false });
export const useMotion = () => useContext(MotionContext);

const reducedQuery = "(prefers-reduced-motion: reduce)";
export const prefersReducedMotion = () => matchMedia(reducedQuery).matches;
export const finePointer = () => matchMedia("(hover: hover) and (pointer: fine)").matches;

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion);
  useEffect(() => {
    const media = matchMedia(reducedQuery);
    const update = () => setReduced(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** Resolves true when the preview's fonts are ready, or false after `timeout` so motion never waits on the network. */
export function fontsReady(timeout: number) {
  const families = ['600 100px "Instrument Sans"', '400 16px "Instrument Sans"', 'italic 400 20px "Instrument Serif"', '400 12px "Martian Mono"'];
  const loaded = Promise.all(families.map((font) => document.fonts.load(font))).then(() => true, () => false);
  return Promise.race([loaded, new Promise<boolean>((resolve) => setTimeout(() => resolve(false), timeout))]);
}

/**
 * Keyframes that move an absolutely positioned element along an SVG path. Sampling the path keeps
 * the motion exact in every browser, unlike CSS offset-path origins.
 */
export function pathKeyframes(path: SVGPathElement, steps: number, ease: (t: number) => number = (t) => t): Keyframe[] {
  const length = path.getTotalLength();
  return Array.from({ length: steps + 1 }, (_, i) => {
    const point = path.getPointAtLength(length * ease(i / steps));
    return { transform: `translate(${point.x.toFixed(2)}px, ${point.y.toFixed(2)}px)`, offset: i / steps };
  });
}

/** Keyframes that draw a stroked path from start to end along the same eased timeline. */
export function drawKeyframes(path: SVGPathElement, steps: number, ease: (t: number) => number = (t) => t): Keyframe[] {
  const length = path.getTotalLength();
  return Array.from({ length: steps + 1 }, (_, i) => ({
    strokeDasharray: `${length} ${length}`,
    strokeDashoffset: `${(length * (1 - ease(i / steps))).toFixed(2)}`,
    offset: i / steps,
  }));
}

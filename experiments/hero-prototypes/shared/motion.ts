import { useEffect, useState } from "react";

export const ease = {
  expoOut: "cubic-bezier(.16,1,.3,1)",
  quintOut: "cubic-bezier(.22,1,.36,1)",
  inOut: "cubic-bezier(.65,0,.35,1)",
  overshoot: "cubic-bezier(.34,1.56,.64,1)",
};

const query = "(prefers-reduced-motion: reduce)";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => matchMedia(query).matches);
  useEffect(() => {
    const media = matchMedia(query);
    const update = () => setReduced(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** Resolves when web fonts are ready, or after `timeout` so motion never waits on the network. */
export function fontsReady(timeout = 1200) {
  return Promise.race([document.fonts.ready.then(() => undefined), new Promise<void>((r) => setTimeout(r, timeout))]);
}

export const finePointer = () => matchMedia("(hover: hover) and (pointer: fine)").matches;

/** Cubic ease used for the signal head: gentle start, steady middle, soft arrival. */
export const signalEase = (t: number) => (t < 0.5 ? 2 * t * t * (1.5 - t) : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Keyframes that move an absolutely positioned element along an SVG path.
 * Sampling the path keeps the motion exact in every browser, unlike CSS offset-path origins.
 */
export function pathKeyframes(path: SVGPathElement, steps = 64, easing: (t: number) => number = (t) => t): Keyframe[] {
  const length = path.getTotalLength();
  return Array.from({ length: steps + 1 }, (_, i) => {
    const point = path.getPointAtLength(length * easing(i / steps));
    return { transform: `translate(${point.x.toFixed(2)}px, ${point.y.toFixed(2)}px)`, offset: i / steps };
  });
}

/** Rounded orthogonal polyline through points, as an SVG path. */
export function roundedPath(points: [number, number][], radius = 12) {
  if (points.length < 2) return "";
  let d = `M${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i - 1];
    const [x, y] = points[i];
    const [nx, ny] = points[i + 1];
    const r = Math.min(radius, Math.hypot(x - px, y - py) / 2, Math.hypot(nx - x, ny - y) / 2);
    const ax = x - Math.sign(x - px) * r;
    const ay = y - Math.sign(y - py) * r;
    const bx = x + Math.sign(nx - x) * r;
    const by = y + Math.sign(ny - y) * r;
    d += ` L${ax} ${ay} Q${x} ${y} ${bx} ${by}`;
  }
  const [lx, ly] = points[points.length - 1];
  return d + ` L${lx} ${ly}`;
}

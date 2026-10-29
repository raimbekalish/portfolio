import { useEffect, useState } from "react";

/**
 * The visitor's reduced-motion setting, read after hydration so the server render and the first
 * client render agree (both assume motion is allowed; the stylesheets already stop motion in
 * reduced mode before this runs).
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

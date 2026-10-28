import { useEffect, useState, type RefObject } from "react";

/** Tracks a media query. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => matchMedia(query).matches);
  useEffect(() => {
    const media = matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/** Phones: below the 640px breakpoint used throughout the stylesheet. */
export const useCompact = () => useMediaQuery("(max-width: 639px)");

/**
 * Becomes true once the element's top reaches the upper part of the screen, then stays true. Used
 * for the few first-visit reveals; returns true at once when `enabled` is false.
 */
export function useArrival(ref: RefObject<Element>, enabled: boolean, rootMargin = "0px 0px -30% 0px") {
  const [arrived, setArrived] = useState(!enabled);
  useEffect(() => {
    if (!enabled) { setArrived(true); return; }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { observer.disconnect(); setArrived(true); }
    }, { threshold: 0, rootMargin });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, enabled, rootMargin]);
  return arrived;
}

/**
 * The id of the last section whose top has passed the upper third of the screen, for the site bar's
 * current-section marker; at the very end of the page, the last section. Ids that are not on the
 * page are ignored.
 */
export function useCurrentSection(ids: readonly string[]) {
  const [current, setCurrent] = useState<string | null>(null);
  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = innerHeight * 0.33;
      let found: string | null = null;
      for (const el of elements) if (el.getBoundingClientRect().top <= line) found = el.id;
      const atEnd = scrollY > 0 && scrollY + innerHeight >= document.documentElement.scrollHeight - 2;
      setCurrent(atEnd ? elements[elements.length - 1].id : found);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    return () => { removeEventListener("scroll", schedule); removeEventListener("resize", schedule); cancelAnimationFrame(frame); };
  }, [ids]);
  return current;
}

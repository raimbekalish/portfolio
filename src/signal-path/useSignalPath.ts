import { createRef, useCallback, useEffect, useLayoutEffect, useRef, useState, type MutableRefObject, type RefObject } from "react";
import { approachRoute, crossingTimes, glyphBoxes, railToStage, relativeBox, roundedPath, wavePoints, type Box, type Point } from "./geometry";
import { delay, drawKeyframes, duration, easing, fontsReady, pathKeyframes, prefersReducedMotion, signalEase } from "./motion";

/**
 * pending: the name is drafted and the signal is about to leave the margin.
 * writing: the opening is running; any interaction finishes it at once.
 * ready: the final composition. Reduced motion, return visits and later loads in the same browsing
 * session start here.
 */
export type Phase = "pending" | "writing" | "ready";

export type SignalRefs = {
  flow: RefObject<HTMLElement>;
  grid: RefObject<HTMLDivElement>;
  name: RefObject<HTMLHeadingElement>;
  line1: RefObject<HTMLSpanElement>;
  line2: RefObject<HTMLSpanElement>;
  baseline1: RefObject<HTMLElement>;
  dot: RefObject<HTMLSpanElement>;
  ticks: MutableRefObject<(HTMLElement | null)[]>;
  trace: RefObject<SVGPathElement>;
  head: RefObject<HTMLSpanElement>;
  headCore: RefObject<HTMLSpanElement>;
  rail: RefObject<SVGPathElement>;
  pulse: RefObject<HTMLSpanElement>;
  port: RefObject<HTMLSpanElement>;
  stage: RefObject<HTMLElement>;
  panel: RefObject<HTMLElement>;
  /** Text the rail must not cross: in the hero, and in the stage header above the diagram. */
  obstacles: { hero: MutableRefObject<Set<HTMLElement>>; stage: MutableRefObject<Set<HTMLElement>> };
};

export type NameGeometry = {
  w: number;
  h: number;
  trace: string;
  /** Horizontal extent of each name line, for the ink reveal. */
  lines: { left: number; right: number }[];
  em: number;
  dotSize: number;
  /** Ruler tick positions in the name's coordinates. */
  ticks: number[];
};

export type FlowGeometry = {
  w: number;
  h: number;
  rail: string;
  /** Where the rail meets the stage's top edge. */
  port: Point;
  straight: boolean;
  /** The signal's onward route from the port into the diagram, relative to the panel. */
  approach: Point[];
};

/** X-height midline of Instrument Sans, in em above the baseline. */
const SIGNAL_LEVEL = 0.255;
const SAMPLES = 120;
/** Width of the ink's soft leading edge, in em. */
const INK_EDGE = 0.18;
const FONT_TIMEOUT = 1400;
const SESSION_KEY = "signal-path:opening";

// Created once per mount, so effects and callbacks that depend on the refs stay stable.
const createRefs = (): SignalRefs => ({
  flow: createRef<HTMLElement>(),
  grid: createRef<HTMLDivElement>(),
  name: createRef<HTMLHeadingElement>(),
  line1: createRef<HTMLSpanElement>(),
  line2: createRef<HTMLSpanElement>(),
  baseline1: createRef<HTMLElement>(),
  dot: createRef<HTMLSpanElement>(),
  ticks: { current: [] },
  trace: createRef<SVGPathElement>(),
  head: createRef<HTMLSpanElement>(),
  headCore: createRef<HTMLSpanElement>(),
  rail: createRef<SVGPathElement>(),
  pulse: createRef<HTMLSpanElement>(),
  port: createRef<HTMLSpanElement>(),
  stage: createRef<HTMLElement>(),
  panel: createRef<HTMLElement>(),
  obstacles: { hero: { current: new Set<HTMLElement>() }, stage: { current: new Set<HTMLElement>() } },
});

// Storage can be unavailable (private modes, blocked site data); the opening then simply plays.
export const playedThisSession = () => { try { return sessionStorage.getItem(SESSION_KEY) === "1"; } catch { return false; } };
const markPlayed = () => { try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* not stored */ } };

/**
 * Whether this load should play the opening: once per browsing session, and never with reduced
 * motion, a deep link, or a back/forward return.
 */
function openingAllowed() {
  if (prefersReducedMotion() || playedThisSession()) return false;
  if (location.hash && location.hash !== "#top") return false;
  const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  return nav?.type !== "back_forward";
}

export function useSignalPath() {
  const [refs] = useState(createRefs);
  const [phase, setPhase] = useState<Phase>(() => (openingAllowed() ? "pending" : "ready"));
  const [name, setName] = useState<NameGeometry | null>(null);
  const [flow, setFlow] = useState<FlowGeometry | null>(null);
  // The opening reads geometry from here, so a re-measure never restarts it.
  const latest = useRef<{ name: NameGeometry | null; flow: FlowGeometry | null }>({ name: null, flow: null });
  latest.current = { name, flow };
  const running = useRef<Animation[]>([]);

  const measure = useCallback(() => {
    const h1 = refs.name.current, l1 = refs.line1.current, l2 = refs.line2.current, b1 = refs.baseline1.current, dot = refs.dot.current;
    const flowEl = refs.flow.current, grid = refs.grid.current, stage = refs.stage.current, panel = refs.panel.current;
    const t1 = l1?.firstChild, t2 = l2?.firstChild;
    if (!h1 || !l1 || !l2 || !b1 || !dot || !flowEl || !grid || !stage || !panel || !(t1 instanceof Text) || !(t2 instanceof Text)) return;

    const origin = h1.getBoundingClientRect();
    const em = parseFloat(getComputedStyle(h1).fontSize);
    const g1 = glyphBoxes(t1, origin);
    const g2 = glyphBoxes(t2, origin);
    const dotBox = relativeBox(dot.getBoundingClientRect(), origin);
    const base1 = b1.getBoundingClientRect().top - origin.top;
    const base2 = dotBox.bottom;
    const f = flowEl.getBoundingClientRect();
    const g = grid.getBoundingClientRect();
    // The signal enters from the page margin, and the margin route of the rail runs down its middle.
    const gutter = Math.max(16, g.left - f.left);
    const start: Point = [g.left - origin.left - Math.min(gutter * 0.62, 44), base1 - SIGNAL_LEVEL * em];
    const points = wavePoints({ glyphs: g1, level: start[1] }, { glyphs: g2, level: base2 - SIGNAL_LEVEL * em }, dotBox, start[0]);
    setName({
      w: origin.width,
      h: origin.height,
      trace: roundedPath(points, Math.max(4, em * 0.045)),
      lines: [l1, l2].map((line) => {
        const box = relativeBox(line.getBoundingClientRect(), origin);
        return { left: box.left, right: box.right };
      }),
      em,
      dotSize: dotBox.right - dotBox.left,
      ticks: refs.ticks.current.map((t) => (t ? t.getBoundingClientRect().left - origin.left : Number.NaN)),
    });

    const dotInFlow = relativeBox(dot.getBoundingClientRect(), f);
    const stageTop = stage.getBoundingClientRect().top - f.top;
    const panelBox = relativeBox(panel.getBoundingClientRect(), f);
    const boxes = (set: Set<HTMLElement>): Box[] => [...set].filter((el) => el.isConnected).map((el) => relativeBox(el.getBoundingClientRect(), f));
    const rail = railToStage(dotInFlow, stageTop, boxes(refs.obstacles.hero.current), (g.right - f.left + f.width) / 2);
    setFlow({
      w: f.width,
      // The rail ends on the stage's top edge, so its layer stops there rather than spanning the page.
      h: Math.ceil(stageTop + 12),
      rail: roundedPath(rail.points, 10),
      port: rail.port,
      straight: rail.straight,
      approach: approachRoute(rail.port, panelBox, boxes(refs.obstacles.stage.current)),
    });
  }, [refs]);

  // Measure after fonts settle and whenever the hero or the stage changes size. Sections further
  // down the page cannot move either, so their changes are not observed.
  useEffect(() => {
    const grid = refs.grid.current, stage = refs.stage.current;
    if (!grid || !stage) return;
    let frame = 0;
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(schedule);
    observer.observe(grid);
    observer.observe(stage);
    document.fonts.addEventListener("loadingdone", schedule);
    schedule();
    return () => { observer.disconnect(); document.fonts.removeEventListener("loadingdone", schedule); cancelAnimationFrame(frame); };
  }, [measure, refs]);

  const finish = useCallback(() => running.current.forEach((a) => a.finish()), []);

  // Start once the fonts are in and the page is visible; skip the opening if fonts are slow.
  useEffect(() => {
    if (phase !== "pending") return;
    let alive = true;
    // Two frames guarantee the drafted name paints once before the ink takes over. While writing, the
    // letters are filled through a clipped gradient, which browsers do not count as contentful paint,
    // so starting earlier would report Largest Contentful Paint at the end of the opening.
    const painted = () => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    const begin = () => Promise.all([fontsReady(FONT_TIMEOUT), painted()]).then(([ok]) => {
      if (!alive) return;
      measure();
      const play = ok && scrollY < innerHeight * 0.4 && !prefersReducedMotion();
      if (play) markPlayed();
      setPhase(play ? "writing" : "ready");
    });
    if (document.visibilityState === "visible") begin();
    else {
      const onVisible = () => { if (document.visibilityState === "visible") { document.removeEventListener("visibilitychange", onVisible); begin(); } };
      document.addEventListener("visibilitychange", onVisible);
      return () => { alive = false; document.removeEventListener("visibilitychange", onVisible); };
    }
    return () => { alive = false; };
  }, [phase, measure]);

  // The opening, in two stages. The write moves the head, trace, ink and ruler on one sampled
  // timeline. The rail is built when the period lands, from the layout as it is at that moment.
  // Finishing every animation jumps straight to the final state.
  useLayoutEffect(() => {
    if (phase !== "writing") return;
    const { name } = latest.current;
    const trace = refs.trace.current, head = refs.head.current, core = refs.headCore.current, line1 = refs.line1.current, line2 = refs.line2.current, dot = refs.dot.current;
    if (!name || !trace || !head || !core || !line1 || !line2 || !dot || trace.getTotalLength() === 0) { setPhase("ready"); return; }

    const anims: Animation[] = [];
    running.current = anims;
    let cancelled = false;
    let interrupted = false;
    let timer = 0;
    const length = trace.getTotalLength();
    // Narrow screens get a shorter write: the name is a third of the size, and the whole sequence
    // then finishes on screen.
    const write = innerWidth < 640 ? duration.writeCompact : duration.write;
    const t0 = delay.start;
    const landAt = t0 + write;
    const timing = (start: number, dur: number, ease = "linear"): KeyframeAnimationOptions => ({ delay: start, duration: dur, easing: ease, fill: "both" });

    anims.push(head.animate(pathKeyframes(trace, SAMPLES, signalEase), timing(t0, write)));
    anims.push(core.animate([{ opacity: 0, transform: "scale(.2)" }, { opacity: 1, transform: "scale(1)" }], timing(t0 - 120, 260, easing.out)));
    anims.push(trace.animate(drawKeyframes(trace, SAMPLES, signalEase), timing(t0, write)));

    // Ink bleeds into the pencil draft behind the head: each line's letters are filled by an ink
    // gradient, one soft edge wider than the line, that slides right with the head.
    const xs = Array.from({ length: SAMPLES + 1 }, (_, i) => trace.getPointAtLength(length * signalEase(i / SAMPLES)).x);
    const edge = name.em * INK_EDGE;
    [line1, line2].forEach((line, i) => {
      const { left, right } = name.lines[i];
      const width = right - left;
      const frames = xs.map((x, s) => {
        const front = s === SAMPLES ? width + edge : Math.min(width + edge, Math.max(-edge, x - left + edge * 0.35));
        return { backgroundPosition: `${(front - width - edge).toFixed(2)}px 0`, offset: s / SAMPLES };
      });
      anims.push(line.animate(frames, timing(t0, write)));
    });

    // The ruler reads the signal: each column number darkens as the head passes it.
    const times = crossingTimes(trace, name.ticks, signalEase);
    refs.ticks.current.forEach((tick, i) => {
      const t = times[i];
      if (!tick || t === null) return;
      anims.push(tick.animate([{ color: "var(--ink-3)" }, { color: "var(--ink)", offset: 0.2 }, { color: "var(--ink-3)" }], { delay: t0 + t * write, duration: 900, easing: easing.standard, fill: "none" }));
    });

    // Landing: the head grows into the period, then hands over to it.
    const scale = name.dotSize / 10;
    const landing = core.animate(
      [
        { transform: "scale(1)", opacity: 1, boxShadow: "0 0 0 1.5px var(--ink)" },
        { transform: `scale(${scale})`, opacity: 1, boxShadow: "0 0 0 0 rgba(17, 18, 18, 0)", offset: 0.75 },
        { transform: `scale(${scale})`, opacity: 0, boxShadow: "0 0 0 0 rgba(17, 18, 18, 0)" },
      ],
      { delay: landAt, duration: duration.short, easing: easing.land, fill: "forwards" },
    );
    anims.push(landing);
    anims.push(dot.animate([{ opacity: 0 }, { opacity: 1 }], timing(landAt + duration.short * 0.5, duration.short * 0.5)));
    anims.push(trace.animate([{ opacity: 1 }, { opacity: 0 }], timing(landAt + 80, duration.medium, easing.standard)));

    // The period sends the signal down the rail to the stage's port, where paper meets the instrument.
    const link = () => {
      const rail = refs.rail.current, pulse = refs.pulse.current, port = refs.port.current;
      if (cancelled || interrupted || !rail || !pulse || !port || rail.getTotalLength() === 0) return;
      const railMs = Math.round(Math.min(duration.railMax, Math.max(duration.railMin, rail.getTotalLength() * duration.railPerPx)));
      const draw = drawKeyframes(rail, SAMPLES).map((frame) => ({ ...frame, opacity: 1 }));
      anims.push(rail.animate(draw, timing(0, railMs, easing.draw)));
      anims.push(pulse.animate(pathKeyframes(rail, SAMPLES), timing(0, railMs, easing.draw)));
      anims.push(pulse.animate([{ opacity: 0 }, { opacity: 1, offset: 0.08 }, { opacity: 1, offset: 0.9 }, { opacity: 0 }], timing(0, railMs)));
      anims.push(port.animate(
        [{ transform: "translate(-50%, -50%) scale(.5)", backgroundColor: "var(--paper)" }, { transform: "translate(-50%, -50%) scale(1.35)", backgroundColor: "var(--mint)", offset: 0.55 }, { transform: "translate(-50%, -50%) scale(1)", backgroundColor: "var(--mint)" }],
        timing(railMs - 60, duration.medium, easing.out),
      ));
    };
    const settle = () => Promise.all(anims.map((a) => a.finished));
    landing.finished
      .then(() => new Promise<void>((resolve) => { timer = window.setTimeout(resolve, interrupted ? 0 : delay.rail); }))
      .then(link)
      .then(settle) // Runs after link(), so the rail's animations are included.
      .then(() => { if (!cancelled) setPhase("ready"); }, () => {});

    // Intent beats choreography: any interaction ends the opening immediately.
    const stop = () => { interrupted = true; anims.forEach((a) => a.finish()); };
    const events = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
    events.forEach((type) => addEventListener(type, stop, { passive: true }));
    return () => {
      cancelled = true;
      clearTimeout(timer);
      events.forEach((type) => removeEventListener(type, stop));
      anims.forEach((a) => a.cancel());
      running.current = [];
    };
  }, [phase, refs]);

  // If the name's own layout changes mid-opening, finish it so the drawing never drifts.
  useEffect(() => {
    if (phase !== "writing") return;
    const h1 = refs.name.current;
    if (!h1) return;
    let first = true;
    const observer = new ResizeObserver(() => { if (first) { first = false; return; } finish(); });
    observer.observe(h1);
    return () => observer.disconnect();
  }, [phase, finish, refs]);

  /** Plays the opening again on request. Reduced motion keeps the finished composition. */
  const replay = useCallback(() => {
    if (prefersReducedMotion() || !latest.current.name || !latest.current.flow) return;
    running.current.forEach((a) => a.cancel());
    // Back to the draft; the normal start path then runs the opening from its first frame.
    setPhase("pending");
  }, []);

  return { refs, phase, name, flow, replay };
}

/** Callback ref that registers an element the rail must not cross, in the hero or the stage header. */
export function useObstacle(refs: SignalRefs, zone: "hero" | "stage") {
  return useCallback((el: HTMLElement | null) => {
    const set = refs.obstacles[zone].current;
    // React calls callback refs with null on unmount; keep the set limited to mounted elements.
    for (const node of set) if (!node.isConnected) set.delete(node);
    if (el) set.add(el);
  }, [refs, zone]);
}

export const portStyle = (flow: FlowGeometry | null) => (flow ? { left: flow.port[0], top: flow.port[1] } : undefined);

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import type { ProjectSystem, SystemLane } from "../../content/systems";
import { centerX, centerY, relativeBox, roundedPath, type Point } from "../geometry";
import { useCompact } from "../hooks";
import { drawKeyframes, duration, easing, finePointer, pathKeyframes, stagger } from "../motion";

type Focus = "all" | "mine";
/** static: drawn, no animation. waiting: drawn when scrolled into view. running: drawing. */
type Reveal = "static" | "waiting" | "running";
/** Wire paths; `lanes` holds one path per rendered lane, in `laneIndex` order. */
type Wires = { w: number; h: number; entry: string; port: Point; bus: string[]; lanes: string[]; laneIndex: number[]; nodeTimes: number[][] };

const KEYS = ["A", "B", "C", "D"];
const STATIONS = [["Input", "input"], ["System", "system"], ["Outcome", "outcome"]] as const;

type Props = {
  system: ProjectSystem;
  panelRef: RefObject<HTMLElement>;
  /** The signal's route from the stage port to the panel's top edge, relative to the panel. */
  approach: Point[] | null;
  /** True once the hero's opening is over. */
  armed: boolean;
  animate: boolean;
};

export default function SystemDiagram({ system, panelRef, approach, armed, animate }: Props) {
  // Phones show one pipeline at a time, chosen with tabs; wider screens show all three side by side
  // or stacked.
  const compact = useCompact();
  const [active, setActive] = useState(0);
  const [focus, setFocus] = useState<Focus>("all");
  const [reveal, setReveal] = useState<Reveal>(animate ? "waiting" : "static");
  const [wires, setWires] = useState<Wires | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLElement | null)[][]>(system.lanes.map(() => []));
  const laneRefs = useRef<(HTMLElement | null)[]>([]);
  const pathRefs = useRef<{ entry: SVGPathElement | null; bus: (SVGPathElement | null)[]; lanes: (SVGPathElement | null)[] }>({ entry: null, bus: [], lanes: [] });
  const pulseRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const shown = compact ? [active] : system.lanes.map((_, i) => i);

  const measure = useCallback(() => {
    const body = bodyRef.current;
    if (!body || !approach || approach.length < 2) return;
    const portX = approach[approach.length - 1][0];
    const b = body.getBoundingClientRect();
    const rel = (el: Element) => relativeBox(el.getBoundingClientRect(), b);
    const laneIndex = laneRefs.current.flatMap((el, i) => (el?.isConnected ? [i] : []));
    const lanes = laneIndex.map((i) => nodeRefs.current[i].filter((n): n is HTMLElement => Boolean(n?.isConnected)).map(rel));
    if (laneIndex.length === 0 || lanes.some((n) => n.length === 0)) return;
    const laneBoxes = laneIndex.map((i) => rel(laneRefs.current[i]!));
    const xs = lanes.map((nodes) => centerX(nodes[0]));
    const tops = laneBoxes.map((l) => l.top);
    const ends = lanes.map((nodes) => centerY(nodes[nodes.length - 1]));
    const stacked = xs.every((x) => Math.abs(x - xs[0]) < 2);
    const tabs = tabsRef.current;
    // The junction sits just above the first thing the signal feeds: the lanes, or the tabs on phones.
    const busY = (tabs?.isConnected ? rel(tabs).top - 14 : Math.min(...tops) - 16);
    const r = 8;

    // A tree: the signal enters at the port, a bus fans it out, and each lane runs from its input
    // to its outcome. Wide layouts put the bus across the top; stacked layouts use a spine on the
    // left, which on phones runs past the tabs into the chosen pipeline.
    let entry: string, bus: string[], laneD: string[], starts: number[];
    if (!stacked) {
      const left = Math.min(xs[0], portX), right = Math.max(xs[xs.length - 1], portX);
      entry = roundedPath([...approach, [portX, busY]], r);
      bus = [roundedPath([[portX, busY], [left, busY]], r), roundedPath([[portX, busY], [right, busY]], r)];
      laneD = xs.map((x, i) => roundedPath([[x, busY], [x, ends[i]]], r));
      starts = xs.map(() => busY);
    } else {
      const spineX = xs[0] - 16;
      const branchYs = tops.map((t) => t + 10);
      entry = roundedPath([...approach, [portX, busY], [spineX, busY], [spineX, busY + 12]], r);
      bus = [roundedPath([[spineX, busY], [spineX, branchYs[branchYs.length - 1]]], r)];
      laneD = xs.map((x, i) => roundedPath([[spineX, branchYs[i]], [x, branchYs[i]], [x, ends[i]]], r));
      starts = branchYs;
    }
    // When the line reaches each node, as a fraction of its lane's draw.
    const nodeTimes = lanes.map((nodes, i) => nodes.map((n) => Math.min(1, Math.max(0, (centerY(n) - starts[i]) / Math.max(1, ends[i] - starts[i])))));
    setWires({ w: b.width, h: b.height, entry, port: [portX, 0], bus, lanes: laneD, laneIndex, nodeTimes });
  }, [approach]);

  useLayoutEffect(() => { measure(); }, [measure, compact, active]);
  // Reduced motion switched on later: show the finished diagram at once.
  useEffect(() => { if (!animate) setReveal("static"); }, [animate]);
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    let frame = 0;
    const observer = new ResizeObserver(() => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); });
    observer.observe(body);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [measure]);

  // Draw the diagram once, after the opening, when its top reaches the upper 70% of the screen.
  // (A share-of-panel threshold would never fire for a stacked panel taller than the screen.)
  useEffect(() => {
    if (reveal !== "waiting" || !armed) return;
    const panel = panelRef.current;
    if (!panel) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { observer.disconnect(); setReveal("running"); }
    }, { threshold: 0, rootMargin: "0px 0px -30% 0px" });
    observer.observe(panel);
    return () => observer.disconnect();
  }, [reveal, armed, panelRef]);

  useLayoutEffect(() => {
    if (reveal !== "running" || !wires) return;
    const p = pathRefs.current;
    const anims: Animation[] = [];
    const draw = (path: SVGPathElement | null, start: number, dur: number) => {
      if (path && path.getTotalLength() > 0) anims.push(path.animate(drawKeyframes(path, 1), { delay: start, duration: dur, easing: easing.draw, fill: "both" }));
    };
    const entryDur = 300, busDur = 380;
    draw(p.entry, 0, entryDur);
    p.bus.forEach((path) => draw(path, entryDur, busDur));
    const lanesAt = entryDur + busDur;
    wires.laneIndex.forEach((lane, k) => {
      const start = lanesAt + k * stagger.lane;
      draw(p.lanes[lane], start, duration.lane);
      nodeRefs.current[lane].forEach((node, n) => {
        if (!node) return;
        const t = wires.nodeTimes[k][n] ?? 0;
        anims.push(node.animate(
          [{ transform: "scale(.4)", opacity: 0.25 }, { transform: "scale(1.3)", opacity: 1, offset: 0.6 }, { transform: "scale(1)", opacity: 1 }],
          { delay: start + t * duration.lane, duration: 360, easing: easing.out, fill: "both" },
        ));
      });
    });
    let cancelled = false;
    Promise.all(anims.map((a) => a.finished)).then(() => { if (!cancelled) setReveal("static"); }, () => {});
    return () => { cancelled = true; anims.forEach((a) => a.cancel()); };
    // Keyed on whether wires exist, not on their value: the draw-on starts once, and a re-measure
    // during it (a tab change, a resize) only updates the paths.
  }, [reveal, wires === null]);

  // A pulse runs down a lane on hover, and down each of my lanes when "My part" is chosen.
  const pulse = useCallback((lanes: number[]) => {
    if (!animate || reveal !== "static") return;
    lanes.forEach((i, k) => {
      const dot = pulseRefs.current[i], path = pathRefs.current.lanes[i];
      if (!dot || !path || !path.isConnected || path.getTotalLength() === 0) return;
      const timing = { duration: duration.pulse, delay: k * stagger.lane, easing: easing.draw };
      dot.animate(pathKeyframes(path, 48), timing);
      dot.animate([{ opacity: 0 }, { opacity: 1, offset: 0.1 }, { opacity: 1, offset: 0.85 }, { opacity: 0 }], timing);
    });
  }, [animate, reveal]);

  const mineIndex = system.lanes.flatMap((lane, i) => (lane.mine ? [i] : []));
  const choose = (next: Focus) => {
    setFocus(next);
    if (next !== "mine") return;
    // On phones, "My part" opens one of my pipelines if a team pipeline is showing.
    if (compact && !system.lanes[active].mine && mineIndex.length > 0) { setActive(mineIndex[0]); return; }
    pulse(shown.filter((i) => system.lanes[i].mine));
  };

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = system.lanes.length - 1;
    const forward = active === last ? 0 : active + 1, back = active === 0 ? last : active - 1;
    const next = ({ ArrowDown: forward, ArrowRight: forward, ArrowUp: back, ArrowLeft: back, Home: 0, End: last } as Record<string, number>)[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const mine = system.lanes.filter((lane) => lane.mine).map((lane) => lane.name);
  const team = system.lanes.filter((lane) => !lane.mine).map((lane) => lane.name);

  const laneBody = (lane: SystemLane, i: number) => (
    <>
      <h3 className="sp-lane-name">
        <span className="sp-lane-key" aria-hidden="true">{KEYS[i]}</span>
        {lane.name}
        <span className="sp-tag">{lane.mine ? "My part" : "Team"}</span>
      </h3>
      <ol className="sp-stations">
        {STATIONS.map(([label, key], n) => (
          <li key={key} className={`sp-station sp-station--${key}`}>
            <i className="sp-node" ref={(el) => { nodeRefs.current[i][n] = el; }} aria-hidden="true" />
            <span className="sp-st-label">{label}</span>
            <span className="sp-st-text">{lane[key]}</span>
            {key === "system" && lane.detail && <span className="sp-st-detail">{lane.detail}</span>}
          </li>
        ))}
      </ol>
    </>
  );
  const laneRef = (i: number) => (el: HTMLElement | null) => { laneRefs.current[i] = el; };
  const hover = (i: number) => () => { if (finePointer()) pulse([i]); };

  return (
    <figure className="sp-system" ref={panelRef} data-focus={focus} data-reveal={reveal} data-layout={compact ? "tabs" : "lanes"} aria-labelledby="sp-system-caption">
      <div className="sp-system-body" ref={bodyRef}>
        <p className="sp-system-source"><span className="sp-st-label">Source</span>{system.source}</p>
        {compact ? (
          <>
            <div className="sp-lane-tabs" role="tablist" aria-label="Pipelines" aria-orientation="vertical" ref={tabsRef}>
              {system.lanes.map((lane, i) => (
                <button
                  key={lane.id}
                  type="button"
                  role="tab"
                  id={`sp-tab-${lane.id}`}
                  aria-selected={i === active}
                  aria-controls={i === active ? `sp-pipeline-${lane.id}` : undefined}
                  tabIndex={i === active ? 0 : -1}
                  data-mine={lane.mine}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  onClick={() => setActive(i)}
                  onKeyDown={onTabKey}
                >
                  <span className="sp-lane-key" aria-hidden="true">{KEYS[i]}</span>
                  <span className="sp-lane-tab-name">{lane.name}</span>
                  <span className="sp-lane-tab-owner">{lane.mine ? "My part" : "Team"}</span>
                </button>
              ))}
            </div>
            <div className="sp-lanes sp-lanes--single">
              <div
                key={system.lanes[active].id}
                className="sp-lane"
                role="tabpanel"
                id={`sp-pipeline-${system.lanes[active].id}`}
                aria-labelledby={`sp-tab-${system.lanes[active].id}`}
                data-mine={system.lanes[active].mine}
                ref={laneRef(active)}
              >
                {laneBody(system.lanes[active], active)}
              </div>
            </div>
          </>
        ) : (
          <ol className="sp-lanes">
            {system.lanes.map((lane, i) => (
              <li key={lane.id} className="sp-lane" data-mine={lane.mine} ref={laneRef(i)} onPointerEnter={hover(i)}>
                {laneBody(lane, i)}
              </li>
            ))}
          </ol>
        )}
        <p className="sp-surface"><span className="sp-st-label">Shown in</span>{system.surface}</p>
        {wires && (
          <svg className="sp-wires" width={wires.w} height={wires.h} viewBox={`0 0 ${wires.w} ${wires.h}`} aria-hidden="true" focusable="false">
            <path className="sp-wire sp-wire--entry" ref={(el) => { pathRefs.current.entry = el; }} d={wires.entry} />
            <rect className="sp-entry" x={wires.port[0] - 4} y={-4} width="8" height="8" />
            {wires.bus.map((d, i) => d && <path key={`b${i}`} className="sp-wire" ref={(el) => { pathRefs.current.bus[i] = el; }} d={d} />)}
            {wires.lanes.map((d, k) => {
              const lane = wires.laneIndex[k];
              return <path key={`l${lane}`} className="sp-wire sp-wire--lane" data-mine={system.lanes[lane].mine} ref={(el) => { pathRefs.current.lanes[lane] = el; }} d={d} />;
            })}
          </svg>
        )}
        {system.lanes.map((lane, i) => (
          <span key={lane.id} className="sp-lane-pulse" ref={(el) => { pulseRefs.current[i] = el; }} aria-hidden="true" />
        ))}
      </div>
      <figcaption className="sp-system-foot">
        <div className="sp-system-caption">
          <p id="sp-system-caption">How it works: one Polymarket event, three pipelines, one extension.</p>
          <p className="sp-system-stack">{system.stack} · from the public README</p>
        </div>
        <div className="sp-toggle" role="group" aria-label="Highlight">
          <button type="button" aria-pressed={focus === "all"} onClick={() => choose("all")}>Whole system</button>
          <button type="button" aria-pressed={focus === "mine"} onClick={() => choose("mine")}>My part</button>
        </div>
      </figcaption>
      <p className="sp-sr" aria-live="polite">
        {focus === "mine" ? `Highlighting my part: ${mine.join(" and ")}. The team built ${team.join(" and ")}.` : ""}
      </p>
    </figure>
  );
}

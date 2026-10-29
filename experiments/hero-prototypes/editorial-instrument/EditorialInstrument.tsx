import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { describe, featured, identity, projects, type ProjectSlug } from "../shared/content";
import { ease, finePointer, fontsReady, pathKeyframes, roundedPath, signalEase, usePrefersReducedMotion } from "../shared/motion";

type Phase = "idle" | "intro" | "ready";
type Geometry = { w: number; h: number; trunk: string; branch: string; origin: [number, number]; port: [number, number] };

// Beats: type 0.1–1.4 s · period 0.95 s · signal 1.15–1.75 s · panel powers on 1.7 s · lanes 1.95 s · last pulse ends ~3.5 s.
const INTRO_MS = 3600;
const LANES_DELAY = "1950ms";
const pad = (n: number) => String(n).padStart(2, "0");

function Glyphs({ text, offset }: { text: string; offset: number }) {
  return (
    <>
      {Array.from(text).map((ch, i) => (
        <span className="ei-ch" key={i} data-ch={ch} style={{ "--i": offset + i } as CSSProperties}>
          {ch}
        </span>
      ))}
    </>
  );
}

export default function EditorialInstrument() {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [active, setActive] = useState<ProjectSlug>("r-finance");
  const [geom, setGeom] = useState<Geometry | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const periodRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const indexRef = useRef<HTMLOListElement>(null);
  const rulerRef = useRef<HTMLDivElement>(null);
  const trunkRef = useRef<SVGPathElement>(null);
  const branchRef = useRef<SVGPathElement>(null);
  const pulseRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  const measure = useCallback(() => {
    const grid = gridRef.current, period = periodRef.current, panel = panelRef.current, index = indexRef.current;
    const lane = panel?.querySelector<HTMLElement>(".ei-lane");
    const port = index?.querySelector<HTMLElement>(`[data-slug="${activeRef.current}"] .ei-port`);
    if (!grid || !period || !panel || !port) return;
    const g = grid.getBoundingClientRect();
    const p = period.getBoundingClientRect();
    const pn = panel.getBoundingClientRect();
    // Before the lanes mount, aim for where the first lane will sit.
    const ln = lane?.getBoundingClientRect() ?? { top: pn.top + 50, height: 64 };
    const pt = port.getBoundingClientRect();
    const px = p.right - g.left + 8;
    const py = p.top - g.top + p.height / 2;
    const panelLeft = pn.left - g.left;
    const panelTop = pn.top - g.top;
    const panelBottom = pn.bottom - g.top;
    // Wide layouts: one straight hairline into the panel's side port when the period lines up with it.
    // Stacked layouts: drop down the page margin, never across content.
    const sideways = panelLeft > px + 32;
    const margin = parseFloat(getComputedStyle(grid.parentElement!).paddingRight) || 20;
    const trunkPoints: [number, number][] = sideways
      ? py > panelTop + 24 && py < panelBottom - 24
        ? [[px, py], [panelLeft, py]]
        : (() => {
            const laneY = ln.top - g.top + ln.height / 2;
            const elbow = Math.round(panelLeft - Math.max(28, (panelLeft - px) * 0.32));
            return [[px, py], [elbow, py], [elbow, laneY], [panelLeft, laneY]];
          })()
      : [[px, py], [g.width + margin / 2, py], [g.width + margin / 2, panelTop + 18], [g.width, panelTop + 18]];
    const bx = pt.left - g.left + pt.width / 2;
    const by = pt.top - g.top + pt.height / 2;
    setGeom({
      w: g.width,
      h: g.height,
      trunk: roundedPath(trunkPoints, 16),
      branch: `M${bx} ${pn.bottom - g.top} L${bx} ${by}`,
      origin: [p.left - g.left + p.width / 2, py],
      port: trunkPoints[trunkPoints.length - 1],
    });
  }, []);

  // Fonts first, then measure, then play the opening once.
  useEffect(() => {
    let alive = true;
    fontsReady().then(() => {
      if (!alive) return;
      measure();
      setPhase(matchMedia("(prefers-reduced-motion: reduce)").matches ? "ready" : "intro");
    });
    return () => { alive = false; };
  }, [measure]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    let frame = 0;
    const observer = new ResizeObserver(() => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); });
    observer.observe(grid);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [measure]);

  useEffect(() => { if (reduced) setPhase((p) => (p === "idle" ? p : "ready")); }, [reduced]);
  useEffect(() => { measure(); }, [phase, measure]);

  // Choosing a project during the opening ends it immediately: intent beats choreography.
  const choose = (slug: ProjectSlug) => {
    setPhase((p) => (p === "intro" ? "ready" : p));
    setActive(slug);
  };

  // Opening choreography for the signal (the type, panel and ruler run on CSS keyframes).
  useEffect(() => {
    if (phase !== "intro" || !geom) return;
    const trunk = trunkRef.current, branch = branchRef.current, pulse = pulseRef.current, ring = ringRef.current;
    if (!trunk || !branch || !pulse || !ring) return;
    const running: Animation[] = [];
    const tl = trunk.getTotalLength(), bl = branch.getTotalLength();
    trunk.style.strokeDasharray = `${tl}`;
    branch.style.strokeDasharray = `${bl}`;
    running.push(
      ring.animate([{ transform: "translate(-50%,-50%) scale(.3)", opacity: 0.8 }, { transform: "translate(-50%,-50%) scale(2.1)", opacity: 0 }], { duration: 640, delay: 1000, easing: ease.quintOut, fill: "both" }),
      trunk.animate([{ strokeDashoffset: tl }, { strokeDashoffset: 0 }], { duration: 600, delay: 1150, easing: ease.inOut, fill: "both" }),
      pulse.animate(pathKeyframes(trunk, 64, signalEase), { duration: 600, delay: 1150, fill: "both" }),
      pulse.animate([{ opacity: 0 }, { opacity: 1, offset: 0.06 }, { opacity: 1, offset: 0.88 }, { opacity: 0 }], { duration: 680, delay: 1150, fill: "both" }),
      branch.animate([{ strokeDashoffset: bl }, { strokeDashoffset: 0 }], { duration: 420, delay: 2700, easing: ease.quintOut, fill: "both" }),
    );
    const done = setTimeout(() => setPhase("ready"), INTRO_MS);
    return () => { clearTimeout(done); running.forEach((a) => a.cancel()); trunk.style.strokeDasharray = ""; branch.style.strokeDasharray = ""; };
  }, [phase, geom]);

  // Re-route the branch whenever the selected project changes after the opening.
  useEffect(() => {
    measure();
  }, [active, measure]);

  useEffect(() => {
    if (phase !== "ready" || reduced) return;
    const branch = branchRef.current;
    if (!branch || !geom) return;
    const bl = branch.getTotalLength();
    branch.style.strokeDasharray = `${bl}`;
    const a = branch.animate([{ strokeDashoffset: bl }, { strokeDashoffset: 0 }], { duration: 360, easing: ease.quintOut });
    return () => { a.cancel(); branch.style.strokeDasharray = ""; };
    // Only a new selection restarts the draw; geometry updates alone should not.
  }, [active, phase, reduced]);

  const onGridPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || !finePointer()) return;
    const grid = gridRef.current, ruler = rulerRef.current;
    if (!grid || !ruler) return;
    const rect = grid.getBoundingClientRect();
    const col = Math.min(11, Math.max(0, Math.floor(((event.clientX - rect.left) / rect.width) * 12)));
    ruler.dataset.col = String(col);
    const name = nameRef.current;
    if (name) {
      const r = name.getBoundingClientRect();
      const dx = (event.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (event.clientY - (r.top + r.height / 2)) / r.height;
      name.style.setProperty("--rx", `${(dx * 0.05).toFixed(4)}em`);
      name.style.setProperty("--ry", `${(dy * 0.03).toFixed(4)}em`);
    }
  };
  const onGridLeave = () => { if (rulerRef.current) delete rulerRef.current.dataset.col; };

  const project = projects[active];
  const order = featured.indexOf(active) + 1;
  const { links } = identity;

  return (
    <div className="ei" data-phase={phase} data-reduced={reduced}>
      <a className="skip" href="#ei-main">Skip to content</a>
      <header className="ei-bar">
        <a className="ei-brand" href="#top">Raimbek Alish<span aria-hidden="true">Portfolio · 2026</span></a>
        <nav className="ei-nav" aria-label="Sections">
          <a href="#work">Work</a><a href="#work">Experience</a><a href="#work">About</a>
        </nav>
        <div className="ei-barlinks">
          <a href={links.resume}>Résumé <span aria-hidden="true">↗</span></a>
          <a href={links.github}>GitHub <span aria-hidden="true">↗</span></a>
          <a href={`mailto:${links.email}`}>Email</a>
        </div>
      </header>

      <main id="ei-main">
        <section className="ei-hero" id="top" aria-labelledby="ei-name">
          <div className="ei-grid" ref={gridRef} onPointerMove={onGridPointer} onPointerLeave={onGridLeave}>
            <div className="ei-ruler" ref={rulerRef} aria-hidden="true">
              {Array.from({ length: 12 }, (_, c) => <span key={c} style={{ "--c": c } as CSSProperties}>{pad(c + 1)}</span>)}
            </div>
            <span className="ei-crop ei-crop--tl" aria-hidden="true" />
            <span className="ei-crop ei-crop--tr" aria-hidden="true" />
            <span className="ei-crop ei-crop--bl" aria-hidden="true" />
            <span className="ei-crop ei-crop--br" aria-hidden="true" />

            <h1 className="ei-name" id="ei-name" ref={nameRef}>
              <span className="sr-only">{identity.name}</span>
              <span className="ei-line ei-line--1" aria-hidden="true"><Glyphs text="Raimbek" offset={0} /></span>
              <span className="ei-line ei-line--2" aria-hidden="true">
                <Glyphs text="Alish" offset={8} />
                <span className="ei-period" ref={periodRef} />
              </span>
            </h1>

            <div className="ei-legend">
              <p className="ei-label" aria-hidden="true"><span className="ei-reg" />Fig. 01 — Signal path</p>
              <p>From identity to working systems. Choose a project to route the signal.</p>
            </div>

            <p className="ei-statement">Building software systems, applied AI, and <em>useful products.</em></p>

            <dl className="ei-meta">
              <div><dt>Studying</dt><dd>{identity.study}, {identity.school}</dd></div>
              <div><dt>Graduating</dt><dd>{identity.graduation}</dd></div>
              <div className="ei-seek"><dt>Available</dt><dd>Summer 2027 software engineering internships</dd></div>
            </dl>

            <div className="ei-ctas">
              <a className="ei-btn ei-btn--primary" href={links.resume}>Résumé (PDF) <span aria-hidden="true">↗</span></a>
              <a className="ei-btn" href={links.github}>GitHub <span aria-hidden="true">↗</span></a>
              <a className="ei-mail" href={`mailto:${links.email}`}>{links.email}</a>
            </div>

            <figure className="ei-panel" id="ei-panel" ref={panelRef} aria-labelledby="ei-panel-title">
              <figcaption className="ei-panel-head">
                <span id="ei-panel-title"><i className="ei-led" aria-hidden="true" />System {pad(order)} · {project.title}</span>
                <span aria-hidden="true">in → system → out</span>
              </figcaption>
              {/* Rendered from the first frame so the panel never changes size (no layout shift);
                  its keyframes stay paused until the opening starts. */}
              <div className="ei-panel-body" key={active} aria-hidden="true" style={{ "--d": phase === "ready" ? "0ms" : LANES_DELAY } as CSSProperties}>
                {project.lanes.map((lane, l) => (
                  <div className="ei-lane" key={l} style={{ "--l": l } as CSSProperties}>
                    <div className="ei-node" style={{ "--n": 0 } as CSSProperties}><small>Input</small><b>{lane.input}</b></div>
                    <span className="ei-wire" style={{ "--n": 0 } as CSSProperties} />
                    <div className="ei-node ei-node--sys" style={{ "--n": 1 } as CSSProperties}><small>System</small><b>{lane.system}</b></div>
                    <span className="ei-wire" style={{ "--n": 1 } as CSSProperties} />
                    <div className="ei-node ei-node--out" style={{ "--n": 2 } as CSSProperties}><small>Outcome</small><b>{lane.outcome}</b></div>
                    <span className="ei-lane-pulse" />
                  </div>
                ))}
              </div>
              <p className="sr-only" aria-live="polite">{describe(project)}</p>
              <div className="ei-panel-foot">
                <span>{project.kind} · {project.context}</span>
                <a href={`#${project.slug}`}>Case study <span aria-hidden="true">→</span></a>
              </div>
            </figure>

            <ol className="ei-index" ref={indexRef} aria-label="Featured projects">
              {featured.map((slug, i) => {
                const p = projects[slug];
                return (
                  <li key={slug} data-slug={slug} style={{ "--r": i } as CSSProperties}>
                    <button
                      type="button"
                      className="ei-row"
                      aria-pressed={active === slug}
                      aria-controls="ei-panel"
                      onPointerEnter={() => finePointer() && choose(slug)}
                      onFocus={() => choose(slug)}
                      onClick={() => choose(slug)}
                    >
                      <span className="ei-port" aria-hidden="true" />
                      <span className="ei-num" aria-hidden="true">{pad(i + 1)}</span>
                      <span className="ei-title">{p.title}</span>
                      <span className="ei-note" data-award={p.award}>{p.note}</span>
                    </button>
                  </li>
                );
              })}
            </ol>

            {geom && (
              <svg className="ei-signal" width={geom.w} height={geom.h} viewBox={`0 0 ${geom.w} ${geom.h}`} aria-hidden="true">
                <path ref={trunkRef} className="ei-trunk" d={geom.trunk} />
                <path ref={branchRef} className="ei-branch" d={geom.branch} />
              </svg>
            )}
            {geom && <span className="ei-portmark" aria-hidden="true" style={{ left: geom.port[0], top: geom.port[1] }} />}
            <span className="ei-pulse" ref={pulseRef} aria-hidden="true" />
            <span className="ei-ring" ref={ringRef} aria-hidden="true" style={geom ? { left: geom.origin[0], top: geom.origin[1] } : undefined} />
          </div>
        </section>

        <section className="ei-next" id="work" aria-labelledby="ei-next-title">
          <div className="ei-next-head">
            <p className="ei-label">02 — Selected work</p>
            <h2 id="ei-next-title">Each project, drawn as the system it is.</h2>
          </div>
          <ol className="ei-next-list">
            {featured.map((slug, i) => {
              const p = projects[slug];
              return (
                <li key={slug} id={slug}>
                  <span className="ei-num">{pad(i + 1)}</span>
                  <h3>{p.title}</h3>
                  <p className="ei-next-context">{p.kind} · {p.context}</p>
                  <p>{p.summary}</p>
                  <p className="ei-next-role"><span>My part</span>{p.role}</p>
                </li>
              );
            })}
          </ol>
        </section>
      </main>
    </div>
  );
}

import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { flushSync } from "react-dom";
import { featured, identity, projects, type ProjectSlug } from "../shared/content";
import { ease, finePointer, fontsReady, pathKeyframes, roundedPath, signalEase, usePrefersReducedMotion } from "../shared/motion";

type Phase = "idle" | "intro" | "landed" | "ready";
type Box = { left: number; right: number };
type Geometry = {
  w: number;
  h: number;
  trace: string;
  branches: Record<ProjectSlug, string>;
  period: { x: number; y: number; size: number };
  lines: Box[];
  inputTag: [number, number];
  /** Vertical extent of the name block, for the scan bar. */
  band: [number, number];
};

const START_DELAY = 260;
const canTransition = () => "startViewTransition" in document;
const pad = (n: number) => String(n).padStart(2, "0");
const letters = (text: string) => Array.from(text).map((ch, i) => <span className="cs-l" key={i}>{ch}</span>);

export default function CinematicSignal() {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [geom, setGeom] = useState<Geometry | null>(null);
  const [hot, setHot] = useState<ProjectSlug | null>(null);
  const [open, setOpen] = useState<ProjectSlug | null>(null);

  const stageRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const slotRef = useRef<HTMLSpanElement>(null);
  const termRefs = useRef<Partial<Record<ProjectSlug, HTMLButtonElement | null>>>({});
  const traceRef = useRef<SVGPathElement>(null);
  const branchRefs = useRef<Partial<Record<ProjectSlug, SVGPathElement | null>>>({});
  const headRef = useRef<HTMLSpanElement>(null);
  const scanRef = useRef<HTMLSpanElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const asideRef = useRef<HTMLDivElement>(null);
  const outTagRef = useRef<HTMLParagraphElement>(null);

  const measure = useCallback(() => {
    const stage = stageRef.current, l1 = line1Ref.current, l2 = line2Ref.current, slot = slotRef.current;
    if (!stage || !l1 || !l2 || !slot) return;
    const s = stage.getBoundingClientRect();
    const x = (v: number) => v - s.left;
    const y = (v: number) => v - s.top;
    // Measure the untransformed line boxes and fill glyphs; the outline layer is offset for depth.
    const o1 = l1.getBoundingClientRect();
    const o2 = l2.getBoundingClientRect();
    const gapsOf = (line: HTMLElement) => {
      const glyphs = [...line.querySelectorAll<HTMLElement>(".cs-fill .cs-l")].map((el) => el.getBoundingClientRect());
      return glyphs.slice(0, -1).map((r, i) => x((r.right + glyphs[i + 1].left) / 2));
    };
    const ps = slot.getBoundingClientRect();
    const y1 = y(o1.top + o1.height * 0.5);
    const y2 = y(o2.top + o2.height * 0.5);
    const px = x(ps.left + ps.width / 2);
    const py = y(ps.top + ps.height / 2);

    // A square wave. Its vertical edges sit in letter gaps of either line, so each edge is
    // glimpsed between letters and disappears behind the other line's glyphs.
    const gaps = [...gapsOf(l1), ...gapsOf(l2)].sort((a, b) => a - b);
    const l2Left = x(o2.left);
    const span = px - l2Left;
    const pick = (target: number, after: number) =>
      gaps.filter((g) => g > after).reduce((best, g) => (Math.abs(g - target) < Math.abs(best - target) ? g : best), Number.POSITIVE_INFINITY);
    const e1 = pick(l2Left + span * 0.18, l2Left + 6);
    const e2 = pick(l2Left + span * 0.48, e1 + 30);
    const e3 = pick(l2Left + span * 0.76, e2 + 30);
    const points: [number, number][] = [[-6, y1]];
    if (e3 < px - 24) points.push([e1, y1], [e1, y2], [e2, y2], [e2, y1], [e3, y1], [e3, y2], [px, y2], [px, py]);
    else if (e1 < px - 24) points.push([e1, y1], [e1, y2], [px, y2], [px, py]);
    else points.push([px, y1], [px, py]);

    // Branches from the period to each terminal's port.
    // Row layout: a bus just above the terminals. Stacked layout: cross in the clear gap above the
    // output tag, then run down a rail in the page margin with a short stub into each port.
    const branches = {} as Record<ProjectSlug, string>;
    const ports = featured.map((slug) => termRefs.current[slug]?.querySelector(".cs-term-port")?.getBoundingClientRect());
    const placed = ports.filter((p): p is DOMRect => Boolean(p));
    const stacked = placed.length > 1 && placed.every((p) => Math.abs(p.left - placed[0].left) < 2);
    const start: [number, number] = [px, py + ps.height / 2];
    const aside = asideRef.current?.getBoundingClientRect();
    const tag = outTagRef.current?.getBoundingClientRect();
    featured.forEach((slug, i) => {
      const port = ports[i];
      if (!port) return;
      const tx = x(port.left + port.width / 2);
      const ty = y(port.top + port.height / 2);
      if (!stacked) {
        const busY = y(placed[0].top) - 18;
        branches[slug] = roundedPath([start, [px, busY], [tx, busY], [tx, ty]], 14);
        return;
      }
      const crossY = aside && tag ? (y(aside.bottom) + y(tag.top)) / 2 : ty - 40;
      const railX = Math.max(6, x(port.left) - parseFloat(getComputedStyle(stage).paddingLeft) / 2);
      branches[slug] = roundedPath([start, [px, crossY], [railX, crossY], [railX, ty], [x(port.left), ty]], 12);
    });

    setGeom({
      w: s.width,
      h: s.height,
      trace: roundedPath(points, 12),
      branches,
      period: { x: px, y: py, size: ps.width },
      lines: [o1, o2].map((r, i) => ({ left: x(r.left), right: i === 1 ? px + ps.width / 2 : x(r.right) })),
      inputTag: [Math.max(12, x(o1.left)), y(o1.top) - 6],
      band: [y(o1.top) - 24, y(o2.bottom) + 24],
    });
  }, []);

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
    const stage = stageRef.current;
    if (!stage) return;
    let frame = 0;
    const observer = new ResizeObserver(() => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); });
    observer.observe(stage);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [measure]);

  useEffect(() => { if (reduced) setPhase((p) => (p === "idle" ? p : "ready")); }, [reduced]);

  // The opening: one signal travels the wave, writes the name, lands as the period, then branches out.
  useEffect(() => {
    if (phase !== "intro" || !geom) return;
    const trace = traceRef.current, head = headRef.current, scan = scanRef.current;
    if (!trace || !head || !scan) return;
    const length = trace.getTotalLength();
    const duration = Math.min(1900, Math.max(1300, length / 2.4));
    const fills = fillRefs.current;
    trace.style.strokeDasharray = `${length}`;
    trace.style.strokeDashoffset = `${length}`;
    let raf = 0;
    const begin = performance.now() + START_DELAY;
    const reveal = (hx: number) =>
      geom.lines.forEach((line, i) => {
        const fill = fills[i];
        if (!fill) return;
        const pct = Math.min(1, Math.max(0, (line.right - hx) / (line.right - line.left))) * 100;
        fill.style.clipPath = `inset(0 ${pct.toFixed(2)}% 0 0)`;
      });
    reveal(-1);
    const step = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - begin) / duration));
      const along = signalEase(t) * length;
      const point = trace.getPointAtLength(along);
      head.style.transform = `translate(${point.x}px, ${point.y}px)`;
      head.style.opacity = t > 0 ? "1" : "0";
      scan.style.transform = `translateX(${point.x}px)`;
      scan.style.opacity = t > 0 && t < 1 ? "1" : "0";
      trace.style.strokeDashoffset = `${length - along}`;
      reveal(point.x);
      if (t < 1) raf = requestAnimationFrame(step);
      else setPhase("landed");
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [phase, geom]);

  // Landing: the head grows into the period; branches and terminals follow.
  useEffect(() => {
    if (phase !== "landed" || !geom) return;
    const head = headRef.current;
    const running: Animation[] = [];
    if (head) {
      const scale = geom.period.size / 12;
      running.push(
        head.animate(
          [
            { transform: `translate(${geom.period.x}px, ${geom.period.y}px) scale(1)`, opacity: 1 },
            { transform: `translate(${geom.period.x}px, ${geom.period.y}px) scale(${scale})`, opacity: 1, offset: 0.7 },
            { transform: `translate(${geom.period.x}px, ${geom.period.y}px) scale(${scale})`, opacity: 0 },
          ],
          { duration: 420, easing: ease.quintOut, fill: "forwards" },
        ),
      );
    }
    featured.forEach((slug, i) => {
      const branch = branchRefs.current[slug];
      if (!branch) return;
      const length = branch.getTotalLength();
      branch.style.strokeDasharray = `${length}`;
      running.push(branch.animate([{ strokeDashoffset: length }, { strokeDashoffset: 0 }], { duration: 560, delay: 300 + i * 110, easing: ease.inOut, fill: "both" }));
    });
    const done = setTimeout(() => setPhase("ready"), 1500);
    return () => {
      clearTimeout(done);
      running.forEach((a) => a.finish());
      featured.forEach((slug) => { const b = branchRefs.current[slug]; if (b) b.style.strokeDasharray = ""; });
    };
  }, [phase, geom]);

  // Settled state: everything final, no inline animation styles left behind.
  useEffect(() => {
    if (phase !== "ready") return;
    fillRefs.current.forEach((fill) => fill?.style.removeProperty("clip-path"));
    const trace = traceRef.current;
    if (trace) { trace.style.strokeDasharray = ""; trace.style.strokeDashoffset = ""; }
  }, [phase]);

  // Hovering a terminal sends a pulse from the period down its branch.
  useEffect(() => {
    if (!hot || phase !== "ready" || reduced) return;
    const branch = branchRefs.current[hot];
    const head = headRef.current;
    if (!branch || !head) return;
    const a = head.animate(pathKeyframes(branch, 48, signalEase), { duration: 520 });
    const b = head.animate([{ opacity: 0 }, { opacity: 1, offset: 0.1 }, { opacity: 1, offset: 0.85 }, { opacity: 0 }], { duration: 560 });
    return () => { a.cancel(); b.cancel(); };
  }, [hot, phase, reduced]);

  const onPointer = (event: PointerEvent<HTMLElement>) => {
    if (reduced || !finePointer()) return;
    const stage = stageRef.current;
    if (!stage) return;
    const r = stage.getBoundingClientRect();
    stage.style.setProperty("--px", (((event.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    stage.style.setProperty("--py", (((event.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };

  const openPreview = (slug: ProjectSlug) => {
    const term = termRefs.current[slug];
    const dialog = dialogRef.current;
    if (!dialog) return;
    const show = () => { flushSync(() => setOpen(slug)); if (!dialog.open) dialog.showModal(); };
    if (!canTransition() || reduced || !term) return show();
    term.style.viewTransitionName = "cs-card";
    document.startViewTransition(() => { term.style.viewTransitionName = ""; show(); });
  };

  const closePreview = () => {
    const dialog = dialogRef.current;
    const term = open ? termRefs.current[open] : null;
    if (!dialog) return;
    const hide = () => { dialog.close(); flushSync(() => setOpen(null)); };
    if (!canTransition() || reduced || !term) return hide();
    const vt = document.startViewTransition(() => { hide(); term.style.viewTransitionName = "cs-card"; });
    vt.finished.finally(() => { term.style.viewTransitionName = ""; });
  };

  const preview = open ? projects[open] : null;
  const { links } = identity;

  return (
    <div className="cs" data-phase={phase} data-reduced={reduced} data-hot={hot ?? undefined}>
      <a className="skip" href="#cs-work">Skip to selected work</a>
      <header className="cs-top">
        <div className="cs-id">
          <a className="cs-id-name" href="#top">Raimbek Alish</a>
          <p className="cs-id-meta">{identity.study}, {identity.school}<br />{identity.graduation}</p>
        </div>
        <p className="cs-status"><i aria-hidden="true" />{identity.seeking}</p>
        <nav className="cs-links" aria-label="Résumé and contact">
          <a href={links.resume}>Résumé <span aria-hidden="true">↗</span></a>
          <a href={links.github}>GitHub <span aria-hidden="true">↗</span></a>
          <a href={`mailto:${links.email}`}>Email</a>
        </nav>
      </header>

      <main>
        <section className="cs-stage" id="top" ref={stageRef} aria-labelledby="cs-name" onPointerMove={onPointer}>
          <svg className="cs-graticule" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 100 80">
            {Array.from({ length: 11 }, (_, i) => <line key={`v${i}`} x1={i * 10} x2={i * 10} y1="0" y2="80" />)}
            {Array.from({ length: 9 }, (_, i) => <line key={`h${i}`} x1="0" x2="100" y1={i * 10} y2={i * 10} />)}
            <line className="cs-axis" x1="50" x2="50" y1="0" y2="80" />
            <line className="cs-axis" x1="0" x2="100" y1="40" y2="40" />
          </svg>

          {geom && (
            <svg className="cs-trace-layer" width={geom.w} height={geom.h} viewBox={`0 0 ${geom.w} ${geom.h}`} aria-hidden="true">
              <path ref={traceRef} className="cs-trace" d={geom.trace} />
            </svg>
          )}

          <h1 className="cs-name" id="cs-name">
            <span className="sr-only">{identity.name}</span>
            <span className="cs-line cs-line--1" ref={line1Ref} aria-hidden="true">
              <span className="cs-outline">{letters("RAIMBEK")}</span>
              <span className="cs-fill" ref={(el) => { fillRefs.current[0] = el; }}>{letters("RAIMBEK")}</span>
            </span>
            <span className="cs-line cs-line--2" ref={line2Ref} aria-hidden="true">
              <span className="cs-outline">{letters("ALISH")}<span className="cs-slot" /></span>
              <span className="cs-fill" ref={(el) => { fillRefs.current[1] = el; }}>{letters("ALISH")}<span className="cs-period" ref={slotRef} /></span>
            </span>
          </h1>

          {geom && (
            <svg className="cs-front-layer" width={geom.w} height={geom.h} viewBox={`0 0 ${geom.w} ${geom.h}`} aria-hidden="true">
              {featured.map((slug) => (
                <path key={slug} ref={(el) => { branchRefs.current[slug] = el; }} className={hot === slug ? "cs-branch is-hot" : "cs-branch"} d={geom.branches[slug] ?? ""} />
              ))}
            </svg>
          )}
          <span className="cs-scan" ref={scanRef} aria-hidden="true" style={geom ? { top: geom.band[0], height: geom.band[1] - geom.band[0] } : undefined} />
          <span className="cs-head" ref={headRef} aria-hidden="true" />
          {geom && <span className="cs-tag cs-tag--in" aria-hidden="true" style={{ left: geom.inputTag[0], top: geom.inputTag[1] }}>CH1 · Input</span>}

          <div className="cs-aside" ref={asideRef}>
            <p className="cs-statement">{identity.statement}</p>
            <div className="cs-ctas">
              <a className="cs-btn cs-btn--primary" href={links.resume}>Résumé (PDF) <span aria-hidden="true">↗</span></a>
              <a className="cs-btn" href={`mailto:${links.email}`}>Email me</a>
            </div>
          </div>

          <div className="cs-out">
            <p className="cs-tag cs-tag--out" ref={outTagRef} aria-hidden="true">Output · selected work</p>
            <ol className="cs-terminals" aria-label="Selected work">
              {featured.map((slug, i) => {
                const p = projects[slug];
                return (
                  <li key={slug} style={{ "--t": i } as CSSProperties}>
                    <button
                      type="button"
                      className="cs-term"
                      data-slug={slug}
                      ref={(el) => { termRefs.current[slug] = el; }}
                      aria-haspopup="dialog"
                      onPointerEnter={() => setHot(slug)}
                      onPointerLeave={() => setHot(null)}
                      onFocus={() => setHot(slug)}
                      onBlur={() => setHot(null)}
                      onClick={() => openPreview(slug)}
                    >
                      <span className="cs-term-port" aria-hidden="true" />
                      <span className="cs-term-meta"><span aria-hidden="true">{pad(i + 1)}</span>{p.kind}</span>
                      <span className="cs-term-title">{p.title}</span>
                      <span className="cs-term-note" data-award={p.award}>{p.note}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <section className="cs-next" id="cs-work" aria-labelledby="cs-next-title">
          <h2 id="cs-next-title">Selected work</h2>
          <ol>
            {featured.map((slug, i) => {
              const p = projects[slug];
              return (
                <li key={slug} id={slug}>
                  <span className="cs-next-num" aria-hidden="true">{pad(i + 1)}</span>
                  <div>
                    <h3>{p.title}</h3>
                    <p className="cs-next-context">{p.kind} · {p.context}{p.award ? ` · ${p.note}` : ""}</p>
                  </div>
                  <p>{p.summary}</p>
                </li>
              );
            })}
          </ol>
        </section>
      </main>

      <dialog className="cs-preview" ref={dialogRef} aria-labelledby="cs-preview-title" onClose={() => setOpen(null)}>
        {preview && (
          <article className="cs-card">
            <header className="cs-card-head">
              <p>{preview.kind} · {preview.context}</p>
              <button type="button" className="cs-close" onClick={closePreview}>Close <span aria-hidden="true">×</span></button>
            </header>
            <h2 id="cs-preview-title">{preview.title}</h2>
            {preview.award && <p className="cs-card-award">{preview.note}</p>}
            <p className="cs-card-summary">{preview.summary}</p>
            <ol className="cs-flow" aria-label="How the system works">
              {preview.lanes.map((lane, l) => (
                <li key={l} style={{ "--l": l } as CSSProperties}>
                  <span><small>Input</small>{lane.input}</span>
                  <span aria-hidden="true" className="cs-flow-wire" />
                  <span className="cs-flow-sys"><small>System</small>{lane.system}</span>
                  <span aria-hidden="true" className="cs-flow-wire" />
                  <span><small>Outcome</small>{lane.outcome}</span>
                </li>
              ))}
            </ol>
            <p className="cs-card-role"><span>My part</span>{preview.role}</p>
          </article>
        )}
      </dialog>
    </div>
  );
}

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { Play, Square } from "lucide-react";
import type { Service } from "../../content/rfinance";
import { centerX, centerY, relativeBox, roundedPath, type Point } from "../geometry";
import { useMediaQuery } from "../hooks";
import { drawKeyframes, duration, easing, pathKeyframes, useMotion } from "../motion";

/** The connector through the station nodes, split into one segment per hop: in, between stations, out. */
type Geometry = { w: number; h: number; line: string; segments: string[]; ends: [Point, Point]; arrow: string };

const pad = (n: number) => String(n).padStart(2, "0");

type Props = { service: Service; sheet: number; sheets: number };

/**
 * One R-Finance service as a conceptual drawing: its stations in order, joined by one line. "Trace"
 * sends the signal through the drawing, station by station, and narrates each stop. On wide screens
 * every station's text is always visible and the trace only adds order and emphasis. On tablets and phones the
 * drawing stays a row of numbered stops, and one station card shows the chosen or traced stop; the
 * other cards stay in the document, transparent, so screen readers still read every station.
 */
export default function ServiceSheet({ service, sheet, sheets }: Props) {
  const { reduced } = useMotion();
  // Below 1024px the sheet is too narrow for the stations to stand in a row with their text, so the
  // drawing becomes a row of numbered stops with one station card (tablets and phones).
  const compact = useMediaQuery("(max-width: 1023px)");
  /** The station shown on phones when no trace is running. */
  const [selected, setSelected] = useState(0);
  const stepRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const drawingRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLElement | null)[]>([]);
  const segmentRefs = useRef<(SVGPathElement | null)[]>([]);
  const signalRef = useRef<HTMLSpanElement>(null);
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  /** -1 before the first station; stations.length once the trace has left the drawing. */
  const [step, setStep] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const cancelRun = useRef<(() => void) | null>(null);
  /** The latest trace's animations; the inked hops keep their final frame until the next trace. */
  const anims = useRef<Animation[]>([]);
  const { stations } = service;
  const last = stations.length;

  const measure = useCallback(() => {
    const drawing = drawingRef.current;
    const nodes = nodeRefs.current.slice(0, stations.length);
    if (!drawing || nodes.some((n) => !n)) return;
    const origin = drawing.getBoundingClientRect();
    const points = nodes.map((n): Point => {
      const box = relativeBox(n!.getBoundingClientRect(), origin);
      return [centerX(box), centerY(box)];
    });
    // A row when the nodes share a line, otherwise a column down the left.
    const row = points.every(([, y]) => Math.abs(y - points[0][1]) < 2);
    const first = points[0], end = points[points.length - 1];
    const start: Point = row ? [0, first[1]] : [first[0], 0];
    const finish: Point = row ? [origin.width, end[1]] : [end[0], origin.height];
    const route = [start, ...points, finish];
    const [fx, fy] = finish;
    // An arrowhead where the line leaves the drawing: the direction a request travels.
    const arrow = row ? `M${fx - 8} ${fy - 4.5} L${fx} ${fy} L${fx - 8} ${fy + 4.5}` : `M${fx - 4.5} ${fy - 8} L${fx} ${fy} L${fx + 4.5} ${fy - 8}`;
    setGeometry({
      w: origin.width,
      h: origin.height,
      line: roundedPath(route, 6),
      segments: route.slice(1).map((p, i) => roundedPath([route[i], p], 6)),
      ends: [start, finish],
      arrow,
    });
  }, [stations.length]);

  const stop = useCallback(() => {
    cancelRun.current?.();
    cancelRun.current = null;
    anims.current.forEach((a) => a.cancel());
    anims.current = [];
    setRunning(false);
  }, []);

  useLayoutEffect(() => { measure(); }, [measure, compact]);
  useEffect(() => {
    const drawing = drawingRef.current;
    if (!drawing) return;
    let frame = 0;
    // A layout change mid-trace would leave the signal off the line, so it ends the trace.
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => { stop(); setStep(null); measure(); });
    });
    observer.observe(drawing);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [measure, stop, compact]);
  useEffect(() => stop, [stop]);

  const trace = () => {
    stop();
    const signal = signalRef.current;
    const segments = segmentRefs.current.slice(0, last + 1);
    if (!signal || segments.some((s) => !s)) return;
    let cancelled = false;
    let timer = 0;
    cancelRun.current = () => { cancelled = true; clearTimeout(timer); };
    setRunning(true);
    setStep(-1);
    const wait = (ms: number) => new Promise<void>((resolve) => { timer = window.setTimeout(resolve, ms); });
    const place = (path: SVGPathElement) => {
      const p = path.getPointAtLength(path.getTotalLength());
      signal.style.transform = `translate(${p.x}px, ${p.y}px)`;
    };
    // Moves the signal along one hop and inks the hop behind it. With reduced motion it jumps.
    const hop = async (path: SVGPathElement) => {
      if (reduced) { place(path); path.style.strokeDashoffset = "0"; return; }
      const timing: KeyframeAnimationOptions = { duration: duration.traceMove, easing: easing.draw, fill: "forwards" };
      const move = signal.animate(pathKeyframes(path, 40), timing);
      anims.current.push(move, path.animate(drawKeyframes(path, 1), timing));
      await move.finished;
      place(path);
      move.cancel();
    };
    segments.forEach((s) => { s!.style.strokeDasharray = `${s!.getTotalLength()} ${s!.getTotalLength()}`; s!.style.strokeDashoffset = `${s!.getTotalLength()}`; });
    const [start] = geometry ? geometry.ends : [[0, 0] as Point];
    signal.style.transform = `translate(${start[0]}px, ${start[1]}px)`;
    (async () => {
      for (let i = 0; i <= last; i++) {
        await hop(segments[i]!);
        if (cancelled) return;
        setStep(i);
        if (i < last) setSelected(i);
        if (i < last) await wait(duration.traceDwell);
        if (cancelled) return;
      }
      setRunning(false);
      cancelRun.current = null;
    })().catch(() => { /* cancelled */ });
  };

  const reset = step === null;
  const done = step !== null && step >= last;
  const narration = step === null || step < 0 ? "" : step >= last
    ? `Trace complete: from ${stations[0].name.toLowerCase()} to ${stations[last - 1].name.toLowerCase()}.`
    : `Step ${step + 1} of ${last}: ${stations[step].name}. ${stations[step].detail}${stations[step].checks ? ` ${stations[step].checks!.join(", ")}.` : ""}${stations[step].note ? ` ${stations[step].note}` : ""}`;
  const readout = step === null || step < 0 ? (running ? "Signal in" : compact ? "Tap a stop, or trace" : "Ready") : step >= last ? `${service.subject === "question" ? "Answer" : "Response"} out` : `${pad(step + 1)} / ${pad(last)} · ${stations[step].name}`;
  const stateOf = (i: number) => (step === null || step < i ? "idle" : step === i && running ? "active" : "passed");
  const traceButton = (
    <button type="button" className="sp-sheet-trace" onClick={running ? () => { stop(); setStep(null); } : trace}>
      {running ? <Square aria-hidden="true" strokeWidth={1.75} /> : <Play aria-hidden="true" strokeWidth={1.75} />}
      {running ? "Stop trace" : done ? "Trace again" : `Trace a ${service.subject}`}
    </button>
  );
  const choose = (i: number, focus = false) => {
    if (running) { stop(); setStep(null); }
    setSelected(i);
    if (focus) stepRefs.current[i]?.focus();
  };
  const onStepKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const next = ({ ArrowRight: Math.min(last - 1, selected + 1), ArrowLeft: Math.max(0, selected - 1), Home: 0, End: last - 1 } as Record<string, number>)[event.key];
    if (next === undefined) return;
    event.preventDefault();
    choose(next, true);
  };

  if (compact) {
    return (
      <article className="sp-sheet" data-layout="steps" id={`r-finance-${service.id}`} aria-labelledby={`sp-sheet-${service.id}`} data-trace={reset ? "idle" : running ? "running" : done ? "done" : "idle"}>
        <header className="sp-sheet-head">
          <p className="sp-sheet-key" aria-hidden="true">{service.key}</p>
          <p className="sp-sheet-discipline sp-st-label">{service.discipline}</p>
          <h3 className="sp-sheet-title" id={`sp-sheet-${service.id}`}>{service.name}</h3>
          <p className="sp-sheet-statement">{service.statement}</p>
        </header>

        <p className="sp-sheet-tag">Conceptual drawing, not the product interface</p>
        <div className="sp-steps" ref={drawingRef}>
          <div className="sp-steps-row" role="group" aria-label={`${service.subject === "question" ? "Question" : "Request"} path, ${last} stops`}>
            {stations.map((station, i) => (
              <div key={station.id} className="sp-step-slot">
                {station.source && <span className="sp-step-source" aria-hidden="true">{station.source}</span>}
                <button
                  type="button"
                  className="sp-step"
                  ref={(el) => { stepRefs.current[i] = el; nodeRefs.current[i] = el; }}
                  data-state={running || done ? stateOf(i) : i === selected ? "active" : "idle"}
                  aria-current={i === selected ? "step" : undefined}
                  aria-label={`Stop ${i + 1} of ${last}: ${station.name}`}
                  tabIndex={i === selected ? 0 : -1}
                  onClick={() => choose(i)}
                  onKeyDown={onStepKey}
                >
                  {pad(i + 1)}
                </button>
              </div>
            ))}
          </div>
          {geometry && (
            <svg className="sp-route-lines" width={geometry.w} height={geometry.h} viewBox={`0 0 ${geometry.w} ${geometry.h}`} aria-hidden="true" focusable="false">
              <path className="sp-route-line" d={geometry.line} />
              <path className="sp-route-line" d={geometry.arrow} />
              {geometry.segments.map((d, i) => (
                <path key={i} className="sp-route-ink" ref={(el) => { segmentRefs.current[i] = el; }} d={d} />
              ))}
            </svg>
          )}
          <span className="sp-route-signal" ref={signalRef} aria-hidden="true" />
        </div>

        <ol className="sp-step-cards">
          {stations.map((station, i) => (
            <li key={station.id} className="sp-step-card" data-active={i === selected}>
              <h4 className="sp-stop-name">{station.name}</h4>
              <p className="sp-stop-meta">{station.meta}</p>
              <p className="sp-stop-detail">{station.detail}</p>
              {station.checks && (
                <ul className="sp-stop-checks">
                  {station.checks.map((check) => <li key={check}>{check}</li>)}
                </ul>
              )}
              {station.note && <p className="sp-stop-note">{station.note}</p>}
            </li>
          ))}
        </ol>

        <div className="sp-sheet-control">
          {traceButton}
          <p className="sp-trace-readout" aria-hidden="true">{readout}</p>
          <p className="sp-sr" aria-live="polite">{narration}</p>
        </div>
        {(service.delivery || service.notes.length > 0) && (
          <div className="sp-sheet-notes">
            {service.delivery && <p><span className="sp-st-label">Delivery</span>{service.delivery.join(" · ")}</p>}
            {service.notes.map((note) => <p key={note}>{note}</p>)}
          </div>
        )}
      </article>
    );
  }

  return (
    <article className="sp-sheet" id={`r-finance-${service.id}`} aria-labelledby={`sp-sheet-${service.id}`} data-trace={reset ? "idle" : running ? "running" : done ? "done" : "idle"}>
      <header className="sp-sheet-head">
        <p className="sp-sheet-key" aria-hidden="true">{service.key}</p>
        <p className="sp-sheet-discipline sp-st-label">{service.discipline}</p>
        <h3 className="sp-sheet-title" id={`sp-sheet-${service.id}`}>{service.name}</h3>
        <p className="sp-sheet-statement">{service.statement}</p>
      </header>

      <div className="sp-sheet-drawing" ref={drawingRef}>
        <ol className="sp-route" data-count={stations.length}>
          {stations.map((station, i) => (
            <li
              key={station.id}
              className="sp-stop"
              data-state={stateOf(i)}
            >
              <span className="sp-stop-num" aria-hidden="true">{pad(i + 1)}</span>
              <i className="sp-stop-node" ref={(el) => { nodeRefs.current[i] = el; }} aria-hidden="true" />
              <div className="sp-stop-body">
                <h4 className="sp-stop-name">{station.name}</h4>
                <p className="sp-stop-meta">{station.meta}</p>
                <p className="sp-stop-detail">{station.detail}</p>
                {station.checks && (
                  <ul className="sp-stop-checks">
                    {station.checks.map((check) => <li key={check}>{check}</li>)}
                  </ul>
                )}
                {station.note && <p className="sp-stop-note">{station.note}</p>}
              </div>
            </li>
          ))}
        </ol>
        {geometry && (
          <svg className="sp-route-lines" width={geometry.w} height={geometry.h} viewBox={`0 0 ${geometry.w} ${geometry.h}`} aria-hidden="true" focusable="false">
            <path className="sp-route-line" d={geometry.line} />
            <path className="sp-route-line" d={geometry.arrow} />
            {geometry.segments.map((d, i) => (
              <path key={i} className="sp-route-ink" ref={(el) => { segmentRefs.current[i] = el; }} d={d} />
            ))}
          </svg>
        )}
        <span className="sp-route-signal" ref={signalRef} aria-hidden="true" />
      </div>

      <footer className="sp-sheet-foot">
        <div className="sp-sheet-control">
          {traceButton}
          <p className="sp-trace-readout" aria-hidden="true">{readout}</p>
          <p className="sp-sr" aria-live="polite">{narration}</p>
        </div>
        {(service.delivery || service.notes.length > 0) && (
          <div className="sp-sheet-notes">
            {service.delivery && <p><span className="sp-st-label">Delivery</span>{service.delivery.join(" · ")}</p>}
            {service.notes.map((note) => <p key={note}>{note}</p>)}
          </div>
        )}
        <p className="sp-titleblock">
          <span>Sheet {service.key} · {sheet} of {sheets}</span>
          <span>Conceptual drawing, not the product interface</span>
          <span>Internal work · no public source</span>
        </p>
      </footer>
    </article>
  );
}

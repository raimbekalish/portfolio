import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Play } from "lucide-react";
import { deadlineMs, deadlineReading, run400, run80, validation, type RecordedRun } from "../../../content/faultline";
import { useReducedMotion } from "../../shared/motion";
import { Axis } from "../sections/Hero";
import { at, ms, SPAN_MS } from "../scale";
import { Cite, EvidenceTag } from "../ui";
import "./deadline.css";

type RunId = "80" | "400";
const runs: Record<RunId, RecordedRun> = { "80": run80, "400": run400 };
/** The replay's pace: every recorded millisecond takes four on screen. */
const SLOWER = 4;

const phase = (run: RecordedRun, id: "baseline" | "fault" | "recovery") => run.phases.find((p) => p.id === id)!;
const isCut = (run: RecordedRun) => run.injectedMs > deadlineMs;

type Segment = { kind: "request" | "wait" | "hold" | "unwaited" | "point"; from: number; to: number };
type Lane = { id: string; name: string; role: string; segments: Segment[]; end?: { at: number; text: string }; tone?: "pass" | "fault" };

/**
 * What one request goes through in a run, lane by lane. The latency and the deadline are the run's
 * configuration, the runner's end is the recorded fault-phase mean, and the moments in between follow
 * the mechanism the source describes.
 */
function lanes(run: RecordedRun): Lane[] {
  const fault = phase(run, "fault");
  const cut = isCut(run);
  const waited = Math.min(run.injectedMs, deadlineMs);
  return [
    {
      id: "runner",
      name: "Runner",
      role: "Sends the request and times it",
      segments: [{ kind: "request", from: 0, to: fault.meanMs }],
      end: { at: fault.meanMs, text: `${cut ? "HTTP 504" : "2xx"} · ${ms(fault.meanMs)} mean` },
      tone: cut ? "fault" : "pass",
    },
    {
      id: "frontend",
      name: "Frontend",
      role: `Waits for the dependency, ${deadlineMs} ms at most`,
      segments: [{ kind: "wait", from: 0, to: waited }],
      end: { at: waited, text: cut ? "Gives up, answers 504" : "Reply arrives, answers 2xx" },
      tone: cut ? "fault" : undefined,
    },
    {
      id: "proxy",
      name: "Toxiproxy",
      role: `Holds the dependency’s reply for ${run.injectedMs} ms`,
      segments: cut
        ? [{ kind: "hold", from: 0, to: deadlineMs }, { kind: "unwaited", from: deadlineMs, to: run.injectedMs }]
        : [{ kind: "hold", from: 0, to: run.injectedMs }],
      end: cut ? { at: deadlineMs, text: "Never waited for" } : undefined,
    },
    {
      id: "dependency",
      name: "Dependency",
      role: "Answers at once with a constant JSON value",
      segments: [{ kind: "point", from: 0, to: 0 }],
    },
  ];
}

function summary(run: RecordedRun) {
  const fault = phase(run, "fault");
  const recovery = phase(run, "recovery");
  const result = isCut(run)
    ? `The ${deadlineMs} ms deadline fired first: ${fault.failed} of ${run.requests} requests failed with HTTP 504, at a mean of ${ms(fault.meanMs)}.`
    : `The reply arrived before the ${deadlineMs} ms deadline: none of ${run.requests} requests failed, at a mean of ${ms(fault.meanMs)}.`;
  return `${run.injectedMs} ms injected. ${result} Recovery: ${ms(recovery.meanMs)} mean, none failed.`;
}

const place = (from: number, to: number) => ({ "--from": at(from), "--to": at(to) }) as CSSProperties;

/**
 * Where the deadline cuts: one request through the sample topology in either recorded run, on a
 * millisecond scale. The diagram is complete at rest. Choosing a run, or the replay button, sweeps its
 * marks in once from 0 ms at a quarter of the real speed, lighting each outcome as the cursor reaches
 * it, then the three phases in order; every label stays readable throughout. With reduced motion
 * nothing moves and there is no replay.
 */
export default function DeadlineCut() {
  const reduced = useReducedMotion();
  const [id, setId] = useState<RunId>("400");
  const [announced, setAnnounced] = useState("");
  const figure = useRef<HTMLElement>(null);
  const playing = useRef<Animation[]>([]);
  const pending = useRef(false);
  const run = runs[id];
  const cut = isCut(run);

  const stop = () => {
    playing.current.forEach((a) => a.cancel());
    playing.current = [];
  };

  const play = () => {
    const root = figure.current;
    if (!root || reduced) return;
    stop();
    const sweep = SPAN_MS * SLOWER;
    const time = (atMs: number) => atMs * SLOWER;
    const each = (selector: string, frames: Keyframe[], options: (el: HTMLElement, i: number) => KeyframeAnimationOptions) =>
      root.querySelectorAll<HTMLElement>(selector).forEach((el, i) => {
        playing.current.push(el.animate(frames, options(el, i)));
      });
    // The marks appear behind a cursor moving at a constant pace; the text stays readable throughout.
    each(".fl-dc-ink", [{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)" }], () => ({ duration: sweep, easing: "linear" }));
    each(".fl-dc-cursor", [{ left: "0%", opacity: 1 }, { left: "100%", opacity: 1 }], () => ({ duration: sweep, easing: "linear" }));
    // Each lane's outcome stays readable throughout; it lights up as the cursor reaches it.
    each("[data-at]", [{ backgroundColor: "var(--fl-strip)" }, { backgroundColor: "var(--fl-select)" }, { backgroundColor: "var(--fl-strip)" }], (el) => ({
      duration: 700,
      delay: time(Number(el.dataset.at)),
      easing: "ease-out",
    }));
    // In the 400 ms run the deadline fires; in the 80 ms run it passes unremarked.
    if (cut) {
      each(".fl-dc-dl", [{ opacity: 1, transform: "scaleX(1)" }, { opacity: 1, transform: "scaleX(3)" }, { opacity: 1, transform: "scaleX(1)" }], () => ({
        duration: 600,
        delay: time(deadlineMs),
        easing: "ease-out",
      }));
    }
    // Then the three phases in order, recovery last.
    each(".fl-dc-phase", [{ backgroundColor: "var(--fl-select)" }, { backgroundColor: "transparent" }], (_, i) => ({
      duration: 560,
      delay: sweep + i * 260,
      easing: "ease-out",
    }));
  };

  // Play once a newly chosen run has rendered; never on the first render.
  useEffect(() => {
    if (!pending.current) return;
    pending.current = false;
    play();
  }, [id]);
  useEffect(() => stop, []);

  const choose = (next: RunId) => {
    if (next === id) return;
    pending.current = !reduced;
    setId(next);
    setAnnounced(summary(runs[next]));
  };

  return (
    <figure className="fl-dc" ref={figure} data-cut={cut} aria-labelledby="fl-dc-cap">
      <figcaption className="fl-dc-cap" id="fl-dc-cap">One request, in either recorded run</figcaption>
      <div className="fl-dc-head">
        <fieldset className="fl-dc-runs">
          <legend className="sp-st-label">Recorded run</legend>
          <div className="fl-dc-options">
            {(["80", "400"] as RunId[]).map((key) => (
              <label key={key}>
                <input type="radio" name="fl-dc-run" value={key} checked={id === key} onChange={() => choose(key)} />
                <span>
                  <b>{runs[key].injectedMs} ms injected</b>
                  <small>{isCut(runs[key]) ? "Above the deadline" : "Below the deadline"}</small>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        {!reduced && (
          <p className="fl-dc-replay">
            <button type="button" onClick={play} aria-describedby="fl-dc-replay-note">
              <Play aria-hidden="true" strokeWidth={1.75} /> Replay the recorded timing
            </button>
            <span id="fl-dc-replay-note">At a quarter of the real speed. Nothing runs in your browser.</span>
          </p>
        )}
      </div>

      <p className="fl-dc-conditions">
        <span>{run.bundle.file}</span>
        <span>{run.injectedMs} ms latency, zero jitter</span>
        <span>Tracing {run.tracing ? "on" : "off"}</span>
        <span>{run.requests} sequential requests per phase</span>
        <span>Commit {validation.revision}</span>
      </p>

      <div className="fl-dc-plot">
        <Axis />
        <ol className="fl-dc-lanes">
          {lanes(run).map((lane) => (
            <li key={lane.id} className="fl-dc-lane" data-lane={lane.id} data-tone={lane.tone}>
              <span className="fl-dc-lane-head">
                <b>{lane.name}</b> <span>{lane.role}</span>
              </span>
              <span className="fl-dc-track">
                <i className="fl-dc-dl" style={{ "--f": at(deadlineMs) } as CSSProperties} aria-hidden="true" />
                <span className="fl-dc-ink" aria-hidden="true">
                  {lane.segments.map((s) => <i key={s.kind} className="fl-dc-seg" data-kind={s.kind} style={place(s.from, s.to)} />)}
                  {lane.id === "frontend" && cut && <i className="fl-dc-x" style={place(deadlineMs, deadlineMs)} />}
                </span>
                {lane.end && (
                  <span className="fl-dc-end" data-at={lane.end.at} style={{ ...place(lane.end.at, lane.end.at), "--len": lane.end.text.length } as CSSProperties}>
                    {lane.end.text}
                  </span>
                )}
                <i className="fl-dc-cursor" aria-hidden="true" />
              </span>
            </li>
          ))}
        </ol>
        <p className="fl-dc-dl-label" style={{ "--f": at(deadlineMs) } as CSSProperties} aria-hidden="true">
          <span>Deadline · {deadlineMs} ms{cut ? "" : ", not reached"}</span>
        </p>
      </div>

      <ol className="fl-dc-phases" aria-label={`Phases of the ${run.injectedMs} ms run`}>
        {run.phases.map((p) => (
          <li key={p.id} className="fl-dc-phase" data-phase={p.id} data-failed={p.failed > 0}>
            <span className="fl-dc-phase-name">
              {p.id === "fault" ? `Fault · +${run.injectedMs} ms` : p.id === "recovery" ? "Recovery · latency removed" : "Baseline"}
            </span>
            <b>{ms(p.meanMs)} mean</b>
            <span className="fl-dc-phase-count">
              {p.failed} of {run.requests} failed{p.status ? `, HTTP ${p.status}` : ""}
            </span>
            <span className="fl-dc-ticks" aria-hidden="true">
              {Array.from({ length: run.requests }, (_, i) => <i key={i} data-failed={i < p.failed} />)}
            </span>
          </li>
        ))}
      </ol>

      <ul className="fl-dc-legend">
        <li><EvidenceTag kind="recorded" /> Response times and outcomes</li>
        <li><EvidenceTag kind="verified" /> The latency and the deadline, as configured</li>
        <li><EvidenceTag kind="illustration" /> The order of events inside one request</li>
      </ul>
      <p className="sp-sr" aria-live="polite">{announced}</p>
      <p className="fl-dc-source">
        <Cite href={validation.source}>Both runs: docs/validation.md</Cite>
        <Cite href={deadlineReading.mechanism}>The mechanism: docs/reports.md</Cite>
      </p>
    </figure>
  );
}

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";
import type { FaultlineStageId } from "../../content/faultline";
import { faultlineProject as fl } from "../content";
import { useArrival } from "../hooks";
import { useMotion } from "../motion";
import { sectionIds } from "../structure";
import { CaseStudyLink, OutLink, WorkIndex } from "../ui";

const lead = fl.thesis.endsWith(fl.accent) ? fl.thesis.slice(0, -fl.accent.length) : fl.thesis;
const accent = lead === fl.thesis ? "" : fl.accent;

const { run, stages } = fl;
/** The strip's scale, 0 to 460 ms: room above the 400 ms line for its label. */
const TOP = 460;
/** A time as a fraction of the strip's height, for the CSS that places the lines and labels. */
const f = (ms: number) => (ms / TOP).toFixed(4);
/** The same as a y coordinate in the trace's 0–100 viewBox, measured from the top. */
const y = (ms: number) => (100 - (ms / TOP) * 100).toFixed(3);
const ms = (value: number) => `${value.toFixed(2)} ms`;
const number = new Intl.NumberFormat("en-US");
const hash = run.bundle.sha256;
const shortHash = `${hash.slice(0, 8)}…${hash.slice(-5)}`;
const [baseline, fault, recovery] = run.phases;
// The recorded means as one pen line across the three phases; the fault's rise and plateau are drawn again in the fault colour.
const trace = `0,${y(baseline.meanMs)} 100,${y(baseline.meanMs)} 100,${y(fault.meanMs)} 200,${y(fault.meanMs)} 200,${y(recovery.meanMs)} 300,${y(recovery.meanMs)}`;
const rise = `100,${y(baseline.meanMs)} 100,${y(fault.meanMs)} 200,${y(fault.meanMs)}`;

/** The words of a stage's name that phones drop, where the tabs are narrow ("Injected " of "Injected fault"). */
const extra = (name: string, short: string) => (name.toLowerCase().endsWith(short.toLowerCase()) ? name.slice(0, name.length - short.length) : "");

/**
 * Faultline: one recorded run on a recorder strip, run across the page. The strip is complete at
 * rest: the phase means, the frontend's deadline, the injected latency and every request's outcome.
 * The tabs pick the stage the panel below explains: its path, what happened, and the source.
 */
export default function Faultline() {
  const motion = useMotion();
  const figure = useRef<HTMLElement>(null);
  const arrived = useArrival(figure, motion.reveals);
  const [stage, setStage] = useState<FaultlineStageId>("fault");
  const [touched, setTouched] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const index = stages.findIndex((s) => s.id === stage);
  const current = stages[index];

  const choose = (next: number) => {
    setStage(stages[next].id);
    setTouched(true);
  };
  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = stages.length - 1;
    const forward = index === last ? 0 : index + 1, back = index === 0 ? last : index - 1;
    const next = ({ ArrowRight: forward, ArrowDown: forward, ArrowLeft: back, ArrowUp: back, Home: 0, End: last } as Record<string, number>)[event.key];
    if (next === undefined) return;
    event.preventDefault();
    choose(next);
    tabs.current[next]?.focus();
  };

  const draw = !motion.reveals ? "done" : arrived ? "now" : "later";
  const at = (value: number, span?: number) => ({ "--f": f(value), ...(span !== undefined && { "--h": f(span) }) }) as CSSProperties;

  return (
    <section className="sp-fl" id={sectionIds.faultline} aria-labelledby="sp-fl-title">
      <div className="sp-fl-head">
        <header className="sp-fl-intro">
          <p className="sp-kicker"><WorkIndex id={sectionIds.faultline} /> — {fl.kind} · <span className="sp-nowrap">{fl.authorshipShort}</span></p>
          <h2 className="sp-fl-title" id="sp-fl-title">{fl.name}</h2>
          <p className="sp-fl-thesis">
            {lead}
            {accent && <em>{accent}</em>}
          </p>
        </header>
        <div className="sp-fl-aside">
          <p className="sp-fl-summary">{fl.summary}</p>
          <p className="sp-fl-status">{fl.status}</p>
          <p className="sp-fl-links">
            <CaseStudyLink className="sp-fl-cta" href={fl.caseStudy} section={sectionIds.faultline}>
              Read the case study <ArrowRight aria-hidden="true" strokeWidth={1.75} />
            </CaseStudyLink>
            <OutLink href={fl.source}>Source</OutLink>
            <OutLink href={fl.demo}>Demo video</OutLink>
            <OutLink href={fl.release.url}>Release {fl.release.tag}</OutLink>
            {/* A separator stays with the word before it, so a wrapped line never starts with one. */}
            <span className="sp-fl-stack">{fl.stack.join("\u00A0· ")}</span>
          </p>
        </div>
      </div>

      <figure className="sp-fl-figure" ref={figure} aria-labelledby="sp-fl-cap">
        <figcaption className="sp-fl-cap" id="sp-fl-cap">
          {run.conditions.map((c) => <span key={c}>{c}</span>)}
          <span>Not a benchmark</span>
        </figcaption>

        <div className="sp-fl-strip" data-stage={stage}>
          <div className="sp-fl-tabs" role="tablist" aria-label="Stages of the recorded run">
            {stages.map((s, i) => {
              const dropped = extra(s.name, s.short);
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  className="sp-fl-tab"
                  id={`sp-fl-tab-${s.id}`}
                  data-stage={s.id}
                  aria-selected={s.id === stage}
                  aria-controls={s.id === stage ? "sp-fl-panel" : undefined}
                  tabIndex={s.id === stage ? 0 : -1}
                  ref={(el) => { tabs.current[i] = el; }}
                  onClick={() => choose(i)}
                  onKeyDown={onTabKey}
                >
                  <span className="sp-fl-tab-n">{String(i + 1).padStart(2, "0")}</span>{" "}
                  <span className="sp-fl-tab-name">
                    {dropped && <span className="sp-fl-tab-extra">{dropped}</span>}
                    {s.name.slice(dropped.length)}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="sp-fl-plot" data-draw={draw} aria-hidden="true">
            <div className="sp-fl-record" style={{ "--fl-step": `${(5000 / TOP).toFixed(3)}%` } as CSSProperties}>
              {run.phases.map((p) => (
                <div key={p.id} className="sp-fl-col" data-phase={p.id} data-on={p.id === stage}>
                  <div className="sp-fl-area">
                    {p.id === "baseline" && <span className="sp-fl-label sp-fl-label--deadline" style={at(run.deadlineMs)}>{run.deadlineMs} ms deadline</span>}
                    {p.id === "fault" && (
                      <>
                        <i className="sp-fl-censor" style={at(run.deadlineMs, run.injectedMs - run.deadlineMs)}>
                          <span>Censored by the deadline</span>
                        </i>
                        <i className="sp-fl-injected" style={at(run.injectedMs)} />
                        <span className="sp-fl-label sp-fl-label--injected" style={at(run.injectedMs)}>+{run.injectedMs} ms injected</span>
                      </>
                    )}
                    <span className="sp-fl-label sp-fl-mean" style={at(p.meanMs)}>{ms(p.meanMs)}</span>
                  </div>
                  <div className="sp-fl-out">
                    <ol className="sp-fl-marks">
                      {Array.from({ length: run.requests }, (_, i) => (
                        <li key={i} data-failed={i < p.failed}>{i < p.failed && p.status}</li>
                      ))}
                    </ol>
                    <span className="sp-fl-count">{p.failed} / {run.requests} failed{p.status ? ` · HTTP ${p.status}` : ""}</span>
                  </div>
                </div>
              ))}
              <i className="sp-fl-deadline" style={at(run.deadlineMs)} />
              <svg className="sp-fl-trace" viewBox="0 0 300 100" preserveAspectRatio="none" focusable="false">
                <polyline points={trace} />
                <polyline className="sp-fl-rise" points={rise} />
              </svg>
              {draw !== "done" && <i className="sp-fl-cover" />}
            </div>
            <div className="sp-fl-tag" data-on={stage === "evidence"}>
              <span className="sp-fl-tag-file">.flb</span>
              <span>{number.format(run.bundle.bytes)} bytes</span>
              <span className="sp-fl-tag-hash">SHA-256 <span>{shortHash}</span></span>
              <span className="sp-fl-tag-check">Checked offline</span>
            </div>
          </div>

          <table className="sp-sr">
            <caption>Phase means and failed requests in the recorded run</caption>
            <thead>
              <tr><th scope="col">Phase</th><th scope="col">Mean request time</th><th scope="col">Failed requests</th></tr>
            </thead>
            <tbody>
              {run.phases.map((p) => (
                <tr key={p.id}>
                  <th scope="row">{p.name}</th>
                  <td>{ms(p.meanMs)}</td>
                  <td>{p.failed} of {run.requests}{p.status ? `, HTTP ${p.status}` : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sp-fl-panel" role="tabpanel" id="sp-fl-panel" aria-labelledby={`sp-fl-tab-${stage}`}>
          <div key={stage} className="sp-fl-panel-in" data-enter={touched}>
            <div className="sp-fl-path-wrap">
              <p className="sp-st-label">{current.pathLabel}</p>
              <ol className="sp-fl-path">
                {current.hops.map((h, i) => (
                  <li key={h.name} className="sp-fl-hop" data-tone={h.tone} data-link={i > 0 ? current.links[i - 1] : undefined}>
                    <i className="sp-fl-node" aria-hidden="true" />
                    <span className="sp-fl-hop-name">{h.name}</span>
                    <span className="sp-fl-hop-note">{h.note}</span>
                  </li>
                ))}
              </ol>
            </div>
            <h3 className="sp-fl-stage-title">{current.title}</h3>
            <p className="sp-fl-stage-body">
              {current.body}{" "}
              <OutLink className="sp-fl-cite" href={current.source}>Source: {current.sourceLabel}</OutLink>
            </p>
            {current.id === "evidence" && (
              <p className="sp-fl-hash"><span className="sp-st-label">SHA-256 · <span className="sp-fl-file">{run.bundle.file}</span></span><code>{hash}</code></p>
            )}
            {current.note && <p className="sp-fl-note">{current.note}</p>}
          </div>
        </div>
      </figure>
    </section>
  );
}

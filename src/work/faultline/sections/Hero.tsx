import type { CSSProperties } from "react";
import { ArrowDown } from "lucide-react";
import { deadlineMs, faultline, intro, run400, run80, type RecordedRun } from "../../../content/faultline";
import { OutLink } from "../../../signal-path/ui";
import { at, ms, ticks } from "../scale";
import { EvidenceTag } from "../ui";

const lead = faultline.thesis.endsWith(faultline.accent) ? faultline.thesis.slice(0, -faultline.accent.length) : faultline.thesis;
const accent = lead === faultline.thesis ? "" : faultline.accent;

const fault = (run: RecordedRun) => run.phases.find((p) => p.id === "fault")!;

/** A millisecond ruler for the run figures: faint ticks every 50 ms, labels every 100 ms. */
export function Axis() {
  return (
    <div className="fl-axis" aria-hidden="true">
      {ticks.map((t) => (
        <span key={t.ms} className="fl-axis-tick" data-major={t.major} style={{ "--f": at(t.ms) } as CSSProperties}>
          {t.major && <span>{t.ms === 400 ? "400 ms" : t.ms}</span>}
        </span>
      ))}
    </div>
  );
}

/**
 * The page's cover: both recorded runs on one ruler. Each bar is the latency the run injected; each
 * tick is the fault phase's recorded mean. Under the deadline the tick follows the bar; past it, the
 * tick stays at the deadline and the rest of the bar is never waited for.
 */
function TwoRuns() {
  return (
    <figure className="fl-runs" aria-labelledby="fl-runs-cap">
      <figcaption className="fl-runs-cap" id="fl-runs-cap">
        <span>Two recorded runs, one deadline</span>
        <EvidenceTag kind="recorded" />
      </figcaption>
      <div className="fl-runs-plot">
        <Axis />
        <ol className="fl-runs-rows">
          {[run80, run400].map((run) => {
            const f = fault(run);
            const cut = run.injectedMs > deadlineMs;
            return (
              <li
                key={run.injectedMs}
                className="fl-runs-row"
                data-cut={cut}
                style={{ "--inj": at(run.injectedMs), "--mean": at(f.meanMs), "--deadline": at(deadlineMs) } as CSSProperties}
              >
                <span className="fl-runs-name">{run.injectedMs} ms injected</span>
                <span className="fl-runs-track">
                  <i className="fl-runs-bar" aria-hidden="true" />
                  <i className="fl-runs-tick" aria-hidden="true" />
                  <span className="fl-runs-result">
                    <b>{f.status ? `HTTP ${f.status}` : "2xx"}</b> {ms(f.meanMs)} mean
                    <span className="fl-runs-count">
                      <span aria-hidden="true"> · </span>
                      {f.failed} of {run.requests} failed
                    </span>
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
        <i className="fl-runs-deadline" style={{ "--f": at(deadlineMs) } as CSSProperties} aria-hidden="true">
          <span>Frontend deadline · {deadlineMs} ms</span>
        </i>
      </div>
      <p className="fl-runs-key">
        Bars: the latency each run injected. Ticks: the recorded mean response time while it was injected. The frontend's deadline is{" "}
        {deadlineMs} ms.
      </p>
    </figure>
  );
}

/** The title, the thesis and the engineering question, then the two runs on one ruler. */
export default function Hero() {
  return (
    <section className="fl-hero" aria-labelledby="fl-title">
      <div className="fl-hero-grid">
        <div className="fl-hero-text">
          <p className="sp-kicker">
            Case study · {intro.kind} · <span className="sp-nowrap">{intro.assisted}</span> · {intro.year}
          </p>
          <h1 className="fl-hero-title" id="fl-title">
            Fault<span className="fl-slip">line</span>
          </h1>
          <p className="fl-hero-thesis">
            {lead}
            {accent && <em>{accent}</em>}
          </p>
        </div>
        <div className="fl-hero-aside">
          <p className="fl-hero-question">{intro.question}</p>
          <p className="fl-hero-summary">{intro.summary}</p>
          <p className="fl-hero-scope">
            <span className="sp-st-label">Scope</span>
            {intro.boundary}
          </p>
          <p className="fl-hero-links">
            <a className="cs-button" href="#deadline">
              See where the deadline cuts <ArrowDown aria-hidden="true" strokeWidth={1.75} />
            </a>
            <OutLink className="sp-text-link" href={faultline.source}>Source on GitHub</OutLink>
            <OutLink className="sp-text-link" href={faultline.release.url}>Release {faultline.release.tag}</OutLink>
            <OutLink className="sp-text-link" href={faultline.demo}>80-second demo</OutLink>
          </p>
        </div>
      </div>
      <TwoRuns />
    </section>
  );
}

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import StepScript from "../../work/reproseed/StepScript";
import { reproseedProject as rs } from "../content";
import { useArrival } from "../hooks";
import { useMotion } from "../motion";
import { sectionIds } from "../structure";
import { CaseStudyLink, OutLink, WorkIndex } from "../ui";

const lead = rs.thesis.endsWith(rs.accent) ? rs.thesis.slice(0, -rs.accent.length) : rs.thesis;
const accent = lead === rs.thesis ? "" : rs.accent;

/**
 * ReproSeed: a test script on the bench, its unneeded steps struck out in blue pencil. A short
 * preview that leads to the case study, where the run can be stepped through.
 */
export default function ReproSeed() {
  const motion = useMotion();
  const figure = useRef<HTMLElement>(null);
  const arrived = useArrival(figure, motion.reveals);
  const { example } = rs;
  const { run } = example;
  return (
    <section className="sp-rs" id={sectionIds.reproseed} aria-labelledby="sp-rs-title">
      <div className="sp-rs-grid">
        <header className="sp-rs-head">
          <p className="sp-kicker"><WorkIndex id={sectionIds.reproseed} /> — {rs.kind} · <span className="sp-nowrap">{rs.authorshipShort}</span></p>
          <h2 className="sp-rs-title" id="sp-rs-title">{rs.name}</h2>
          <p className="sp-rs-thesis">
            {lead}
            {accent && <em>{accent}</em>}
          </p>
          <p className="sp-rs-summary">{rs.summary}</p>
        </header>

        <figure className="sp-rs-figure" ref={figure}>
          <figcaption>
            <span>{example.name}, one recorded run</span>
            <span className="sp-nowrap">{example.steps.length} → {run.kept.length} steps</span>
          </figcaption>
          <StepScript
            steps={example.steps}
            removed={run.removed}
            variant="compact"
            draw={!motion.reveals ? "done" : arrived ? "now" : "later"}
            label={`${example.name} scenario after one recorded run: ${run.kept.length} of ${example.steps.length} steps kept; removed ${run.removed.join(", ")}`}
          />
        </figure>

        <ul className="sp-rs-results">
          <li><b>{run.verify.length} / {run.verify.length}</b> fresh replays reproduce the bug</li>
          <li><b>Red → green</b> the generated test fails on the bug and passes on the fix</li>
        </ul>

        <p className="sp-rs-links">
          <CaseStudyLink className="sp-rs-cta" href={rs.caseStudy} section={sectionIds.reproseed}>
            Read the case study <ArrowRight aria-hidden="true" strokeWidth={1.75} />
          </CaseStudyLink>
          <OutLink href={rs.source}>Source</OutLink>
          <span className="sp-rs-stack">{rs.stack.join(" · ")} · loopback test apps only</span>
        </p>
      </div>
    </section>
  );
}

import { ArrowDown } from "lucide-react";
import { reproseed } from "../../../content/reproseed";
import { duplicate as example } from "../examples";
import { OutLink } from "../../../signal-path/ui";
import StepScript from "../StepScript";
import { EvidenceTag } from "../ui";

const lead = reproseed.thesis.endsWith(reproseed.accent) ? reproseed.thesis.slice(0, -reproseed.accent.length) : reproseed.thesis;
const accent = lead === reproseed.thesis ? "" : reproseed.accent;

/** The title, the thesis, and the scenario after one recorded run: nine steps in, six out. */
export default function Hero() {
  const { run } = example;
  return (
    <section className="rs-hero" aria-labelledby="rs-title">
      <div className="rs-hero-text">
        <p className="sp-kicker">Case study · {reproseed.kind} · {reproseed.year}</p>
        <h1 className="rs-hero-title" id="rs-title">{reproseed.name}</h1>
        <p className="rs-hero-thesis">
          {lead}
          {accent && <em>{accent}</em>}
        </p>
        <p className="rs-hero-summary">{reproseed.summary}</p>
        <p className="rs-hero-links">
          <a className="cs-button" href="#explorer">
            Step through a verified run <ArrowDown aria-hidden="true" strokeWidth={1.75} />
          </a>
          <OutLink className="sp-text-link" href={reproseed.source}>Source on GitHub</OutLink>
        </p>
      </div>

      <figure className="rs-hero-figure">
        <figcaption className="rs-hero-figure-head">
          <span>{example.name} · {example.file.split("/").pop()}</span>
          <EvidenceTag kind="recorded" />
        </figcaption>
        <StepScript
          steps={example.steps}
          removed={run.removed}
          draw="now"
          label={`The ${example.name.toLowerCase()} scenario after one recorded run: ${run.kept.length} of ${example.steps.length} steps kept; removed ${run.removed.join(", ")}`}
        />
        <ul className="rs-results">
          <li><b>{example.steps.length} → {run.kept.length}</b> steps, each one needed</li>
          <li><b>{run.verify.length} / {run.verify.length}</b> fresh replays reproduce the bug</li>
          <li><b>Red → green</b> the generated test fails on the bug and passes on the fix</li>
        </ul>
      </figure>

    </section>
  );
}

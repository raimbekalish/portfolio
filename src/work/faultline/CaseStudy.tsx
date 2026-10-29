import { ArrowDown } from "lucide-react";
import { deadlineMs, faultline, intro, run400, run80 } from "../../content/faultline";
import { OutLink } from "../../signal-path/ui";
import CaseStudyShell from "../shared/CaseStudyShell";
import Overview from "../shared/Overview";
import { Deadline, Experiment, Limits, Records, Recovery, Status } from "./sections/Chapters";
import Hero from "./sections/Hero";
import { ms } from "./scale";
import { chapters } from "./structure";

const fault80 = run80.phases.find((p) => p.id === "fault")!;
const fault400 = run400.phases.find((p) => p.id === "fault")!;

/** The Faultline case study, rendered to static HTML at build time and hydrated in the browser. */
export default function CaseStudy() {
  return (
    <CaseStudyShell className="fl" project={faultline.slug} chapters={chapters} source={{ href: faultline.source, label: "Source on GitHub" }}>
      <Hero />
      <Overview
        conclusion={
          <>
            Below the frontend’s {deadlineMs} ms deadline, injected latency only slows requests: with {run80.injectedMs} ms injected,
            the recorded mean was {ms(fault80.meanMs)} and none of {run80.requests} failed. Above it, the deadline answers first: with{" "}
            {run400.injectedMs} ms injected, all {run400.requests} requests failed with HTTP 504 at a mean of {ms(fault400.meanMs)}. Both runs
            recovered once the latency was removed.
          </>
        }
        actions={
          <>
            <a className="cs-button" href="#deadline">
              See where the deadline cuts <ArrowDown aria-hidden="true" strokeWidth={1.75} />
            </a>
            <OutLink className="sp-text-link" href={faultline.source}>Source on GitHub</OutLink>
            <OutLink className="sp-text-link" href={faultline.demo}>Watch the 80-second demo</OutLink>
          </>
        }
        facts={[
          { label: "Built with", value: faultline.stack.join(" · ") },
          { label: "Scope", value: intro.boundary },
          { label: "Release", value: intro.release },
          { label: "Authorship", value: intro.authorship },
        ]}
        chapters={chapters}
      />
      <Experiment />
      <Deadline />
      <Recovery />
      <Records />
      <Status />
      <Limits />
    </CaseStudyShell>
  );
}

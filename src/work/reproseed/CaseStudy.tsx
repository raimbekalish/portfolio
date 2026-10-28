import { ArrowDown } from "lucide-react";
import { reproseed } from "../../content/reproseed";
import { OutLink } from "../../signal-path/ui";
import CaseStudyShell from "../shared/CaseStudyShell";
import Overview from "../shared/Overview";
import { duplicate } from "./examples";
import Explorer from "./explorer/Explorer";
import { Minimization, Problem, RegressionTest, Reproduction, VerifiedFix } from "./sections/Chapters";
import { Conclusion, Evidence, Limits, Next } from "./sections/Closing";
import Hero from "./sections/Hero";
import { chapters } from "./structure";

/** The ReproSeed case study, rendered to static HTML at build time and hydrated in the browser. */
export default function CaseStudy() {
  const { run } = duplicate;
  return (
    <CaseStudyShell className="rs" project={reproseed.slug} chapters={chapters} source={{ href: reproseed.source, label: "Source on GitHub" }}>
      <Hero />
      <Overview
        conclusion={
          <>
            In one recorded run, ReproSeed cut the duplicate-submit scenario from {duplicate.steps.length} steps to {run.kept.length},
            each one needed, reproduced the bug in {run.verify.length} of {run.verify.length} fresh replays, and wrote a Playwright test
            that fails on the bug and passes on the fix.
          </>
        }
        actions={
          <>
            <a className="cs-button" href="#explorer">
              Step through the run <ArrowDown aria-hidden="true" strokeWidth={1.75} />
            </a>
            <a className="sp-text-link" href="#conclusion">Read the conclusion</a>
            <OutLink className="sp-text-link" href={reproseed.source}>Source on GitHub</OutLink>
          </>
        }
        facts={[
          { label: "Built with", value: reproseed.stack.join(" · ") },
          { label: "Scope", value: reproseed.boundary },
          { label: "Status", value: reproseed.status },
          { label: "Authorship", value: reproseed.authorship },
        ]}
        chapters={chapters}
      />
      <Problem />
      <Explorer />
      <Reproduction />
      <Minimization />
      <RegressionTest />
      <VerifiedFix />
      <Conclusion />
      <Limits />
      <Evidence />
      <Next />
    </CaseStudyShell>
  );
}

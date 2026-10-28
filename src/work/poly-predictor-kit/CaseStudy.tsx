import { ArrowDown } from "lucide-react";
import { poly } from "../../content/poly";
import { OutLink } from "../../signal-path/ui";
import CaseStudyShell from "../shared/CaseStudyShell";
import Overview from "../shared/Overview";
import SystemMap from "./map/SystemMap";
import { Checks, Contribution, Conversation, Numbers, Readings, Risk } from "./sections/Chapters";
import { Evidence, Next } from "./sections/Closing";
import Hero from "./sections/Hero";
import { chapters } from "./structure";

/** The Poly Predictor Kit case study, rendered to static HTML at build time and hydrated in the browser. */
export default function CaseStudy() {
  return (
    <CaseStudyShell className="pp" project={poly.slug} chapters={chapters} source={{ href: poly.source, label: "Source on GitHub" }}>
      <Hero />
      <Overview
        conclusion={
          <>
            {poly.award.title} — {poly.award.event}. One Chrome extension reads a market's numbers with Gemini and its conversation
            with a TF-IDF and logistic-regression classifier. Raimbek developed both of those pipelines; the extension and the risk
            check are part of the team's architecture.
          </>
        }
        actions={
          <>
            <a className="cs-button" href="#system-map">
              Explore the system map <ArrowDown aria-hidden="true" strokeWidth={1.75} />
            </a>
            <a className="sp-text-link" href="#contribution">Raimbek's contribution</a>
            <OutLink className="sp-text-link" href={poly.source}>Source on GitHub</OutLink>
          </>
        }
        facts={[
          { label: "Award", value: <a className="pp-inline-link" href={poly.award.evidence}>{poly.award.title} — {poly.award.event}</a> },
          { label: "Raimbek's contribution", value: poly.myPart },
          { label: "Built with", value: poly.stack.join(" · ") },
          { label: "Status", value: poly.status },
        ]}
        chapters={chapters}
      />
      <Contribution />
      <Readings />
      <SystemMap />
      <Numbers />
      <Conversation />
      <Risk />
      <Checks />
      <Evidence />
      <Next />
    </CaseStudyShell>
  );
}

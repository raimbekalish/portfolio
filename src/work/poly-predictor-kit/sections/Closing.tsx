import { ArrowLeft, ArrowRight } from "lucide-react";
import { evidence, poly, type PolyEvidence } from "../../../content/poly";
import { caseStudy as reproseedCase } from "../../../content/reproseed";
import { OutLink } from "../../../signal-path/ui";
import { homeSection } from "../../site";
import Fold from "../../shared/Fold";
import { EvidenceTag } from "../ui";

const kinds = Object.keys(evidence) as PolyEvidence[];

export function Evidence() {
  return (
    <section className="pp-evidence" id="evidence" aria-labelledby="pp-evidence-title">
      <p className="pp-kicker">Evidence</p>
      <h2 className="pp-chapter-title" id="pp-evidence-title">How this page knows what it says</h2>
      <Fold summary="What each evidence label means">
        <dl className="pp-key">
          {kinds.map((k) => (
            <div key={k}>
              <dt><EvidenceTag kind={k} /></dt>
              <dd>{evidence[k].detail}</dd>
            </div>
          ))}
        </dl>
      </Fold>
      <div className="pp-evidence-cols">
        <div>
          <h3 className="cs-h3">Sources</h3>
          <ul className="pp-sources">
            <li><OutLink href={poly.source}>Repository</OutLink></li>
            <li><OutLink href={poly.commit.url}>Commit {poly.commit.sha} ({poly.commit.date})</OutLink></li>
            <li><OutLink href={poly.devpost}>Devpost: team, story and award</OutLink></li>
            <li><OutLink href={poly.video}>The team's demo video</OutLink></li>
          </ul>
        </div>
        <div>
          <h3 className="cs-h3">What was not used</h3>
          <p>
            The trained classifier was not run, loaded or copied, and no market data, prices or comments appear on this page.
            The Devpost gallery holds only the team's logo, so there are no product screenshots here.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Next() {
  return (
    <nav className="pp-next" aria-label="Continue">
      <a className="cs-button" href={homeSection(poly.slug)}>
        <ArrowLeft aria-hidden="true" strokeWidth={1.75} /> Back to the portfolio
      </a>
      <a className="sp-text-link" href={reproseedCase.path}>
        Next case study: ReproSeed <ArrowRight aria-hidden="true" strokeWidth={1.75} />
      </a>
    </nav>
  );
}

import { rfinanceDetail } from "../../content/permissions";
import { services, type Work } from "../../content/rfinance";
import { rfinance } from "../content";
import { sectionIds } from "../structure";
import { WorkIndex } from "../ui";
import ServiceSheet from "./ServiceSheet";

/**
 * R-Finance: two separate internal projects. With the employer's approval (src/content/permissions.ts)
 * each is drawn as a conceptual service sheet on drafting film; until then each sheet names the
 * project in one sentence, and the drawings are left out of the build.
 */
export default function RFinance() {
  return (
    <section className="sp-rf" id={sectionIds.rfinance} aria-labelledby="sp-rf-title">
      <header className="sp-rf-head">
        <p className="sp-kicker"><WorkIndex id={sectionIds.rfinance} /> — Internship</p>
        <h2 className="sp-rf-title" id="sp-rf-title">{rfinance.company}</h2>
        <p className="sp-rf-role">
          <span>{rfinance.role}</span>
          <span>{rfinance.period}</span>
          <span>{rfinance.location}</span>
        </p>
        <p className="sp-rf-summary">{rfinance.summary}</p>
        <p className="sp-rf-note">{rfinance.confidentiality}{rfinanceDetail ? " The drawings below are conceptual." : ""}</p>
      </header>
      {rfinanceDetail ? (
        <div className="sp-rf-sheets">
          {services.map((service, i) => (
            <ServiceSheet key={service.id} service={service} sheet={i + 1} sheets={services.length} />
          ))}
        </div>
      ) : (
        <div className="sp-rf-sheets" data-layout="summary">
          {rfinance.work.map((work) => <WorkSheet key={work.id} work={work} />)}
        </div>
      )}
    </section>
  );
}

/** One project without its drawing: the sheet's heading and its sentence. */
function WorkSheet({ work }: { work: Work }) {
  return (
    <article className="sp-sheet" data-layout="summary" id={`r-finance-${work.id}`} aria-labelledby={`sp-sheet-${work.id}`}>
      <header className="sp-sheet-head">
        <p className="sp-sheet-key" aria-hidden="true">{work.key}</p>
        <p className="sp-sheet-discipline sp-st-label">{work.discipline}</p>
        <h3 className="sp-sheet-title" id={`sp-sheet-${work.id}`}>{work.name}</h3>
        <p className="sp-sheet-statement">{work.statement}</p>
      </header>
    </article>
  );
}

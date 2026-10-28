import { rfinance } from "../content";
import { sectionIds } from "../structure";
import { WorkIndex } from "../ui";
import ServiceSheet from "./ServiceSheet";

/** R-Finance: two separate internal services, drawn as conceptual sheets on drafting film. */
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
        <p className="sp-rf-note">{rfinance.confidentiality} The drawings below are conceptual.</p>
      </header>
      <div className="sp-rf-sheets">
        {rfinance.services.map((service, i) => (
          <ServiceSheet key={service.id} service={service} sheet={i + 1} sheets={rfinance.services.length} />
        ))}
      </div>
    </section>
  );
}

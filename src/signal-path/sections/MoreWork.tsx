import { moreWork } from "../content";
import { sectionIds } from "../structure";
import { OutLink } from "../ui";

/**
 * Smaller builds, continuing PromptLock's printout: both are tools for the work itself, so the
 * smaller one reads as the next entry on the same sheet rather than a section of its own.
 */
export default function MoreWork() {
  return (
    <section className="sp-more" id={sectionIds.more} aria-labelledby="sp-more-title">
      <div className="sp-more-grid">
        <header className="sp-more-head">
          <p className="sp-kicker" aria-hidden="true">Also built</p>
          <h2 className="sp-more-title" id="sp-more-title"><span className="sp-sr">Also built: </span>Tools for the work itself.</h2>
        </header>
        <ul className="sp-more-list">
          {moreWork.map((p) => (
            <li key={p.slug} className="sp-more-item" id={p.slug}>
              <p className="sp-more-event">{p.event} · Team project</p>
              <h3 className="sp-more-name">{p.name}</h3>
              <p className="sp-more-summary">{p.summary}</p>
              <p className="sp-more-part"><span className="sp-st-label">My part</span>{p.contribution}</p>
              <p className="sp-more-tech">{p.tech.join(" · ")}</p>
              <p className="sp-more-links">
                <OutLink href={p.source}>Source</OutLink>
                <OutLink href={p.devpost}>Devpost</OutLink>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

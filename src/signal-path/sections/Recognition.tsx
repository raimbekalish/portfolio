import { ArrowUp } from "lucide-react";
import { recognition } from "../content";
import { sectionIds } from "../structure";
import { OutLink } from "../ui";

/**
 * Recognition: the page's one band of full mint, for its one verified award. The win is set like the
 * hero's name, ending in a period: ink here, where the hero's is mint. Below it, every hackathon on
 * one track in the order they happened, the win as the filled stop.
 */
export default function Recognition() {
  const win = recognition.hackathons.find((h) => h.award);
  // "Winner, Polymarket Track": the word is set large, the track goes in the line above it.
  const [word, track] = win ? win.outcome.split(", ") : ["", ""];
  return (
    <section className="sp-rec" id={sectionIds.recognition} aria-labelledby="sp-rec-title">
      <div className="sp-rec-grid">
        <h2 className="sp-rec-title" id="sp-rec-title">Recognition</h2>
        {win && (
          <>
            <p className="sp-rec-win">
              <span className="sp-sr">{win.outcome} — {win.event}</span>
              <span className="sp-rec-win-meta" aria-hidden="true">{win.event} · {track}</span>
              <span className="sp-rec-win-word" aria-hidden="true">{word}<i className="sp-rec-dot" /></span>
            </p>
            <div className="sp-rec-context">
              <p className="sp-rec-project"><span className="sp-st-label">With</span>{win.projectName}</p>
              <p className="sp-rec-summary">{recognition.winSummary}</p>
              <p className="sp-rec-links">
                <a href={`#${win.project}`}>See the system <ArrowUp aria-hidden="true" strokeWidth={1.75} /></a>
                <OutLink href={win.evidence}>Verified on {win.evidenceLabel}</OutLink>
              </p>
            </div>
          </>
        )}

        <div className="sp-rec-log">
          <h3 className="sp-rec-log-title">Hackathons, in order</h3>
          <ol className="sp-rec-track">
            {recognition.hackathons.map((h) => (
              <li key={h.event} className="sp-rec-stop" data-award={h.award}>
                <i className="sp-rec-node" aria-hidden="true" />
                <span className="sp-rec-event">{h.event}</span>
                <a className="sp-rec-project-link" href={`#${h.project}`}>{h.projectName}</a>
                <span className="sp-rec-outcome">{h.outcome}</span>
                <OutLink className="sp-rec-evidence" href={h.evidence}>{h.evidenceLabel}</OutLink>
              </li>
            ))}
          </ol>
          <p className="sp-rec-honor">
            <span className="sp-st-label">Honor society</span>
            {recognition.honor.title} · {recognition.honor.organization}
          </p>
        </div>
      </div>
    </section>
  );
}

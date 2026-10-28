import { Fragment, type CSSProperties, type ReactNode } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { poly, type Channel } from "../../../content/poly";
import { OutLink } from "../../../signal-path/ui";
import { EvidenceTag } from "../ui";

/** The thesis with its two halves set in the two channel colours. */
function paintThesis(text: string, phrases: [string, Channel][]): ReactNode[] {
  let parts: (string | JSX.Element)[] = [text];
  for (const [phrase, channel] of phrases) {
    parts = parts.flatMap((part): (string | JSX.Element)[] => {
      if (typeof part !== "string" || !part.includes(phrase)) return [part];
      const [before, ...rest] = part.split(phrase);
      return [before, <em key={channel} data-channel={channel}>{phrase}</em>, rest.join(phrase)];
    });
  }
  return parts.map((p, i) => <Fragment key={i}>{p}</Fragment>);
}

/** One event, three readings: the hero's small route map. Station names are the code's own stages. */
const routes: { channel: Channel; label: string; stations: string[]; end: string }[] = [
  { channel: "numbers", label: "Prices", stations: ["Gamma API", "Prompt", "Gemini"], end: "AI Trade Insight" },
  { channel: "numbers", label: "Prices", stations: ["Gamma API", "Rules"], end: "Steamroller warning" },
  { channel: "conversation", label: "Comments", stations: ["Gamma API", "Classifier"], end: "Emotional or rational share" },
];

function RouteFigure() {
  return (
    <figure className="pp-routes">
      <figcaption className="pp-routes-head">
        <span>One event, three readings</span>
        <EvidenceTag kind="illustration" />
      </figcaption>
      <p className="pp-routes-origin"><span aria-hidden="true" />A Polymarket event</p>
      <ol className="pp-routes-list">
        {routes.map((r, i) => (
          <li key={i} className="pp-route" data-channel={r.channel} style={{ "--i": i } as CSSProperties}>
            <span className="pp-route-label">{r.label}</span>
            <ol className="pp-route-stations" aria-label={`${r.label} to ${r.end}`}>
              {r.stations.map((s) => <li key={s}>{s}</li>)}
              <li className="pp-route-end">{r.end}</li>
            </ol>
          </li>
        ))}
      </ol>
    </figure>
  );
}

/** The title, the thesis in two colours, the award and the team, and the event's three readings. */
export default function Hero() {
  return (
    <section className="pp-hero" aria-labelledby="pp-title">
      <div className="pp-hero-grid">
        <p className="pp-kicker pp-hero-kicker">Case study · Team project · {poly.award.event}</p>
        <a className="pp-award" href={poly.award.evidence} target="_blank" rel="noreferrer">
          <span className="pp-award-mark" aria-hidden="true" />
          <span className="pp-award-title">{poly.award.title}<span className="sp-sr"> — </span></span>
          <span className="pp-award-tail">
            <span className="pp-award-event">{poly.award.event}</span>
            <ArrowUpRight aria-hidden="true" strokeWidth={1.75} />
          </span>
        </a>
        <h1 className="pp-hero-title" id="pp-title">{poly.name}</h1>
        <div className="pp-hero-text">
          <p className="pp-hero-thesis">{paintThesis(poly.thesis, [[poly.numbers, "numbers"], [poly.conversation, "conversation"]])}</p>
          <p className="pp-hero-summary">{poly.summary}</p>
          <p className="pp-hero-role">
            <span className="pp-hero-role-label">Raimbek's role</span>
            Developed the market summarization and comment-classification pipelines. Team project: Devpost lists {poly.team.length} creators.
          </p>
          <p className="pp-hero-links">
            <a className="pp-button" href="#system-map">
              Explore the system map <ArrowDown aria-hidden="true" strokeWidth={1.75} />
            </a>
            <OutLink className="pp-link" href={poly.source}>Source</OutLink>
            <OutLink className="pp-link" href={poly.devpost}>Devpost</OutLink>
            <OutLink className="pp-link" href={poly.video}>Demo video</OutLink>
          </p>
        </div>
        <RouteFigure />
      </div>
    </section>
  );
}

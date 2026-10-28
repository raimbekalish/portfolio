import type { ReactNode } from "react";
import type { Chapter } from "./Contents";

type Props = {
  facts: { label: string; value: ReactNode }[];
  /** One or two sentences with the result, linked to where the page argues it. */
  conclusion: ReactNode;
  actions: ReactNode;
  chapters: readonly Chapter[];
};

/**
 * The project at a glance, right after the hero: the facts, the result, the main ways in, and every
 * chapter. It is the page's static table of contents, so it works without JavaScript.
 */
export default function Overview({ facts, conclusion, actions, chapters }: Props) {
  return (
    <section className="cs-overview" id="overview" aria-labelledby="cs-overview-title">
      <div className="cs-overview-grid">
        <div className="cs-overview-main">
          <h2 className="cs-overview-title" id="cs-overview-title">Project overview</h2>
          <p className="cs-overview-conclusion">{conclusion}</p>
          <p className="cs-overview-actions">{actions}</p>
        </div>
        <dl className="cs-overview-facts">
          {facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
        <nav className="cs-overview-toc" aria-label="On this page">
          <p className="sp-kicker">On this page</p>
          <ol>
            {chapters.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`}>
                  <span aria-hidden="true">{c.n}</span>
                  {c.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}

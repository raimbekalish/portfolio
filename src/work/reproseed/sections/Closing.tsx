import { ArrowLeft } from "lucide-react";
import { evidence, limitations, notBuilt, reproseed, type EvidenceKind } from "../../../content/reproseed";
import { duplicate, examples, stale } from "../examples";
import { OutLink } from "../../../signal-path/ui";
import { homeSection } from "../../site";
import { EvidenceTag } from "../ui";

/** The result in four lines, each linked to where the page shows it, then the way to the limits. */
export function Conclusion() {
  const { run } = duplicate;
  return (
    <section className="rs-conclusion" id="conclusion" aria-labelledby="conclusion-title">
      <p className="sp-kicker">Conclusion</p>
      <h2 className="rs-chapter-title" id="conclusion-title">What the recorded runs show</h2>
      <ol className="rs-conclusion-list">
        <li>
          <b>{duplicate.steps.length} → {run.kept.length}</b>
          <span>
            The duplicate-submit failure needs {run.kept.length} of its {duplicate.steps.length} steps. Deleting any one of them alone
            stopped it, or left a step without one it depends on. <a href="#minimization">How the search and the proof work</a>
          </span>
        </li>
        <li>
          <b>{run.verify.length} / {run.verify.length}</b>
          <span>Five fresh replays, without the cache, reproduced the same signature. <a href="#explorer">See the verification</a></span>
        </li>
        <li>
          <b>Red → green</b>
          <span>The exported test failed on the buggy page and passed on the repository's fixed page. <a href="#verified-fix">See both results</a></span>
        </li>
        <li>
          <b>{stale.steps.length} → {stale.run.kept.length}</b>
          <span>The same engine reduced a second bug, a stale search result, with a different oracle and no search-specific code.</span>
        </li>
      </ol>
      <p className="rs-conclusion-note">
        Each line is one recorded run of the repository's own command against its loopback demos. What that does not establish is
        listed under <a href="#limits">Limits</a>.
      </p>
      <p className="rs-conclusion-links">
        <OutLink className="sp-text-link" href={reproseed.source}>Read the source on GitHub</OutLink>
        <OutLink className="sp-text-link" href={reproseed.commit.url}>The commit this page describes</OutLink>
      </p>
    </section>
  );
}

export function Limits() {
  return (
    <section className="rs-limits" id="limits" aria-labelledby="limits-title">
      <p className="sp-kicker">Limits</p>
      <h2 className="rs-chapter-title" id="limits-title">What it does not claim</h2>
      <div className="rs-limits-cols">
        <div>
          <h3 className="cs-h3">The result</h3>
          <ul className="cs-list">
            {limitations.map((l) => <li key={l}>{l}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="cs-h3">Not built <EvidenceTag kind="notBuilt" /></h3>
          <ul className="cs-list cs-list-x">
            {notBuilt.map((l) => <li key={l}>{l}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

const kinds = Object.keys(evidence) as EvidenceKind[];

export function Evidence() {
  return (
    <section className="rs-evidence" id="evidence" aria-labelledby="evidence-title">
      <p className="sp-kicker">Evidence</p>
      <h2 className="rs-chapter-title" id="evidence-title">How this page knows what it says</h2>
      <dl className="rs-key">
        {kinds.map((k) => (
          <div key={k}>
            <dt><EvidenceTag kind={k} /></dt>
            <dd>{evidence[k].detail}</dd>
          </div>
        ))}
      </dl>
      <div className="rs-evidence-cols">
        <div>
          <h3 className="cs-h3">The recorded run</h3>
          <p>
            Apple M4, macOS 26.6, Node 24.11, Playwright 1.64.1 with headless Chromium 156, on 2026-10-24. Both scenarios
            were minimized with the command, then each generated test was run against the buggy page and the test-only fixed
            page. Local paths in the output are shortened to “…/”.
          </p>
        </div>
        <div>
          <h3 className="cs-h3">Authorship</h3>
          <p>{reproseed.authorship}</p>
        </div>
        <div>
          <h3 className="cs-h3">Sources</h3>
          <ul className="rs-sources">
            <li><OutLink href={reproseed.source}>Repository</OutLink></li>
            <li><OutLink href={reproseed.commit.url}>Commit {reproseed.commit.sha} ({reproseed.commit.date})</OutLink></li>
            {examples.map((e) => (
              <li key={e.id}><OutLink href={`${reproseed.source}/blob/${reproseed.commit.sha}/${e.file}`}>{e.name} scenario</OutLink></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Next() {
  return (
    <nav className="rs-next" aria-label="Continue">
      <a className="cs-button" href={homeSection(reproseed.slug)}>
        <ArrowLeft aria-hidden="true" strokeWidth={1.75} /> Back to the portfolio
      </a>
      <OutLink className="sp-text-link" href={reproseed.source}>ReproSeed on GitHub</OutLink>
    </nav>
  );
}

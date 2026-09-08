import { useEffect, useRef, useState } from "react";
import { profile } from "../data";
import rawData from "./data.json";
import type { RepositoryData } from "./types";
import Folio from "./Folio";
import { sourceSheets } from "./model";
import { CompactStructure, SourceInventory, SourceNeighborhood } from "./SourceDetails";
import "./CodeTopologyLab.css";

const data = rawData as RepositoryData;
const repositories = data.repositories;
const totals = repositories.reduce((sum, repo) => ({files: sum.files + repo.files.length, imports: sum.imports + repo.edges.length}), {files: 0, imports: 0});
const portfolio = import.meta.env.BASE_URL + "#code-topology";

export default function CodeTopologyLab() {
  useEffect(() => {
    const previous = document.title;
    document.title = "Code Topology Lab — Raimbek Alish";
    return () => { document.title = previous; };
  }, []);
  const [selected, setSelected] = useState<number | null>(null);
  const [entered, setEntered] = useState(false);
  const destination = useRef<HTMLElement>(null);
  const selectors = useRef<HTMLDivElement>(null);
  const repo = selected === null ? null : repositories[selected];

  function choose(index: number | null) {
    setSelected(index);
    setEntered(false);
  }
  function enter() {
    setEntered(true);
    requestAnimationFrame(() => {
      const target = destination.current;
      target?.focus({preventScroll: true});
      if (matchMedia("(max-width: 999px)").matches) target?.scrollIntoView({block: "start", behavior: "auto"});
    });
  }
  function back() {
    setEntered(false);
    requestAnimationFrame(() => selectors.current?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')?.focus());
  }

  return <div className="lab-page">
    <a className="skip-link" href="#lab-projects">Skip to repository selection</a>
    <header className="lab-header">
      <a href={portfolio}>← Back to portfolio</a>
      <span>Raimbek Alish / Lab 01</span>
      <a href={profile.resume}>Résumé <span aria-hidden="true">↗</span></a>
    </header>
    <main>
      <header className="lab-title">
        <div><p className="lab-micro">Public source / Repository Folio</p><h1>Code Topology<span>.</span></h1></div>
        <div><p>A map derived from the structure of my public projects.</p><p className="lab-scope">{totals.files} filtered source files · {totals.imports} resolved local imports</p></div>
      </header>
      <div id="lab-projects" ref={selectors} className="lab-selectors" role="group" aria-label="Select a public repository" tabIndex={-1}>
        <button aria-pressed={selected === null} onClick={() => choose(null)}>Whole map <span aria-hidden="true">↖</span></button>
        {repositories.map((item, index) => <button key={item.id} aria-pressed={selected === index} onClick={() => choose(index)}>
          <span className="lab-selector-number">{String(index + 1).padStart(2, "0")}</span><span>{item.title}</span><small>{item.files.length} files</small>
        </button>)}
      </div>

      <section className={"lab-stage" + (repo ? " lab-selected" : "") + (entered ? " lab-entered" : "")} aria-label="Repository exploration">
        <div className="lab-art" aria-hidden="true"><svg viewBox="0 0 1320 600" width="1320" height="600" focusable="false"><Folio repositories={repositories} selected={selected} entered={entered}/></svg></div>
        {!repo && <div className="lab-map-note"><p className="lab-micro">Whole map</p><h2>Five public snapshots.<br/>One way into the source.</h2><p>Select a repository, then open a small neighborhood of its real file and import relationships.</p></div>}
        {repo && !entered && <section className="lab-evidence" aria-labelledby="lab-project-title">
          <p className="lab-micro">{String(selected! + 1).padStart(2,"0")} / {repo.ownership === "team" ? "Public team project" : "Personal repository"}</p>
          <h2 id="lab-project-title">{repo.title}</h2><p className="lab-description">{repo.summary}</p>
          <div className="lab-contribution"><h3>My contribution</h3><p>{repo.contribution}</p></div>
          <p className="lab-counts">{repo.files.length} included files · {sourceSheets(repo).length} file-bearing directories<br/>{repo.edges.length} resolved local imports</p>
          <button className="lab-enter" onClick={enter}>Enter source neighborhood <span aria-hidden="true">↘</span></button>
          <CompactStructure repo={repo}/>
        </section>}
        {repo && entered && <section id="lab-source" className="lab-source" ref={destination} tabIndex={-1} aria-labelledby="lab-source-title">
          <p className="lab-micro">{repo.title} / Source neighborhood</p><h2 id="lab-source-title">Follow the imports.</h2>
          <SourceNeighborhood repo={repo}/>
          <button className="lab-back" onClick={back}>← Back to repository</button>
        </section>}
      </section>

      <div className="lab-reading-key">
        <p className="lab-desktop-key">One leaf = one included source file. Curves = resolved local imports.</p>
        <p>{repo ? "Pinned snapshot / " + repo.commit.slice(0,8) : "Independent repositories. No cross-project runtime is implied."}</p>
      </div>
      {repo && <div className="lab-source-access" key={repo.id}>
        <a className="lab-snapshot" href={repo.url + "/tree/" + repo.commit}>Inspect the pinned public snapshot <span aria-hidden="true">↗</span></a>
        <SourceInventory repo={repo}/>
      </div>}
      <div className="lab-method">
        <p>Repository structure, not an authorship graph. Team work stays team work. R-Finance’s internal source is not mapped.</p>
        <details><summary>How this map is derived <span aria-hidden="true">+</span></summary>
          <div><p>Each file comes from an allowlisted path in a pinned public repository. Directory membership groups the leaves; their bars use a logarithmic source-byte scale. Curves show static imports that resolve to included files. Positions are composed for reading, not runtime or deployment coordinates.</p>
          <p>The compact view uses readable folder lists. Enter source shows up to four real imports, ordered by source out-degree and then path, with their endpoint files. Each source’s targets are independent direct imports, not a sequential pipeline.</p>
          <p>Generated output, data, credentials, résumé files and vendor directories are excluded. Aliases and computed imports are not resolved. This is a filtered source snapshot, not a complete dependency audit, call graph, quality score or attribution of all code to me.</p>
          <ul>{repositories.map(item => <li key={item.id}><a href={item.url + "/tree/" + item.commit}>{item.title}<span>{item.commit.slice(0,8)} ↗</span></a></li>)}</ul></div>
        </details>
      </div>
    </main>
    <footer className="lab-footer"><a href={portfolio}>← Back to portfolio</a><a href={profile.github}>GitHub <span aria-hidden="true">↗</span></a></footer>
    <p className="ti-sr-only" role="status">{repo ? repo.title + (entered ? ": source neighborhood opened." : ": repository selected.") : "Whole public-source map."}</p>
  </div>;
}

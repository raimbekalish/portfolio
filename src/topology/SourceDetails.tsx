import { Fragment } from "react";
import type { Repository } from "./types";
import { focusEdges, sourceSheets } from "./model";

function SourcePath({ path }: { path: string }) {
  return <span>{path.split("/").map((part, index) => <Fragment key={index}>{index > 0 && <>/<wbr /></>}{part}</Fragment>)}</span>;
}

export function sourceURL(repo: Repository, path: string) {
  return repo.url + "/blob/" + repo.commit + "/" + path.split("/").map(encodeURIComponent).join("/");
}

export function SourceNeighborhood({ repo }: { repo: Repository }) {
  const edges = focusEdges(repo);
  const sources = [...new Set(edges.map(edge => edge.source))];
  return <div className="lab-neighborhood">
    <p className="lab-note">A deterministic selection of {edges.length} resolved local imports. Each list shows direct imports from its source file.</p>
    {sources.map(source => <article key={source}>
      <h3><a href={sourceURL(repo, source)}><SourcePath path={source}/><span aria-hidden="true"> ↗</span></a></h3>
      <p className="lab-micro">Imports</p>
      <ul>{edges.filter(edge => edge.source === source).map(edge => <li key={edge.target}>
        <span aria-hidden="true">↳</span><a href={sourceURL(repo, edge.target)}><SourcePath path={edge.target}/><span aria-hidden="true"> ↗</span></a>
      </li>)}</ul>
    </article>)}
  </div>;
}

export function SourceInventory({ repo }: { repo: Repository }) {
  return <details className="lab-inventory">
    <summary>Browse all {repo.files.length} included source files <span aria-hidden="true">+</span></summary>
    <div>{sourceSheets(repo).map(sheet => <details key={sheet.path}>
      <summary><span>{sheet.path === "." ? "/ root" : sheet.path}</span><small>{sheet.files.length} {sheet.files.length === 1 ? "file" : "files"}</small></summary>
      <ul>{sheet.files.map(file => <li key={file.path}><a href={sourceURL(repo, file.path)}><SourcePath path={file.path}/><span aria-hidden="true"> ↗</span></a></li>)}</ul>
    </details>)}</div>
  </details>;
}

export function CompactStructure({ repo }: { repo: Repository }) {
  const sheets = sourceSheets(repo);
  return <section className="lab-compact-structure" aria-label="Source folders">
    <h3>Source layout</h3>
    <ul>{sheets.slice(0, 4).map(sheet => <li key={sheet.path}><span>{sheet.path === "." ? "/ root" : sheet.path}</span><span>{sheet.files.length} {sheet.files.length === 1 ? "file" : "files"}</span></li>)}</ul>
    <p className="lab-note">{sheets.length > 4 ? "Showing 4 of " + sheets.length + " source directories. All files are available below." : "File-bearing directories in this filtered snapshot."}</p>
  </section>;
}

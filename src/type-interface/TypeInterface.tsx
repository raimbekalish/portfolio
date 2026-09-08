import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowLeft } from "lucide-react";
import { profile, projects, schools } from "../data";
import { TypePoster } from "./TypeLettering";
const TypeCanvas = lazy(() => import("./TypeCanvas"));
import type { ProjectWorldId } from "./ProjectWorld";
import "./TypeInterface.css";

const worlds: { id: ProjectWorldId; label: string; title: string; note: string; href: string }[] = [
  { id: "applied", label: "Applied AI", title: "Arfi / AI knowledge assistant", note: "Internal work · R-Finance", href: "#r-finance" },
  { id: "market", label: "Market Intelligence", title: projects[0].name, note: projects[0].award, href: "#poly-predictor" },
  { id: "novel", label: "Generative Storytelling", title: projects[1].name, note: projects[1].award, href: "#visual-novel" },
];
function useMedia(query: string) {
  const [matches, setMatches] = useState(() => matchMedia(query).matches);
  useEffect(() => { const media = matchMedia(query); const update = () => setMatches(media.matches); media.addEventListener("change", update); return () => media.removeEventListener("change", update); }, [query]);
  return matches;
}
export default function TypeInterface() {
  const [project, setProject] = useState<ProjectWorldId>("applied");
  const [previous, setPrevious] = useState<ProjectWorldId | null>(null);
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const mobile = useMedia("(max-width: 599px)");
  const current = worlds.find(world => world.id === project)!;
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => { if (reduced) { clearTimeout(timer.current); setPrevious(null); } }, [reduced]);
  function choose(id: ProjectWorldId) {
    if (id === project) return;
    clearTimeout(timer.current);
    setPrevious(reduced ? null : project);
    setProject(id);
    if (!reduced) timer.current = setTimeout(() => setPrevious(null), 640);
  }
  return <section className="ti-hero" aria-labelledby="ti-name" data-open={open} data-project={project}>
        <h1 id="ti-name" className="ti-sr-only">Raimbek Alish</h1>
        <div className="ti-introduction">
          <p className="ti-positioning">AI, backend, and<br />everything in between.</p>
          <p className="ti-education"><strong>{schools[0].degree}</strong><span>{schools[0].name} · {schools[0].date}</span></p>
          <p className="ti-seeking">Seeking Summer 2027 <br />internships <span aria-hidden="true">↘</span></p>
        </div>
        <div className="ti-art-stage" id="ti-project-surface"><Suspense fallback={<TypePoster mobile={mobile} />}><TypeCanvas project={project} previous={previous} open={open} mobile={mobile} reduced={reduced} /></Suspense></div>
        <p className="ti-provenance">{project === "applied" ? "Illustrative preview · Synthetic data" : project === "market" ? "Architecture illustration · Two separate pipelines" : "Real project screenshot · CodeDay showcase"}</p>
        <div className="ti-selector-row">
          <div className="ti-selectors" role="group" aria-label="Choose a project world">{worlds.map((world, i) => <button key={world.id} type="button" aria-pressed={world.id === project} onClick={() => choose(world.id)}><span>0{i + 1}</span>{world.label}</button>)}</div>
          <button className="ti-enter" type="button" aria-expanded={open} aria-controls="ti-project-surface" onClick={() => setOpen(!open)}>{open ? <><ArrowLeft aria-hidden="true" />Back to identity</> : <>Enter project <ArrowDownRight aria-hidden="true" /></>}</button>
        </div>
        <div className="ti-world-caption" aria-live="polite" aria-atomic="true"><div><p className="ti-project-note">{current.note}</p><h2>{current.title}</h2></div><p className="ti-world-description">{project === "applied" ? "Question → evidence → grounded answer." : project === "market" ? "Market summaries and comment classification." : "Story data + scene images → playable Ren’Py novel."}</p></div>
        <div className="ti-hero-footer"><a className="ti-case-link" href={current.href}>Explore full case study <ArrowDownRight aria-hidden="true" /></a><div className="ti-socials"><a href={profile.github}>GitHub ↗</a><a href={profile.linkedin}>LinkedIn ↗</a><a href={`mailto:${profile.email}`}>Email ↗</a></div></div>
        <div className="ti-sr-only">
          {project === "applied" ? <><h3>Illustrative Arfi example using synthetic data</h3><p>Question: Where can I find the onboarding checklist?</p><p>Retrieved evidence: The onboarding checklist is in the team handbook, under Getting started.</p><p>Grounded answer: You’ll find it in the team handbook’s Getting started section.</p></> : project === "market" ? <><h3>Two separate pipelines</h3><p>Market context: Market data → Gemini → Market summary.</p><p>Community discussion: Comments → TF-IDF and logistic regression → Categories.</p></> : <p>The real AI Visual Novel Creator project scene shows a character in a city setting. Story data and generated scene images become a playable Ren’Py novel.</p>}
        </div>
  </section>;
}

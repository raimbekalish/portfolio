import { experiences, honors, profile, projects, schools } from "../data";
import { caseStudy as faultlineCase, faultline as faultlineModel, recordedRun, stages as faultlineStages } from "../content/faultline";
import { about, alsoUsed, evidenceContexts, hackathons, roleHighlights, skillEvidence } from "../content/profile";
import { promptlock as promptlockModel } from "../content/promptlock";
import { caseStudy as polyCase, poly as polyFacts } from "../content/poly";
import { caseStudy, duplicateSubmit, reproseed, withRun } from "../content/reproseed";
import { duplicateSubmitRun } from "../content/reproseed-run";
import { rfinance as rfinanceContent } from "../content/rfinance";
import { systems } from "../content/systems";
import { visualNovel } from "../content/visualNovel";

// The page reads every fact from the content model (src/data.ts and src/content/); this module only
// selects and joins it. Unverified items in src/data.ts (the CodeDay award wording) are never selected.

function required<T>(value: T | undefined, what: string): T {
  if (value === undefined) throw new Error(`Signal Path: missing ${what} in the content model`);
  return value;
}

const project = (slug: string) => required(projects.find((p) => p.slug === slug), `project "${slug}"`);

const school = required(schools.find((s) => s.id === "whitman"), "the current school");
const [first, ...rest] = profile.name.split(" ");

export const identity = {
  name: profile.name,
  first,
  last: rest.join(" "),
  statement: profile.statement,
  /** The words set in the serif italic accent, when the statement ends with them. */
  accent: "useful products.",
  study: `${school.degree}, ${school.name}`,
  graduation: school.date,
  availability: profile.availability,
  resume: profile.resume,
  github: profile.github,
  linkedin: profile.linkedin,
  email: profile.email,
};

const poly = project("poly-predictor-kit");

export const featured = {
  slug: poly.slug,
  name: poly.name,
  team: required(poly.team, "Poly Predictor Kit team"),
  recognition: required(poly.recognition, "Poly Predictor Kit recognition"),
  problem: poly.problem,
  /** From the commit history (src/content/poly.ts); the current site's wording claims more and is pending. */
  contribution: polyFacts.contribution,
  tech: poly.tech,
  caseStudy: polyCase.path,
  source: poly.repo,
  devpost: poly.demo,
  system: required(systems[poly.slug], "Poly Predictor Kit system"),
};

const internship = required(experiences.find((e) => e.id === rfinanceContent.experienceId), "the R-Finance role");

export const rfinance = { ...rfinanceContent, period: internship.date, location: internship.location };

const novel = project(visualNovel.slug);

export const novelProject = {
  ...visualNovel,
  name: novel.name,
  problem: novel.problem,
  contribution: novel.contribution,
  /** Only the showcase is linked; the source link stays as it is on the current site (see the ledger). */
  showcase: novel.demo,
};

/** ReproSeed's preview: the thesis, the duplicate-submit run as the example, and the way to the case study. */
export const reproseedProject = {
  ...reproseed,
  example: withRun(duplicateSubmit, duplicateSubmitRun),
  caseStudy: caseStudy.path,
};

const lock = project(promptlockModel.slug);

export const promptlockProject = {
  ...promptlockModel,
  name: lock.name,
  event: lock.event,
  contribution: lock.contribution,
  interface: lock.decision,
  source: lock.repo,
  devpost: lock.demo,
};

const fault = project(faultlineModel.slug);

/** Faultline's showcase: the thesis, one recorded run stepped through in four stages, and its links. */
export const faultlineProject = {
  ...faultlineModel,
  name: fault.name,
  caseStudy: faultlineCase.path,
  source: fault.repo,
  demo: fault.demo,
  run: recordedRun,
  stages: faultlineStages,
};

export const roles = experiences.map((e) => ({
  id: e.id,
  company: e.company,
  role: e.role,
  location: e.location,
  date: e.date,
  start: e.start,
  end: e.end,
  highlights: roleHighlights[e.id] ?? e.bullets.slice(0, 1),
}));

export const education = schools.map(({ id, name, degree, date, location }) => ({ id, name, degree, date, location }));

const projectNames = Object.fromEntries(projects.map((p) => [p.slug, p.name]));

export const recognition = {
  hackathons: hackathons.map((h) => ({ ...h, projectName: required(projectNames[h.project], `project "${h.project}"`) })),
  /** The winning project's one-line summary, for the award's context. */
  winSummary: required(projects.find((p) => p.slug === hackathons.find((h) => h.award)?.project), "the winning project").summary,
  honor: required(honors.find((h) => h.title.startsWith("Phi Theta Kappa")), "the Phi Theta Kappa honor"),
};

export const skills = { contexts: evidenceContexts, groups: skillEvidence, also: alsoUsed };

export { about };

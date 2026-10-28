// Navigation and section structure for the Signal Path page: one place for the order of the
// sections, their anchor ids, and which of them the site bar links to. Ids are stable; project
// sections use the project's slug.

export const sectionIds = {
  top: "top",
  work: "work",
  poly: "poly-predictor-kit",
  reproseed: "reproseed",
  faultline: "faultline",
  rfinance: "r-finance",
  novel: "ai-visual-novel-creator",
  promptlock: "promptlock",
  experience: "experience",
  recognition: "recognition",
  skills: "skills",
  about: "about",
  contact: "contact",
} as const;

/** Featured projects in page order; their numbers are derived from this order. */
export const workOrder = [sectionIds.poly, sectionIds.reproseed, sectionIds.faultline, sectionIds.rfinance, sectionIds.novel, sectionIds.promptlock] as const;

export const workNumber = (id: (typeof workOrder)[number]) => String(workOrder.indexOf(id) + 1).padStart(2, "0");
export const workCount = String(workOrder.length).padStart(2, "0");

/** Site bar links. Each one is highlighted while its section, or a section inside it, is on screen. */
export const navItems = [
  { id: sectionIds.work, label: "Work" },
  { id: sectionIds.experience, label: "Experience" },
  { id: sectionIds.skills, label: "Skills" },
  { id: sectionIds.about, label: "About" },
  { id: sectionIds.contact, label: "Contact" },
] as const;

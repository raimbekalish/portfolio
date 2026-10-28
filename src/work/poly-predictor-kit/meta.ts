import { profile } from "../../data";
import { caseStudy, poly } from "../../content/poly";
import type { PageMeta } from "../head";
import { absolute, site } from "../site";

/** The case study's head: title, description, canonical URL, social card and schema.org data. */
export const meta: PageMeta = {
  ...caseStudy,
  jsonLd: {
    "@type": "TechArticle",
    headline: caseStudy.title,
    description: caseStudy.description,
    url: absolute(caseStudy.path),
    image: absolute(caseStudy.image.path),
    inLanguage: "en",
    author: { "@type": "Person", name: profile.name, url: absolute("/") },
    isPartOf: { "@type": "WebSite", name: site.name, url: absolute("/") },
    about: {
      "@type": "SoftwareSourceCode",
      name: poly.name,
      description: poly.summary,
      codeRepository: poly.source,
      programmingLanguage: ["Python", "JavaScript"],
      award: `${poly.award.title} — ${poly.award.event}`,
      contributor: poly.team.map((name) => ({ "@type": "Person", name })),
    },
  },
};

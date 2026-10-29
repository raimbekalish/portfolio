import { profile } from "../../data";
import { caseStudy, faultline } from "../../content/faultline";
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
      name: "Faultline",
      description: faultline.thesis,
      codeRepository: faultline.source,
      programmingLanguage: ["Go", "TypeScript"],
      license: "https://opensource.org/licenses/MIT",
    },
  },
};

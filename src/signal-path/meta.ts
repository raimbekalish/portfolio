// The homepage's <head> once the Signal Path page is the front page (src/work/release.ts). Until
// then index.html keeps the current site's head; scripts/work-pages.ts swaps this in at launch.

import { profile, schools } from "../data";
import { headTags, type PageMeta } from "../work/head";
import { absolute } from "../work/site";

const school = schools.find((s) => s.id === "whitman");
const previous = schools.find((s) => s.id !== "whitman");

export const meta: PageMeta = {
  type: "website",
  path: "/",
  title: `${profile.name} — Software engineering`,
  description: `${school?.degree} student at ${school?.name}, ${profile.statement.charAt(0).toLowerCase()}${profile.statement.slice(1)} Case studies of Poly Predictor Kit, ReproSeed and Faultline. Seeking ${profile.availability}.`,
  image: {
    path: "/og/home.png",
    alt: `${profile.name}: software systems, applied AI and useful products. The portfolio's opening, a signal line writing the name.`,
    width: 1200,
    height: 630,
  },
  jsonLd: {
    "@type": "Person",
    name: profile.name,
    url: absolute("/"),
    email: `mailto:${profile.email}`,
    jobTitle: `${school?.degree} student`,
    description: profile.statement,
    sameAs: [profile.github, profile.linkedin],
    affiliation: { "@type": "CollegeOrUniversity", name: school?.name },
    ...(previous && { alumniOf: { "@type": "CollegeOrUniversity", name: previous.name } }),
  },
};

const fonts = ["instrument-sans-latin-var", "martian-mono-subset-var", "instrument-serif-italic-subset"];

/** Every tag the homepage's head needs at launch, with the site's base path for local assets. */
export function homeHead(base: string) {
  return [
    `<meta name="theme-color" content="#F0EDE6" />`,
    `<meta name="color-scheme" content="light" />`,
    `<meta name="author" content="${profile.name}" />`,
    // The page paints on paper from the first frame; the Code Topology Lab keeps its own dark page.
    `<script>
      if (/[?&]lab=code-topology(&|$)/.test(location.search)) {
        document.querySelector('meta[name="theme-color"]').content = "#0B0D0F";
        document.querySelector('meta[name="color-scheme"]').content = "dark";
      } else {
        document.documentElement.setAttribute("data-preview", "signal-path");
        document.documentElement.style.background = "#F0EDE6";
      }
    </script>`,
    ...fonts.map((name) => `<link rel="preload" href="${base}fonts/${name}.woff2" as="font" type="font/woff2" crossorigin />`),
    `<link rel="icon" type="image/svg+xml" href="${base}favicon.svg" />`,
    `<link rel="apple-touch-icon" href="${base}favicon.svg" />`,
    headTags(meta),
  ].join("\n    ");
}

// Shared by the standalone case-study pages under /work/: the site's origin for canonical and social
// URLs, where "back to the portfolio" goes, and whether search engines may index the pages. The last
// two follow the release switch in ./release.ts.

import { profile } from "../data";
import { launched } from "./release";

export const site = {
  origin: "https://callmeraim.dev",
  name: profile.name,
  /** The design preview until launch, then the new homepage. */
  home: launched ? "/" : "/?preview=signal-path",
  /** Kept out of search until launch. */
  robots: launched ? "index, follow" : "noindex, follow",
};

/** An absolute URL on the site, for canonical links, Open Graph and JSON-LD. */
export const absolute = (path: string) => new URL(path, site.origin).href;

/** A section of the portfolio page, such as the project's own section. */
export const homeSection = (id: string) => `${site.home}#${id}`;

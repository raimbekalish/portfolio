// The <head> tags of a case-study page, rendered into its HTML at build time (see
// scripts/work-pages.ts). Every value comes from the page's content and the release switch; nothing
// is repeated by hand in the HTML templates.

import { absolute, site } from "./site";

export type PageMeta = {
  path: string;
  title: string;
  description: string;
  image: { path: string; alt: string; width: number; height: number };
  /** schema.org data for the page, without @context. */
  jsonLd: Record<string, unknown>;
};

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const meta = (key: "name" | "property", name: string, content: string) => `<meta ${key}="${name}" content="${escape(content)}" />`;

export function headTags(page: PageMeta): string {
  const url = absolute(page.path);
  const image = absolute(page.image.path);
  // JSON inside a script element: "<" is escaped so the text can never close the element.
  const jsonLd = JSON.stringify({ "@context": "https://schema.org", ...page.jsonLd }).replace(/</g, "\\u003c");
  return [
    `<title>${escape(page.title)}</title>`,
    meta("name", "robots", site.robots),
    meta("name", "description", page.description),
    `<link rel="canonical" href="${escape(url)}" />`,
    meta("property", "og:type", "article"),
    meta("property", "og:locale", "en_US"),
    meta("property", "og:site_name", site.name),
    meta("property", "og:title", page.title),
    meta("property", "og:description", page.description),
    meta("property", "og:url", url),
    meta("property", "og:image", image),
    meta("property", "og:image:alt", page.image.alt),
    meta("property", "og:image:width", String(page.image.width)),
    meta("property", "og:image:height", String(page.image.height)),
    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", page.title),
    meta("name", "twitter:description", page.description),
    meta("name", "twitter:image", image),
    meta("name", "twitter:image:alt", page.image.alt),
    `<script type="application/ld+json">${jsonLd}</script>`,
  ].join("\n    ");
}

// Static case-study pages for GitHub Pages, without a router or a framework change.
//
// Each work/<slug>/index.html is its own page, written to dist/work/<slug>/index.html, so it loads
// directly at /work/<slug>/, after a refresh and through back and forward. Its head and body are
// rendered from src/work/<slug>/server.tsx: on each request in development, and at build time in a
// second build that runs after the main one. Keeping the pages out of the main build leaves the
// homepage's bundles exactly as they were. The served HTML already holds the page's content and
// metadata; the browser then hydrates it. Once the release switch is on, the pages are also added to
// the built sitemap.

import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { build, createServer, type Plugin, type ViteDevServer } from "vite";
import { launched } from "../src/work/release";

const HEAD = "<!--work-head-->";
const BODY = "<!--work-body-->";
const PAGE = /^\/work\/([a-z0-9-]+)\/(?:index\.html)?$/;

type Rendered = { head: string; body: string };

/** Adds the pages to the built sitemap, on the same origin as its first entry (the homepage). */
function addToSitemap(outDir: string, pages: string[]) {
  const file = resolve(outDir, "sitemap.xml");
  if (!existsSync(file)) return;
  const xml = readFileSync(file, "utf8");
  const home = /<loc>([^<]+)<\/loc>/.exec(xml)?.[1];
  if (!home) throw new Error("work-pages: the sitemap has no <loc> to take the origin from");
  const origin = new URL(home).origin;
  const entries = pages
    .filter((slug) => !xml.includes(`${origin}/work/${slug}/`))
    .map((slug) => `  <url>\n    <loc>${origin}/work/${slug}/</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`)
    .join("");
  writeFileSync(file, xml.replace("</urlset>", `${entries}</urlset>`));
}

/** Slugs of the pages under work/ that have both an HTML entry and a renderer. */
function slugs(root: string) {
  const dir = resolve(root, "work");
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter(
    (slug) => existsSync(resolve(dir, slug, "index.html")) && existsSync(resolve(root, "src/work", slug, "server.tsx")),
  );
}

async function inject(server: ViteDevServer, slug: string, html: string) {
  if (!html.includes(HEAD) || !html.includes(BODY)) throw new Error(`work/${slug}/index.html needs ${HEAD} and ${BODY}`);
  const page = (await server.ssrLoadModule(`/src/work/${slug}/server.tsx`)) as { render: () => Rendered };
  const { head, body } = page.render();
  return html.replace(HEAD, head).replace(BODY, body);
}

/** Used by the second build: renders each page's HTML through a server that only loads modules. */
function renderPages(root: string): Plugin {
  let loader: ViteDevServer | undefined;
  return {
    name: "work-pages:render",
    async buildStart() {
      loader = await createServer({
        root,
        configFile: false,
        appType: "custom",
        logLevel: "error",
        plugins: [react()],
        server: { middlewareMode: true, hmr: false, watch: null },
        optimizeDeps: { noDiscovery: true, include: [] },
      });
    },
    transformIndexHtml: {
      order: "pre",
      handler(html, ctx) {
        const slug = PAGE.exec(ctx.path)?.[1];
        return slug && loader ? inject(loader, slug, html) : html;
      },
    },
    async closeBundle() {
      await loader?.close();
      loader = undefined;
    },
  };
}

export function workPages(): Plugin {
  let root = process.cwd();
  let base = "/";
  let outDir = "dist";
  let isBuild = false;
  let devServer: ViteDevServer | undefined;

  return {
    name: "work-pages",
    configResolved(config) {
      root = config.root;
      base = config.base;
      outDir = resolve(config.root, config.build.outDir);
      isBuild = config.command === "build";
    },
    configureServer(server) {
      devServer = server;
    },
    transformIndexHtml(html, ctx) {
      const slug = PAGE.exec(ctx.path)?.[1];
      return slug && devServer ? inject(devServer, slug, html) : html;
    },
    async closeBundle() {
      if (!isBuild) return;
      const pages = slugs(root);
      if (pages.length === 0) return;
      await build({
        root,
        base,
        configFile: false,
        logLevel: "warn",
        plugins: [react(), renderPages(root)],
        build: {
          outDir,
          emptyOutDir: false,
          copyPublicDir: false,
          rollupOptions: { input: Object.fromEntries(pages.map((slug) => [slug, resolve(root, "work", slug, "index.html")])) },
        },
      });
      if (launched) addToSitemap(outDir, pages);
    },
  };
}

// The release switch for the standalone case-study pages under /work/. Until the Signal Path redesign
// replaces the homepage, the pages stay out of search (robots noindex, left out of the sitemap) and
// link back to the design preview. At launch, set `launched` to true and rebuild; the steps are in
// docs/release-indexing.md. Kept free of imports so the build plugin can read it too.

export const launched = false;

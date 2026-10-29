// The release switch for the Signal Path redesign. While it is false the current site stays the
// homepage, the Signal Path page is a noindex preview at /?preview=signal-path, and the case studies
// under /work/ stay out of search and link back to the preview. Setting it to true and rebuilding
// makes the Signal Path page the homepage (with its own head), indexes the case studies, adds them
// to the sitemap and points every back link at /. The steps are in docs/release-indexing.md. Kept
// free of imports so the build plugin can read it too.

export const launched = true;

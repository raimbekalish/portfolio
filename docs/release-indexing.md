# Release steps: indexing the case-study pages

Status: pre-launch. The case studies at `/work/reproseed/`, `/work/poly-predictor-kit/` and `/work/faultline/` are kept out of search until the Signal Path redesign replaces the homepage.

## What is held back today, and where

One switch controls all of it: `launched` in [`src/work/release.ts`](../src/work/release.ts), currently `false`.

| Setting | While `launched` is `false` | After `launched` is `true` | Where it is applied |
|---|---|---|---|
| Robots meta on every `/work/` page | `noindex, follow` | `index, follow` | `site.robots` in `src/work/site.ts`, written by `headTags` in `src/work/head.ts` |
| Sitemap | `dist/sitemap.xml` lists only `https://callmeraim.dev/` (the file in `public/` is unchanged) | The build adds `https://callmeraim.dev/work/<slug>/` for every case study | `addToSitemap` in `scripts/work-pages.ts` |
| "Back to the portfolio" and "All work" links | `/?preview=signal-path#…` | `/#…` | `site.home` in `src/work/site.ts` |
| Footer note | "A case study from the Signal Path design preview." | "A case study by Raimbek Alish." | `src/work/shared/CaseStudyShell.tsx` |

The current homepage (`index.html`, `index, follow`) is not affected by the switch. The Signal Path preview sets its own `noindex` while it is mounted at `/?preview=signal-path`.

## Steps at launch

Do these in one change, after the redesign has been approved as the homepage.

1. **Make the Signal Path page the homepage.** This is the separate launch task: in `src/App.tsx`, render the Signal Path page at `/`. Then remove the preview's own `noindex`, title and "design preview" footer note (`src/signal-path/SignalPathPreview.tsx`, `sections/Footer.tsx`), and update the homepage `<head>` in `index.html`. Without this step, the case studies' back links would point to the old homepage.
2. **Turn on the switch.** In `src/work/release.ts`, set `export const launched = true;`.
3. **Build.** Run `npm run typecheck && npm run build`.
4. **Check the output before deploying:**
   - `grep -o '<meta name="robots"[^>]*>' dist/work/*/index.html` shows `index, follow` for every case study.
   - `grep -o '<meta name="robots"[^>]*>' dist/index.html` still shows `index, follow`.
   - `dist/sitemap.xml` lists `/`, `/work/reproseed/`, `/work/poly-predictor-kit/` and `/work/faultline/`, each once.
   - In each case study, "Back to the portfolio" and "All work" point to `/#…`, not to `/?preview=signal-path`.
5. **Deploy** as usual (`npm run deploy`). This is Raimbek's decision and is not part of any phase.
6. **After deploying (optional):** submit the sitemap in Google Search Console and request indexing for the three case-study URLs. Canonical URLs are already set to `https://callmeraim.dev/work/<slug>/`.

## Undoing it

Set `launched` back to `false` and rebuild. The pages return to `noindex`, leave the sitemap, and link to the preview again.

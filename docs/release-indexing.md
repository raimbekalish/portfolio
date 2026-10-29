# Release steps: the new homepage and indexing

Status: release candidate (Phase 7). `launched` in [`src/work/release.ts`](../src/work/release.ts) is `true` on `design/proof-signal`, in the release commit of pull request #1 (draft). It is not merged: production (`main`, deployed by GitHub Actions) still serves the current homepage, with the case studies unpublished. Steps 1–5 below are done on the branch; step 6, the merge, waits for Raimbek's explicit authorization.

Launching is Raimbek's decision. It is not part of any phase, and it waits on the approvals listed in [launch-readiness.md](launch-readiness.md).

## What the switch controls

One constant controls the homepage and indexing together, so the two cannot drift apart.

| Setting | `launched = false` (today) | `launched = true` | Where it is applied |
|---|---|---|---|
| Page at `/` | Current homepage | Signal Path page | `src/App.tsx` |
| Homepage `<head>` | The current site's head, kept between the `release:legacy-head` markers in `index.html` | Generated from `src/signal-path/meta.ts`: title, description, canonical `/`, `index, follow`, Open Graph (`website`, `/og/home.png`), Twitter card, Person JSON-LD, paper theme colour and the Signal Path font preloads | `homeHead` in `scripts/work-pages.ts`, at build time |
| `/?preview=signal-path` | `noindex` preview, with its own title and a "design preview" footer note | The same page as `/`, with the homepage's head (canonical `/`) and no preview wording | `src/signal-path/SignalPathPreview.tsx`, `sections/Footer.tsx` |
| Robots meta on every `/work/` page | `noindex, follow` | `index, follow` | `site.robots` in `src/work/site.ts`, written by `headTags` in `src/work/head.ts` |
| Sitemap | `dist/sitemap.xml` lists only `https://callmeraim.dev/` | The build adds `/work/reproseed/`, `/work/poly-predictor-kit/` and `/work/faultline/` | `addToSitemap` in `scripts/work-pages.ts` |
| "Back to the portfolio" and "All work" | `/?preview=signal-path#…` | `/#…` | `site.home` in `src/work/site.ts` |
| Case-study footer note | "A case study from the Signal Path design preview." | "A case study by Raimbek Alish." | `src/work/shared/CaseStudyShell.tsx` |

Unaffected by the switch:
- The Code Topology Lab at `/?lab=code-topology` keeps its dark page, and its "Back to portfolio" link goes to `/#code-topology`. Before launch that is the current homepage's Lab entry; after launch, the Lab note in the About section.
- `robots.txt` allows everything and names the sitemap in both states.
- The résumé PDF is not part of the build's logic. It is published as it is in `public/`.

## How the site is published

- **The only publish path is the GitHub Actions workflow** [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml). It runs on every push to `main` (or by hand from the Actions tab): Node 20, `npm ci`, `npm run typecheck`, `npm run build`, then it uploads `dist/` and deploys it to Pages.
- The repository's Pages source is "GitHub Actions" and the custom domain is `callmeraim.dev`, with HTTPS enforced. `public/CNAME` is kept but has no effect on an Actions deployment.
- The old second path is removed in Phase 6.1, pending Raimbek's approval: the `deploy` and `predeploy` scripts, which pushed `dist/` to the `gh-pages` branch, and the `gh-pages` package. The `gh-pages` branch stays on the remote as history. Pages does not serve it, so nothing should be pushed there.
- Merging into `main` is therefore the deployment. Anything merged into `main` goes live within a few minutes.

## Steps at launch

1. **Clear the gates.** Every item under "Owner decisions" and "Security" in [launch-readiness.md](launch-readiness.md) is resolved or explicitly accepted by Raimbek. This includes the public résumé PDF.
2. **Make one release commit** on `design/proof-signal`: set `export const launched = true;` in `src/work/release.ts`. Nothing else is needed for the switch. Adding it to pull request #1 before merging means production goes from the current site straight to the new homepage in one deployment, with no intermediate state.
3. **Build locally:** `npm run typecheck && npm run build`.
4. **Check the output** before pushing:
   - `grep -o '<title>[^<]*' dist/index.html` shows `Raimbek Alish — Software engineering`.
   - `grep -c 'release:legacy-head' dist/index.html` prints `0`.
   - `grep -o '<meta name="robots"[^>]*>' dist/index.html dist/work/*/index.html` shows `index, follow` four times.
   - `grep -o '<link rel="canonical"[^>]*>' dist/index.html` shows `https://callmeraim.dev/`.
   - `dist/sitemap.xml` lists `/`, `/work/reproseed/`, `/work/poly-predictor-kit/` and `/work/faultline/`, each once.
   - In each case study, "Back to the portfolio" and "All work" point to `/#…`, not to `/?preview=signal-path`.
   - Serve `dist/` locally (any static server). `/` shows the Signal Path page with no "design preview" wording. `/?lab=code-topology` shows the dark Lab, and its "Back to portfolio" returns to the Lab note.
5. **Push the branch and update the pull request.** The workflow does not run on pull requests, so nothing deploys yet.
6. **Merge into `main`** (Raimbek). The workflow builds and deploys. Watch the run in the Actions tab; the deploy job prints the page URL.
7. **After the deploy:**
   - Run the real-device checklist in [launch-readiness.md](launch-readiness.md).
   - Spot-check `https://callmeraim.dev/`, the three case studies, `/sitemap.xml` and `/?lab=code-topology`.
   - Check `https://callmeraim.dev/work/faultline` without the slash: Pages should redirect it to the slash version.
   - Optional: submit the sitemap in Google Search Console, and request indexing for the homepage and the three case studies. Social previews can be checked with each network's card inspector; caches may hold the old card for a while.

## Permission gates

Two more switches live in [`src/content/permissions.ts`](../src/content/permissions.ts), separate from `launched`:

| Gate | While `false` (the launch default) | Set to `true` only when |
|---|---|---|
| `rfinanceDetail` (**`true` since Phase 7**) | While `false`, R-Finance showed the company, role, dates and each project in one sentence, and the service drawings, their checks and the internal stack in the skills index were left out of the build | Done: Raimbek confirmed R-Finance's permission (owner-confirmed, 2026-10-28) |
| `novelScreenshot` | The Visual Novel frame is a schematic of its three areas | The team consents to reusing its showcase screenshot |

Each is a one-line change, then rebuild and deploy like any other change. Before deploying, search the build for the gated text to confirm it is present or absent as intended.

## Undoing it

- **Fast rollback (preferred):** on `main`, `git revert` the merge (or the release commit) and push. The workflow redeploys the previous state within minutes: the old homepage, `noindex` case studies and the one-URL sitemap. History is preserved and nothing is force-pushed.
- **Without a revert:** set `launched` back to `false` in a new commit on `main` and push. The effect is the same.
- **If a deploy itself fails,** Pages keeps serving the last successful deployment. Fix the build and push again.
- Search engines may keep the case-study URLs for a while after a rollback. That is harmless: the pages still exist, and they return to `noindex`.

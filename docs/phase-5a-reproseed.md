# Phase 5A · Flagship case study: ReproSeed

Status: approved, with three refinements made in [Phase 5B](phase-5b-poly.md) · Date: 2026-10-24

> **Update (Phase 5B).** Three refinements followed approval:
> - **Phones:** the page gained a project overview, a Contents menu in the bar and folds for long evidence.
> - **Authorship:** the wording is now Raimbek's exact sentence.
> - **Indexing:** before launch the page is `noindex` and left out of the sitemap, both controlled by `launched` in `src/work/release.ts`.
>
> Sections below describe the page as approved in 5A; where a detail has changed, it is marked.
Review page: private Claude artifact, plus a local copy at `tmp/signal-path-preview/phase-5a/review/index.html` (gitignored)
Pages: `/work/reproseed/` (new, static) and `/?preview=signal-path` (homepage preview) · Related: [Phase 4.5](phase-4-5-polish.md) · [content evidence ledger](content-evidence-ledger.md) (section 4.6b)

ReproSeed is the first flagship case study. Its thesis is "Turn complex failures into minimal, reproducible evidence." The page tells the story in five chapters: problem, reproduction, minimization, regression test, verified fix. A Bug Minimization Explorer steps through one verified run.

Two pages are untouched: the homepage at `/` and the Code Topology Lab. They are pixel-identical to Phase 4.5.

## View it locally

```sh
npm run build && npm run preview     # then open http://localhost:4173/work/reproseed/
                                     # and http://localhost:4173/?preview=signal-path#reproseed
```

`npm run dev` serves the case study at `/work/reproseed/`, rendered on each request.

## Technical evidence

Everything was checked against the public repository at commit `dd1c61c` (2026-10-22), not just its README.

**Verified in source and tests**
- **Phases.** Phases 0–6 match the README.
- **Minimizer** (`src/core`):
  - delta debugging, with a dependency check before any replay;
  - two agreeing replays per new subset; disagreements are inconclusive;
  - a cache of agreed results only;
  - a replay and wall-clock budget;
  - a single-deletion proof pass;
  - five uncached verification replays.
- **Result claim.** Exactly `VERIFIED_ONE_MINIMAL_CLAIM`: "1-minimal under single deletion of this ordered scenario, given the recorded probes. This is not a proof of the globally shortest reproduction."
- **Scope** (`src/runner`, `src/cli`):
  - loopback `http` origins only;
  - an identity check before the authorized reset;
  - the credential from the environment only, redacted from reports;
  - a fresh browser context per replay;
  - other origins and leaving redirects blocked;
  - delays implemented as `route.fetch` → wait → `route.fulfill`.
  - The README says it in so many words: "authorized loopback test applications only… not arbitrary production websites."
- **Export.** Only from a verified run. The test:
  - asserts the intended result (`expect(actual).toBe(1)`);
  - runs with retries off;
  - refuses a non-loopback origin before sending the credential;
  - does not import ReproSeed.
- **Examples.**
  - Duplicate submit: the page locks only after the first response. Its 400 ms double-click guard (`GUARD_MS`) is why the 800 ms gap is kept.
  - Stale search: a held GET for alpha overwrites beta with "Results for alpha (outdated)".
  - The fixed pages are the repository's test-only variants. ReproSeed does not write fixes.
- **Authorship.** Every commit is Raimbek's; six of the seven carry `Co-authored-by: Cursor`.

**Repository test suites, run locally on 2026-10-24** (Apple M4, Node 24.11, Playwright 1.64.1, loopback demos only)

| Suite | Result |
|---|---|
| `npm run typecheck`, `npm run build` | Pass |
| `npm test` (unit) | 36 / 36 |
| `test:demo` | 6 / 6 |
| `test:runner` | 20 / 20 |
| `test:search` | 4 / 4 |
| `test:export` | 2 / 2 |
| `test:cli` | 11 / 11 |
| `test:cli:e2e` | 6 / 7 on the first run, then 7 / 7 on a full rerun |

The first-run e2e failure was "refuses an unauthorized reset before launching a browser". That test counts every `chrome-headless-shell` process on the machine, and saw four processes that were not its own. Alone it passed three times out of three, and the full file passed on rerun. These counts stay in this report; the public page does not quote test counts.

**Recorded run (the source of the page's figures).** The README's command flow was run against both demos, then each generated test against the buggy and the fixed page.

| Example | Steps | Removed | Replays (baseline / search / verify) | Decisions | Cache hits | Elapsed | Test: buggy / fixed |
|---|---|---|---|---|---|---|---|
| Duplicate submit | 9 → 6 | preview, note, decoy-wait | 44 (3 / 36 / 5) | 55 | 11 | 80.3 s | fails, Expected 1 / Received 2 · `1 passed (2.6s)` |
| Stale search | 10 → 6 | preview, note, decoy-wait, gap | 52 (3 / 44 / 5) | 85 | 14 | 30.1 s | fails, "Results for alpha (outdated)" · `1 passed (1.4s)` |

The stale-search run matches the measured run the README records: 52 replays, 14 cache hits, about 30 seconds. The reset token was random and never written to disk; a check confirmed it appears in no captured output.

How the data reached the page: `src/content/reproseed-run.ts` was generated from the sanitized reports and terminal output by a script kept outside the repository. Local paths are shortened to `…/`.

## The case study (`/work/reproseed/`)

| Section | What it shows | Evidence label |
|---|---|---|
| Hero | Title, thesis, the 9-step scenario with three steps struck in blue pencil, three results, facts (stack, role and authorship, status, scope) | Recorded output |
| 01 Problem | Why timing bugs are hard to reduce; the five things the command does; the scope statement | Verified |
| Bug Minimization Explorer | Six stages over one recorded run, for either example | Guided demonstration · recorded output |
| 02 Reproduction | Scenario excerpt, one replay step by step, failure signatures and the baseline, a sequence diagram (buggy against fixed), the safeguards | Verified · conceptual illustration |
| 03 Minimization | Delta debugging, the cache and the budget, the proof pass; the claim verbatim, then in plain words, including what 1-minimal does not mean | Verified · recorded |
| 04 Regression test | Export conditions, the command's own terminal output, an excerpt of the generated test with real line numbers | Recorded output |
| 05 Verified fix | Playwright output on the buggy and the fixed page, the fix as a diff, the second example with its own sequence and results | Recorded · verified |
| Limits | What the result does not claim; what is not built | Verified · not built |
| Evidence | The five labels, the run's conditions, authorship, sources | — |

**Visual identity: blue pencil on a test script.**
- The scenario is a numbered script on a ruled sheet with a margin rule. Removed steps are struck in blue pencil (`--rs-pencil: #2A4FC4`, 6:1 on paper).
- Failure is a vermilion (`#A8361A`) and a pass is the system's mint-deep.
- It is distinct from Poly's dark instrument stage and from the other project palettes.
- The strike is the data itself, not a decoration. The page says plainly that ReproSeed is a command-line tool, so none of the drawings is its interface.

## Bug Minimization Explorer

| Stage | Shows |
|---|---|
| 1 Reproduce | The full scenario, the check, the failure signature, three baseline replays |
| 2 Minimize | Every recorded search decision: 49 for duplicate submit, 79 for stale search |
| 3 Prove | For each kept step, what deleting it alone did (recorded) and why (from the demo page's source). Steps kept only because others depend on them are marked as such |
| 4 Verify | Five fresh replays, the status, the claim verbatim, the run's counts |
| 5 Test | The steps embedded in the generated test and an excerpt with its line numbers |
| 6 Fix | The test's result lines on the buggy and the fixed page, and the fix diff |

**The Minimize stage in detail**
- The search is a strip of marks, one per candidate, shaped by outcome so colour is never the only cue: reproduced, no failure, different failure, invalid subset, runner error.
- A native range input over the strip is the scrubber.
- Controls: previous and next, Play/Pause, and jumps to each reduction.
- As the smallest failing subset shrinks, the script strikes the removed steps, and the candidate's steps get a pencil wash.

**Built on recorded data only.** Every outcome comes from the run's report. Nothing executes in the browser, no visitor input is run, and there is no backend. The intro says the animation is not the minimizer.

**Input and accessibility**
- **Tabs:** ARIA tabs with arrows, Home and End; Next moves focus to the following tab.
- **Scrubber:** `aria-valuetext` names the candidate and its outcome.
- **Announcements:** previous, next and play are announced in a polite live region; playback itself is not announced line by line.
- **Touch:** horizontal drags scrub, while vertical swipes still scroll (`touch-action: pan-y`).
- **Reduced motion:** strikes and state changes are instant, and playback steps more slowly.

## Static page, routing and SEO

- **The page is a file, not a route.** `work/reproseed/index.html` builds to `dist/work/reproseed/index.html`. GitHub Pages serves it at `/work/reproseed/` on direct navigation, refresh, and back and forward. On GitHub Pages `/work/reproseed` redirects there; the local preview server serves it directly.
- **No router or framework change.** `scripts/work-pages.ts` is a small Vite plugin:
  - after the main build, it runs a second build for the pages under `work/`, so the homepage's bundles are unchanged;
  - it renders each page's `src/work/<slug>/server.tsx` with `react-dom/server` and writes the HTML and head;
  - the browser hydrates (`hydrateRoot`), with no hydration errors in any run;
  - in development the same renderer runs on each request.
- **Head, from one content object** (`caseStudy` in `src/content/reproseed.ts`, rendered by `src/work/head.ts`):
  - title, description, canonical `https://callmeraim.dev/work/reproseed/`, `robots: index, follow` (since Phase 5B: `noindex, follow` until launch, from the release switch);
  - Open Graph (`article`) and a Twitter large card;
  - JSON-LD `TechArticle` about a `SoftwareSourceCode`.
- **Social card.** `public/og/reproseed.png` (1200 × 630) is rendered from the built page itself in Chromium.
- **Sitemap.** `public/sitemap.xml` lists the page. Since Phase 5B it is left out until launch, and the build adds it when `launched` is true ([release-indexing.md](release-indexing.md)).
- **Content in the HTML.** All text, including the explorer's first stage and every chapter, is present for search engines and readers without JavaScript.
- **Navigation.**
  - The bar's "All work" link and the closing "Back to the portfolio" link go to the preview. The address is defined once (`site.home` in `src/work/site.ts`); change it to `/` at launch.
  - The preview now lands on a section named in its URL hash once it has rendered. The homepage's "Read the case study" marks `#reproseed` in the URL first, so the browser's Back button returns to the ReproSeed section, not the top of the page.

## Homepage integration

ReproSeed is work 02 of 05, after Poly and before R-Finance. The hero, Poly and the R-Finance → Visual Novel transition are unchanged.

The section contains:
- the thesis;
- the struck script, drawn once on first arrival and static with reduced motion or on return visits;
- two results;
- "Read the case study" and "Source".

On phones the script becomes a 3 × 3 sheet with the same strikes; tablets keep it beside the text. Skills gains a ReproSeed card (TypeScript, Node.js, Playwright) and a Testing group.

**Rebalancing, phones only:**
- PromptLock's method note folds into "How this model works". The "illustrative input" flag stays in view.
- Experience and About take a tighter rhythm.
- The Lab card is shorter.

| Page height (px) | 360 × 740 | 390 × 844 | 768 × 1024 | 1366 × 768 | 1440 × 900 |
|---|---|---|---|---|---|
| Phase 4.5 | 13,471 | 13,136 | 13,265 | 11,249 | 11,626 |
| Phase 5A | 14,019 | 13,690 | 13,948 | 11,982 | 12,394 |
| Change | +548 (+4.1%) | +554 (+4.2%) | +683 | +733 | +768 |

For context:
- The ReproSeed section is 756 px tall on a 390 phone and 685 px on desktop.
- Without rebalancing, the phone page would have grown by about 880 px.

## Verification (headless Chromium, production build)

| Check | Result |
|---|---|
| Static HTML | 200. The `h1`, all chapter headings, the claim, "verified-one-minimal", the recorded outputs and every evidence label are in the served HTML. Canonical, robots, Open Graph, Twitter and JSON-LD are valid. The social card is 1200 × 630 and the sitemap lists the page |
| Stills, case study, all five sizes | No horizontal overflow, 0 contrast failures, 0 text under 12 px, 0 targets under 24 px. One `h1`, no skipped heading levels, no broken in-page links, no console errors. The title fits its column at every size |
| Stills, homepage preview, all five sizes | Same checks, all pass |
| Explorer by keyboard | Tabs: arrows, Home, End and wrap-around. Scrubber: arrows, Home, End and value text. Previous and next are announced; key moments, Play/Pause and Next to the following tab all work. Each stage's panel matches the recorded data for both examples |
| Explorer by touch and pointer | Tapping tabs, a horizontal drag on the scrubber (candidate 1 → 11), tapping next, the example switch and clicking a tab all work |
| Motion | The hero's strikes animate once on load and finish within 2.4 s. With reduced motion nothing animates and the strikes are already drawn. The homepage reveal goes `later` → `now` on arrival, and is `done` with reduced motion |
| Fonts | All three load. With web fonts blocked the page lays out without overflow |
| Routing | All of these pass: a direct link to `#explorer` (lands below the bar); refresh; homepage → case study → Back (returns to `#reproseed`, section top at the bar) → Forward; "Back to the portfolio" (lands on the section) |
| Keyboard traversal | Case study: 24 stops, each with a visible ring; the skip link moves focus to `main`. Homepage preview: 64 stops (Phase 4.5: 62), all with rings |
| Homepage and Lab regression | Pixel-identical to the Phase 4.5 build at all five widths (Lab at two), with identical links, ids, headings, stylesheets and meta. A first capture differed at 768 only because the homepage's lazy screenshot had loaded in one build and not the other; capturing both with images loaded made them identical |
| Typecheck, build, `git diff --check` | Pass. `scripts/work-pages.ts` and `vite.config.ts` are outside `npm run typecheck` (the project has no Node types installed); they pass a strict check against borrowed Node types and run on every build and dev start |
| Firefox, Safari or WebKit, real phones | Not run. Firefox suites stay paused after earlier hangs; Safari and real devices are untested |

## Performance (lab, not field data)

Five cold runs, median, with the same profiles as Phases 3–4.5:
- Mobile: 412 × 823, 4× CPU, 1.6 Mbps, 150 ms latency.
- Desktop: 1350 × 940, 10 Mbps.

| Page | LCP mobile | LCP desktop | CLS | Transfer |
|---|---|---|---|---|
| Case study `/work/reproseed/` | **0.73 s** (runs 0.69–0.79) | 0.20 s | 0 | 139 KB (fonts 60, script 62, HTML 10, CSS 8) |
| Signal Path preview, Phase 5A | 1.61 s | 0.36 s | 0 | 192 KB |
| Signal Path preview, Phase 4.5 (same machine, same session) | 1.58 s | 0.35 s | 0 | 186 KB |
| Current homepage `/` | 1.00 s | 0.26 s | 0 | 95 KB |

Both targets are met: mobile LCP under 2.5 s and CLS under 0.05. The case study's LCP element is the hero summary on mobile and the title on desktop. Fonts load through preloads and metric-matched fallbacks, so the page shows no layout shift. The preview grew by 5.8 KB; its chunk is now 28.2 KB gzip (Phase 4.5: 23.7) because it carries the duplicate-submit run's data. The stale-search data loads only on the case study. No run failed.

## Decisions (all resolved in Phase 5B)

1. ~~**Authorship wording.**~~ Resolved: "Developed with AI-assisted coding tools, including Cursor. Implementation details and verification evidence are available in the public repository."
2. ~~**Indexing before launch.**~~ Resolved: `noindex` and out of the sitemap until launch, through the release switch.
3. ~~**Back links at launch.**~~ Resolved: `site.home` follows the same switch (`/?preview=signal-path` now, `/` at launch).

## Known limitations

- **Length.**
  - The case study is about 17,850 px tall on a 390 phone (about 21 screens) and 11,100 px on desktop.
  - The explorer and the chapters repeat some figures (the claim, the test results) on purpose, for readers who do not use the explorer.
- **Phone layout.** On phones the explorer's script sits above the scrubber. While scrubbing, the readout lists the candidate's steps in text.
- **Separate React copy.** The case study ships its own copy of React (about 62 KB gzip in total), separate from the homepage bundle, so the homepage's build stays exactly as it was.
- **Homepage length.** The preview grew about 4% on phones and about 6–7% on desktop.
- **Untested.** Safari or WebKit and real phones have not been tested.

## Files

**New**
- `work/reproseed/index.html`
- `scripts/work-pages.ts`
- `src/content/reproseed.ts`, `src/content/reproseed-run.ts`
- `src/work/` (`site.ts`, `head.ts`, `reproseed/`)
- `src/signal-path/sections/ReproSeed.tsx`, `src/signal-path/styles/reproseed.css`
- `public/og/reproseed.png`
- this report

**Changed**
- `vite.config.ts`, `public/sitemap.xml`
- `src/signal-path/`: `structure.ts`, `content.ts`, `SignalPathPreview.tsx`, `styles/index.css`, `styles/tokens.css` (ReproSeed tokens), `sections/BudgetPacker.tsx`, `styles/promptlock.css`, `styles/experience.css`, `styles/about.css`
- `src/content/profile.ts`
- `docs/content-evidence-ledger.md`

The homepage's own files (`index.html`, `src/App.tsx`, `src/data.ts`, `src/components/`) are not changed in this phase.

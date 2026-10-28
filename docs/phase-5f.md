# Phase 5F · Faultline case study

Status: implemented on `design/proof-signal`, awaiting review · Date: 2026-10-28
Related:
- [Faultline case-study specification](faultline-case-study-spec.md)
- [Phase 5E](phase-5e.md)
- [content evidence ledger](content-evidence-ledger.md) (section 4.6c, decision 13)
- [release steps](release-indexing.md)

This phase builds `/work/faultline/`, the third standalone case study. It also links the homepage showcase to the case study and fixes the stack-line wrap. Every fact comes from the public repository at main `a7d48f0` and release v0.1.0, as audited in Phase 5E. Nothing was re-run, and no fault was injected anywhere.

## 1. The page

| | |
|---|---|
| Route | `/work/faultline/`, on the existing static-page system (`work/faultline/index.html`, `src/work/faultline/server.tsx`). It is rendered at build time and hydrated, so direct loads, refreshes, Back and Forward work |
| Head | Title, description, canonical URL, Open Graph `article`, a Twitter large card, and JSON-LD `TechArticle` about the MIT-licensed source |
| Indexing | `noindex, follow` and out of the sitemap until the release switch (`src/work/release.ts`) is turned on |
| Social card | `public/og/faultline.png` (1200 × 630), rendered from the built hero in Chromium |
| Authorship | "Personal project · AI-assisted" (decision 13, approved in the brief) |
| Ways back | "Back to the portfolio" goes to `/?preview=signal-path#faultline`; "All work" goes to the preview's work section |

**Narrative.** Six chapters follow the hero and the shared overview:

| # | Chapter | What it shows |
|---|---|---|
| — | Hero | The thesis, the engineering question, the scope line, the links, and both recorded runs on one millisecond ruler |
| 01 | A controlled experiment | The four-service topology and its control lane, isolation, the eight-step lifecycle, run limits, and the boundary statement |
| 02 | Where the deadline cuts | The signature interaction, what the two runs show in words, and a permanent comparison table |
| 03 | Recovery, cleanup and traces | Cleanup guarantees and where they end, plus one traced 400 ms request from the milestone-2 integration run |
| 04 | History, dashboard and evidence | The project's own dashboard screenshot, history facts, the `.flb` file's four entries, and both bundles' hashes |
| 05 | What ships, what does not | Twelve capabilities by status: released, in source, unreleased, experimental, planned, unsupported |
| 06 | What the record shows | What it shows, its limits, sources and authorship |

**Visual direction.**
- Paper surfaces for the argument; the homepage strip's lighter sheet for every figure.
- A millimetre rule over each chapter.
- Burnt orange for the fault and what it caused; mint-deep for a recovered or checked result.
- It shares Signal Path's tokens and type. It is not dark like Poly's stage, and its instrument is a time scale rather than ReproSeed's struck script.

## 2. Signature interaction: where the deadline cuts

**The figure.** A four-lane timing diagram of one request: runner, frontend, Toxiproxy, dependency. Time runs left to right from 0 to 450 ms, and the frontend's 250 ms deadline runs through every lane.

**The two recorded states.** The only states are the two runs in `docs/validation.md`, "Actual portable files":

| | 80 ms injected | 400 ms injected |
|---|---|---|
| Runner | Request ends at 83.16 ms (mean), 2xx | Request ends at 253.20 ms (mean), HTTP 504 |
| Frontend | Waits about 80 ms; the reply arrives | Waits 250 ms, gives up, answers 504 |
| Toxiproxy | Holds the reply 80 ms | Holds it 400 ms; the 150 ms past the deadline is hatched and marked "Never waited for" |
| Dependency | Answers at once | Answers at once |
| Conditions | `clean-80.flb` · tracing off · 10 requests per phase · commit 27b3775 | `clean-400.flb` · tracing on · 5 requests per phase · commit 27b3775 |
| Phases | 2.17 / 83.16 / 0.25 ms; none of 10 failed | 0.58 / 253.20 / 0.36 ms; 5 of 5 failed under the fault |

**Evidence labels.**
- Recorded: response times and outcomes.
- Verified in source: the latency and the deadline, as configured.
- Conceptual illustration: the order of events inside one request.

The mechanism is cited to `docs/reports.md`. The trace in chapter 03 shows the same thing from inside a different, labelled run: the dependency's span took under 0.01 ms, and the frontend's call ended at 250.46 ms with a timeout.

**Controls.**
- **Run choice.** A native radio group: arrow keys, click and tap, 52 px targets, a visible focus ring.
- **Live region.** It announces the chosen run's result.
- **Replay.** Choosing a run, or the "Replay the recorded timing" button, sweeps the marks in once at a quarter of the real speed, with a cursor. Each outcome lights up as the cursor reaches it, the deadline flares in the 400 ms run, and then the three phases light in order, recovery last. Labels stay readable throughout. The button says that nothing runs in the browser.
- **Reduced motion.** There is no replay and nothing moves. The diagram, phases, legend and table are complete at rest in both states.

**Never shown:**
- an interpolated or simulated latency;
- a significance or overhead claim;
- any run outside the record.

A permanent note says the two runs differ in sample count and tracing, and are not a benchmark.

## 3. Real media

- **Dashboard screenshot.** The README's screenshot (`docs/images/dashboard.png`, Git blob `f8a2ee0`) appears inline as `public/images/faultline-dashboard.webp`. It is a lossless WebP of the same pixels (58 KB against 140 KB), lazy-loaded, with alt text and a link to the original PNG at the pinned commit.
- **Demo.** The 80-second video is linked from the hero, the overview and the sources. It is not downloaded or bundled.
- **No imitation.** No dashboard, terminal, log or alert is recreated.

## 4. Homepage integration

- The Faultline showcase gains a "Read the case study" button, styled like ReproSeed's. The section grows by 4–48 px depending on screen width. Nothing else on the page changes, and the showcase stays as it was.
- **Stack-line fix.** It now uses non-breaking spaces before its separators, so a wrapped line never starts with "·". Before, this happened at both 1366 and 1440.

## 5. Verification

Production builds of this phase and of `e52bd9a` were served locally and tested in Playwright's headless Chromium (build 1248). Safari, Firefox and physical devices were not tested.

| Check | Result |
|---|---|
| Typecheck, build, `git diff --check`, offline topology rebuild | Pass |
| Static output | `dist/work/faultline/index.html` returns 200 and holds the whole case study, its head tags and `noindex, follow`; the sitemap lists only `/` |
| Case study at 360, 390, 768, 1366, 1440 | No horizontal overflow, contrast failures, text under 12 px, targets under 24 px, duplicate ids, broken in-page links, heading skips, or console or network errors; one `h1` |
| Hydration | No warnings; the hydrated text equals the server-rendered text |
| Fonts | Every character is in its subset font. One "≤" was replaced with "max" |
| Interaction | Arrow keys, click and tap switch runs; the live region announces; the replay cursor advances and every animation finishes; reduced motion has no replay and no animation |
| Navigation | Refresh keeps the page. A deep link to `#records` lands under the bar. The Contents menu lists six chapters, navigates and closes. Homepage → case study → Back returns to `/?preview=signal-path#faultline` with the section at the top; Forward returns to the case study |
| Links | Every external link opens in a new tab with `noreferrer`. All 25 GitHub links (repository, release, demo, commit and every cited document and heading) return 200; the footer's LinkedIn link answers automated requests with LinkedIn's usual 999 |
| Regressions at all five sizes | ReproSeed, Poly Predictor Kit, the Code Topology Lab and the current homepage are identical in text and height to `e52bd9a`. In the preview, only the Faultline section changed |

**Case-study length:**

| | 360 × 740 | 390 × 844 | 768 × 1024 | 1366 × 768 | 1440 × 900 |
|---|---|---|---|---|---|
| Page (px) | 15,873 | 15,461 | 11,174 | 8,574 | 8,664 |
| Screens | 21.4 | 18.3 | 10.9 | 11.2 | 9.6 |

ReproSeed is 12,612 px and Poly 11,620 px at 1440.

**Performance.** One headless Chromium process, a local static server and a cold cache on every run. The mobile lab profile is 412 × 823 at DPR 1.75, 4× CPU slowdown, 150 ms round trip, 1.6 Mbps down and 750 kbps up. The desktop profile is unthrottled at 1440 × 900.

| | LCP | CLS | Long tasks | Transferred |
|---|---|---|---|---|
| Faultline, mobile (3 runs) | 1,324–1,340 ms (median 1,328; hero summary text) | 0.0016 | 0 | 418 KB |
| ReproSeed, mobile | 1,312 ms | 0.0016 | 0 | 376 KB |
| Poly Predictor Kit, mobile | 1,304 ms | 0.0016 | 0 | 364 KB |
| Faultline, desktop (3 runs) | 28–40 ms | 0.0021 | 0 | 418 KB |

**Interactions.**
- Switching runs paints within two frames in 15–31 ms, under the mobile CPU slowdown.
- The replay creates no long tasks.

**Bundle sizes.**
- The case study's own script is 12.1 KB and its styles 9.0 KB, gzipped (ReproSeed: 12.6 and 8.5 KB; Poly: 12.9 and 8.7 KB).
- The homepage preview grows by under 0.2 KB gzipped.

## 6. Critical assessment

**What works:**
- **The hero.** It states the finding before a word is read: one ruler, one deadline, one bar passing under it and one cut there.
- **The signature figure.** It explains a real systems mechanism (a timeout censors latency) with only recorded and configured values, and labels which is which.
- **The trace chapter.** It adds independent, recorded corroboration from inside the request, which few portfolio pages can show.
- **The status chapter.** It makes the release boundary impossible to misread.

**What is weaker:**
- **Phone length.** The page is long on phones (18.3 screens at 390), as long as the other two case studies. The topology and the status list are the longest parts there; folding the status list on phones would save about 1,000 px.
- **Dashboard text.** At its inline size on desktop the screenshot's small text is hard to read. Its numbers are repeated in the comparison table, and the original is one click away.
- **The title's slash.** The slipped "line" with its orange hairline is a deliberate brand gesture, but some readers may see a slash.
- **Shared base.** ReproSeed and Faultline share the paper base; they are told apart by their instruments, not by the ground.

## 7. Before launch

These carry over:
1. Make Signal Path the homepage and turn on the release switch. All three case studies then join the sitemap ([release-indexing.md](release-indexing.md)).
2. Resolve the ledger's open decisions (now without 13).
3. Test in Safari or iOS, Android Chrome and Firefox, and on physical devices.
4. Recheck `/` after the switch.

## Files

**New:**
- `work/faultline/index.html`
- `src/work/faultline/`: `CaseStudy.tsx`, `main.tsx`, `server.tsx`, `meta.ts`, `structure.ts`, `scale.ts`, `ui.tsx`
- `src/work/faultline/sections/`: `Hero.tsx`, `Chapters.tsx`
- `src/work/faultline/deadline/`: `DeadlineCut.tsx`, `deadline.css`
- `src/work/faultline/styles/`: `index.css`, `page.css`
- `public/images/faultline-dashboard.webp`
- `public/og/faultline.png`
- `docs/phase-5f.md`

**Changed:**
- `src/content/faultline.ts`
- `src/signal-path/content.ts`
- `src/signal-path/sections/Faultline.tsx`
- `src/signal-path/styles/faultline.css`
- `docs/content-evidence-ledger.md`, `docs/faultline-case-study-spec.md`, `docs/release-indexing.md`

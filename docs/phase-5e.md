# Phase 5E · Faultline and portfolio curation

Status: implemented on `design/proof-signal`, awaiting review · Date: 2026-10-28
Related: [Phase 5D](phase-5d.md) · [content evidence ledger](content-evidence-ledger.md) (sections 4.6 and 4.6c, decision 13) · [Faultline case-study specification](faultline-case-study-spec.md) · [code topology](code-topology.md)

This phase:
- removes JiraGenie from the portfolio's active content;
- audits the public Faultline repository;
- adds Faultline to the Signal Path homepage as a featured showcase in JiraGenie's place;
- specifies, but does not build, a Faultline case study.

## 1. JiraGenie removal

| Where | Before | After |
|---|---|---|
| Current site (`src/data.ts`) | Fifth project card | Replaced by Faultline. The grid keeps two cards, numbered 04 and 05 |
| Signal Path preview | "More work" section with one entry | Section, styles and `more-work` id removed. Faultline is a featured section instead |
| Skills index (`src/content/profile.ts`) | JiraGenie card; JavaScript and Node.js evidenced by it | Card replaced by Faultline. JavaScript moved to "Also", since no project on the page evidences it; Node.js keeps ReproSeed |
| Recognition track | Four stops, DubHacks first | Three stops, titled "Hackathon projects, in order" |
| Code Topology Lab | Five snapshots | Four: JiraGenie removed from the generator's list, the dataset rebuilt offline from the same pinned cache (the other snapshots unchanged, byte for byte), its cache removed. The map's anchors and the selector grid were rebalanced; the heading says "Four public snapshots." |
| README | "five pinned public source snapshots", 82 files and 70 imports | Four snapshots, 75 files and 66 imports |

**Kept:**
- the team repository and its Devpost page (untouched);
- the ledger's JiraGenie entries, marked as removed;
- earlier phase reports;
- the Lab document's original verification notes, annotated.

The built bundle and every page tested contain no reference to the project, its event, the repository owner or its Devpost slug.

## 2. Faultline evidence audit

The full classification is in [ledger section 4.6c](content-evidence-ledger.md). The source is the public repository at main `a7d48f0` (unchanged when rechecked on 2026-10-28) and release v0.1.0.

| Status | Capabilities |
|---|---|
| Implemented and tested | Go engine and CLI. The sample topology in Docker Compose. Owned Toxiproxy latency with cleanup. Baseline, fault and recovery phases with bounded limits. Optional OpenTelemetry tracing with a temporary Jaeger. SQLite history. The read-only React dashboard. Portable `.flb` bundles with offline verify, inspect and compare |
| Released (v0.1.0) | Only `faultline-bundle`, the offline evidence tool, for macOS and Linux (amd64 and arm64). macOS builds are unsigned; Windows is unsupported |
| Unreleased, on main | Offline reliability gates (`evaluate`). The custom-service planner (plan only). The supervisor foundation (not executable) |
| Planned | Owner-selected custom-service labs that run; more fault types; concurrent load; a benchmark methodology |
| Unsupported | Arbitrary or production targets, browser fault control, a hosted service, AI analysis, statistical significance. There is no hosted CI |

**Not re-run.** Go is not installed here, so no Faultline command or test was run, and no fault was injected anywhere. The page quotes one recorded run from the repository's validation record:
- 400 ms latency, tracing on, 5 sequential requests per phase, clean commit `27b3775`;
- phase means of 0.58, 253.20 and 0.36 ms, with 5 of 5 HTTP 504 under the fault;
- `clean-400.flb`, 5,162 bytes, exported twice with identical bytes and checked offline.

**Authorship.** All 73 commits are Raimbek's, with no co-author trailers. The repository's `AGENTS.md` and `codex/` branches indicate work with a coding agent. The page says "Personal project · AI-assisted" until Raimbek confirms the wording (decision 13).

## 3. The homepage showcase

**Position and number.**
- Position 03 of 06, after ReproSeed. The work order is Poly Predictor Kit, ReproSeed, Faultline, R-Finance, AI Visual Novel Creator, PromptLock.
- The summary relates it to the two sections above: "Poly Predictor Kit is a system of services; ReproSeed turns a failure into evidence. Faultline joins the two…"

**Look.**
- A light recorder strip run edge to edge across the page, between ink rules. Burnt orange (`#B03F12`) marks the fault and what it caused; mint-deep marks a recovered or checked result.
- It is not a dark card. It does not use R-Finance's square grid, ReproSeed's sheet or PromptLock's printout.
- The title's "line" slips along a thin orange fault.

**The strip, complete at rest.**
- **Scale and lines.** A linear 0–460 ms scale with faint rules every 50 ms. The 250 ms frontend deadline runs across all three phases; the 400 ms injection is a dashed line over the fault phase.
- **Censored band.** The band between them is hatched and labelled "Censored by the deadline".
- **Trace.** The pen line steps at the recorded phase means and is labelled with them. It shows means only; individual requests are not plotted.
- **Outcomes.** One mark per request: five passes, five HTTP 504s, five passes.
- **Evidence tag.** Past a perforation: `.flb`, 5,162 bytes, the shortened SHA-256 and "Checked offline".
- **Caption.** "One recorded run · 400 ms latency · Tracing on · 5 sequential requests per phase · Local Docker · Not a benchmark".

**Interaction.** Four stage tabs on the strip's top edge: Baseline, Injected fault, Recovery, Recorded evidence. The default is the fault.
- **What each stage shows.** The selected column is shaded. The panel below shows that stage's path: request hops with what each recorded, or, for evidence, report → SQLite → `.flb` → verifier.
- **Citations.** Each stage has a one-line title, a short explanation and its source file at the audited commit.
- **Evidence stage.** It shows the full hash and the limit "SHA-256 detects changed content; it does not prove who ran the experiment."

**Motion.**
- **First visit.** On the session's first visit, the pen crosses the strip once at a constant speed (1.6 s) and reveals the record behind it, then the tag settles in.
- **Stage changes.** These fade the panel in over 260 ms.
- **Reduced motion and back navigation.** With reduced motion, or on back/forward navigation, nothing moves and the strip is drawn complete.

**Phones.**
- The tabs show short names (the full names stay in each tab's text). Failed requests are bars, and the hash shows in full only in the evidence stage.
- The path stays a four-stop line, and the hatched band carries the injected-latency label.

**Links.** Source, Demo video (the README's demo), Release v0.1.0 and the stack.

## 4. Verification

Production builds of this phase and of the previous commit (`9b52b69`) were each served locally and tested in Playwright's headless Chromium. All results below are from that setup. Safari, Firefox and real devices were not tested.

| Check | Result |
|---|---|
| Typecheck, build, `git diff --check`, offline topology rebuild | Pass |
| Removed project in rendered pages (homepage preview, current site, both case studies, the Lab) and in the built files | Absent |
| Work numbering | 01 / 06 to 06 / 06, no duplicate ids, no broken in-page links (including the skills card and recognition links to `#faultline`) |
| Faultline at 390, 768, 1366 and 1440 | No horizontal overflow, contrast failures, text under 12 px, targets under 24 px, label collisions or console errors. Labels drawn over the strip's rules and hatching use a darker ink, 4.6:1 even against a hatch line |
| Stage tabs | Arrow keys, Home and End move selection and focus with wrap-around. Roving tabindex. `aria-selected`, `aria-controls` and `aria-labelledby` wired. Visible 2 px focus ring. Mouse click and touch tap select. Every stage's source link points to the audited commit |
| Motion | Reduced motion: no animations, strip complete. Full motion: the pen crossed at 25%, 59%, 97% and 100% in samples, and the tag appeared after it |
| Faultline links | Repository, README demo anchor, release, commit and the three cited documents return HTTP 200; the cited headings exist |
| Performance (one headless run per build and size, whole page scrolled) | Cumulative layout shift 0.0002 at 390 and 0.0001 at 1440, the same as before; no long tasks. A tab switch paints within two frames (about 29 ms) |
| Bundle | Preview script +3.1 KB and styles +1.7 KB gzipped; main script +0.1 KB; Lab script −0.6 KB |

**Homepage preview length** (px):

| | 390 × 844 | 768 × 1024 | 1366 × 768 | 1440 × 900 |
|---|---|---|---|---|
| Before | 13,758 | 13,998 | 12,031 | 12,467 |
| After | 14,502 (+5.4%) | 14,559 (+4.0%) | 12,635 (+5.0%) | 13,079 (+4.9%) |
| Faultline section | 1,256 | 1,184 | 964 | 992 |
| "More work" (removed) | 507 | 508 | 384 | 407 |

**Other height changes:**
- **Recognition.** 70 px shorter on phones and 171 px shorter on tablets (one fewer stop).
- **Skills.** 41 px and 27 px taller (four new skills).
- **PromptLock.** About 25 px taller, because its printout now ends with the same closing space as the sections above it.

No other section changed.

## 5. Existing pages

| Page | Result at 390, 768, 1366 and 1440 |
|---|---|
| ReproSeed and Poly Predictor Kit case studies | Identical text and identical height to the previous commit; still `noindex` |
| Current site | Only the fifth project card changed (Faultline in JiraGenie's place) |
| Code Topology Lab | Four repositories; each opens and enters its neighbourhood; totals 75 files and 66 imports |
| Hero, Poly Predictor Kit, ReproSeed, R-Finance, Visual Novel, Experience, About, Contact | Unchanged heights; no code changes to the hero, its signal or the site bar |

## 6. Case study

[faultline-case-study-spec.md](faultline-case-study-spec.md) specifies:
- an 8–10 screen case study;
- the recommended signature interaction, "Where the deadline cuts". It switches between the two recorded runs in the same validation record, 80 ms (below the deadline: 83.16 ms, 0 of 10 failed) and 400 ms (above it: 253.20 ms, 5 of 5 HTTP 504), with each run's conditions and bundle hash, and no interpolated values.

Not built.

## 7. Portfolio hierarchy after this phase

| Tier | Projects |
|---|---|
| Featured, with a case study | Poly Predictor Kit, ReproSeed |
| Featured, homepage showcase (case study specified) | Faultline |
| Featured experience | R-Finance |
| Secondary | AI Visual Novel Creator, PromptLock |
| Removed | JiraGenie |
| Private, unpublished | Internship Radar |

Faultline sits next to ReproSeed, which reverses Phase 5D's advice to keep the two personal AI-assisted tools apart. The pairing is now explicit in the copy, and the two look different. If the adjacency still reads as repetitive, swap Faultline and R-Finance.

## 8. Before launch

These carry over from Phase 5D:
1. Make Signal Path the homepage and turn on the release switch.
2. Resolve the open decisions, now including 13 (Faultline authorship wording).
3. Test in Safari or iOS, Android Chrome and Firefox.
4. Recheck `/` after the switch.

On a phone the homepage is now about 17 screens long. Phase 5D's suggestion to compact Visual Novel and PromptLock is the main remaining way to shorten it.

## Files

**New:**
- `src/content/faultline.ts`
- `src/signal-path/sections/Faultline.tsx`
- `src/signal-path/styles/faultline.css`
- `docs/phase-5e.md`
- `docs/faultline-case-study-spec.md`

**Removed:**
- `src/signal-path/sections/MoreWork.tsx`
- `src/signal-path/styles/more.css`
- `data/topology-cache/jiragenie/`

**Changed:**
- `src/data.ts`, `src/content/profile.ts`
- `src/signal-path/`: `content.ts`, `structure.ts`, `motion.ts`, `SignalPathPreview.tsx`, `sections/Recognition.tsx`
- `src/signal-path/styles/`: `index.css`, `tokens.css`, `promptlock.css`, `recognition.css`
- `src/topology/`: `data.json`, `Folio.tsx`, `CodeTopologyLab.tsx`, `CodeTopologyLab.css`
- `scripts/generate-topology.py`
- `README.md`
- `docs/content-evidence-ledger.md`, `docs/code-topology.md`

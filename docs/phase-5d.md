# Phase 5D · Final Poly attribution and portfolio review

Status: implemented on `design/proof-signal`, awaiting review · Date: 2026-10-27
Related: [Phase 5C](phase-5c.md) · [Phase 5B](phase-5b-poly.md) · [content evidence ledger](content-evidence-ledger.md) (section 4.3, decision 12) · [release steps](release-indexing.md)

This phase:
- finalizes Poly Predictor Kit's public attribution;
- prepares a private design spike for a possible future case study, kept outside the repository's tracked files (nothing about it is public);
- reviews the portfolio's project hierarchy before launch.

## 1. Poly Predictor Kit attribution

**Public wording, everywhere it appears** (current site, Signal Path preview, case study): "Developed the Gemini-powered market summarization and TF-IDF / Logistic Regression comment-classification pipelines as part of the team project that won the Polymarket Track at QuackHacks 2025."

**What visitors see:**
- **Raimbek's contribution.** A chapter right after the overview, with one card per pipeline and links to its code.
- **The team's architecture.** The Chrome extension and popup, the Flask service around the summarizer, the steamroller detector, the web front page, and the Devpost team.
- **Credit per pipeline, not per stage.** On the system map each line carries one label, "Raimbek's pipeline" or "Team component". The stations no longer carry individual author badges, and the toggle reads "Whole system" / "Raimbek's pipelines".

**Removed from public content:**
- the evidence-basis badge, and any statement about where or how the work was done;
- per-stage authorship labels;
- wording that treated commit authorship as a complete record of collaboration.

That wording was removed from the page, its source comments, the ledger and the Phase 5B and 5C reports. The supporting notes are kept privately.

**Unchanged:** the system map's behaviour, the risk shape, the other chapters and the visual design.

**Verification (headless Chromium, production build):**

| Check | Result |
|---|---|
| Typecheck and build | Pass |
| Static HTML | The sentence above, "Raimbek's pipeline" and "comment-classification pipeline" are present. None of the retired phrases appears, nor accuracy, user or deployment claims. `noindex, follow`; the sitemap lists only `/` |
| Stills (Poly, ReproSeed, homepage preview × five sizes) | No overflow, contrast failures, small text, small targets, clipped headings, broken links or console errors |
| System map | All behaviours pass; the pipeline highlight and team dimming work |
| Keyboard | Poly: 60 stops (three new code links), all with visible focus |
| Homepage preview | "My part" shows the sentence; both pipelines are marked as Raimbek's; scikit-learn and Snowflake are on the Poly card |

| Poly page height (px) | 360 × 740 | 390 × 844 | 768 × 1024 | 1366 × 768 | 1440 × 900 |
|---|---|---|---|---|---|
| Phase 5C | 16,587 | 16,006 | 12,530 | 11,581 | 11,917 |
| Phase 5D | 16,429 | 15,856 | 12,476 | 11,221 | 11,620 |

## 2. Portfolio review

**Homepage length, measured on the Signal Path preview:**

| Section | 390 × 844 | 1440 × 900 |
|---|---|---|
| Hero | 631 | 594 |
| Poly Predictor Kit | 1,543 | 1,091 |
| ReproSeed | 752 | 685 |
| R-Finance | 1,587 | 1,977 |
| AI Visual Novel Creator | 1,733 | 1,593 |
| PromptLock | 1,816 | 1,406 |
| More work | 507 | 407 |
| Experience, recognition, skills, about, contact | 4,920 | 4,513 |
| **Whole page** | **13,758 (16.3 screens)** | **12,467 (13.9 screens)** |

The page is long. The two secondary hackathon projects take about a quarter of it on phones.

**Recommended hierarchy** (a recommendation only; no content was removed):

| Tier | Projects | Treatment |
|---|---|---|
| Featured, with a case study | Poly Predictor Kit, ReproSeed; a third once its publication is approved | A homepage section each, plus a standalone case study with one signature interaction and a length budget |
| Featured experience | R-Finance | A homepage section within the approved wording; no case study |
| Compact showcase | AI Visual Novel Creator, PromptLock | One compact card each in "More work", with no live demo on the homepage; this saves an estimated 2,800 px on phones |
| Archive | JiraGenie | One line in "More work" |

- **Depth tiers.** The case studies should not all be equally long. Poly and ReproSeed carry public code evidence, so they run long (about 13 and 14 desktop screens). A third case study should be shorter (8–10).
- **Order.** Keep the featured order Poly, ReproSeed, R-Finance, and avoid placing two personal AI-assisted tools next to each other.

**Before launch:**
1. Make Signal Path the homepage and turn on the release switch ([release-indexing.md](release-indexing.md)), and decide what happens to the legacy homepage.
2. Resolve the ledger's open decisions:
   - R-Finance name, logo and approval scope;
   - the knowledge assistant's name;
   - CodeDay award evidence;
   - PromptLock contribution wording;
   - team consents for screenshots;
   - the résumé phone number.
3. Test in Safari or iOS, on Android Chrome, and once in Firefox, run on its own.
4. Recheck performance and accessibility on `/` after the switch.

**Readiness:** the Poly and ReproSeed case studies and the Signal Path homepage are built and tested in Chromium, and the attribution is final. Launch is blocked only by the homepage switch, the open approvals and cross-browser testing.

## Files

**New:** `docs/phase-5d.md`.

**Changed:**
- `src/content/poly.ts`, `src/content/evidence.ts`, `src/content/systems.ts`, `src/content/profile.ts`, `src/data.ts`
- `src/work/poly-predictor-kit/`: `sections/Chapters.tsx`, `sections/Hero.tsx`, `map/SystemMap.tsx`, `map/map.css`
- `src/work/shared/styles/shell.css`
- `docs/content-evidence-ledger.md`, `docs/phase-5b-poly.md`, `docs/phase-5c.md`

Nothing was committed, pushed, merged or deployed.

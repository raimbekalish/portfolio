# Phase 4 · Full portfolio experience

Status: approved; refined in [Phase 4.5](phase-4-5-polish.md) · Date: 2026-10-22
Preview: `/?preview=signal-path` · Related: [Phase 3 preview](phase-3-signal-path-preview.md) · [content evidence ledger](content-evidence-ledger.md) · [creative plan](creative-portfolio-plan.md)

## Summary

The Signal Path preview is now the complete homepage: the approved hero, four featured projects, an index of smaller work, experience, recognition, skills, about and education, the Code Topology Lab entry and a contact finale. Each project has its own visual identity inside one system of paper, monumental type, near-black instruments, restrained mint, grids and technical labels. The homepage at `/` and the Lab at `/?lab=code-topology` are unchanged (see Regression).

## View it locally

```sh
npm run build && npm run preview     # then open http://localhost:4173/?preview=signal-path
```

## Page structure

| # | Section | Anchor | Identity |
|---|---|---|---|
| — | Site bar | — | Sticky paper bar; section links with a current-section mark; résumé. A menu below 900px |
| 1 | Hero | `#top` | Unchanged from Phase 3.5 apart from short-screen spacing |
| 2 | Poly Predictor Kit | `#poly-predictor-kit` (inside `#work`) | The dark instrument stage; the system diagram |
| 3 | R-Finance | `#r-finance` | Drafting film: two conceptual drawing sheets with title blocks |
| 4 | AI Visual Novel Creator | `#ai-visual-novel-creator` | A dusk screening room around the real screenshot |
| 5 | PromptLock | `#promptlock` | A printout: monospaced title, tabular numbers, the budget meter |
| 6 | Also built | `#more-work` (JiraGenie at `#jiragenie`) | A plain typographic index |
| 7 | Experience | `#experience` | The hero's ruler again, counting months |
| 8 | Recognition | `#recognition` | The page's one band of full mint |
| 9 | Skills | `#skills` | An evidence matrix (a list by project on phones) |
| 10 | About and education | `#about` | An editorial spread, with the Lab as a small ink card |
| 11 | Contact | `#contact` | Monumental type mirroring the hero; the signal returns |

The order follows the brief. Recognition sits between experience and skills so the one verified award reads as part of the record rather than as decoration.

## Architecture

| Concern | Where |
|---|---|
| Verified content | `src/data.ts` (shared with the homepage; additive `id`, `start`, `end` fields only) and `src/content/` (`systems.ts`, `rfinance.ts`, `visualNovel.ts`, `promptlock.ts`, `profile.ts`), each citing its public source |
| Selection and joins | `src/signal-path/content.ts` (never selects the unverified CodeDay award wording) |
| Navigation and section structure | `src/signal-path/structure.ts` (stable ids, work order and numbering, bar links) |
| Shared design tokens | `src/signal-path/styles/tokens.css` (paper, ink, mint, and each project's palette) and `base.css` |
| Motion | `src/signal-path/motion.ts` (tokens, the motion policy context, path helpers); `useSignalPath.ts` (the opening) |
| Hooks | `src/signal-path/hooks.ts` (media queries, first arrival, current section) |
| Sections | `src/signal-path/sections/*.tsx`, one file per section, each with `styles/<section>.css` |

Project sections use stable slugs, never array positions. The preview is still one lazily loaded chunk; nothing was added to the homepage bundle beyond the new data fields.

## Signature interactions

| Interaction | Where | What it shows | Keyboard, touch, reduced motion |
|---|---|---|---|
| Request trace | R-Finance, both sheets | The order of a request (or a question) through each service, station by station, with a narrated readout | A button; Enter or Space; narration in a live region; with reduced motion the signal steps without travelling |
| Budget model | PromptLock | How the mode and the budget change what fits, on clearly labeled illustrative input | Native radio groups (arrow keys); tiles move to their new places (FLIP), and do not move with reduced motion |
| Frame anatomy | Visual Novel | Which pipeline stage produced which part of the real screenshot | Toggle buttons across each whole storyboard frame; the frame opens like a projector gate once per session |
| Pipeline tabs | Poly, phones | One pipeline at a time, readable at full size, with the wiring following the chosen pipeline | ARIA tabs with arrow keys, Home and End |
| Finale | Contact | The signal underlines the address and lands as the period, closing the loop the hero opened; a copy-address control | Plays once per session; static with reduced motion; copying is announced |
| Dusk transition | R-Finance into Visual Novel | The drafting film gives way to the screening room through a sunset haze | Static; nothing moves |

No dependency was added; everything uses CSS, SVG and the Web Animations API.

## Content decisions

Every fact comes from `src/data.ts`, the current site, the public résumé PDF or a public project page; the ledger records each source. Specific Phase 4 decisions:

- **R-Finance** uses only sentences already public on the current site, under the Phase 4 authorization. Both drawings carry "Conceptual drawing, not the product interface" and "Internal work · no public source". No logo, no assistant name.
- **AI Visual Novel Creator** claims no award. Only the CodeDay showcase is linked; the repository link is not placed in the new page while the team repository's credential issue is open. The screenshot is cropped by CSS to the game window, never edited, and credited.
- **PromptLock** uses the current site's narrower contribution wording (the résumé's broader wording is still an open decision). The budget model's input is invented and labeled as such.
- **JiraGenie's** skills (JavaScript, Node.js) come from Raimbek's own public commits.
- **Canva** uses the résumé's two lines, as the ledger decided; **teaching** adds the résumé's second line.
- **Recognition** names one award, "Winner, Polymarket Track — QuackHacks 2025". CodeDay is a "Showcase project"; DubHacks and NexHacks are "Hackathon entry".

### What the preview leaves out from the current site, and why

| Current site | Phase 4 preview | Why |
|---|---|---|
| "AI award · CodeDay Seattle 2025" (project label and honors list) | Not shown | No accessible evidence (ledger section 3) |
| "Arfi" as the assistant's name | "AI knowledge assistant" | Name unresolved (Phase 4 brief) |
| A static mock of the assistant's chat screen | Not reused | A conceptual drawing must not look like a product screen |
| Visual Novel repository link | Showcase link only | Source-link hold (ledger 4.4); the homepage keeps its existing link |
| Canva's three site bullets | The résumé's two | Ledger decision |
| PromptLock result line ("…transparent before-and-after token metrics") | Not shown | Could read as measured results; the budget model shows the behaviour instead, labeled illustrative |
| JiraGenie result line ("Built and demonstrated at DubHacks 2025") | "DubHacks 2025 · Team project" and "Hackathon entry" | Kept to what Devpost shows |
| "…software engineering and AI/ML internships" (contact) | "…software engineering internships" | The approved Phase 3 availability line, used everywhere in the preview |
| Phi Theta Kappa under About | Under Recognition | Grouped with the other honors |

Nothing else was dropped: every project, role, school, honor, link and listed skill on the current site appears in the preview.

## Results (production build, headless Chromium unless noted)

Review page: private Claude artifact, plus a local copy at `tmp/signal-path-preview/phase-4/review/index.html` (gitignored) with every capture and recording.

| Check | Result |
|---|---|
| First-screen facts and links at 360, 390, 768, 1366 and 1440 | Pass at all five |
| Text cut by the first screen's bottom edge | None. At 1366 × 768 the project title now fits whole; at 360 × 740 it sits wholly below the fold |
| Horizontal overflow, clipped headings | 0, 0 |
| WCAG AA text contrast, default state and seven interactive states | 0 failures |
| Text under 12 px, targets under 24 px | 0, 0 (about two thirds of controls are under the 44 px AAA size in one dimension) |
| Heading levels skipped, broken in-page links | 0, 0 |
| Keyboard | 59 stops, each with a visible ring; none hidden by the sticky bar |
| Request trace, budget model (all 16 mode × budget combinations within budget and in priority order), frame anatomy, phone pipeline tabs, phone menu, copy address, current-section mark, matrix and timeline highlights, finale | Pass, by pointer, touch and keyboard as applicable |
| Opening (unchanged) | 2.85 s desktop, 2.69 s phone; 60 fps; 0 frames over 20 ms at 1× and 4× CPU; CLS 0 |
| Worst interaction at 4× CPU | 24 ms (lab proxy for INP) |
| Reduced motion | Finished composition at once; no animation is created; no Replay control |
| Session, back/forward, Replay by pointer and keyboard, fonts blocked | Pass |
| Firefox 155 (headless) | Reduced-motion checks at 1440 and 390 pass; one controlled motion smoke test passed (opening and a trace). Two earlier combined runs hung when a second instance started right after the first was killed; they were stopped, not retried |
| Safari or WebKit, real phones | Not tested |

### Performance (lab, not field data)

Five cold runs, median; same profiles as Phase 3.

| Target | LCP mobile | LCP desktop | CLS | Transfer |
|---|---|---|---|---|
| Original homepage | 0.98 s | 0.26 s | 0 | 94.0 KB |
| Current homepage | 0.98 s | 0.26 s | 0 | 94.7 KB |
| Signal Path, Phase 3.5 | 1.36 s | 0.30 s | 0 | 164.1 KB |
| Signal Path, Phase 4 | 1.56 s | 0.35 s | 0 | 184.1 KB |
| Code Topology Lab | 1.06 s | 0.26 s | 0 | 101.9 KB |

The preview chunk is 22.7 KB of JavaScript and 11.0 KB of CSS (gzip); the screenshot loads lazily. The first benchmark run stalled when the Mac's lid closed (2026-10-22 23:28); the six scenarios finished before that were kept and the remaining four were rerun alone with no failures, on a build whose asset hashes match the final one.

### Regression

The homepage at all five widths and the Lab at two are pixel-identical to the Phase 3.5 capture, with identical links, ids, headings and stylesheets. Against the original baseline, the only difference is the approved award line. `npm run typecheck`, `npm run build` and `git diff --check` pass; the project has no automated test suite.

## Known limitations

- Untested in Safari and on real devices; performance numbers are lab measurements.
- The phone page is about 17 screens long; R-Finance (about 2,600 px on phones) and the desktop Skills matrix are the tallest sections.
- The R-Finance → Visual Novel transition lives at the bottom of R-Finance, so it depends on that section order.
- The current-section mark shows Experience while Recognition is on screen.
- The preview still loads the homepage bundle and its Manrope font first; both go away when the redesign becomes the homepage.

# Phase 4.5 · Art direction, mobile refinement and polish

Status: implemented on `design/proof-signal`, awaiting review · Date: 2026-10-24
Preview: `/?preview=signal-path` · Related: [Phase 4](phase-4-full-portfolio.md) · [content evidence ledger](content-evidence-ledger.md)

A focused pass on the finished homepage. The hero, the paper-to-dark stage, Poly's diagram and Whole system / My part, R-Finance's desktop walkthroughs, the screening room and the budget model are unchanged. The homepage at `/` and the Code Topology Lab are unchanged.

## What changed, and why

| Problem in Phase 4 | Change | Files |
|---|---|---|
| R-Finance took about 2,700 px on phones (2,600 on tablets): the desktop drawing stacked into a column, with a three-row title block per sheet | Below 1024 px each sheet is a row of numbered 44 px stops joined by the signal line, with one station card. Tap a stop, use the arrow keys, Home and End, or trace; inactive cards stay in the document as screen-reader text. The knowledge assistant's evidence stop carries a Documents marker, so the two systems read differently. The heuristics caveat moved into its station (desktop too) | `sections/ServiceSheet.tsx`, `styles/rfinance.css`, `content/rfinance.ts` |
| Skills was an 18-row matrix of about 1,430 px on desktop, reading like an appendix | A skill index beside cards for the work in page order. Pointing at or focusing a skill lights the work that used it; pointing at a card lights its skills. The index is one keyboard stop with arrow keys. Tablets and phones show the cards, which carry every fact | `sections/Skills.tsx`, `styles/skills.css` |
| JiraGenie was the plainest section, alone on its own surface | It continues PromptLock's printout as "Also built: tools for the work itself" (the current site's framing for these two builds) | `sections/MoreWork.tsx`, `styles/more.css` |
| Recognition had one verified win but read as big words beside a list | "Winner." set like the hero's name with an ink period; the project, a link back to its diagram and the Devpost evidence beside it; the four hackathons on a chronological track with the win as the filled stop | `sections/Recognition.tsx`, `styles/recognition.css` |
| The finale did not connect to the opening | The hero's ruler and crop marks return; on first arrival the signal reads the ruler as it underlines the address and lands as the period; on desktop the hero's facts column stands beside the address | `sections/Contact.tsx`, `styles/contact.css` |
| Some important phone controls were 36–42 px tall; the Poly phone panel repeated its tab's label | About 44 px for important controls and standalone links on phones; the repeated heading is screen-reader only | `styles/*.css` |

No content was removed. The hackathon order comes from the public repositories' commit dates; only years are shown.

## Page height (px)

| | 360 × 740 | 390 × 844 | 768 × 1024 | 1366 × 768 | 1440 × 900 |
|---|---|---|---|---|---|
| Phase 4 | 14,691 | 14,298 | 14,173 | 11,649 | 12,014 |
| Phase 4.5 | 13,471 | 13,136 | 13,265 | 11,249 | 11,626 |

R-Finance: 2,710 → 1,586 px on a 390 phone and 2,588 → 1,610 on a tablet. Skills: 1,426 → 903 on desktop. Recognition grew on purpose (by 89 px on desktop, 97 on a phone and 190 on a tablet).

## Verification (headless Chromium, production build)

- **Stills at all five sizes:** first-screen facts, no overflow, rail clearance, 0 contrast failures, no text under 12 px, no targets under 24 px. The clipped-heading check flags only the Poly phone panel heading, which is screen-reader only by design.
- **Contrast in interactive states:** 0 failures in seven of them, including the R-Finance stop cards, a phone trace, a focused skill and the open phone menu.
- **Keyboard:** 62 stops, each with a visible ring.
- **R-Finance stops (390, 768):** arrows, End and tap work; every card is readable by screen readers; the trace is narrated.
- **Skills:** pointing at Python lights its four pieces of work, and pointing at R-Finance lights its seven skills.
- **Other interactions:** the finale (line, head, period, 12 ruler ticks) and its reload behaviour, copy address, phone pipeline tabs, the current-section mark and the timeline highlight all pass.
- **Not rerun (code unchanged):** opening, session and history, Replay, fonts blocked, budget model, storyboard, phone menu. Their Phase 4 results stand.
- **Lab performance** (5 cold runs, median; lab, not field data): LCP 1.58 s mobile and 0.35 s desktop, CLS 0, 186 KB (Phase 4: 1.56 s, 0.35 s, 184 KB).
- **Regression:** the homepage and Lab are pixel-identical to the Phase 3.5 capture, apart from the approved award line against the original baseline. One capture at 768 first showed the homepage's lazy screenshot loading where older captures had a placeholder; recapturing both builds with images loaded left only the award line.
- **Build checks:** typecheck, production build and `git diff --check` pass.
- **Not tested:** Firefox was not rerun (the Phase 4 smoke test passed). Safari or WebKit and real phones remain untested.

Review page: private Claude artifact, plus a local copy at `tmp/signal-path-preview/phase-4-5/review/index.html` (gitignored).

## Remaining concerns

- About and education is plain, and the Lab card is a second dark card after the Poly stage.
- The page is still about 15.6 screens on a 390 phone.
- The R-Finance stops' discoverability on phones is untested with real users.
- The current-section mark shows Experience while Recognition is on screen.

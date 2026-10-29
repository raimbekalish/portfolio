# Launch readiness

Status: Phase 6.1, 2026-10-28. Branch `design/proof-signal`, [pull request #1](https://github.com/raimbekalish/portfolio/pull/1) (draft). Production (`main`, `2cdb64b`) is unchanged, and `launched` is `false`.

**Verdict: CONDITIONAL.** Nothing technical blocks the launch: the release candidate builds, switches and passes every automated check below. It is ready when Raimbek approves the Phase 6.1 content changes (section 3) and the launch itself, with the résumé risks in section 1 knowingly deferred. Physical-device testing is still not done and belongs right before or right after the launch. Passing tests do not mean the launch is approved.

This file keeps two lists apart: what is still open (sections 1–2) and what has been checked (sections 3–11). The release steps and rollback are in [release-indexing.md](release-indexing.md).

## 1. Gates after Phase 6.1

No approval is assumed here. Each gate closes only on Raimbek's explicit word, or on the named person's.

### Owner-deferred: known, not resolved

| Item | Public exposure today | Remaining risk |
|---|---|---|
| Public résumé PDF (ledger decisions 9 and 14) | `/Raimbek_Alish_Resume.pdf` is live on the current site and stays linked as "Résumé" from every page after launch. Raimbek will update it later; in Phase 6.1 it was not edited, replaced, renamed or unlinked. | **Privacy:** it shows a phone number. **Accuracy:** "2x hackathon winner" (one win is verified), "1st Place" for QuackHacks (the site says "Winner, Polymarket Track") and "1st Place AI Award" for CodeDay (the showcase lists no award), so the PDF contradicts the site. **Confidentiality:** it contains the restricted R-Finance holdout result and a related error rate (not repeated here). Publishing those needs the employer's authorization, which is not on record. The launch does not change this exposure. |
| AI Visual Novel Creator credential | Raimbek reports (2026-10-28) that the key found in the team's repository is no longer valid. That report was not independently verified, and the credential was not used, reproduced or tested. The repository may still contain the obsolete key text; removing it, and any history cleanup, is for the repository's owners. | Low, on Raimbek's report. The site keeps every link into that repository withheld, so nothing on the site points to it. There is no separate hotfix: the hold reaches production with the launch. |

### Permission not confirmed: employer or team

| Item | What the launch shows instead |
|---|---|
| R-Finance service detail (ledger decisions 1–3): the request paths, checks, models and infrastructure | A reduced section (`rfinanceDetail = false` in `src/content/permissions.ts`): the company, the role and dates, and each project in one sentence. The detail stays in the code but out of the build, and returns by setting the gate to `true` once the employer approves. The ledger (4.1) classifies every R-Finance statement. |
| R-Finance figures in the résumé PDF | Nothing on the site; see the résumé row above. |
| Visual Novel team screenshot (decision 8) | A schematic of the game frame's three areas (`novelScreenshot = false`). The screenshot returns with the team's consent. |

### Needs Raimbek's approval

| Item | Where |
|---|---|
| The reduced R-Finance section | Section 3, with the exact differences |
| The Visual Novel schematic | Section 3 |
| The PromptLock correction | Section 3 |
| Removing `gh-pages` and `npm run deploy` (optional, a separate commit) | Section 10 |
| The launch | The merge into `main`, [release-indexing.md](release-indexing.md) |

### Not yet done

Physical-device and screen-reader testing (sections 7 and 8).

### Resolved

- PromptLock contribution (decision 7): the current site's narrower sentence, which Raimbek chose for launch.
- CodeDay award wording: removed from the site in Phase 6; participation stays.
- When the Visual Novel link hold reaches production (decision 15): with the launch.
- The old homepage's leftover canvas chunk, which carried the unapproved assistant name: no longer built once the switch is on (section 11).

## 2. Decisions before launch

1. Approve the Phase 6.1 content changes: the reduced R-Finance section, the Visual Novel schematic and the PromptLock correction. Any of them can be reverted on request.
2. Optional: approve removing the `gh-pages` publish path.
3. Approve the launch, with the deferred résumé risks above accepted.

Later, and independent of the launch: the employer's approval for the R-Finance detail, the team's consent for the screenshot, and the résumé update.

## 3. Content and privacy audit (completed)

Every rendered claim on the release candidate was compared with the [evidence ledger](content-evidence-ledger.md): the homepage, the three case studies, the Lab, and each page's metadata and social card.

**Corrections made in Phase 6**
- CodeDay: the current site's unverified "AI award" honor and award line were removed from `src/data.ts`. The project now reads "Showcase project · CodeDay Seattle 2025" everywhere, and participation stays.
- Visual Novel source links: withheld on the current homepage (`sourceWithheld`), in the Lab (file names as plain text; the snapshot link is replaced by "Source links for this team repository are withheld pending a security review"; the method list is unlinked) and in the docs. The Lab's dataset was rebuilt offline, and its only difference is the flag. The rendered link check found no link into the repository on any route.
- Residual, not a link: the repository's address, pinned commit and file names are still in the shipped JavaScript as Lab data, and the generator's offline cache keeps its per-file fetch URLs as provenance. Nothing marks any file as the one of concern.

**Phase 6.1 changes, prepared for approval**
- **PromptLock.** "My part" now shows only the sentence Raimbek chose: "Contributed task-aware compression modes for debugging, code review, builds, and documentation with a FastAPI backend and token-based chunking."
  - Withheld until Raimbek provides evidence: the current site's second sentence, "Developed a Next.js and TypeScript interface that surfaces included, excluded, and prioritized context with configurable token budgets", which also claims the interface.
  - In the skills index, PromptLock's note changes from "Modes, backend, interface" to "Modes and backend", and PromptLock no longer counts as evidence for TypeScript or Next.js. Next.js moves to "Also".
  - The stack line (FastAPI backend, Next.js 15 frontend, MCP server) describes the team's project and stays. The Lab already used only the chosen sentence. The current homepage keeps its text until the launch replaces it.
- **R-Finance, reduced by default.** The gate is `rfinanceDetail = false`.
  - **Kept:**
    - "R-Finance", "AI/ML Engineering Intern", "Jun 2026 – Present" and "Remote";
    - "Two separate tools for working with photos and document knowledge." and "Both projects are internal work. Public source code and demos are unavailable.";
    - two sheets, each with its key, discipline, name and one sentence: "Vehicle-photo validation API: I built an internal API that checks vehicle photos." and "AI knowledge assistant: I built the dedicated chat interface and document-retrieval backend to answer questions from a document knowledge base.";
    - the Experience bullet.
  - **Withheld until the employer approves:**
    - "submitted through a mobile lending workflow";
    - both drawings and their trace: the four vehicle-photo stations (mobile submission; FastAPI with API-key authentication; local YOLO inference with eligibility rules, metadata/edit heuristics, cross-photo consistency checks and batch analysis, with its caveat; a structured REST/OpenAPI response) and the three assistant stations (chat question, document retrieval, grounded answer);
    - the delivery line (automated API tests, Docker, Helm, Kubernetes development environment);
    - the assistant's two notes, and "The drawings below are conceptual.";
    - R-Finance as skills evidence for YOLO, FastAPI, REST/OpenAPI, Docker, Kubernetes and Helm. R-Finance keeps Python. YOLO, REST/OpenAPI, Kubernetes and Helm move to "Also", and FastAPI and Docker keep their other evidence.
  - **Nothing is deleted.** The detail stays in `src/content/rfinance.ts` and `ServiceSheet.tsx`, and setting the gate to `true` restores the Phase 4 presentation. While it is off, the build leaves the detail out entirely: none of its text is in the launched bundle.
- **Visual Novel, schematic by default.** The gate is `novelScreenshot = false`.
  - The frame shows the game frame's three areas as outlined boxes: "Scene image · 1920 × 1080", "Speaker and line" and "Dialogue window and menu".
  - The caption reads "A schematic of the game frame’s three areas, not a screenshot of the project."
  - Choosing a pipeline stage still lights its area. The board, its "My part" and "Team" labels, the story format and the CodeDay showcase link are unchanged.
  - No image is invented, and nothing imitates the game's interface. Setting the gate to `true` restores the team's screenshot with its credit; while it is off, the screenshot is not referenced by the launched build.
  - CodeDay participation stays, there is no award wording, and the repository stays unlinked.
  - The image file remains in `public/images/`, because the current homepage uses it until launch. Afterwards it is deployed but linked from nowhere.

**Cleared for launch**
- Poly Predictor Kit: "Winner, Polymarket Track — QuackHacks 2025" and the approved contribution wording.
- Faultline: "Personal project · AI-assisted"; released (v0.1.0, the offline evidence tool) and unreleased work kept apart.
- ReproSeed: its boundaries and the "1-minimal" qualification.
- Skills, Recognition, About, Contact.
- The site UI shows no phone number. R-Finance appears without a logo, metrics, product name or internal detail.
- Internship Radar, InterviewMirror and JiraGenie do not appear anywhere.

## 4. Visual review (completed)

The whole built site was reviewed at phone, tablet, laptop and desktop sizes.

| Defect | Fix |
|---|---|
| The hero statement overlapped "Alish" at short, wide viewports (found at 1200 × 630 and 1280 × 600) | The statement's width is capped by where the name's second line starts (`--line2-at` in `tokens.css`, used in `hero.css`). The overlap check is clean at 12 sizes. |
| Faultline's title had an orange slash through the "t" and "line" set below the baseline. At phone size the slash crossed the letter, and the name read as "Fault/line" | Two quieter variants were compared. The plain title was kept on the homepage and the case study, like the other case-study titles, and the social card was re-rendered. |
| Chosen tabs, options and stops lost their mark in Windows contrast themes (forced colours) | A forced-colours rule in `base.css` and in the Lab draws them with the system's selection colours. It has no effect outside forced colours. |

## 5. Mobile (completed)

- **Faultline, status chapter:** on phones it measured 2,189 px, mostly a list of capabilities. A per-status key with counts now stays visible, and the full list with its sources sits in a disclosure that is open in the HTML and folds on phones and tablets. The chapter now measures 704 px. Nothing was removed, and a link into the page opens the fold.
- **Faultline, dashboard screenshot:** the figure links to the image at full size (1440 × 1082) and to the original in the repository, so it can be read and zoomed on a phone.
- **ReproSeed and Poly:** Contents, disclosures, spacing and access to conclusions were reviewed on phones. No defects were found, and nothing was changed.

## 6. Cross-browser (completed, automated)

Release candidate at four sizes (phone, tablet, laptop, desktop) × five routes, with Playwright 1.64.1:

| Engine | Version | Result |
|---|---|---|
| Chromium | 156 | All checks pass |
| Firefox | 157 | All checks pass (one instance, no hang, no retry needed) |
| WebKit | 27.2 | All checks pass |

The checks:
- no horizontal overflow, an `h1` on each route and no console errors;
- the Faultline stage tabs by tap and click;
- the case-study link, then Back and Forward;
- the deadline radios;
- Contents opens, and closes on Escape;
- no running animations under reduced motion.

Desktop rendering is identical across the three engines. WebKit's opening animation was sampled at 0.6, 1.2 and 1.8 s against Chromium and inks at the same pace.

**Playwright's WebKit is not Safari, and no physical iPhone or Mac Safari test has been done.** See section 7.

## 7. Real-device checklist (not yet run)

Nothing in this section has been run. Mark each row only from a real device.

**How to test before launch** without deploying. On the Mac, build a temporary launched copy, as Phase 6 did, then serve it on the local network:

```sh
rsync -a --delete --exclude node_modules --exclude dist --exclude tmp --exclude .git ./ tmp/rc/
ln -sfn ../../node_modules tmp/rc/node_modules
sed -i '' 's/^export const launched = false;/export const launched = true;/' tmp/rc/src/work/release.ts
(cd tmp/rc && npx vite build)
python3 -m http.server 4403 --bind 0.0.0.0 --directory tmp/rc/dist
```

Open `http://<the Mac's address>:4403/` on the phone, on the same Wi-Fi; `ipconfig getifaddr en0` prints the address. The copy is gitignored and never touches the branch. Plain HTTP on the LAN blocks the clipboard, so "Copy" shows its fallback message there. Test copying on the HTTPS site after launch.

| Area | What to do | iPhone Safari | Android Chrome | Desktop Safari |
|---|---|---|---|---|
| Opening | Load `/`: the signal line writes the name; nothing stays grey; the statement never touches the name. Rotate the phone and reload | | | |
| Reduced motion | Turn on Reduce Motion (iOS: Accessibility › Motion; Android: Remove animations; macOS: Display › Reduce motion). The opening appears finished at once | | | |
| Site bar | Open and close the menu; jump to Work, Skills, Contact; the current-section mark follows the scroll; nothing hides under the notch or the Dynamic Island in landscape | | | |
| Poly | Phone: switch pipeline tabs. Desktop: "Whole system / My part" | | | |
| Faultline (home) | Tap each stage tab; "Read the case study", then Back returns to the Faultline section | | | |
| R-Finance | Two sheets, one sentence each, side by side on wide screens; nothing to operate | | | |
| Visual Novel | Choose each pipeline stage: its area lights on the schematic, and the readout explains it; choose it again to clear | | | |
| PromptLock | Change the mode and the budget; the packed result updates | | | |
| Skills | Tap a skill: its work lights; tap elsewhere to clear | | | |
| Contact | "Copy" the address (HTTPS only), the email link opens Mail, GitHub and LinkedIn open, and the Résumé opens the PDF | | | |
| Lab | Open the Code Topology Lab from About; pick each repository; "Enter source neighborhood" and back. The Visual Novel shows the withheld note and no source links. "Back to portfolio" returns to the Lab note | | | |
| Case studies | On each: Contents opens, jumps and closes; folds open and close; back links land on their sections; pinch-zoom works; landscape works | | | |
| Faultline (case study) | Switch the 80 ms / 400 ms run (the replay plays); "View at full size" opens a readable screenshot | | | |
| Text size | iOS: Safari's page zoom at 150% and 200%. Android: Chrome's text scaling at 150%+. macOS: ⌘+ to 200%. No clipped or overlapping text, no sideways scrolling | | | |
| Keyboard (desktop Safari) | Turn on "Press Tab to highlight each item" (Safari › Settings › Advanced). Tab through `/` and one case study: every stop shows a ring; tabs, radios and Contents work by keyboard | n/a | n/a | |
| Screen reader | VoiceOver (iOS, macOS) or TalkBack: headings rotor; the Faultline tabs read as tabs with their state; the deadline radios read as a group, and the switch is announced; the timeline reads its summary | | | |

Record the device, OS and browser versions and the date beside each column when it is run.

## 8. Accessibility (automated checks completed; assistive technology not tested)

**Automated.** Release candidate, Chromium's accessibility tree and in-page checks, five routes at 390 and 1440:
- `lang`, a single `h1` and no skipped heading levels;
- `main` and `footer` landmarks;
- no broken ARIA references, duplicate ids or positive `tabindex`;
- skip links with real targets;
- every image has alternative text;
- no unnamed control and no generic link text;
- text contrast at least 4.5:1 (3:1 for large text);
- targets at least 24 px;
- no overflow at 320 px, even with WCAG text-spacing overrides.

Every focus stop shows a visible ring: 35 on the homepage (37 before Phase 6.1 withheld the two R-Finance trace buttons), 50 on ReproSeed, 60 on Poly, 36 on Faultline and 11 in the Lab. Rerun in Phase 6.1 with the same results; the new sections have no contrast or text-size findings.

**Keyboard,** 23 checks. They passed in both Chromium and Firefox in Phase 6. In Phase 6.1 they were rerun in Chromium, with the Visual Novel stage board in place of the R-Finance stops, which are withheld. The checks cover:
- the skip links move focus;
- tabs follow the arrow keys, Home and End, and their panels follow;
- the skills toolbar roves focus (and the R-Finance stops do, when the detail is shown);
- radios and pressed buttons work by keyboard;
- disclosures toggle with Enter and Space;
- the menus and Contents close on Escape and return focus;
- every live region announces its change (copy, deadline run, Visual Novel stage, Lab selection).

**Not counted as failures, by design:**
- The hero ruler's numbers and the timeline's month ticks are hidden from assistive technology and are decoration.
- The Lab has no `nav` landmark: it is a single-purpose page with a skip link and two header links.
- The Lab uses 10–11 px monospace labels. WCAG sets no minimum, and enlarging them is an optional improvement.

**Fixed:** the forced-colours selection marks (section 4).

**Not tested:**
- VoiceOver, TalkBack, NVDA or JAWS;
- voice control and switch access;
- real devices' text-size settings.

These are in section 7. Automated checks cannot establish that the site works with assistive technology.

## 9. Performance (lab measurements, not field data)

**Conditions:**
- Headless Chromium and a local static server that gzips text like GitHub Pages.
- Cold cache on every run.
- Mobile profile: 412 × 823 at DPR 1.75, 4× CPU slowdown, 150 ms round trip, 1.6 Mbps down.
- Desktop: unthrottled at 1440 × 900.

Medians are over 3 runs, and over 5 for the homepage. These are synthetic numbers. Real-user Core Web Vitals will only exist after launch, through Search Console's report or the Chrome UX Report, once there is enough traffic.

| Page | Mobile LCP | Desktop LCP | CLS (worst) | Transfer at load | After full scroll |
|---|---|---|---|---|---|
| Homepage, release candidate | 1.40 s (1.38–1.61) | 0.07 s | 0.0002 | 164 KB | 259 KB |
| Signal Path before the switch (`/?preview=signal-path`) | 1.57 s | 0.07 s | 0.0002 | 196 KB | 290 KB |
| Current homepage (production today) | 1.00 s | 0.08 s | 0 | 94 KB | 218 KB |
| Faultline | 0.81 s | 0.05 s | 0.0021 | 145 KB | 203 KB |
| ReproSeed | 0.75 s | 0.05 s | 0.0049 | 144 KB | 144 KB |
| Poly Predictor Kit | 0.77 s | 0.05 s | 0.0052 | 146 KB | 146 KB |
| Code Topology Lab | 1.16 s | 0.03 s | 0.0004 | 153 KB | 153 KB |

**Compared with the baseline:**
- The homepage improves on Phase 4.5's 1.58 s mobile LCP at 186 KB. The switch itself saves about 170 ms against the preview URL, because the old homepage's bundle and font preload are gone.
- The new homepage is about 0.4 s slower than today's homepage, and within the 2.5 s target.
- The Phase 5F case-study figures (1.30–1.34 s) were taken without compression. Rerun that way today, they give 1.32–1.34 s, so there is no regression.
- Desktop figures are not comparable with Phase 4.5's, which used a 40 ms round trip.

**Phase 6.1** left the withheld R-Finance drawings out of the homepage's lazy chunk: 99 KB instead of 109 KB (29.3 KB instead of 31.8 KB gzipped). Not re-measured; nothing on the loading path got heavier.

**Main thread:**
- The homepage's mobile load has two long tasks (longest 136 ms, total blocking 19 ms). No other page has any.
- Interaction latency, a lab proxy for INP: 12 taps across the site's controls at 4× CPU, worst 40 ms.

## 10. SEO and GitHub Pages (completed)

**Heads (release candidate):**
- Each page has a title, a description, a canonical URL equal to `og:url`, and `index, follow`.
- Open Graph and Twitter `summary_large_image` cards point to images that exist at their declared 1200 × 630.
- JSON-LD parses: Person on the homepage, TechArticle on the case studies.
- `lang="en"` throughout.
- Descriptions are 175–267 characters. Search results will truncate them, which is not an error.

**Indexing files:**
- `robots.txt` allows everything and names the sitemap.
- The release candidate's sitemap lists the homepage and the three case studies.
- Before the switch it lists only the homepage, and the case studies stay `noindex`.

**Links:**
- All 50 internal targets and every `#fragment` resolve on the rendered pages.
- 48 of 50 external links return 200. LinkedIn answers automated requests with 999 and the CodeDay showcase answered 429 (rate limited); both need a manual click.
- Every `target="_blank"` link has `noopener`/`noreferrer`.

**Live hosting** (read-only, 2026-10-28):
- `https://callmeraim.dev/` returns 200 from GitHub Pages.
- `http://` and `www.` redirect to it with 301, and so does `raimbekalish.github.io/portfolio/`.
- `/work/faultline/` is a 404 until launch, as expected.

**Static hosting:**
- Case studies are real files (`work/<slug>/index.html`), so deep links and refreshes need no single-page-app fallback.
- The homepage's sections are fragments, and the Lab is a query on `/`.
- Asset URLs are root-relative and hashed.
- There is no custom 404 page; GitHub's default is served (optional improvement).

**One publish method:**
- The Actions workflow on `main` is the only one; Pages is set to "GitHub Actions".
- Phase 6.1 removes the leftover second path: the `deploy` and `predeploy` scripts and the `gh-pages` package with its 46 dependencies. The lockfile only loses entries. This is a separate commit for Raimbek's approval, and the workflow itself is unchanged. The `gh-pages` branch stays on the remote as history; Pages does not serve it.
- The workflow's steps were reproduced on the new lockfile with Node 20.20.2 and npm 10.9.9: `npm ci`, typecheck and build pass, and the output is identical to the local Node 24 build.

## 11. Release-candidate switch validation (completed)

The switch was validated in an isolated, gitignored copy (`tmp/rc/`) with `launched = true`, built and served locally. The branch stays at `launched = false`, and nothing was deployed.

Validated:
- `/` is the Signal Path page, with the launch head and no preview wording.
- `/?preview=signal-path` shows the same page, indexable, with canonical `/`.
- `/#faultline`, `/#skills`, `/#contact` and `/#code-topology` land on their sections.
- The Lab keeps its dark page, and its Back link lands on the Lab note.
- Each case study is `index, follow`, says "A case study by Raimbek Alish.", and its back links land on the right homepage section.
- There are no console errors.

The pre-launch build was also checked. Its `index.html` and case-study heads match the earlier pre-launch build apart from asset hashes, and the sitemap lists only `/`.

**Phase 6.1, rerun after the content changes:**
- The switch check passes again. Chromium passes at four sizes on five routes: overflow, console errors, the Faultline tabs, case-study Back and Forward, the deadline radios, Contents and reduced motion.
- Routes, robots values, canonicals and sitemaps are correct in both states.
- **A release risk found and fixed:** the launched build no longer contains the old homepage at all. Before this phase, one of its lazy chunks (the hero canvas) was still emitted at launch, and it carried the unapproved assistant name and the screenshot's path. A pure annotation on its `lazy()` call now lets the build drop it.
- The launched bundle contains none of the withheld R-Finance or Visual Novel text, checked by searching the build.
- One leftover is not rendered anywhere: the current site's PromptLock interface sentence stays as an unused field in `src/data.ts` until the old homepage's code is removed after launch.

## 12. CI recommendations (not implemented)

None of these exist yet. Adding a workflow needs Raimbek's approval. On a public repository, GitHub-hosted runners have no cost, and no billing settings are involved.

1. **Pull-request checks:** a separate workflow without Pages permissions that runs `npm ci`, `npm run typecheck` and `npm run build` on every pull request, so problems surface before the merge that deploys.
2. **Static validation after the build:** a small Node script with no new dependencies. It would check the following.
   - Every page has its title, description, canonical, robots and Open Graph tags.
   - The robots values and the sitemap agree with `launched`.
   - Internal links and fragments in the static HTML resolve.
   - Open Graph images exist at their declared size.
3. **Content and security checks:**
   - Fail the build on retired wording ("1st Place", "AI award"), on the unapproved assistant name, and on any link into a repository marked `sourceWithheld`. Restricted values must never be written into the check itself.
   - Turn on GitHub secret scanning and push protection in the repository settings. Both are free for public repositories.
4. **Link check:** a weekly scheduled job for external links that tolerates LinkedIn's 999 and rate-limit responses.
5. **Upkeep:** Dependabot for npm and GitHub Actions, and actions pinned to commit SHAs.

## 13. Not done in Phases 6 and 6.1

- No merge, no deployment, and the switch is not live.
- The résumé PDF is unchanged, by Raimbek's decision.
- No real-device or assistive-technology testing.
- No new dependencies or workflows were added. One unused development dependency, `gh-pages`, is removed in a separate commit for approval.
- No further Firefox or WebKit runs in Phase 6.1: the changed sections are static text and an existing button board, so the Phase 6 results stand for the unchanged code.

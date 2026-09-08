# Raimbek Alish — Engineering, made visible.

Personal engineering portfolio for Summer 2027 software engineering and AI/ML internship recruiting. Raimbek studies Computer Science–Mathematics at Whitman College and expects to graduate in May 2028.

## Design and structure

The production homepage uses **Monument + Escape**: Raimbek’s name is a crisp SVG aperture into three project worlds. The mint period anchors an explicit “Enter project” transformation from identity into a full visual canvas. “Back to identity” reverses it; “Explore full case study” continues directly to the selected chapter. Keyboard and touch use the same controls, and reduced motion switches states immediately.

Arfi uses large question/evidence/answer motifs; Poly uses two independent dark analytical routes; the Novel world uses the unchanged public project image. Clipped fragments are decorative, with equivalent semantic content in real DOM. The SVG project renderer is a small lazy chunk; the identity, navigation and portfolio content are available before it loads. Three distinct case studies follow:

- **R-Finance — Applied AI:** two separate internal projects, a document-based knowledge assistant (Arfi) and a vehicle-photo validation API. The assistant preview is static HTML/CSS, clearly labeled **Illustrative preview · Synthetic data**. The vehicle architecture uses no invented API fields or performance figures.
- **Poly Predictor Kit:** separate market-summary and comment-classification workflows. Gemini-generated comment labels belong to data preparation; TF-IDF and logistic regression belong to classification.
- **AI Visual Novel Creator:** an actual public project screenshot, a high-level content flow, and Raimbek’s confirmed contribution within the team project.

Native `<details>` disclosures expose architecture and decisions without routing. Compact additional builds, Experience, About, Education, Skills, and the mint Contact finale complete the page. Only the Novel image carries a quiet, one-time aperture callback; the lower page stays almost static. The original `#selected-work`, `#projects`, `#experience`, `#education`, `#skills`, and `#contact` anchors are preserved; `#about` and individual case-study anchors are also available.

## Stack and local development

React 18, TypeScript, Vite, plain CSS, and the existing Lucide icons. No additional dependencies or framework migrations.

```sh
npm ci
npm run dev
npm run typecheck
npm run build
npm run preview
```

Open the printed local URL at `/portfolio/`. Vite retains `base: '/portfolio/'`; the built static site is written to `dist/`. Résumé, font, image, and logo URLs support that base path. The existing GitHub Pages workflow and deployment scripts are unchanged. **This redesign was implemented locally: no commit, push, pull request, or deployment was performed.**


## Optional Code Topology Lab

The main portfolio remains **V9 Monument + Escape**. A compact invitation after the project work opens **Code Topology Lab**, an optional source exploration at `/portfolio/?lab=code-topology`. The query URL works with GitHub Pages without server-side route rewrites. “Back to portfolio” returns to the invitation; browser Back also preserves native navigation history.

Repository Folio maps five pinned public source snapshots: Poly Predictor Kit, PromptLock, JiraGenie, AI Visual Novel Creator, and Portfolio. Select a repository, then enter a deterministic neighborhood of resolved local imports or browse its included files. Team repositories remain team contributions. R-Finance's private source is excluded entirely.

The validated snapshot contains **82 filtered source files and 70 resolved local imports**. These are dataset scope, not accomplishment metrics. Directory membership and file bytes drive the visual geometry; source/import paths link to pinned GitHub commits. This is a conservative static map, not a complete dependency audit, call graph or authorship analysis. Mobile uses readable repository/folder lists and source links rather than miniature graph labels.

The Lab and its JSON are lazy-loaded only on Lab navigation. Ordinary hero/project browsing does not request Lab code or data. Rejected V17 visual studies and local QA artifacts are not shipped. The Lab uses React, SVG and CSS, with immediate reduced-motion states and native accessible links/buttons.

### Reproduce the pinned data

```sh
python3 scripts/generate-topology.py --offline
```

The generator reads the metadata cache in `data/topology-cache` and writes `src/topology/data.json`; Python's standard library is sufficient. Offline replay performs no network requests. The expected SHA-256 is:

`7c126c423d6ef36721a0f8c02860cd3c3f13bd2bbffafd70ac4487d73df7cbe8`

An online run without `--refresh` verifies public visibility while retaining existing pins. `--refresh` deliberately selects newer public heads. Review regenerated scope and links before publishing any data update. No environment tokens, private repositories, credential helpers or execution of fetched code is used. Only source allowlists and conservative import resolution are permitted.

See [Code Topology provenance and limitations](docs/code-topology.md) for exact commits, filtering, parsing, scope audit and cache schema. Generator/cache/docs are outside Vite application assets. Source lives in `src/topology/CodeTopologyLab.tsx`, `SourceDetails.tsx`, `Folio.tsx`, and `model.ts`; the only main-page addition is `LabInvitation`.

## Main source files

- `src/data.ts`: contact details, navigation, project contribution copy and links, employment, education, skills, and honors.
- `src/components/SiteHeader.tsx`: production navigation and accessible mobile menu.
- `src/type-interface/TypeInterface.tsx`: hero state, controls, accessible descriptions and chapter continuation.
- `src/type-interface/TypeCanvas.tsx`, `TypeLettering.tsx`, `ProjectWorld.tsx`: lazy SVG renderer, shared crisp lettering, and project worlds.
- `src/components/WorkChapters.tsx` and `.css`: three distinct selected-work chapters, native disclosures and compact additional builds.
- `src/components/About.tsx`, `Experience.tsx`, `Education.tsx`, `SkillStack.tsx`, `Contact.tsx`: supporting content.
- `src/index.css`: visual tokens, composition, responsive rules, and reduced-motion support.
- `index.html`: title, search/social descriptions, and Person JSON-LD.

## Assets and provenance

- `public/fonts/manrope-latin-variable.woff2`: self-hosted Latin Manrope variable font, weights 400–800, 24 KB. [Official font source](https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggexSvfedN4.woff2), [Google Fonts repository and license](https://github.com/google/fonts/tree/main/ofl/manrope). SIL Open Font License included in `public/fonts/OFL.txt`. System sans-serif fallbacks remain available.
- `public/images/visual-novel.jpg`: unmodified 1723 × 1080 JPEG (96 KB) from the [team’s public CodeDay showcase](https://showcase.codeday.org/project/cmhgqspw91903j5my04z26yk6), [original asset](https://img.codeday.org/w=1920;h=1080;fit=clip/m/r/mrpenk971ukaabtxa4rre53epse5q4639revtzd121hnvhshruvhrhh5bf6k6e9ghm.png). The source URL ends in `.png` but serves JPEG bytes. The full case-study image retains the complete frame; the hero registers the same image behind the letter aperture. The image is identified as a project screenshot, not a newly generated illustration.
- Original Canva, Bellevue College, and Whitman College logos are unchanged. No R-Finance logo was available; the company name is typeset as text.
- `public/og.jpg`: existing 1200 × 630 social card, preserved at its real URL. Its old design and “Computer Science” wording need a separate refresh.

No private repositories, environment files, internal documents, real user queries, or confidential data were used. Internal services have no public demo links.

## Content review notes

The public CodeDay page confirms the project and team, but does not establish the exact AI award title. The website therefore uses the neutral **AI award · CodeDay Seattle 2025** rather than the older “1st Place AI Award” wording. The Polymarket Track award is confirmed by the public Devpost project page.

The canonical résumé remains `public/Raimbek_Alish_Resume.pdf` and was not modified. Its contact details and inspected dates match the profile, but it still says “Bachelor of Arts in Computer Science,” omits the knowledge assistant, and contains the old “31 automated tests” and less-qualified image-edit/deployment descriptions. The site follows the current confirmed brief: Computer Science–Mathematics, two distinct internal projects, heuristics with limitations, and a Kubernetes **development** deployment. Refreshing the résumé requires a separate request.

## Validation and local evidence

V9 production-integration evidence is in `output/v9-integration/`; the approved prototype is archived in `output/v9/`. The integration report records the two visual review passes, five-width browser checks, accessibility results, exact gzip and page-height comparisons, screenshots, and the continuous interaction capture. These local artifacts are not imported by Vite or shipped in `dist/`.

Run `npm run typecheck`, `npm run build`, and `git diff --check` before release. Browser QA covers 360, 390, 768, 1024 and 1440 px, reduced motion, keyboard and touch controls, deep links, mobile navigation, native disclosures and the résumé response. This reports testing of the portfolio only, not internal R-Finance systems. The existing stable implementation had no command palette to retain.

The old prototype query router and replaced legacy hero/case-study components have been removed. `/portfolio/` renders V9 directly; only `?lab=code-topology` opens the optional Lab. This branch remains local and uncommitted; no deployment has been performed.

# Raimbek Alish — Engineering, made visible.

Personal engineering portfolio for Summer 2027 software engineering and AI/ML internship recruiting. Raimbek studies Computer Science–Mathematics at Whitman College and expects to graduate in May 2028.

## Design and structure

The homepage pairs expressive Manrope typography with a graphite, warm-white, and mint palette. A keyboard- and touch-operable hero selector previews several projects. Three distinct case studies follow:

- **R-Finance — Applied AI:** two separate internal projects, a document-based knowledge assistant (Arfi) and a vehicle-photo validation API. The assistant preview is static HTML/CSS, clearly labeled **Illustrative preview · Synthetic data**. The vehicle architecture uses no invented API fields or performance figures.
- **Poly Predictor Kit:** separate market-summary and comment-classification workflows. Gemini-generated comment labels belong to data preparation; TF-IDF and logistic regression belong to classification.
- **AI Visual Novel Creator:** an actual public project screenshot, a high-level content flow, and Raimbek’s confirmed contribution within the team project.

Native `<details>` disclosures expose architecture and decisions without routing. Additional builds, About, Experience, Education, Skills, and Contact complete the page. The original `#selected-work`, `#projects`, `#experience`, `#education`, `#skills`, and `#contact` anchors are preserved; `#about` and individual case-study anchors are also available.

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

## Main source files

- `src/data.ts`: contact details, navigation, project contribution copy and links, employment, education, skills, and honors.
- `src/components/Hero.tsx` and `ProjectPreviews.tsx`: the hero interaction and reusable project visuals.
- `src/components/CaseStudies.tsx` and `EngineeringSpotlight.tsx`: the three selected case studies and additional builds.
- `src/components/About.tsx`, `Experience.tsx`, `Education.tsx`, `SkillStack.tsx`, `Contact.tsx`: supporting content.
- `src/index.css`: visual tokens, composition, responsive rules, and reduced-motion support.
- `index.html`: title, search/social descriptions, and Person JSON-LD.

## Assets and provenance

- `public/fonts/manrope-latin-variable.woff2`: self-hosted Latin Manrope variable font, weights 400–800, 24 KB. [Official font source](https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggexSvfedN4.woff2), [Google Fonts repository and license](https://github.com/google/fonts/tree/main/ofl/manrope). SIL Open Font License included in `public/fonts/OFL.txt`. System sans-serif fallbacks remain available.
- `public/images/visual-novel.jpg`: unmodified 1723 × 1080 JPEG (96 KB) from the [team’s public CodeDay showcase](https://showcase.codeday.org/project/cmhgqspw91903j5my04z26yk6), [original asset](https://img.codeday.org/w=1920;h=1080;fit=clip/m/r/mrpenk971ukaabtxa4rre53epse5q4639revtzd121hnvhshruvhrhh5bf6k6e9ghm.png). The source URL ends in `.png` but serves JPEG bytes. The full case-study image retains the complete frame; hero uses a thumbnail crop. The image is identified as a project screenshot, not a newly generated illustration.
- Original Canva, Bellevue College, and Whitman College logos are unchanged. No R-Finance logo was available; the company name is typeset as text.
- `public/og.jpg`: existing 1200 × 630 social card, preserved at its real URL. Its old design and “Computer Science” wording need a separate refresh.

No private repositories, environment files, internal documents, real user queries, or confidential data were used. Internal services have no public demo links.

## Content review notes

The public CodeDay page confirms the project and team, but does not establish the exact AI award title. The website therefore uses the neutral **AI award · CodeDay Seattle 2025** rather than the older “1st Place AI Award” wording. The Polymarket Track award is confirmed by the public Devpost project page.

The canonical résumé remains `public/Raimbek_Alish_Resume.pdf` and was not modified. Its contact details and inspected dates match the profile, but it still says “Bachelor of Arts in Computer Science,” omits the knowledge assistant, and contains the old “31 automated tests” and less-qualified image-edit/deployment descriptions. The site follows the current confirmed brief: Computer Science–Mathematics, two distinct internal projects, heuristics with limitations, and a Kubernetes **development** deployment. Refreshing the résumé requires a separate request.

## Validation

Browser captures and the automated browser-check report are in `output/redesign/`. Checked widths: 360, 390, 768, 1024, and 1440 pixels. Browser checks cover overflow, image loading, anchor targets, project selection with keyboard, native case-study disclosures, mobile navigation and Escape, skip navigation, reduced-motion behavior, and the résumé response. The report describes tests of this portfolio only, not R-Finance systems.

Validation passed: `npm ci`, `npm run typecheck`, and `npm run build`. The production-preview browser run found no overflow, missing images, or console errors at all five widths. The automated accessibility scan detected no violations at 1440 and 360 px; supplementary computed-color checks for layered hero text measured at least 4.74:1. See `output/redesign/VALIDATION.md` for results, screenshots, method, and limitations. LinkedIn automated access returned HTTP 999; the existing URL was preserved.

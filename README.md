# Raimbek Alish - Portfolio

Recruiter-first portfolio for Raimbek Alish, a Whitman College Computer Science student targeting 2027 software engineering, AI/ML, backend, and full-stack internships.

[View the live portfolio](https://raimbekalish.github.io/portfolio/)

## Stack

- React 18 + TypeScript
- Vite
- Plain CSS design system
- Lucide icons
- GitHub Pages

The site is intentionally static and lightweight. Portfolio content is centralized in `src/data.ts`, project imagery is not loaded from third-party hosts, and motion is limited to small CSS interactions with reduced-motion support.

## Local development

```bash
npm ci
npm run dev
```

## Validation

```bash
npm run typecheck
npm run build
```

## Deployment

```bash
npm run deploy
```

Vite is configured for the `/portfolio/` GitHub Pages base path. The generated site is written to `dist/`.

## Resume

The website serves the supplied `public/Raimbek_Alish_Resume.pdf` as the canonical résumé, with a matching copy retained under `output/pdf/` for review.

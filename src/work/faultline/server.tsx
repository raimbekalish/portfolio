// Build-time renderer for /work/faultline/ (see scripts/work-pages.ts).
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { headTags } from "../head";
import CaseStudy from "./CaseStudy";
import { meta } from "./meta";

export function render() {
  return {
    head: headTags(meta),
    body: renderToString(
      <StrictMode>
        <CaseStudy />
      </StrictMode>,
    ),
  };
}

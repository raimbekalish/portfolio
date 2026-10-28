// Browser entry for /work/reproseed/: hydrates the HTML rendered at build time.
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import "./styles/index.css";
import CaseStudy from "./CaseStudy";

hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    <CaseStudy />
  </StrictMode>,
);

// How projects work, as INPUT → SYSTEM → OUTCOME lanes. Part of the content model alongside
// src/data.ts; kept in its own module so only the Signal Path preview loads it.

/**
 * How a project works, as lanes from input to outcome. Only architecture stated in a public
 * source is listed, and `mine` marks Raimbek's part of a team project.
 */
export type SystemLane = {
  id: string;
  name: string;
  mine: boolean;
  input: string;
  system: string;
  detail?: string;
  outcome: string;
};

export type ProjectSystem = {
  source: string;
  surface: string;
  stack: string;
  lanes: SystemLane[];
};

// Poly Predictor Kit: from the public repository, checked against its code (see src/content/poly.ts).
// `mine`: Raimbek's pipelines in the team project, market summarization and comment classification.
export const systems: Record<string, ProjectSystem> = {
  "poly-predictor-kit": {
    source: "A Polymarket event",
    surface: "Results shown in the Chrome extension",
    stack: "Chrome extension · Python services (Flask, scikit-learn)",
    lanes: [
      {
        id: "insight",
        name: "Market insight",
        mine: true,
        input: "Event and market data from Polymarket’s Gamma API",
        system: "A structured summary, sent to Gemini",
        outcome: "Plain-language context on probabilities and risks",
      },
      {
        id: "comments",
        name: "Comment classifier",
        mine: true,
        input: "Polymarket comments",
        system: "TF-IDF features and logistic regression",
        detail: "Training labels prepared with Gemini; labeled comments stored in Snowflake; trained with scikit-learn",
        outcome: "Each comment labeled emotional, rational or spam, with an overall read of the event",
      },
      {
        id: "steamroller",
        name: "Steamroller detector",
        mine: false,
        input: "Market odds and payoffs",
        system: "Rules for a high probability, a small upside and a large downside",
        outcome: "A warning when one loss could erase many wins",
      },
    ],
  },
};

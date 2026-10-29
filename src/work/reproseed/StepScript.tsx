import type { CSSProperties, ReactNode } from "react";
import type { ScenarioStep } from "../../content/reproseed";
import "./step-script.css";

type Props = {
  steps: ScenarioStep[];
  /** Steps struck out in blue pencil. */
  removed: string[];
  /** Steps in the current candidate; the others are dimmed. Omit to show every step plainly. */
  included?: string[];
  /** A margin note per step. */
  notes?: Record<string, ReactNode>;
  /** "compact" shows the step ids only, for previews. */
  variant?: "full" | "compact";
  /**
   * How the strikes appear. "done": already drawn. "now": drawn in on mount, one after another.
   * "later": not drawn yet (the parent switches to "now" when the script comes into view).
   */
  draw?: "done" | "now" | "later";
  label: string;
};

/**
 * ReproSeed's signature: the scenario as a numbered script, with the steps the minimizer removed
 * struck out in blue pencil. Each row also says its state in words, so nothing depends on the strike.
 */
export default function StepScript({ steps, removed, included, notes, variant = "full", draw = "done", label }: Props) {
  let struck = 0;
  return (
    <ol className="rs-script" data-variant={variant} data-draw={draw} aria-label={label}>
      {steps.map((step, i) => {
        const isRemoved = removed.includes(step.id);
        const state = isRemoved ? "removed" : included && !included.includes(step.id) ? "out" : "kept";
        const order = isRemoved ? struck++ : 0;
        return (
          <li key={step.id} className="rs-step" data-state={state} data-kind={step.kind} style={isRemoved ? ({ "--strike": order } as CSSProperties) : undefined}>
            <span className="rs-step-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <span className="rs-step-line">
              <span className="rs-step-id">{step.id}</span>
              {variant === "full" && <code className="rs-step-code">{step.code}</code>}
              <span className="rs-strike" aria-hidden="true" />
            </span>
            {state !== "kept" && <span className="sp-sr">{state === "removed" ? " (removed)" : " (not in this candidate)"}</span>}
            {notes?.[step.id] && <span className="rs-step-note">{notes[step.id]}</span>}
          </li>
        );
      })}
    </ol>
  );
}

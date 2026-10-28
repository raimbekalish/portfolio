// The time scale the case study draws on: milliseconds from 0 to 450, enough for the 400 ms fault
// and its label. Positions are fractions of that span, for CSS to place.

export const SPAN_MS = 450;

/** A time as a fraction of the scale, for a CSS custom property. */
export const at = (ms: number) => (ms / SPAN_MS).toFixed(4);

/** A recorded mean, as the record writes it. */
export const ms = (value: number) => `${value.toFixed(2)} ms`;

/** Tick marks every 50 ms; the labelled ones every 100 ms. */
export const ticks = Array.from({ length: SPAN_MS / 50 + 1 }, (_, i) => ({ ms: i * 50, major: i % 2 === 0 }));

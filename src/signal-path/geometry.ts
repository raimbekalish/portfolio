export type Point = [number, number];
export type Box = { left: number; top: number; right: number; bottom: number };

/** A DOM rect relative to an origin element's rect. */
export const relativeBox = (r: DOMRect, origin: DOMRect): Box => ({
  left: r.left - origin.left,
  top: r.top - origin.top,
  right: r.right - origin.left,
  bottom: r.bottom - origin.top,
});

export const centerX = (b: Box) => (b.left + b.right) / 2;
export const centerY = (b: Box) => (b.top + b.bottom) / 2;

/** Per-character boxes of a text node, measured with Ranges so kerning and tracking stay intact. */
export function glyphBoxes(node: Text, origin: DOMRect): Box[] {
  const range = document.createRange();
  const boxes: Box[] = [];
  for (let i = 0; i < node.length; i++) {
    range.setStart(node, i);
    range.setEnd(node, i + 1);
    boxes.push(relativeBox(range.getBoundingClientRect(), origin));
  }
  range.detach();
  return boxes;
}

/** Rounded orthogonal polyline through points, as an SVG path. */
export function roundedPath(points: Point[], radius: number) {
  if (points.length < 2) return "";
  const f = (n: number) => n.toFixed(2);
  let d = `M${f(points[0][0])} ${f(points[0][1])}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i - 1];
    const [x, y] = points[i];
    const [nx, ny] = points[i + 1];
    const r = Math.min(radius, Math.hypot(x - px, y - py) / 2, Math.hypot(nx - x, ny - y) / 2);
    d += ` L${f(x - Math.sign(x - px) * r)} ${f(y - Math.sign(y - py) * r)} Q${f(x)} ${f(y)} ${f(x + Math.sign(nx - x) * r)} ${f(y + Math.sign(ny - y) * r)}`;
  }
  const [lx, ly] = points[points.length - 1];
  return `${d} L${f(lx)} ${f(ly)}`;
}

export type NameLine = { glyphs: Box[]; level: number };

/**
 * The opening's square wave. It runs at the first line's level, toggles between the two lines in
 * letter gaps where both lines have letters, and ends on the period. Edges sit in gaps, so each one
 * is glimpsed between letters and then covered as the ink fills in.
 */
export function wavePoints(line1: NameLine, line2: NameLine, dot: Box, startX: number): Point[] {
  const gapsOf = (g: Box[]) => g.slice(0, -1).map((b, i) => (b.right + g[i + 1].left) / 2);
  const gaps = [...gapsOf(line1.glyphs), ...gapsOf(line2.glyphs)].sort((a, b) => a - b);
  const left2 = line2.glyphs[0].left;
  const dotX = centerX(dot);
  const span = dotX - left2;
  const limit = dotX - span * 0.08;
  const nearest = (target: number, after: number) => {
    let best = Number.NaN;
    for (const g of gaps) if (g > after && g < limit && (Number.isNaN(best) || Math.abs(g - target) < Math.abs(best - target))) best = g;
    return best;
  };
  const e1 = nearest(left2 + span * 0.16, left2 + 2);
  const e2 = Number.isNaN(e1) ? Number.NaN : nearest(left2 + span * 0.47, e1 + span * 0.14);
  const e3 = Number.isNaN(e2) ? Number.NaN : nearest(left2 + span * 0.76, e2 + span * 0.14);
  const { level: y1 } = line1;
  const { level: y2 } = line2;
  const points: Point[] = [[startX, y1]];
  if (!Number.isNaN(e3)) points.push([e1, y1], [e1, y2], [e2, y2], [e2, y1], [e3, y1], [e3, y2]);
  else if (!Number.isNaN(e1)) points.push([e1, y1], [e1, y2]);
  else points.push([dotX, y1]);
  points.push([dotX, y2], [dotX, centerY(dot)]);
  return points;
}

export type Rail = { points: Point[]; port: Point; straight: boolean };

/**
 * The rail from the period to the dark project stage. It drops straight down when nothing is in its
 * way; otherwise it steps out into the page margin and runs down it. Either way it ends on the
 * stage's top edge, where paper meets the instrument, so the whole move stays near the first screen.
 */
export function railToStage(dot: Box, stageTop: number, obstacles: Box[], marginX: number): Rail {
  const x = centerX(dot);
  const clearance = 10;
  const blocked = obstacles.some((o) => o.bottom > dot.bottom && o.top < stageTop && x > o.left - clearance && x < o.right + clearance);
  if (!blocked) return { points: [[x, dot.bottom], [x, stageTop]], port: [x, stageTop], straight: true };
  const y = centerY(dot);
  return { points: [[dot.right, y], [marginX, y], [marginX, stageTop]], port: [marginX, stageTop], straight: false };
}

/**
 * The signal's way from the stage port into the system diagram: straight down the same column when
 * the stage header leaves it clear, otherwise down the margin and in at the panel's top-right.
 * Points are relative to the panel; the first is the port on the stage edge (negative y).
 */
export function approachRoute(port: Point, panel: Box, obstacles: Box[]): Point[] {
  const [x, y] = port;
  const clearance = 10;
  const blocked = obstacles.some((o) => o.bottom > y && o.top < panel.top && x > o.left - clearance && x < o.right + clearance);
  const rel = (p: Point): Point => [p[0] - panel.left, p[1] - panel.top];
  if (!blocked && x > panel.left + 32 && x < panel.right - 32) return [rel([x, y]), rel([x, panel.top])];
  const entry = panel.right - 32;
  const turn = panel.top - 24;
  return [rel([x, y]), rel([x, turn]), rel([entry, turn]), rel([entry, panel.top])];
}

/** Times (0–1 of the write) at which the head first reaches each x, sampled along the trace. */
export function crossingTimes(path: SVGPathElement, xs: number[], ease: (t: number) => number, steps = 240): (number | null)[] {
  const length = path.getTotalLength();
  const samples = Array.from({ length: steps + 1 }, (_, i) => ({ t: i / steps, x: path.getPointAtLength(length * ease(i / steps)).x }));
  return xs.map((x) => samples.find((s) => s.x >= x)?.t ?? null);
}

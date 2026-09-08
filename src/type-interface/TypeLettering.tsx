type Line = { text: string; x: number; y: number; size: number; width: number };

/** Shared by the vector aperture and its zero-shift loading fallback. */
export function lettering(mobile: boolean): { lines: Line[]; dot: [number, number, number] } {
  if (mobile) return { lines: [
    { text: "RAIMBEK", x: 0, y: 245, size: 195, width: 650 },
    { text: "ALISH", x: 0, y: 600, size: 380, width: 550 },
  ], dot: [587, 558, 49] };
  return { lines: [
    { text: "RAIMBEK", x: -7, y: 297, size: 365, width: 1318 },
    { text: "ALISH", x: -7, y: 629, size: 407, width: 960 },
  ], dot: [1008, 571, 62] };
}

export function TypePoster({ mobile }: { mobile: boolean }) {
  const { lines, dot } = lettering(mobile);
  return <svg className="ti-art" viewBox={`0 0 ${mobile ? 660 : 1320} 660`} aria-hidden="true">
    <g className="ti-lettering" fill="#f2f0e9">{lines.map(line => <text key={line.text} x={line.x} y={line.y} fontSize={line.size} textLength={line.width} lengthAdjust="spacingAndGlyphs">{line.text}</text>)}</g>
    <rect x={dot[0]} y={dot[1]} width={dot[2]} height={dot[2]} fill="#a8e6cf" />
  </svg>;
}

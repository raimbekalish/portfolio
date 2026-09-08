import { useId, type CSSProperties } from "react";
import { ProjectWorld, type ProjectWorldId } from "./ProjectWorld";
import { lettering } from "./TypeLettering";

export type TypeCanvasProps = {
  project: ProjectWorldId;
  previous: ProjectWorldId | null;
  open: boolean;
  mobile: boolean;
  reduced: boolean;
};

export default function TypeCanvas({ project, previous, open, mobile, reduced }: TypeCanvasProps) {
  const unique = useId().replace(/:/g, "");
  const width = mobile ? 660 : 1320;
  const { lines, dot } = lettering(mobile);
  const glyphs = (className?: string) => lines.map((line, i) => <text key={line.text} className={className} data-line={i} x={line.x} y={line.y} fontSize={line.size} textLength={line.width} lengthAdjust="spacingAndGlyphs">{line.text}</text>);
  const world = (id: ProjectWorldId, suffix: string) => <ProjectWorld project={id} mobile={mobile} open={open} idPrefix={`${unique}-${suffix}`} />;
  return <svg className="ti-art" viewBox={`0 0 ${width} 660`} aria-hidden="true" data-open={open}>
    <defs>
      {/* A union of letter windows and a period-origin aperture keeps the world registered. */}
      <mask id={`${unique}-type`} x="0" y="0" width={width} height="660" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" style={{ maskType: "luminance" }}>
        <rect width={width} height="660" fill="black" />
        <g className="ti-lettering" fill="white">{glyphs("ti-mask-line")}</g>
        <rect className="ti-aperture" width={width} height="660" fill="white" style={{ transformOrigin: `${dot[0]}px ${dot[1]}px` } as CSSProperties} />
      </mask>
      {/* Dilating filled silhouettes avoids the internal seams of stroked variable-font contours. */}
      <filter id={`${unique}-edge`} x="-1%" y="-1%" width="102%" height="102%">
        <feMorphology in="SourceAlpha" operator="dilate" radius={mobile ? "1.6" : "0.7"} result="expanded" />
        <feComposite in="expanded" in2="SourceAlpha" operator="out" result="edge" />
        <feFlood floodColor="#f2f0e9" />
        <feComposite in2="edge" operator="in" />
      </filter>
      <clipPath id={`${unique}-incoming`} clipPathUnits="userSpaceOnUse"><rect className="ti-incoming-aperture" x="0" y="0" width={width} height="660" /></clipPath>
    </defs>
    <g mask={open && reduced ? undefined : `url(#${unique}-type)`}>
      <rect width={width} height="660" fill="#f2f0e9" />
      {previous && <g key={`previous-${previous}`} className="ti-outgoing-world">{world(previous, "old")}</g>}
      <g key={project} clipPath={previous ? `url(#${unique}-incoming)` : undefined}><g className={previous ? "ti-incoming-world" : undefined}>{world(project, "current")}</g></g>
    </g>
    {(!open || !reduced) && <g className="ti-lettering ti-letter-outlines" filter={`url(#${unique}-edge)`}>{glyphs("ti-outline")}</g>}
    <rect className="ti-period" x={dot[0]} y={dot[1]} width={dot[2]} height={dot[2]} fill="#a8e6cf" />
  </svg>;
}

import { useLayoutEffect, useRef, useState } from "react";
import { novelScreenshot } from "../../content/permissions";
import { regions, screenshot as shot, type FrameRegion } from "../../content/visualNovel";
import { novelProject as novel } from "../content";
import { useArrival, useCompact } from "../hooks";
import { duration, easing, useMotion } from "../motion";
import { sectionIds } from "../structure";
import { OutLink, WorkIndex } from "../ui";

/** What each stage contributes to the frame, said in the pipeline's general terms. */
const made: Record<string, string> = {
  input: "The prompts set the narrative, genre, art style, characters and mood behind every scene.",
  story: "Gemini writes each scene’s speakers and dialogue in the story JSON. They appear in the dialogue box.",
  script: "The generated .rpy script defines the characters and plays their lines in the dialogue box.",
  images: "Stability AI generates one image per scene: the picture behind the dialogue box.",
  play: "Ren’Py draws the dialogue window and menu, and runs the generated project.",
};

const pad = (n: number) => String(n).padStart(2, "0");

const schematicLabel = "Schematic of the game frame: the scene image above, and Ren’Py’s dialogue window and menu below it, holding the speaker and the dialogue line.";

/**
 * AI Visual Novel Creator: a dusk-lit screening room for the game frame. With the team's consent
 * (src/content/permissions.ts) it shows the team's screenshot; until then a schematic of the frame's
 * areas, and the screenshot is left out of the build.
 */
export default function VisualNovel() {
  const { reduced, reveals } = useMotion();
  const compact = useCompact();
  const filmRef = useRef<HTMLDivElement>(null);
  const arrived = useArrival(filmRef, reveals);
  const [selected, setSelected] = useState<string | null>(null);
  const stage = novel.stages.find((s) => s.id === selected) ?? null;
  const lit: FrameRegion | null = stage?.region ?? null;
  // The frame is the game window's shape: the capture's window chrome and bottom bar stay hidden.
  const crop = { aspectRatio: `${novel.frame.width} / ${novel.frame.height}` };

  // First visit: the frame opens from a slit, like a projector's gate.
  useLayoutEffect(() => {
    const frame = filmRef.current;
    if (!frame || !reveals || !arrived || reduced) return;
    const opening = frame.animate(
      [{ clipPath: "inset(46% 0 46% 0)" }, { clipPath: "inset(0% 0 0% 0)" }],
      { duration: duration.aperture, easing: easing.out },
    );
    const settle = frame.querySelector("img")?.animate([{ transform: "scale(1.06)" }, { transform: "scale(1)" }], { duration: duration.aperture * 1.6, easing: easing.out });
    return () => { opening.cancel(); settle?.cancel(); };
  }, [arrived, reveals, reduced]);

  return (
    <section className="sp-vn" id={sectionIds.novel} aria-labelledby="sp-vn-title" data-lit={lit ?? "none"}>
      <div className="sp-vn-grid">
        <header className="sp-vn-head">
          <p className="sp-kicker"><WorkIndex id={sectionIds.novel} /> — {novel.event}</p>
          <h2 className="sp-vn-title" id="sp-vn-title">{novel.name}</h2>
          <p className="sp-vn-headline">
            {novel.headline.lead} <span>{novel.headline.rest} <em>{novel.headline.accent}</em></span>
          </p>
        </header>

        <figure className="sp-film">
          <div
            className="sp-film-frame"
            ref={filmRef}
            style={crop}
            data-gate={reveals && !arrived ? "closed" : "open"}
            data-schematic={novelScreenshot ? undefined : "true"}
            {...(novelScreenshot ? {} : { role: "img", "aria-label": schematicLabel })}
          >
            {novelScreenshot && (
              <img
                src={shot.src}
                width={shot.width}
                height={shot.height}
                alt={shot.alt}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: `50% ${((shot.frame.top / (shot.height - shot.frame.height)) * 100).toFixed(2)}%` }}
              />
            )}
            {(Object.keys(regions) as FrameRegion[]).map((key) => {
              const { box, label, tag } = regions[key];
              return (
                <span
                  key={key}
                  className="sp-film-region"
                  data-region={key}
                  data-on={lit === key}
                  style={{ left: `${box.x}%`, top: `${box.y}%`, width: `${box.w}%`, height: `${box.h}%` }}
                  aria-hidden="true"
                >
                  <span className={novelScreenshot ? "sp-film-label" : "sp-film-tag"}>{novelScreenshot ? label : tag}</span>
                </span>
              );
            })}
          </div>
          <figcaption className="sp-film-credit">
            {novelScreenshot ? `${shot.credit}, cropped to the game window.` : "A schematic of the game frame’s three areas, not a screenshot of the project."}
          </figcaption>
        </figure>

        <div className="sp-board" role="group" aria-labelledby="sp-board-title">
          <p className="sp-board-title" id="sp-board-title"><span className="sp-st-label">Pipeline</span> Choose a stage to see where its work shows in the frame.</p>
          <ol className="sp-board-frames">
            {novel.stages.map((s, i) => (
              <li key={s.id} className="sp-board-frame" data-by={s.by} data-on={selected === s.id}>
                <button type="button" className="sp-board-pick" aria-pressed={selected === s.id} onClick={() => setSelected(selected === s.id ? null : s.id)}>
                  <span className="sp-board-num" aria-hidden="true">{pad(i + 1)}</span>
                  <span className="sp-board-name">{s.name}</span>
                </button>
                <span className="sp-board-tool">{s.tool}</span>
                <span className="sp-board-owner">{s.by === "mine" ? "My part" : "Team"}</span>
                <span className="sp-board-detail">{s.detail}</span>
              </li>
            ))}
          </ol>
          <p className="sp-board-readout" aria-live="polite">{stage ? made[stage.id] : ""}</p>
        </div>

        <div className="sp-vn-story">
          <dl className="sp-vn-facts">
            <div>
              <dt>Problem</dt>
              <dd>{novel.problem}</dd>
            </div>
            <div>
              <dt>My part</dt>
              <dd>{novel.contribution}</dd>
            </div>
          </dl>
          <p className="sp-vn-links">
            <span className="sp-vn-team">{novel.team}</span>
            <OutLink href={novel.showcase}>CodeDay showcase</OutLink>
          </p>
        </div>

        {/* Open on wider screens; a disclosure on phones, where the JSON would be a long scroll. */}
        <details className="sp-slate" open={compact ? undefined : true}>
          <summary><span className="sp-st-label">Story format</span> As documented in the project README</summary>
          <pre><code>{novel.storyFormat}</code></pre>
        </details>
      </div>
    </section>
  );
}

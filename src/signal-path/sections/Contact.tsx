import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { identity } from "../content";
import { useArrival } from "../hooks";
import { duration, easing, useMotion } from "../motion";
import { sectionIds } from "../structure";
import { OutLink } from "../ui";

type CopyState = "idle" | "copied" | "failed";

/** Copies text, with a fallback for browsers or contexts without the async clipboard. */
async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.append(field);
    field.select();
    const ok = document.execCommand("copy");
    field.remove();
    return ok;
  }
}

/**
 * The finale. On the session's first visit the signal returns: it underlines the address from the
 * margin and lands as the headline's period, closing the loop the hero opened.
 */
export default function Contact() {
  const { reveals } = useMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const headRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const tickRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const arrived = useArrival(sectionRef, reveals, "0px 0px -35% 0px");
  const [copy, setCopy] = useState<CopyState>("idle");
  const timer = useRef(0);

  useLayoutEffect(() => {
    const line = lineRef.current, head = headRef.current, dot = dotRef.current;
    if (!reveals || !arrived || !line || !head || !dot) return;
    const draw = { duration: duration.finale, easing: easing.draw, fill: "both" as const };
    const anims = [
      line.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], draw),
      head.animate([{ left: "0%", opacity: 1 }, { left: "100%", opacity: 1, offset: 0.92 }, { left: "100%", opacity: 0 }], draw),
      dot.animate(
        [{ transform: "scale(0)", opacity: 0 }, { transform: "scale(1.35)", opacity: 1, offset: 0.6 }, { transform: "scale(1)", opacity: 1 }],
        { delay: duration.finale - 80, duration: duration.short + 120, easing: easing.land, fill: "both" },
      ),
      // As in the opening, the ruler reads the signal: each column number darkens as it passes.
      ...tickRefs.current.flatMap((tick, i) => (tick ? [tick.animate(
        [{ color: "var(--ink-3)" }, { color: "var(--ink)", offset: 0.2 }, { color: "var(--ink-3)" }],
        { delay: (i / 12) * duration.finale, duration: 900, easing: easing.standard },
      )] : [])),
    ];
    return () => anims.forEach((a) => a.cancel());
  }, [arrived, reveals]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onCopy = async () => {
    const ok = await copyText(identity.email);
    setCopy(ok ? "copied" : "failed");
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopy("idle"), 2400);
  };

  return (
    <section className="sp-contact" id={sectionIds.contact} ref={sectionRef} aria-labelledby="sp-contact-title" data-gate={reveals && !arrived ? "closed" : "open"}>
      <div className="sp-contact-sheet">
        {/* The hero's ruler and crop marks return: the page closes on the sheet it opened with. */}
        <div className="sp-contact-ruler" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i} ref={(el) => { tickRefs.current[i] = el; }}>{String(i + 1).padStart(2, "0")}</span>
          ))}
        </div>
        <span className="sp-crop sp-crop--tl" aria-hidden="true" />
        <span className="sp-crop sp-crop--tr" aria-hidden="true" />
        <span className="sp-crop sp-crop--bl" aria-hidden="true" />
        <span className="sp-crop sp-crop--br" aria-hidden="true" />

        <div className="sp-contact-grid">
          <div className="sp-contact-main">
            <p className="sp-kicker" aria-hidden="true">Contact</p>
            <h2 className="sp-contact-title" id="sp-contact-title">
              <span className="sp-sr">Contact: </span>Let’s build something <em>useful</em><span className="sp-contact-dot" ref={dotRef} aria-hidden="true" />
            </h2>
            <p className="sp-contact-lede">Open to {identity.availability}.</p>

            <div className="sp-contact-mail">
              <a className="sp-contact-address" href={`mailto:${identity.email}`}>
                {identity.email}
                <span className="sp-contact-line" ref={lineRef} aria-hidden="true" />
                <span className="sp-contact-head" ref={headRef} aria-hidden="true" />
              </a>
              <button type="button" className="sp-copy" onClick={onCopy} data-state={copy}>
                {copy === "copied" ? <Check aria-hidden="true" strokeWidth={1.75} /> : <Copy aria-hidden="true" strokeWidth={1.75} />}
                {copy === "copied" ? "Copied" : copy === "failed" ? "Couldn’t copy" : "Copy address"}
              </button>
              <p className="sp-sr" aria-live="polite">{copy === "copied" ? "Email address copied." : copy === "failed" ? `Copying failed. The address is ${identity.email}.` : ""}</p>
            </div>

            <ul className="sp-contact-links">
              <li><OutLink href={identity.resume}>Résumé (PDF)</OutLink></li>
              <li><OutLink href={identity.github}>GitHub</OutLink></li>
              <li><OutLink href={identity.linkedin}>LinkedIn</OutLink></li>
            </ul>
          </div>

          {/* The hero's facts again, beside the address: everything needed to reach out, in one place. */}
          <dl className="sp-contact-facts">
            <div>
              <dt>Studying</dt>
              <dd>{identity.study}</dd>
            </div>
            <div>
              <dt>Graduating</dt>
              <dd>{identity.graduation}</dd>
            </div>
            <div className="sp-contact-facts-open">
              <dt>Available</dt>
              <dd>{identity.availability}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

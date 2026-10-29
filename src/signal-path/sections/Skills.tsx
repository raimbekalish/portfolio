import { useRef, useState, type KeyboardEvent } from "react";
import { skills } from "../content";
import { sectionIds } from "../structure";

/**
 * Skills as evidence. An index of skills, grouped by kind, beside cards for the work on this page
 * whose described contribution used them, in page order.
 * Pointing at or focusing a skill lights the work that used it; pointing at a card lights its
 * skills. Every fact is also plain text in the cards, so the highlight is only a reading aid.
 */
export default function Skills() {
  const { contexts, groups, also } = skills;
  const [skill, setSkill] = useState<string | null>(null);
  const [card, setCard] = useState<string | null>(null);
  const [focusIndex, setFocusIndex] = useState(0);
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const all = groups.flatMap((g) => g.skills);
  const usedBy = (name: string) => (all.find((s) => s.name === name)?.used ?? []) as string[];
  const skillsOf = (id: string) => all.filter((s) => (s.used as string[]).includes(id)).map((s) => s.name);
  const external = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {});
  const litCards = skill ? usedBy(skill) : card ? [card] : [];
  const litSkills = card ? skillsOf(card) : skill ? [skill] : [];

  const onKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = all.length - 1;
    const forward = Math.min(last, focusIndex + 1), back = Math.max(0, focusIndex - 1);
    const next = ({ ArrowRight: forward, ArrowDown: forward, ArrowLeft: back, ArrowUp: back, Home: 0, End: last } as Record<string, number>)[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setFocusIndex(next);
    chipRefs.current[next]?.focus();
  };

  let n = -1;
  return (
    <section className="sp-skills" id={sectionIds.skills} aria-labelledby="sp-skills-title" data-lit={skill || card ? "true" : "false"}>
      <div className="sp-skills-grid">
        <header className="sp-skills-head">
          <p className="sp-kicker" aria-hidden="true">Skills</p>
          <h2 className="sp-skills-title" id="sp-skills-title"><span className="sp-sr">Skills: </span>Where I used what.</h2>
          <p className="sp-skills-note">Listed only where the skill is part of my own described contribution. Point at a skill to see the work that used it.</p>
        </header>

        <div className="sp-skill-index" role="toolbar" aria-label="Skills index. Focus a skill to highlight the work that used it." onPointerLeave={() => setSkill(null)}>
          {groups.map((group) => (
            <div key={group.group} className="sp-skill-group">
              <p className="sp-st-label">{group.group}</p>
              <div className="sp-skill-chips">
                {group.skills.map((s) => {
                  n += 1;
                  const i = n;
                  return (
                    <button
                      key={s.name}
                      type="button"
                      className="sp-skill-chip"
                      ref={(el) => { chipRefs.current[i] = el; }}
                      tabIndex={i === focusIndex ? 0 : -1}
                      data-on={litSkills.includes(s.name)}
                      aria-label={`${s.name}, used in ${s.used.length} ${s.used.length === 1 ? "piece" : "pieces"} of work`}
                      onPointerEnter={() => { setCard(null); setSkill(s.name); }}
                      onFocus={() => { setCard(null); setSkill(s.name); setFocusIndex(i); }}
                      onBlur={() => setSkill(null)}
                      onClick={() => { setCard(null); setSkill(s.name); }}
                      onKeyDown={onKey}
                    >
                      {s.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <p className="sp-skills-also"><span className="sp-st-label">Also</span>{also.join(" · ")}</p>
        </div>

        <ul className="sp-evidence" onPointerLeave={() => setCard(null)}>
          {contexts.map((c) => (
            <li key={c.id} className="sp-evidence-card" data-on={litCards.includes(c.id)} onPointerEnter={() => { setSkill(null); setCard(c.id); }}>
              <h3><a href={c.href} {...external(c.href)}>{c.label}</a></h3>
              <p className="sp-evidence-note">{c.note}</p>
              <ul className="sp-evidence-skills">
                {skillsOf(c.id).map((name) => <li key={name} data-on={skill === name}>{name}</li>)}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

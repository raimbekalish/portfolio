import { useState } from "react";
import { roles } from "../content";
import { sectionIds } from "../structure";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/** "2025-09" → months since year 0, so ranges can be compared and measured. */
const index = (ym: string) => { const [y, m] = ym.split("-").map(Number); return y * 12 + m - 1; };
const label = (i: number, names = LONG) => `${names[i % 12]} ${Math.floor(i / 12)}`;

// The ruler runs from the first month of the earliest role to the current month.
const now = new Date();
const current = now.getFullYear() * 12 + now.getMonth();
const first = Math.min(...roles.map((r) => index(r.start)));
const last = Math.max(current, ...roles.map((r) => (r.end ? index(r.end) : current)));
const span = last - first + 1;
const months = Array.from({ length: span }, (_, i) => first + i);
const at = (i: number) => `${(((i - first) / span) * 100).toFixed(3)}%`;
const length = (n: number) => `${((n / span) * 100).toFixed(3)}%`;
/** "Now" is the middle of the current month; a current role's bar ends there. */
const nowAt = current + 0.5;
const endOf = (end: string | null) => (end ? index(end) + 1 : nowAt);
/** Phones label quarter months only; the first month too unless a quarter label sits right after it. */
const major = (m: number) => (m === first ? (3 - (m % 3)) % 3 !== 1 : m % 3 === 0);

const summary = `Timeline from ${label(first)} to ${label(last)}: ${roles
  .map((r) => `${r.role} at ${r.company}, ${label(index(r.start))} to ${r.end ? label(index(r.end)) : "present"}`)
  .join("; ")}.`;

/** Experience: a time ruler (the hero's ruler, now counting months) above the roles. */
export default function Experience() {
  const [lit, setLit] = useState<string | null>(null);
  const light = (id: string | null) => () => setLit(id);

  return (
    <section className="sp-xp" id={sectionIds.experience} aria-labelledby="sp-xp-title" data-lit={lit ?? "none"}>
      <div className="sp-xp-grid">
        <header className="sp-xp-head">
          <p className="sp-kicker" aria-hidden="true">Experience</p>
          <h2 className="sp-xp-title" id="sp-xp-title"><span className="sp-sr">Experience: </span>Built. Designed. Taught.</h2>
        </header>

        <div className="sp-time" role="img" aria-label={summary}>
          <div className="sp-time-months" aria-hidden="true">
            {months.map((m) => (
              <span key={m} style={{ left: at(m) }} data-year={m % 12 === 0 || m === first ? Math.floor(m / 12) : undefined} data-major={major(m) || undefined}>
                {MONTHS[m % 12]}
              </span>
            ))}
          </div>
          <ol className="sp-time-tracks" aria-hidden="true">
            {roles.map((r) => {
              const from = index(r.start);
              return (
                <li key={r.id} className="sp-time-track">
                  <span
                    className="sp-time-bar"
                    data-lit={lit === r.id}
                    data-open={!r.end}
                    style={{ left: at(from), width: length(endOf(r.end) - from) }}
                    onPointerEnter={light(r.id)}
                    onPointerLeave={light(null)}
                  >
                    <span className="sp-time-label">{r.company}</span>
                  </span>
                </li>
              );
            })}
          </ol>
          <span className="sp-time-now" style={{ left: at(nowAt) }} aria-hidden="true"><span>Now</span></span>
        </div>

        <ol className="sp-roles">
          {roles.map((r) => (
            <li
              key={r.id}
              className="sp-role"
              data-lit={lit === r.id}
              data-open={!r.end}
              onPointerEnter={light(r.id)}
              onPointerLeave={light(null)}
              onFocus={light(r.id)}
              onBlur={light(null)}
            >
              <p className="sp-role-date">
                <span>{r.date}</span>
                <span>{r.location}</span>
              </p>
              <div className="sp-role-who">
                <h3 className="sp-role-company">{r.company}</h3>
                <p className="sp-role-title">{r.role}</p>
              </div>
              <ul className="sp-role-points">
                {r.highlights.map((h) => <li key={h}>{h}</li>)}
              </ul>
              {r.id === "r-finance" && <a className="sp-role-link" href={`#${sectionIds.rfinance}`}>See the two services</a>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

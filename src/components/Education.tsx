import { schools } from "../data";

export default function Education() {
  return (
    <section className="site-section" id="education" aria-labelledby="education-title">
      <div className="container">
        <header className="section-header compact-header">
          <p className="section-index">04 / Education</p>
          <div>
            <h2 id="education-title">Computer science education.</h2>
            <p>Building on an associate degree while completing a bachelor’s degree at Whitman College.</p>
          </div>
        </header>

        <div className="education-grid">
          {schools.map((school) => (
            <article className="education-card" key={school.name}>
              <span className="logo-frame education-logo" aria-hidden="true">
                <img src={school.logo} alt="" width="52" height="52" loading="lazy" decoding="async" />
              </span>
              <div>
                <h3>{school.name}</h3>
                <p>{school.degree}</p>
                <div className="education-meta">
                  <span>{school.date}</span>
                  <span>{school.location}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

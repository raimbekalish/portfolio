import { experiences } from "../data";

export default function Experience() {
  return (
    <section className="site-section" id="experience" aria-labelledby="experience-title">
      <div className="container">
        <header className="section-header">
          <p className="section-index">02 / Experience</p>
          <div>
            <h2 id="experience-title">Engineering, product work, and teaching.</h2>
            <p>Work across AI-assisted research, technical communication, and computer science instruction.</p>
          </div>
        </header>

        <div className="experience-list">
          {experiences.map((experience) => (
            <article className="experience-row" key={`${experience.company}-${experience.role}`}>
              <div className="experience-meta">
                <span className="logo-frame" aria-hidden="true">
                  <img src={experience.logo} alt="" width="48" height="48" loading="lazy" decoding="async" />
                </span>
                <div>
                  <h3>{experience.company}</h3>
                  <p>{experience.role}</p>
                  <span>{experience.date} · {experience.location}</span>
                </div>
              </div>
              <ul>
                {experience.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

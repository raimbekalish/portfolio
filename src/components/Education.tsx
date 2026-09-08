import { schools } from "../data";
export default function Education() {
  return (
    <section
      className="education-section section-space"
      id="education"
      tabIndex={-1}
      aria-labelledby="education-title"
    >
      <div className="container resume-section-grid">
        <header>
          <p className="section-index">05 / Education</p>
          <h2 id="education-title">
            A foundation <br />
            in CS & math.
          </h2>
        </header>
        <div className="education-list">
          {schools.map((school) => (
            <article className="education-row" key={school.name}>
              <img
                src={school.logo}
                alt=""
                width="44"
                height="44"
                loading="lazy"
                decoding="async"
              />
              <div>
                <h3>{school.name}</h3>
                <p>{school.degree}</p>
                <p className="education-metadata"><span>{school.date}</span><span>{school.location}</span></p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

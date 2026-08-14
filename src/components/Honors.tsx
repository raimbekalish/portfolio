import { Award, Trophy } from "lucide-react";
import { honors } from "../data";

export default function Honors() {
  return (
    <section className="site-section honors-section" id="awards" aria-labelledby="awards-title">
      <div className="container">
        <header className="section-header compact-header">
          <p className="section-index">06 / Recognition</p>
          <div>
            <h2 id="awards-title">Awards & honors.</h2>
          </div>
        </header>

        <div className="honors-grid">
          {honors.map((honor, index) => (
            <article key={honor.title}>
              <span className="honor-icon" aria-hidden="true">
                {index < 2 ? <Trophy /> : <Award />}
              </span>
              <div>
                <h3>{honor.title}</h3>
                <p>{honor.organization}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

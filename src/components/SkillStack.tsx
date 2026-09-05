import { skillGroups } from "../data";
export default function SkillStack() {
  return (
    <section
      className="skills-section section-space"
      id="skills"
      tabIndex={-1}
      aria-labelledby="skills-title"
    >
      <div className="container resume-section-grid">
        <header>
          <p className="section-index">06 / The toolkit</p>
          <h2 id="skills-title">Across the stack.</h2>
        </header>
        <div className="skills-list">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.label}>
              <h3>{group.label}</h3>
              <p>{group.items.join(" / ")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

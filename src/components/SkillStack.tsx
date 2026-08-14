import { skillGroups } from "../data";

export default function SkillStack() {
  return (
    <section className="site-section skills-section" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <header className="section-header compact-header">
          <p className="section-index">05 / Technical skills</p>
          <div>
            <h2 id="skills-title">Languages, systems, and tools.</h2>
            <p>Technologies used across projects, coursework, and engineering work.</p>
          </div>
        </header>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.label}>
              <h3>{group.label}</h3>
              <div className="tag-list">
                {group.items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

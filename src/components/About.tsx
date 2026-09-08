import { ArrowDownRight } from "lucide-react";
import { honors } from "../data";
export default function About() {
  return (
    <section
      className="about-section section-space"
      id="about"
      tabIndex={-1}
      aria-labelledby="about-title"
    >
      <div className="container about-grid">
        <div>
          <p className="section-index">04 / A little about me</p>
          <h2 id="about-title">
            Curious about <br />
            the whole thing<span>.</span>
          </h2>
          <ArrowDownRight className="about-arrow" aria-hidden="true" />
        </div>
        <div className="about-copy">
          <p>
            I study computer science and mathematics at Whitman College. I like
            working across the model, the API, and the interface—and carrying an
            idea beyond the demo.
          </p>
          <p>
            Teaching computer science has also made me care about how I explain
            a system, not just how I build it.
          </p>
          <div className="about-note">
            <span className="tiny-label">Along the way</span>
            <p>
              {honors[2].title}
              <span>{honors[2].organization}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

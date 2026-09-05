import { ArrowUpRight, Github } from "lucide-react";
export default function ProjectLinks({
  name,
  demo,
  repo,
}: {
  name: string;
  demo: string;
  repo: string;
}) {
  return (
    <div className="project-links">
      <a
        href={repo}
        target="_blank"
        rel="noreferrer"
        aria-label={`${name} source on GitHub`}
      >
        <Github aria-hidden="true" /> Source <ArrowUpRight aria-hidden="true" />
      </a>
      <a
        href={demo}
        target="_blank"
        rel="noreferrer"
        aria-label={`${name} project page`}
      >
        Project page <ArrowUpRight aria-hidden="true" />
      </a>
    </div>
  );
}

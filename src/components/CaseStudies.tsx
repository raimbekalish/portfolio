import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ChevronDown } from "lucide-react";

interface ProjectLink {
  label: string;
  url: string;
}

interface Project {
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  technicalDecisions?: string;
  technicalHighlights?: string[];
  impact: string;
  nextSteps?: string;
  tech: string[];
  repo?: string;
  demo?: string;
  image?: string;
  badges?: string[];
  links?: ProjectLink[];
}

interface CaseStudiesProps {
  projects: Project[];
}

export default function CaseStudies({ projects }: CaseStudiesProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedId(expandedId === index ? null : index);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleExpand(index);
    }
  };

  return (
    <section id="work" className="py-16 sm:py-20 lg:py-24 px-5 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-14 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 tracking-[-0.03em] mb-4">
            Selected Work
          </h2>
          <p className="text-stone-600 text-base sm:text-lg max-w-xl mx-auto leading-[1.65]">
            Product-focused projects from concept to impact
          </p>
        </motion.div>

        <div className="space-y-0 divide-y divide-stone-200/60">
          {projects.map((project, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25 }}
              className="bg-white"
            >
              <button
                onClick={() => toggleExpand(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-full text-left p-5 sm:p-6 hover:bg-stone-50/40 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-300/50 focus:ring-inset rounded-md"
                aria-expanded={expandedId === index}
                aria-controls={`case-study-${index}`}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1 min-w-0 space-y-2.5">
                    <div className="flex items-start gap-3 flex-wrap">
                      <h3 className="text-xl sm:text-2xl font-semibold text-stone-900 tracking-tight">
                        {project.name}
                      </h3>
                      {project.badges && (
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {project.badges.map((badge) => (
                            <span
                              key={badge}
                              className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-medium tracking-tight ${badge === "Featured"
                                  ? "bg-stone-900 text-white border border-stone-900/10"
                                  : "bg-stone-100 text-stone-700 border border-stone-200/80"
                                }`}
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-stone-600 leading-[1.5] line-clamp-2">
                      {project.tagline}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-0.5 rounded-md bg-stone-50/50 text-stone-500 border border-stone-200/40"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedId === index ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex-shrink-0 mt-0.5"
                  >
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-stone-400" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {expandedId === index && (
                  <motion.div
                    id={`case-study-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-stone-200/60 bg-stone-50/20">
                      {project.image && (
                        <div className="my-4 sm:my-5 rounded-lg overflow-hidden border border-stone-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.06)] bg-gradient-to-b from-stone-100/50 to-stone-50/30">
                          <div className="flex items-center justify-center p-3 sm:p-4">
                            <img
                              src={project.image}
                              alt={`${project.name} preview`}
                              className="max-w-full h-auto max-h-[400px] object-contain rounded-md shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      )}
                      <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 text-sm text-stone-700 leading-[1.6]">
                        <div>
                          <h4 className="font-semibold text-stone-900 mb-1.5 text-xs uppercase tracking-wide">Problem</h4>
                          <p className="text-sm">{project.problem}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-stone-900 mb-1.5 text-xs uppercase tracking-wide">Solution</h4>
                          <p className="text-sm">{project.solution}</p>
                        </div>
                        {project.technicalHighlights && (
                          <div className="sm:col-span-2">
                            <h4 className="font-semibold text-stone-900 mb-2 text-xs uppercase tracking-wide">Technical Highlights</h4>
                            <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5">
                              {project.technicalHighlights.map((highlight, idx) => (
                                <li key={idx} className="text-sm text-stone-700 flex items-start gap-2">
                                  <span className="text-stone-400 mt-1.5">•</span>
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div>
                          <h4 className="font-semibold text-stone-900 mb-1.5 text-xs uppercase tracking-wide">Impact</h4>
                          <p className="text-sm">{project.impact}</p>
                        </div>
                        {project.nextSteps && (
                          <div>
                            <h4 className="font-semibold text-stone-900 mb-1.5 text-xs uppercase tracking-wide">Next Steps</h4>
                            <p className="text-sm">{project.nextSteps}</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 sm:gap-3 mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-stone-200/80">
                        {project.repo && (
                          <a
                            href={project.repo}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-stone-300/80 bg-white text-stone-900 hover:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 transition-all text-sm font-medium shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.06)]"
                          >
                            <Github className="w-3.5 h-3.5" />
                            View Code
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-stone-300/80 bg-white text-stone-900 hover:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 transition-all text-sm font-medium shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.06)]"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            View Demo
                          </a>
                        )}
                        {project.links?.map((link) => (
                          <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-stone-300/80 bg-white text-stone-900 hover:border-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 transition-all text-sm font-medium shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.06)]"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            {link.label}
                          </a>
                        ))}

                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ChevronDown, Zap } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

interface ProjectLink {
  label: string;
  url: string;
}

interface Project {
  name: string;
  label: string;
  description: string;
  role: string;
  impact: string;
  tech: string[];
  repo?: string;
  demo?: string;
  image?: string;
  links?: ProjectLink[];
  featured?: boolean;
}

interface CaseStudiesProps {
  projects: Project[];
}

export default function CaseStudies({ projects }: CaseStudiesProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <SectionWrapper id="work">
      <h2 className="section-heading text-center">
        <span className="text-gradient">Projects</span>
      </h2>
      <p className="section-sub text-center mx-auto mb-12">
        Award-winning hackathon projects and technical builds
      </p>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="glass-hover overflow-hidden"
          >
            {/* Collapsed header */}
            <button
              onClick={() => setExpandedId(expandedId === index ? null : index)}
              className="w-full text-left p-5 sm:p-6 focus:outline-none focus:ring-2 focus:ring-indigo-400/30 focus:ring-inset rounded-2xl"
              aria-expanded={expandedId === index}
              aria-controls={`project-${index}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-lg sm:text-xl font-bold text-dark-50 tracking-tight">
                      {project.name}
                    </h3>
                    <span className={`text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full font-medium ${
                      project.featured
                        ? "bg-indigo-500/15 border border-indigo-500/25 text-indigo-300"
                        : "bg-white/[0.05] border border-white/[0.08] text-dark-300"
                    }`}>
                      {project.label}
                    </span>
                  </div>
                  <p className="text-sm text-dark-200 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 5).map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.04] text-dark-400 border border-white/[0.05]">
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 5 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md text-dark-400">
                        +{project.tech.length - 5}
                      </span>
                    )}
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: expandedId === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 mt-1"
                >
                  <ChevronDown className="w-5 h-5 text-dark-400" />
                </motion.div>
              </div>
            </button>

            {/* Expanded detail */}
            <AnimatePresence>
              {expandedId === index && (
                <motion.div
                  id={`project-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 sm:px-6 pb-6 border-t border-white/[0.06] pt-5">
                    {project.image && (
                      <div className="mb-5 rounded-xl overflow-hidden border border-white/[0.06] bg-dark-800/40">
                        <div className="p-3 sm:p-4 flex justify-center">
                          <img
                            src={project.image}
                            alt={`${project.name} preview`}
                            className="max-w-full h-auto max-h-[360px] object-contain rounded-lg"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-5 text-sm">
                      <div>
                        <h4 className="text-xs font-semibold text-dark-100 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                          <Zap className="w-3 h-3 text-indigo-400" />
                          My Role
                        </h4>
                        <p className="text-dark-200 leading-[1.65]">{project.role}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-dark-100 uppercase tracking-wide mb-2">
                          Impact / Result
                        </h4>
                        <p className="text-dark-200 leading-[1.65]">{project.impact}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <h4 className="text-xs font-semibold text-dark-100 uppercase tracking-wide mb-2">
                          Full Tech Stack
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.map((t) => (
                            <span key={t} className="badge text-[10px]">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-2.5 mt-5 pt-5 border-t border-white/[0.06]">
                      {project.repo && (
                        <a href={project.repo} target="_blank" rel="noreferrer" className="btn-secondary text-sm">
                          <Github className="w-3.5 h-3.5" />
                          View Code
                        </a>
                      )}
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noreferrer" className="btn-secondary text-sm">
                          <ExternalLink className="w-3.5 h-3.5" />
                          View Demo
                        </a>
                      )}
                      {project.links?.map((link) => (
                        <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="btn-secondary text-sm">
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
    </SectionWrapper>
  );
}

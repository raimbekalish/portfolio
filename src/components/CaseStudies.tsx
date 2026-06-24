import { motion } from "framer-motion";
import { Github, ExternalLink, Zap } from "lucide-react";
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
  const featuredProjects = projects.filter((p) => p.featured);
  const additionalBuilds = projects.filter((p) => !p.featured);

  return (
    <SectionWrapper id="work">
      <h2 className="section-heading text-center">
        <span className="text-gradient">Case Studies</span>
      </h2>
      <p className="section-sub text-center mx-auto mb-16">
        Deep dives into my most impactful builds and hackathon wins
      </p>

      <div className="space-y-12 sm:space-y-16">
        {featuredProjects.map((project, index) => (
          <motion.article
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            className="group relative"
          >
            {/* Background glow for premium feel */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
            
            <div className="relative glass p-5 sm:p-8 lg:p-10 rounded-3xl flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              
              {/* Image Column */}
              {project.image && (
                <div className="w-full lg:w-[45%] flex-shrink-0">
                  <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-dark-800 relative group-hover:border-white/[0.12] transition-colors">
                    <img
                      src={project.image}
                      alt={`${project.name} preview`}
                      className="w-full h-auto object-cover sm:max-h-[300px] lg:max-h-[400px] group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              {/* Content Column */}
              <div className="flex-1 w-full flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-3 flex-wrap mb-4">
                    <h3 className="text-2xl sm:text-3xl font-bold text-dark-50 tracking-tight">
                      {project.name}
                    </h3>
                    <span className="bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 text-xs px-3 py-1 rounded-full font-medium tracking-wide">
                      {project.label}
                    </span>
                  </div>
                  
                  <p className="text-base sm:text-lg text-dark-200 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6 mb-8 text-sm">
                    <div>
                      <h4 className="text-[11px] font-bold text-dark-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-indigo-400" />
                        My Role
                      </h4>
                      <p className="text-dark-200 leading-[1.6]">{project.role}</p>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-dark-400 uppercase tracking-wider mb-2">
                        Impact & Result
                      </h4>
                      <p className="text-dark-200 leading-[1.6]">{project.impact}</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-[11px] font-bold text-dark-400 uppercase tracking-wider mb-2">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="badge text-[11px] px-2.5 py-1">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Links / CTAs */}
                <div className="flex flex-wrap gap-3 mt-auto pt-6 border-t border-white/[0.06]">
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="btn-primary text-sm px-4 py-2">
                      <ExternalLink className="w-4 h-4 mr-1.5" />
                      View Project
                    </a>
                  )}
                  {project.repo && (
                    <a href={project.repo} target="_blank" rel="noreferrer" className="btn-secondary text-sm px-4 py-2">
                      <Github className="w-4 h-4 mr-1.5" />
                      Source Code
                    </a>
                  )}
                  {project.links?.map((link) => (
                    <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="btn-secondary text-sm px-4 py-2">
                      <ExternalLink className="w-4 h-4 mr-1.5" />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Additional Builds (JiraGenie, etc.) */}
      {additionalBuilds.length > 0 && (
        <div className="mt-20">
          <h3 className="text-xl font-bold text-dark-100 mb-8 flex items-center gap-4">
            <span>Additional Builds</span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/[0.08] to-transparent" />
          </h3>
          <div className="grid sm:grid-cols-2 gap-5">
            {additionalBuilds.map((project) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-bold text-dark-50">{project.name}</h4>
                    <span className="text-[10px] bg-white/[0.05] border border-white/[0.08] text-dark-300 px-2 py-0.5 rounded-full">
                      {project.label}
                    </span>
                  </div>
                  <p className="text-sm text-dark-200 mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.slice(0, 4).map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.03] text-dark-300 border border-white/[0.05]">
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-md text-dark-400">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-3 mt-auto border-t border-white/[0.06] pt-4">
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="text-xs font-medium text-dark-100 hover:text-indigo-400 flex items-center transition-colors">
                      <ExternalLink className="w-3.5 h-3.5 mr-1" />
                      Demo
                    </a>
                  )}
                  {project.repo && (
                    <a href={project.repo} target="_blank" rel="noreferrer" className="text-xs font-medium text-dark-100 hover:text-indigo-400 flex items-center transition-colors">
                      <Github className="w-3.5 h-3.5 mr-1" />
                      Code
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}

import SectionWrapper from "./SectionWrapper";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  date: string;
  bullets: string[];
}

interface ExperienceProps {
  experiences: ExperienceItem[];
}

export default function Experience({ experiences }: ExperienceProps) {
  return (
    <SectionWrapper id="experience">
      <h2 className="section-heading text-center">
        <span className="text-gradient">Experience</span>
      </h2>
      <div className="h-8" />

      <div className="space-y-5">
        {experiences.map((exp, index) => (
          <motion.div
            key={`${exp.company}-${exp.role}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-hover p-6"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
              <div className="flex items-start gap-3">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #6366f1, #7c3aed)" }}
                >
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-dark-50 tracking-tight">{exp.company}</h3>
                  <p className="text-sm text-dark-200 mt-0.5">{exp.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:flex-col sm:items-end pl-[52px] sm:pl-0">
                <span className="inline-flex items-center gap-1.5 text-xs text-dark-300">
                  <Calendar className="w-3 h-3" />
                  {exp.date}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-dark-300">
                  <MapPin className="w-3 h-3" />
                  {exp.location}
                </span>
              </div>
            </div>

            {/* Bullets */}
            <ul className="space-y-2.5 pl-[52px] sm:pl-0 sm:ml-[52px]">
              {exp.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-dark-200 leading-[1.65]">
                  <span className="w-1 h-1 rounded-full bg-indigo-400/50 mt-2 flex-shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

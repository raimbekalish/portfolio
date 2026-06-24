import SectionWrapper from "./SectionWrapper";
import { GraduationCap, MapPin, Calendar, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface School {
  name: string;
  degree: string;
  date: string;
  location: string;
}

interface EducationProps {
  schools: School[];
  coursework?: string[];
}

export default function Education({ schools, coursework }: EducationProps) {
  return (
    <SectionWrapper id="education">
      <h2 className="section-heading text-center">
        <span className="text-gradient">Education</span>
      </h2>
      <p className="section-sub text-center mx-auto mb-12" />

      <div className="grid sm:grid-cols-2 gap-5">
        {schools.map((school, index) => (
          <motion.div
            key={school.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="glass-hover p-6"
          >
            <div className="flex items-start gap-3 mb-3">
              <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #6366f1, #7c3aed)" }}
              >
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-bold text-dark-50 tracking-tight">{school.name}</h3>
                <p className="text-sm text-dark-200 mt-0.5">{school.degree}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 pl-[52px]">
              <span className="inline-flex items-center gap-1.5 text-xs text-dark-300">
                <Calendar className="w-3 h-3" />
                {school.date}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-dark-300">
                <MapPin className="w-3 h-3" />
                {school.location}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Coursework */}
      {coursework && coursework.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-1.5 text-xs text-dark-300 mb-3">
            <BookOpen className="w-3 h-3" />
            <span className="font-medium uppercase tracking-wide">Relevant Coursework</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {coursework.map((c) => (
              <span key={c} className="badge text-xs">{c}</span>
            ))}
          </div>
        </motion.div>
      )}
    </SectionWrapper>
  );
}

import { motion } from "framer-motion";
import { Sparkles, Database, Cloud, LayoutTemplate, Code2, Wrench } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

interface SkillGroup {
  group: string;
  items: string[];
}

interface SkillStackProps {
  skills: SkillGroup[];
}

const ICONS: Record<string, any> = {
  "Languages": Code2,
  "ML/AI Frameworks": Sparkles,
  "Backend & Data Engineering": Database,
  "Cloud & DevOps": Cloud,
  "Frontend": LayoutTemplate,
  "Tools": Wrench,
};

export default function SkillStack({ skills }: SkillStackProps) {
  return (
    <SectionWrapper id="skills">
      <h2 className="section-heading text-center">
        <span className="text-gradient">Technical Stack</span>
      </h2>
      <p className="section-sub text-center mx-auto mb-16">
        The engine behind my builds: AI, data pipelines, and full-stack systems.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {skills.map((skillGroup, index) => {
          const Icon = ICONS[skillGroup.group] || Code2;
          
          // Make AI, Backend, and Cloud span slightly larger or have stronger emphasis
          const isCore = ["ML/AI Frameworks", "Backend & Data Engineering", "Cloud & DevOps"].includes(skillGroup.group);

          return (
            <motion.div
              key={skillGroup.group}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`glass p-6 sm:p-8 rounded-3xl group transition-colors duration-500 hover:border-indigo-500/20 ${
                isCore ? "bg-dark-800/40" : "bg-dark-800/20"
              }`}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`p-2.5 rounded-xl ${isCore ? 'bg-indigo-500/10 text-indigo-400' : 'bg-white/[0.05] text-dark-300'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-dark-50 tracking-tight text-lg">
                  {skillGroup.group}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((item) => (
                  <span
                    key={item}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                      isCore 
                        ? "bg-indigo-500/[0.03] border-indigo-500/10 text-dark-200 hover:border-indigo-500/30 hover:text-indigo-200" 
                        : "bg-white/[0.02] border-white/[0.05] text-dark-300 hover:border-white/[0.1] hover:text-dark-100"
                    }`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

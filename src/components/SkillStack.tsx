import { motion } from "framer-motion";

interface SkillGroup {
  group: string;
  items: string[];
}

interface SkillStackProps {
  skills: SkillGroup[];
}

export default function SkillStack({ skills }: SkillStackProps) {
  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-24 px-5 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-14 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-4">
            <span className="gradient-text">Technical Skills</span>
          </h2>
          <p className="text-dark-200 text-base sm:text-lg max-w-xl mx-auto leading-[1.65]">
            Languages, frameworks, and tools I use to build products
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.group}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="glass-card-hover p-5"
            >
              <h3 className="font-medium text-indigo-300/90 mb-3 text-xs uppercase tracking-wide">
                {skillGroup.group}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skillGroup.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 rounded-full bg-white/[0.04] text-dark-200 border border-white/[0.06] hover:border-indigo-500/30 hover:text-dark-100 transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

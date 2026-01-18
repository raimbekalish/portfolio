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
    <section id="skills" className="py-16 sm:py-20 lg:py-24 px-5 sm:px-6 lg:px-8 bg-stone-50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-14 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 tracking-[-0.03em] mb-4">
            Toolbox
          </h2>
          <p className="text-stone-600 text-base sm:text-lg max-w-xl mx-auto leading-[1.65]">
            Technologies and practices I use to build products
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {skills.map((skillGroup) => (
            <motion.div
              key={skillGroup.group}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-lg border border-stone-200/60 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
              <h3 className="font-medium text-stone-900 mb-3 text-xs uppercase tracking-wide">
                {skillGroup.group}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skillGroup.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2 py-1 rounded-md bg-stone-50 text-stone-600 border border-stone-200/50"
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

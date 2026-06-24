import { motion } from "framer-motion";

const PRINCIPLES = [
  {
    title: "Workflow over hype",
    description: "I build practical AI tools that actually solve workflow problems, rather than just adding AI for the sake of it.",
  },
  {
    title: "Clean and reliable",
    description: "I care about clean interfaces, useful automation, and reliable systems that don't break when you need them most.",
  },
  {
    title: "Product-focused engineering",
    description: "I like projects that connect AI, product thinking, and real user workflows to create something genuinely valuable.",
  },
];

export default function BuildPhilosophy() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-5 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-4">
            <span className="gradient-text">Build Philosophy</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {PRINCIPLES.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="glass-card-hover p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-dark-50 mb-2.5 tracking-tight">
                  {principle.title}
                </h3>
                <p className="text-sm text-dark-200 leading-[1.6]">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

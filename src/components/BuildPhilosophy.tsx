import { motion } from "framer-motion";

const PRINCIPLES = [
  {
    title: "Ship fast, then harden",
    description: "Rapid prototyping is the best way to validate ideas. Ship functional code early, gather real feedback, and iterate continuously to refine and harden the system.",
  },
  {
    title: "Measure before optimizing",
    description: "Never assume bottlenecks. Identify performance issues by measuring what matters—whether it's model inference latency, database queries, or cache hit rates.",
  },
  {
    title: "Build boring infrastructure",
    description: "Use standard patterns, clean docs, and simple, predictable structures. Easy-to-read code means a codebase that is straightforward to maintain and scale.",
  },
];

const SIGNATURE_LINE = "Fast iteration loops. Sustainable codebases.";

export default function BuildPhilosophy() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-5 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-14 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-4">
            <span className="gradient-text">Build Philosophy</span>
          </h2>
          <p className="text-dark-200 text-base sm:text-lg max-w-xl mx-auto leading-[1.65]">
            Principles that guide how I design, develop, and scale software
          </p>
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
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="mt-8 text-sm text-dark-300 italic text-center animate-pulse"
        >
          {SIGNATURE_LINE}
        </motion.p>
      </div>
    </section>
  );
}

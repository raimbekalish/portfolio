import { motion } from "framer-motion";

const PRINCIPLES = [
  {
    title: "Ship fast, then harden",
    description: "JiraGenie shipped in 24h with streaming. PolyPredictor won via rapid prototyping. Get working code in front of users, iterate on real feedback.",
  },
  {
    title: "Measure before optimizing",
    description: "Track what matters: inference latency, cache hit rates. Optimize based on data, not assumptions.",
  },
  {
    title: "Design for failure",
    description: "Graceful degradation in voice interfaces when APIs fail. Retry logic and fallbacks for real-time streams.",
  },
  {
    title: "Make it boring to maintain",
    description: "Standard patterns, clear docs, obvious structure. Easy to read means easy to change.",
  },
];

const SIGNATURE_LINE = "Fast iteration loops. Boring infrastructure.";

export default function BuildPhilosophy() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-5 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-14 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 tracking-[-0.03em] mb-4">
            Build Philosophy
          </h2>
          <p className="text-stone-600 text-base sm:text-lg max-w-xl mx-auto leading-[1.65]">
            Principles that guide how I build products
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {PRINCIPLES.map((principle) => (
            <div
              key={principle.title}
              className="bg-stone-50/50 rounded-lg border border-stone-200/60 p-5 sm:p-6 hover:-translate-y-0.5 transition-transform duration-200"
            >
              <h3 className="text-lg font-semibold text-stone-900 mb-2.5 tracking-tight">
                {principle.title}
              </h3>
              <p className="text-sm text-stone-700 leading-[1.6]">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="mt-8 text-sm text-stone-600 italic text-center"
        >
          {SIGNATURE_LINE}
        </motion.p>
      </div>
    </section>
  );
}

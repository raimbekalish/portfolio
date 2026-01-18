import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

interface ProofStripProps {
  highlights: string[];
}

export default function ProofStrip({ highlights }: ProofStripProps) {
  return (
    <section className="py-12 sm:py-14 px-5 sm:px-6 lg:px-8 bg-stone-50 border-y border-stone-200/60">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-10 sm:gap-y-5"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-white/70 backdrop-blur-sm border border-stone-200/60 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.06)] transition-all group"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-500/90 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-stone-800 tracking-tight">{highlight}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

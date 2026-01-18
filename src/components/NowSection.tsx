import { motion } from "framer-motion";

interface NowSectionProps {
  content: string;
}

export default function NowSection({ content }: NowSectionProps) {
  const currentDate = new Date();
  const lastUpdated = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <section id="now" className="py-16 sm:py-20 lg:py-24 px-5 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 tracking-[-0.03em] mb-6 sm:mb-8">
            Now
          </h2>
          <div className="bg-white/70 backdrop-blur-sm rounded-lg border border-stone-200/60 p-6 sm:p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <p className="text-stone-700 text-sm sm:text-base leading-[1.7] whitespace-pre-line mb-4">
              {content}
            </p>
            <p className="text-xs text-stone-500 mt-6 pt-4 border-t border-stone-200/60">
              Last updated: {lastUpdated}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

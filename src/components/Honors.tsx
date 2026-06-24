import { motion } from "framer-motion";
import { Award, Trophy, Star } from "lucide-react";

interface Honor {
  title: string;
  org: string;
}

interface HonorsProps {
  honors: Honor[];
}

const ICONS = [Star, Trophy, Award];

export default function Honors({ honors }: HonorsProps) {
  return (
    <section id="honors" className="py-12 sm:py-16 px-5 sm:px-6 lg:px-8 border-t border-b border-white/[0.04] bg-white/[0.01]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
        {/* Left: Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex-shrink-0"
        >
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">Recognition</h2>
          <p className="text-lg font-bold text-dark-50">Honors & Awards</p>
        </motion.div>

        {/* Right: Badge strip */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {honors.map((honor, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <motion.div
                key={honor.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.06] hover:border-indigo-500/20 hover:bg-white/[0.05] transition-all cursor-default"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-dark-100 leading-none">{honor.title}</p>
                  <p className="text-[10px] text-dark-300 mt-0.5 leading-none">{honor.org}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

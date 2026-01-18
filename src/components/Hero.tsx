import { motion } from "framer-motion";
import { Github, Download } from "lucide-react";

interface HeroProps {
  name: string;
  statement: string;
  subtext: string;
  avatarUrl: string;
  resumeUrl: string;
  githubUrl: string;
}

export default function Hero({ name, statement, subtext, avatarUrl, resumeUrl, githubUrl }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center px-5 sm:px-6 lg:px-8 py-20 sm:py-24 bg-stone-50 relative overflow-hidden">

      <div className="max-w-5xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left relative z-10"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] xl:text-[4.5rem] font-bold tracking-[-0.03em] text-stone-900 leading-[1.06]">
              {statement}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-[1.65] whitespace-pre-line">
              {subtext}
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-1">
              <motion.a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.99 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-stone-900 text-white hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-900/50 focus:ring-offset-2 transition-all text-sm font-medium shadow-[0_1px_3px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
              >
                <Download className="w-3.5 h-3.5" />
                Resume
              </motion.a>
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.99 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-stone-300/60 bg-white text-stone-900 hover:border-stone-400/60 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-stone-400/50 focus:ring-offset-2 transition-all text-sm font-medium shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_6px_rgba(0,0,0,0.08)]"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 flex items-center justify-center relative z-10"
          >
            <div className="relative">
              <div className="relative rounded-full overflow-hidden border border-stone-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <img
                  src={avatarUrl}
                  alt={`${name} avatar`}
                  className="w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 lg:w-56 lg:h-56 object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

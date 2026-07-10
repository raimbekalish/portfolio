import { motion } from "framer-motion";
import { Github, Download, Linkedin, Mail } from "lucide-react";
import HeroDashboard from "./HeroDashboard";

interface HeroProps {
  name: string;
  headline: string;
  subtitle: string;
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  email: string;
  badges: string[];
}

const FOCUS_AREAS = ["AI products", "Full-stack systems", "Data pipelines", "Developer workflows"];

const heroContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.56, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero({ name, headline, subtitle, resumeUrl, githubUrl, linkedinUrl, email, badges }: HeroProps) {
  return (
    <section className="relative min-h-[calc(100svh-4rem)] flex items-center px-5 sm:px-6 lg:px-8 py-12 sm:py-16 overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left — Copy */}
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="show"
            className="lg:col-span-6 space-y-4 sm:space-y-5 text-center lg:text-left"
          >
            {/* Small brand mark */}
            <motion.div variants={heroItem} className="inline-flex items-center gap-2 badge-accent text-xs">
              <span className="font-bold text-indigo-300">RA</span>
              <span className="text-dark-200">·</span>
              <span>{name}</span>
            </motion.div>

            <motion.h1 variants={heroItem} className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-bold tracking-[-0.03em] leading-[1.12] text-dark-50">
              {headline}
            </motion.h1>

            <motion.p variants={heroItem} className="text-sm sm:text-base text-dark-200 leading-[1.68] max-w-xl mx-auto lg:mx-0">
              {subtitle}
            </motion.p>

            <motion.div variants={heroItem} className="glass px-3 py-2 rounded-2xl inline-flex max-w-full flex-wrap items-center justify-center lg:justify-start gap-2 text-[11px] sm:text-xs text-dark-200">
              <span className="font-semibold uppercase tracking-[0.14em] text-indigo-300">Currently focused on</span>
              {FOCUS_AREAS.map((item) => (
                <span key={item} className="rounded-full border border-white/[0.07] bg-white/[0.035] px-2.5 py-1 text-dark-100">
                  {item}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={heroItem} className="flex items-center justify-center lg:justify-start gap-2.5 flex-wrap pt-0.5">
              <motion.a
                href={resumeUrl} target="_blank" rel="noreferrer"
                whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}
                className="btn-primary text-sm"
              >
                <Download className="w-3.5 h-3.5" />
                View Resume
              </motion.a>
              <motion.a
                href={githubUrl} target="_blank" rel="noreferrer"
                whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}
                className="btn-secondary text-sm"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </motion.a>
              <motion.a
                href={linkedinUrl} target="_blank" rel="noreferrer"
                whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}
                className="btn-secondary text-sm"
              >
                <Linkedin className="w-3.5 h-3.5" />
                LinkedIn
              </motion.a>
              <motion.a
                href={`mailto:${email}`}
                whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}
                className="btn-secondary text-sm"
              >
                <Mail className="w-3.5 h-3.5" />
                Email
              </motion.a>
            </motion.div>

            {/* Credibility badges */}
            <motion.div
              variants={heroItem}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1"
            >
              {badges.map((b) => (
                <span key={b} className="badge text-[10px] sm:text-xs">{b}</span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Dashboard Visual */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 hidden sm:flex items-center justify-center"
          >
            <HeroDashboard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

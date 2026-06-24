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

export default function Hero({ name, headline, subtitle, resumeUrl, githubUrl, linkedinUrl, email, badges }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center px-5 sm:px-6 lg:px-8 py-16 sm:py-20 overflow-hidden">
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-5 text-center lg:text-left"
          >
            {/* Small brand mark */}
            <div className="inline-flex items-center gap-2 badge-accent text-xs">
              <span className="font-bold text-indigo-300">RA</span>
              <span className="text-dark-200">·</span>
              <span>{name}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-bold tracking-[-0.03em] leading-[1.12] text-dark-50">
              {headline}
            </h1>

            <p className="text-sm sm:text-base text-dark-200 leading-[1.7] max-w-xl mx-auto lg:mx-0">
              {subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5 flex-wrap pt-1">
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
            </div>

            {/* Credibility badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2"
            >
              {badges.map((b) => (
                <span key={b} className="badge text-[10px] sm:text-xs">{b}</span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Dashboard Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
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

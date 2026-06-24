import { motion } from "framer-motion";
import { X, Download, ExternalLink, Mail, Linkedin, GraduationCap, Briefcase, Trophy, Code2, Wrench } from "lucide-react";

interface ResumeOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl: string;
  email: string;
  linkedinUrl: string;
}

export default function ResumeOverlay({ isOpen, onClose, resumeUrl, email, linkedinUrl }: ResumeOverlayProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] bg-dark-900/95 backdrop-blur-xl overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Resume preview"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-5 right-5 z-[70] p-2 rounded-xl bg-white/[0.06] border border-white/[0.1] text-dark-200 hover:text-white hover:bg-white/[0.1] transition-all"
        aria-label="Close resume"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="max-w-4xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-dark-50 mb-2">Raimbek Alish</h1>
          <p className="text-dark-200 text-lg mb-6">Software Engineer & AI Developer</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a href={resumeUrl} target="_blank" rel="noreferrer" className="btn-primary text-sm">
              <Download className="w-3.5 h-3.5" />
              Download PDF
            </a>
            <a href={resumeUrl} target="_blank" rel="noreferrer" className="btn-secondary text-sm">
              <ExternalLink className="w-3.5 h-3.5" />
              View PDF
            </a>
            <a href={`mailto:${email}`} className="btn-secondary text-sm">
              <Mail className="w-3.5 h-3.5" />
              Email Me
            </a>
            <a href={linkedinUrl} target="_blank" rel="noreferrer" className="btn-secondary text-sm">
              <Linkedin className="w-3.5 h-3.5" />
              LinkedIn
            </a>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Education */}
            <div className="glass p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                <h2 className="text-sm font-semibold text-dark-50 uppercase tracking-wide">Education</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-dark-50">Whitman College</p>
                  <p className="text-xs text-dark-200">B.A. Computer Science · Expected May 2028</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-dark-50">Bellevue College</p>
                  <p className="text-xs text-dark-200">A.A.S. Computer Science · Completed June 2026</p>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="glass p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-4 h-4 text-indigo-400" />
                <h2 className="text-sm font-semibold text-dark-50 uppercase tracking-wide">Experience</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-dark-50">Canva</p>
                  <p className="text-xs text-dark-200">AI Design & Data Storytelling Extern · Nov–Dec 2025</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-dark-50">Bellevue College</p>
                  <p className="text-xs text-dark-200">Computer Science Teaching Assistant · Sep 2025–May 2026</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Featured Projects */}
            <div className="glass p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-4 h-4 text-indigo-400" />
                <h2 className="text-sm font-semibold text-dark-50 uppercase tracking-wide">Featured Projects</h2>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Poly Predictor Kit", note: "1st Place · QuackHacks 2025" },
                  { name: "PromptLock", note: "AI Context Compression · NexHacks" },
                  { name: "AI Visual Novel Creator", note: "1st Place AI Award · CodeDay 2025" },
                  { name: "JiraGenie", note: "Voice AI for Jira · DubHacks 2025" },
                ].map((p) => (
                  <div key={p.name} className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium text-dark-50">{p.name}</p>
                    <p className="text-[10px] text-dark-300 text-right flex-shrink-0">{p.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div className="glass p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-4 h-4 text-amber-400" />
                <h2 className="text-sm font-semibold text-dark-50 uppercase tracking-wide">Awards</h2>
              </div>
              <div className="space-y-2">
                {[
                  "Phi Theta Kappa Honor Society — Bellevue College",
                  "1st Place, Polymarket Track — QuackHacks 2025",
                  "1st Place AI Award — CodeDay Seattle 2025",
                ].map((a) => (
                  <p key={a} className="text-xs text-dark-200">{a}</p>
                ))}
              </div>
            </div>

            {/* Core Skills */}
            <div className="glass p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <Wrench className="w-4 h-4 text-indigo-400" />
                <h2 className="text-sm font-semibold text-dark-50 uppercase tracking-wide">Core Skills</h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["Python", "C++", "Java", "TypeScript", "React", "Next.js", "FastAPI", "PyTorch", "TensorFlow", "AWS", "Docker", "PostgreSQL", "Snowflake", "Git"].map((s) => (
                  <span key={s} className="badge text-[10px]">{s}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

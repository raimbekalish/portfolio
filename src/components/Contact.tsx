import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Clipboard, FileText, Mail } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

interface ContactProps {
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  resumeUrl: string;
  formEndpoint: string;
}

export default function Contact({ email, linkedinUrl, githubUrl, resumeUrl, formEndpoint }: ContactProps) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", hp: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);
  const statusRef = useRef<HTMLDivElement | null>(null);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.hp.trim().length > 0) {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "", hp: "" });
      return;
    }
    try {
      setStatus("sending");
      const res = await fetch(formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "", hp: "" });
      } else throw new Error("failed");
    } catch {
      setStatus("error");
    }
  }

  const inputClasses =
    "w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/[0.08] text-dark-50 placeholder-dark-400 hover:border-white/[0.14] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 focus:shadow-[0_0_0_1px_rgba(129,140,248,0.16),0_12px_28px_rgba(0,0,0,0.22)] transition-all duration-300 motion-soft font-medium";

  return (
    <SectionWrapper id="contact">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-4">
            <span className="text-gradient">Let's build something impactful.</span>
          </h2>
          <p className="text-dark-200 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            I'm currently seeking software engineering and AI internships. Whether you have an opportunity or just want to connect, my inbox is open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-2 glass p-6 sm:p-8 rounded-3xl"
          >
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" aria-live="polite">
              <input
                type="text"
                name="company"
                value={form.hp}
                onChange={(e) => setForm({ ...form, hp: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                <input
                  required
                  name="name"
                  aria-label="Your name"
                  autoComplete="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClasses}
                />
                <input
                  required
                  type="email"
                  name="email"
                  aria-label="Email address"
                  autoComplete="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClasses}
                />
              </div>
              <input
                required
                name="subject"
                aria-label="Subject"
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className={inputClasses}
              />
              <textarea
                required
                name="message"
                aria-label="Message"
                placeholder="How can I help you?"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClasses} resize-none`}
              />
              <div className="flex items-center justify-between pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary group px-6 py-3 w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                  {status !== "sending" && <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 motion-soft group-hover:translate-x-0.5" />}
                </button>

                <div ref={statusRef} className="ml-4 text-sm font-medium" aria-live="polite">
                  {status === "success" && <span className="text-emerald-400">Message sent!</span>}
                  {status === "error" && <span className="text-red-400">Failed to send.</span>}
                </div>
              </div>
            </form>
          </motion.div>

          {/* Connect Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div className="premium-card-hover p-6 rounded-2xl group flex flex-col justify-center h-full">
              <div className="flex items-start justify-between gap-3">
                <a href={`mailto:${email}`} className="min-w-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 transition-transform duration-300 motion-soft group-hover:scale-105 group-hover:-translate-y-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-dark-50 uppercase tracking-wider mb-1">Email</h3>
                  <p className="text-sm text-dark-300 font-medium truncate">{email}</p>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="relative inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.04] text-dark-200 transition-all duration-300 motion-soft hover:-translate-y-0.5 hover:border-indigo-400/30 hover:bg-indigo-500/10 hover:text-indigo-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900"
                  aria-label="Copy email address"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-300" /> : <Clipboard className="h-4 w-4" />}
                  <span
                    className={`pointer-events-none absolute right-0 top-11 whitespace-nowrap rounded-lg border border-white/[0.08] bg-dark-800 px-2.5 py-1 text-[11px] font-medium text-dark-100 shadow-xl transition-all duration-300 motion-soft ${
                      copied ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                    }`}
                    role="status"
                  >
                    Email copied
                  </span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 flex-1">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="premium-card-hover p-4 rounded-2xl group flex flex-col items-center justify-center text-center h-full"
              >
                <img
                  src={`${(import.meta as any).env?.BASE_URL || "/"}logos/linkedin.svg`}
                  alt="LinkedIn"
                  className="w-6 h-6 mb-2 opacity-70 transition-all duration-300 motion-soft group-hover:opacity-100 group-hover:-translate-y-0.5"
                />
                <span className="text-xs font-bold text-dark-100 uppercase tracking-wide">LinkedIn</span>
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="premium-card-hover p-4 rounded-2xl group flex flex-col items-center justify-center text-center h-full"
              >
                <img
                  src={`${(import.meta as any).env?.BASE_URL || "/"}logos/github.svg`}
                  alt="GitHub"
                  className="w-6 h-6 mb-2 opacity-70 transition-all duration-300 motion-soft group-hover:opacity-100 group-hover:-translate-y-0.5"
                />
                <span className="text-xs font-bold text-dark-100 uppercase tracking-wide">GitHub</span>
              </a>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="premium-card-hover p-4 rounded-2xl group flex flex-col items-center justify-center text-center h-full"
              >
                <FileText className="w-6 h-6 mb-2 text-dark-300 transition-all duration-300 motion-soft group-hover:-translate-y-0.5 group-hover:text-indigo-300" />
                <span className="text-xs font-bold text-dark-100 uppercase tracking-wide">Resume</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}

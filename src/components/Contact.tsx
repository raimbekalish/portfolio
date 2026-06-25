import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import SectionWrapper from "./SectionWrapper";

interface ContactProps {
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  formEndpoint: string;
}

export default function Contact({ email, linkedinUrl, githubUrl, formEndpoint }: ContactProps) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", hp: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const statusRef = useRef<HTMLDivElement | null>(null);

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
    "w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/[0.08] text-dark-50 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium";

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
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClasses}
                />
                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClasses}
                />
              </div>
              <input
                required
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className={inputClasses}
              />
              <textarea
                required
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
                  className="btn-primary px-6 py-3 w-full sm:w-auto"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                  {status !== "sending" && <ArrowRight className="w-4 h-4 ml-2" />}
                </button>

                <div ref={statusRef} className="ml-4 text-sm font-medium">
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
            <a
              href={`mailto:${email}`}
              className="glass p-6 rounded-2xl hover:border-indigo-500/30 transition-colors group flex flex-col justify-center h-full"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-dark-50 uppercase tracking-wider mb-1">Email</h3>
              <p className="text-sm text-dark-300 font-medium truncate">{email}</p>
            </a>

            <div className="grid grid-cols-2 gap-4 flex-1">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="glass p-4 rounded-2xl hover:border-indigo-500/30 transition-colors group flex flex-col items-center justify-center text-center h-full"
              >
                <img
                  src={`${(import.meta as any).env?.BASE_URL || "/"}logos/linkedin.svg`}
                  alt="LinkedIn"
                  className="w-6 h-6 mb-2 opacity-70 group-hover:opacity-100 transition-opacity"
                />
                <span className="text-xs font-bold text-dark-100 uppercase tracking-wide">LinkedIn</span>
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="glass p-4 rounded-2xl hover:border-indigo-500/30 transition-colors group flex flex-col items-center justify-center text-center h-full"
              >
                <img
                  src={`${(import.meta as any).env?.BASE_URL || "/"}logos/github.svg`}
                  alt="GitHub"
                  className="w-6 h-6 mb-2 opacity-70 group-hover:opacity-100 transition-opacity"
                />
                <span className="text-xs font-bold text-dark-100 uppercase tracking-wide">GitHub</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}

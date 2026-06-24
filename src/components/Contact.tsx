import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Linkedin, Github } from "lucide-react";

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
    "w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-dark-50 placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/40 text-sm transition-all";

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 px-5 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-14 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] mb-3">
            <span className="gradient-text">Let's Build Something</span>
          </h2>
          <p className="text-dark-200 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-2">
            Open to collaborations, internships, and conversations about building products
          </p>
          <p className="text-xs sm:text-sm text-dark-400 max-w-xl mx-auto">
            I usually reply within 24–48 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-2 glass-card p-6 sm:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4" aria-live="polite">
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
              <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4">
                <input
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClasses}
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClasses}
                />
              </div>
              <input
                placeholder="Subject (optional)"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className={inputClasses}
              />
              <textarea
                required
                placeholder="Message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputClasses} resize-none leading-relaxed`}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                disabled={status === "sending"}
                className="btn-accent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending…" : "Send Message"}
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
              <div ref={statusRef}>
                {status === "success" && (
                  <p className="mt-3 text-xs sm:text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-md p-2.5 sm:p-3">
                    Thanks! Your message has been sent.
                  </p>
                )}
                {status === "error" && (
                  <p className="mt-3 text-xs sm:text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md p-2.5 sm:p-3">
                    Please check your inputs and try again.
                  </p>
                )}
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="glass-card p-5 sm:p-6 space-y-3.5">
              <h3 className="font-semibold text-dark-100 text-xs uppercase tracking-wider mb-3 sm:mb-4">
                Links
              </h3>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2.5 text-dark-200 hover:text-white transition-colors text-xs sm:text-sm group"
              >
                <Mail className="w-3.5 h-3.5 text-dark-300 group-hover:text-indigo-400 flex-shrink-0 transition-colors" />
                <span className="truncate">{email}</span>
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-dark-200 hover:text-white transition-colors text-xs sm:text-sm group"
              >
                <Linkedin className="w-3.5 h-3.5 text-dark-300 group-hover:text-indigo-400 flex-shrink-0 transition-colors" />
                <span>LinkedIn</span>
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-dark-200 hover:text-white transition-colors text-xs sm:text-sm group"
              >
                <Github className="w-3.5 h-3.5 text-dark-300 group-hover:text-indigo-400 flex-shrink-0 transition-colors" />
                <span>GitHub</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

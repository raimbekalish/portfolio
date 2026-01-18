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

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 px-5 sm:px-6 lg:px-8 bg-stone-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-14 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 tracking-[-0.03em] mb-3">
            Let's Build Something
          </h2>
          <p className="text-stone-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-2">
            Open to collaborations, internships, and conversations about building products
          </p>
          <p className="text-xs sm:text-sm text-stone-500 max-w-xl mx-auto">
            I usually reply within 24–48 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-2 bg-white/70 backdrop-blur-sm rounded-lg border border-stone-200/60 shadow-[0_1px_2px_rgba(0,0,0,0.04)] p-6 sm:p-8"
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
                  className="px-3.5 py-2.5 rounded-lg border border-stone-200/60 bg-white text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/20 focus:border-stone-400 text-sm transition-colors"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="px-3.5 py-2.5 rounded-lg border border-stone-200/60 bg-white text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/20 focus:border-stone-400 text-sm transition-colors"
                />
              </div>
              <input
                placeholder="Subject (optional)"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200/60 bg-white text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/20 focus:border-stone-400 text-sm transition-colors"
              />
              <textarea
                required
                placeholder="Message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200/60 bg-white text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/20 focus:border-stone-400 text-sm resize-none leading-relaxed transition-colors"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-stone-900 text-white hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.12)]"
              >
                {status === "sending" ? "Sending…" : "Send Message"}
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
              <div ref={statusRef}>
                {status === "success" && (
                  <p className="mt-3 text-xs sm:text-sm text-green-700 bg-green-50 border border-green-200/80 rounded-md p-2.5 sm:p-3">
                    Thanks! Your message has been sent.
                  </p>
                )}
                {status === "error" && (
                  <p className="mt-3 text-xs sm:text-sm text-red-700 bg-red-50 border border-red-200/80 rounded-md p-2.5 sm:p-3">
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
            <div className="bg-white/70 backdrop-blur-sm rounded-lg border border-stone-200/60 shadow-[0_1px_2px_rgba(0,0,0,0.04)] p-5 sm:p-6 space-y-3.5">
              <h3 className="font-semibold text-stone-900 text-xs uppercase tracking-wider mb-3 sm:mb-4">
                Links
              </h3>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2.5 text-stone-700 hover:text-stone-900 transition-colors text-xs sm:text-sm"
              >
                <Mail className="w-3.5 h-3.5 text-stone-500 flex-shrink-0" />
                <span className="truncate">{email}</span>
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-stone-700 hover:text-stone-900 transition-colors text-xs sm:text-sm"
              >
                <Linkedin className="w-3.5 h-3.5 text-stone-500 flex-shrink-0" />
                <span>LinkedIn</span>
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-stone-700 hover:text-stone-900 transition-colors text-xs sm:text-sm"
              >
                <Github className="w-3.5 h-3.5 text-stone-500 flex-shrink-0" />
                <span>GitHub</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

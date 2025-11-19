import React, { useMemo, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Download,
  ExternalLink,
  Moon,
  Sun,
  GraduationCap,
  Briefcase,
  Code2,
  Trophy,
  Sparkles,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Profile & Data                                                             */
/* -------------------------------------------------------------------------- */

const PROFILE = {
  name: "Raimbek Alish",
  title: "Computer Science Student · Software Engineer",
  location: "Bellevue, WA, USA",
  email: "r.alish1975@gmail.com",
  phone: "+1 (425) 518-6532",
  summary:
    "International CS student at Bellevue College (transfer ’26). I design and build AI features, modern UIs, and efficient developer tools. Hackathon winner (CodeDay Seattle, QuackHacks 2025) and participant at DubHacks 2025 and the Canva AI Design & Data Storytelling externship.",
  links: {
    github: "https://github.com/raimbekalish",
    linkedin: "https://www.linkedin.com/in/raimbekalish/",
    // use BASE_URL so it works on GitHub Pages path (/portfolio/)
    resume: `${import.meta.env.BASE_URL}Raimbek_Alish_Resume.pdf`,
  },
  // use BASE_URL so avatar works on GitHub Pages path (/portfolio/)
  avatar: `${import.meta.env.BASE_URL}images/avatar.png`,
};

const FORMSPREE = { endpoint: "https://formspree.io/f/xrbogqwn" };

const SKILLS = [
  {
    group: "Languages",
    items: [
      "Python",
      "Java",
      "C++",
      "JavaScript/TypeScript",
      "SQL",
      "HTML/CSS",
      "Shell Scripting",
      "Swift",
    ],
  },
  {
    group: "Frameworks & Libraries",
    items: [
      "React",
      "Next.js",
      "SwiftUI",
      "Node.js",
      "Express",
      "FastAPI",
      "Flask",
      "Pandas",
      "NumPy",
      "scikit-learn",
      "OpenCV",
      "YOLOv8",
      "D3.js",
      "TailwindCSS",
    ],
  },
  {
    group: "AI, Cloud & DevOps",
    items: [
      "Google Gemini",
      "OpenAI",
      "ElevenLabs",
      "AWS (EC2, S3, Lambda)",
      "Docker",
      "Kubernetes",
      "REST APIs",
      "CI/CD",
      "Snowflake",
      "Linux",
    ],
  },
  {
    group: "Tools & Practices",
    items: [
      "Git/GitHub",
      "VS Code",
      "Figma",
      "Notion",
      "Atlassian Forge",
      "Jira",
      "Splunk",
      "New Relic",
      "Vitest",
      "Cypress",
      "Agile/Scrum",
    ],
  },
];

const PROJECTS = [
  {
    name: "JiraGenie — Voice AI for Jira",
    tagline: "Ask Jira anything: voice input, instant AI summaries, and insights.",
    bullets: [
      "Built on Atlassian Forge with UI Kit; Gemini for NL understanding; ElevenLabs for real-time STT/TTS.",
      "Securely fetches issues via Forge resolvers; streams concise, actionable summaries in-app.",
      "Role: voice pipeline + prompt logic + UI polish; shipped in 24h at DubHacks.",
    ],
    tech: ["Forge", "React", "Gemini", "ElevenLabs"],
    repo: "https://github.com/khyeo1011/dubhacks25",
    demo:
      "https://devpost.com/software/untitled-project-rw9st8nfkbm3?ref_content=user-portfolio&ref_feature=in_progress",
    image:
      "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/864/768/datas/gallery.jpg",
    badges: ["DubHacks 2025", "Atlassian Grow Track"],
    highlight: true,
  },
  {
    name: "PolyPredictor Kit — AI Market Forecasting",
    tagline: "Winner @ QuackHacks 2025 — real-time Polymarket analytics powered by Gemini AI.",
    bullets: [
      "Built a real-time forecasting toolkit analyzing Polymarket data using Gemini 2.5 Flash for intelligent trend insights.",
      "Developed a modern React + TypeScript interface with interactive charts, predictions, and market sentiment indicators.",
      "Integrated on-chain data streams and fast AI summarization to support trader decision-making in live markets.",
    ],
    tech: ["React", "TypeScript", "Gemini 2.5 Flash", "Polymarket API", "Node.js"],
    repo: "https://github.com/raimbekalish/Poly_Predictor_Kit",
    demo: "https://devpost.com/software/poly-predictor-kit",
    image:
      "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/999/791/datas/gallery.jpg",
    badges: ["QuackHacks 2025 (Winner)", "Polymarket Track"],
  },
  {
    name: "Visual Novel Creator — AI Game Builder",
    tagline:
      "Built at CodeDay Seattle: AI-powered visual novel creator using Stable Diffusion and GPT-based story generation.",
    bullets: [
      "Developed a Ren’Py-compatible visual novel generator powered by AI story and image synthesis.",
      "Implemented a Python pipeline connecting Stability AI’s image API with GPT-based narrative generation.",
      "Created a functional prototype in 24 hours, presented live at CodeDay showcase and won the competition.",
    ],
    tech: ["Python", "AI", "Stable Diffusion", "Ren’Py", "Flask"],
    repo: "https://github.com/Vimpel-O-O/AI_Visual_Novel_Creator",
    demo: "https://showcase.codeday.org/project/cmhgqspw91903j5my04z26yk6",
    image:
      "https://img.codeday.org/w=1400;h=600;fit=fill;fill=blur/m/r/mrpenk971ukaabtxa4rre53epse5q4639revtzd121hnvhshruvhrhh5bf6k6e9ghm.png",
    badges: ["CodeDay Seattle 2025 (Winner)"],
  },
];

const EXPERIENCE = [
  {
    role: "Canva AI Design & Data Storytelling Extern",
    org: "Extern x Canva (Remote)",
    date: "Nov – Dec 2025 (in progress)",
    points: [
      "Selected for a design and data storytelling externship focused on AI-assisted workflows and visual communication.",
      "Designing customer journey maps, research deliverables, and visual narratives based on real-world scenarios.",
      "Collaborating with mentors to turn qualitative and quantitative insights into clear, shareable visual stories.",
    ],
  },
  {
    role: "QuackHacks 2025 — PolyPredictor Kit (Polymarket Track Winner)",
    org: "University of Oregon",
    date: "Nov 2025",
    points: [
      "Built an AI-powered analytics toolkit for prediction markets using Polymarket data and Gemini 2.5 Flash.",
      "Implemented interactive dashboards and insights to help users understand market trends and probabilities.",
      "Won the Polymarket track for technical execution, UX clarity, and creative use of AI and on-chain data.",
    ],
  },
  {
    role: "CodeDay Seattle 2025 — Visual Novel Creator (Winner)",
    org: "CodeDay Seattle",
    date: "Nov 2025",
    points: [
      "Created an AI-powered Visual Novel Creator combining GPT-based story generation with Stable Diffusion image synthesis.",
      "Built a Ren’Py-compatible pipeline and simple web interface for generating playable AI-driven stories.",
      "Presented a live demo to judges and won among top CodeDay projects.",
    ],
  },
  {
    role: "DubHacks 2025 — AI Voice Assistant Project",
    org: "University of Washington",
    date: "Oct 2025",
    points: [
      "Developed 'JiraGenie', a real-time AI voice assistant for Jira using Atlassian Forge, Gemini, and ElevenLabs APIs.",
      "Built the voice pipeline, integrated AI response logic, and optimized UI for a live hackathon demo.",
      "Collaborated with a 4-member team and shipped a fully functional prototype in 24 hours.",
    ],
  },
];

const ACHIEVEMENTS = [
  "🦆 Winner — QuackHacks 2025 (Polymarket Track) for 'PolyPredictor Kit'.",
  "🏆 Winner — CodeDay Seattle 2025 for 'AI Visual Novel Creator' project.",
  "💡 Participant — DubHacks 2025 (UW), developed 'JiraGenie' AI Voice Assistant for Jira.",
  "🎨 Selected for Canva AI Design & Data Storytelling Externship.",
  "🧠 Built multiple AI & full-stack projects integrating APIs, voice, and generative models.",
];

/* -------------------------------------------------------------------------- */
/* UI helpers                                                                 */
/* -------------------------------------------------------------------------- */

const Section = ({ id, icon: Icon, title, children }: any) => (
  <section id={id} className="scroll-mt-24">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="flex items-center gap-3 mb-8">
        {Icon && (
          <div className="p-2 rounded-2xl bg-muted shadow-sm">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h2>
      </div>
      {children}
    </motion.div>
  </section>
);

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function App() {
  // theme
  const [dark, setDark] = useState(() => {
    const local = localStorage.getItem("theme");
    if (local) return local === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const navItems = useMemo(
    () => [
      { href: "#about", label: "About" },
      { href: "#projects", label: "Projects" },
      { href: "#experience", label: "Experience" },
      { href: "#skills", label: "Skills" },
      { href: "#achievements", label: "Awards" },
      { href: "#contact", label: "Contact" },
    ],
    []
  );

  // contact form
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
      const res = await fetch(FORMSPREE.endpoint, {
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
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 selection:bg-indigo-500/20">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="font-semibold tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5" /> {PROFILE.name}
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navItems.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={PROFILE.links.resume}
              className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-indigo-500 transition-transform hover:-translate-y-0.5 hover:shadow-md"
            >
              <Download className="w-4 h-4" /> Resume
            </a>
            <button
              onClick={() => setDark((d) => !d)}
              className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-indigo-500"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* soft background gradient */}
          <div className="pointer-events-none absolute -top-24 -right-32 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-indigo-500/20 via-fuchsia-500/15 to-cyan-500/20 blur-3xl" />
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7"
            >
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold">
                <Sparkles className="w-4 h-4" /> Open to Summer 2026 Internships
              </p>
              <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold leading-[1.1] filter drop-shadow-[0_0_20px_rgba(99,102,241,0.25)]">
                {PROFILE.title}
              </h1>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl">{PROFILE.summary}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={PROFILE.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 hover:border-indigo-500 transition-transform hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a
                  href={PROFILE.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 hover:border-indigo-500 transition-transform hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
              <div className="mt-6 flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {PROFILE.location}
                </span>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <Mail className="w-4 h-4" /> {PROFILE.email}
                </a>
                <a
                  href={`tel:${PROFILE.phone}`}
                  className="inline-flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <Phone className="w-4 h-4" /> {PROFILE.phone}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="relative flex items-center justify-center">
                {/* glow behind avatar */}
                <div className="pointer-events-none absolute -z-10 h-72 w-72 md:h-[26rem] md:w-[26rem] rounded-full bg-gradient-to-tr from-indigo-500/20 via-fuchsia-500/20 to-cyan-500/20 blur-3xl" />
                {/* animated aura */}
                <div className="relative ring-4 ring-indigo-400/30 md:ring-8 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute -inset-1 rounded-full bg-gradient-to-tr from-indigo-500/40 via-fuchsia-500/30 to-cyan-500/40 blur"
                    animate={{ scale: [1, 1.03, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <img
                    src={PROFILE.avatar}
                    alt={`${PROFILE.name} avatar`}
                    className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-72 md:h-72 rounded-full object-cover border-4 border-white dark:border-slate-900 shadow-xl"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about" icon={GraduationCap} title="About Me">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p>
            I'm an international student from Kazakhstan studying Computer Science at
            <strong> Bellevue College</strong>. I love building practical tools with a crisp UI and clear UX. I enjoy
            exploring how AI can enhance storytelling, productivity, and developer workflows.
          </p>
          <p>
            In 2025, I participated in major hackathons like <strong>DubHacks (UW)</strong>,{" "}
            <strong>CodeDay Seattle</strong>, and <strong>QuackHacks</strong>, where our teams shipped AI-powered
            projects that merged data, voice, and visuals. I was also selected for the
            <strong> Canva AI Design & Data Storytelling Externship</strong>, where I work on visual narratives and
            creative automation. I'm actively preparing to transfer to a four-year CS program in
            <strong> Fall 2026</strong> and I'm seeking a <strong>Summer 2026 software engineering internship</strong>.
          </p>
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" icon={Code2} title="Selected Projects">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`rounded-3xl border bg-white/70 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 p-0 shadow-sm hover:shadow-md transition-transform hover:-translate-y-1 ${
                p.highlight ? "ring-1 ring-indigo-500/40" : ""
              }`}
            >
              {p.image && (
                <div className="w-full overflow-hidden rounded-t-3xl bg-slate-100 dark:bg-slate-800">
                  <img src={p.image} alt={`${p.name} preview`} className="w-full h-full object-contain" loading="lazy" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{p.tagline}</p>
                  </div>
                  <div className="flex gap-2">
                    {p.repo && (
                      <a
                        className="inline-flex items-center gap-1 text-sm px-2 py-1 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-indigo-500"
                        href={p.repo}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Github className="w-4 h-4" /> Code
                      </a>
                    )}
                    {p.demo && (
                      <a
                        className="inline-flex items-center gap-1 text-sm px-2 py-1 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-indigo-500"
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" /> Demo
                      </a>
                    )}
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-sm list-disc pl-5">
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {p.badges && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.badges.map((badge) => (
                      <span
                        key={badge}
                        className="text-[11px] uppercase tracking-wide px-2 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-700/70"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" icon={Briefcase} title="Experience">
        <div className="space-y-6">
          {EXPERIENCE.map((e) => (
            <div key={e.role} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">
                  {e.role} · {e.org}
                </h3>
                <span className="text-sm text-slate-600 dark:text-slate-300">{e.date}</span>
              </div>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-sm">
                {e.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" icon={Code2} title="Skills">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILLS.map((s) => (
            <div key={s.group} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
              <h4 className="font-semibold mb-2">{s.group}</h4>
              <div className="flex flex-wrap gap-2">
                {s.items.map((it) => (
                  <span
                    key={it}
                    className="text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Achievements */}
      <Section id="achievements" icon={Trophy} title="Achievements">
        <ul className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 list-disc pl-6 space-y-2">
          {ACHIEVEMENTS.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </Section>

      {/* Contact */}
      <Section id="contact" icon={Mail} title="Contact">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4" aria-live="polite">
              {/* honey-pot */}
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
              <input
                required
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
              />
              <input
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="sm:col-span-2 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
              />
              <textarea
                required
                placeholder="Message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="sm:col-span-2 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700"
              >
                {status === "sending" ? "Sending…" : "Send"} <ArrowRight className="w-4 h-4" />
              </button>
              <div ref={statusRef} className="sm:col-span-2">
                {status === "success" && (
                  <p className="mt-2 text-sm rounded-xl border border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-300 p-3">
                    Thanks! Your message has been sent.
                  </p>
                )}
                {status === "error" && (
                  <p className="mt-2 text-sm rounded-xl border border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300 p-3">
                    Please check your inputs and try again.
                  </p>
                )}
              </div>
            </form>
          </div>
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> {PROFILE.email}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> {PROFILE.phone}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> {PROFILE.location}
            </p>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-sm flex flex-col sm:flex-row items-center gap-2 justify-between">
          <p>
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <a
              href={PROFILE.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href={PROFILE.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const metadata = { title: "Raimbek — Portfolio" };


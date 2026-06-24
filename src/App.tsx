import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import TopNav from "./components/TopNav";
import Hero from "./components/Hero";
import Education from "./components/Education";
import Experience from "./components/Experience";
import CaseStudies from "./components/CaseStudies";
import SkillStack from "./components/SkillStack";
import Honors from "./components/Honors";
import BuildPhilosophy from "./components/BuildPhilosophy";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ResumeOverlay from "./components/ResumeOverlay";

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

const PROFILE = {
  name: "Raimbek Alish",
  statement: "Computer Science student building AI products, full-stack apps, and developer tools.",
  subtext: "I’m a Computer Science student at Whitman College focused on AI systems, full-stack engineering, data-driven products, and developer workflows. I’ve built award-winning hackathon projects, completed a Canva AI Design & Data Storytelling externship, and worked as a Computer Science Teaching Assistant.",
  links: {
    github: "https://github.com/raimbekalish",
    linkedin: "https://www.linkedin.com/in/raimbekalish/",
    resume: `${(import.meta as any).env?.BASE_URL || "/"}Raimbek_Alish_Resume.pdf`,
  },
  email: "r.alish1975@gmail.com",
};

const FORMSPREE = { endpoint: "https://formspree.io/f/xrbogqwn" };

const HERO_BADGES = [
  "Whitman College CS",
  "Canva AI Design Extern",
  "QuackHacks 1st Place",
  "CodeDay AI Award",
  "Bellevue College CS TA",
];

const EDUCATION = [
  {
    name: "Whitman College",
    degree: "Bachelor of Arts in Computer Science",
    date: "Expected May 2028",
    location: "Walla Walla, WA",
  },
  {
    name: "Bellevue College",
    degree: "Associate in Arts and Sciences, Computer Science",
    date: "Completed June 2026",
    location: "Bellevue, WA",
  },
];

const COURSEWORK = [
  "Data Structures & Algorithms",
  "Object-Oriented Programming",
  "Software Development & Design",
  "Database Systems",
  "Discrete Mathematics",
  "AI & Machine Learning",
];

const EXPERIENCE = [
  {
    company: "Canva",
    role: "AI Design & Data Storytelling Extern",
    location: "Remote",
    date: "Nov. 2025 – Dec. 2025",
    bullets: [
      "Created AI-assisted storytelling workflows and presentation structures for user research, insight synthesis, and data communication.",
      "Built customer journey maps, interview guides, field notes trackers, and insight boards to organize findings into clear recommendations.",
      "Improved final recommendation decks by restructuring information hierarchy, reducing visual noise, and strengthening narrative flow.",
    ],
  },
  {
    company: "Bellevue College",
    role: "Computer Science Teaching Assistant",
    location: "Bellevue, WA",
    date: "Sep. 2025 – May 2026",
    bullets: [
      "Supported students in CS 210 and CS 211 with Java programming, object-oriented design, arrays, ArrayLists, recursion, and data structures.",
      "Tutored 50+ students through debugging sessions, assignment review, exam preparation, and step-by-step explanations of programming concepts.",
      "Helped students improve code quality by explaining logic errors, testing strategies, clean structure, and efficient problem-solving approaches.",
    ],
  },
];

const CASE_STUDIES = [
  {
    name: "Poly Predictor Kit",
    label: "1st Place, Polymarket Track — QuackHacks 2025",
    description: "AI-powered Polymarket analytics platform that processed prediction-market events, comments, and market patterns using modular data pipelines.",
    role: "Built Gemini-based market insight summaries, emotional vs. rational comment classification workflow, Snowflake-backed data pipeline, and ML labeling/classification components.",
    impact: "Won QuackHacks 2025. Cut analysis from 20min to 2min. Recognized for execution, UX clarity, and AI creativity.",
    tech: ["Python", "Gemini", "Snowflake", "Scikit-learn", "TF-IDF", "Logistic Regression", "Polymarket API"],
    repo: "https://github.com/raimbekalish/Poly_Predictor_Kit",
    demo: "https://devpost.com/software/poly-predictor-kit",
    image: "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/999/791/datas/gallery.jpg",
    featured: true,
  },
  {
    name: "PromptLock",
    label: "AI Context Compression Platform / NexHacks project",
    description: "AI context-compression platform that converts long logs, code diffs, docs, and API content into budget-controlled prompt packs.",
    role: "Built task-aware compression modes for debugging, code review, build tasks, and documentation using FastAPI and token-based chunking. Developed a Next.js/TypeScript frontend with transparent compression metrics.",
    impact: "Built in 24 hours at NexHacks 2026 — functional prompt validation layer with real-time enforcement.",
    tech: ["Next.js", "TypeScript", "FastAPI", "Python", "Token Chunking", "AI Workflows"],
    repo: "https://github.com/abdirahmanbm01/nexhacks",
    demo: "https://devpost.com/software/promptlock",
    image: "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/004/170/352/datas/gallery.jpg",
    featured: true,
  },
  {
    name: "AI Visual Novel Creator",
    label: "1st Place AI Award — CodeDay Seattle 2025",
    description: "AI-powered visual novel pipeline that generated story scenes, character dialogue, branching narrative structure, and playable Ren’Py scenes.",
    role: "Built the Python content pipeline, integrated AI image generation, and transformed generated story data into structured game-ready visual novel files.",
    impact: "Won CodeDay Seattle 2025. Cut creation from weeks to hours. 50+ images + full narrative in <30min.",
    tech: ["Python", "Stability AI", "GPT", "Ren'Py", "Flask"],
    repo: "https://github.com/Vimpel-O-O/AI_Visual_Novel_Creator",
    demo: "https://showcase.codeday.org/project/cmhgqspw91903j5my04z26yk6",
    image: "https://img.codeday.org/w=1400;h=600;fit=fill;fill=blur/m/r/mrpenk971ukaabtxa4rre53epse5q4639revtzd121hnvhshruvhrhh5bf6k6e9ghm.png",
    featured: true,
  },
  {
    name: "JiraGenie",
    label: "DubHacks 2025",
    description: "Voice-driven AI assistant that helps users create, update, and manage Jira issues through natural language.",
    role: "Worked on ElevenLabs STT/TTS voice agent, Gemini integration, microphone UI, and Atlassian Forge workflow integration.",
    impact: "Shipped in 24h. Cut lookup from 5min to 15s. Proved voice-first dev workflows.",
    tech: ["Atlassian Forge", "React", "TypeScript", "Gemini", "ElevenLabs", "Jira API"],
    repo: "https://github.com/khyeo1011/dubhacks25",
    demo: "https://devpost.com/software/untitled-project-rw9st8nfkbm3?ref_content=user-portfolio&ref_feature=in_progress",
    image: "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/864/768/datas/gallery.jpg",
    featured: false,
  }
];

const SKILLS = [
  {
    group: "Languages",
    items: ["Python", "C++", "Java", "JavaScript/TypeScript", "SQL (PostgreSQL, MySQL)", "Bash/Shell", "HTML/CSS"],
  },
  {
    group: "ML/AI Frameworks",
    items: ["PyTorch", "TensorFlow", "LangChain", "Scikit-learn", "Pandas", "NumPy", "XGBoost"],
  },
  {
    group: "Backend & Data Engineering",
    items: ["FastAPI", "Flask", "Node.js", "Express", "GraphQL", "Prisma", "Redis", "Kafka", "Snowflake", "REST APIs"],
  },
  {
    group: "Cloud & DevOps",
    items: ["AWS EC2", "S3", "Lambda", "Docker", "Kubernetes", "GitHub Actions", "CI/CD", "Linux"],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "Redux", "Tailwind CSS", "Vite", "Figma"],
  },
  {
    group: "Tools",
    items: ["Git/GitHub", "Jira", "Postman", "Vitest", "Cypress", "Agile/Scrum", "Atlassian Forge"],
  },
];

const HONORS = [
  {
    title: "Phi Theta Kappa Honor Society",
    org: "Bellevue College",
  },
  {
    title: "1st Place, Polymarket Track",
    org: "QuackHacks 2025",
  },
  {
    title: "1st Place AI Award",
    org: "CodeDay Seattle 2025",
  },
];

/* -------------------------------------------------------------------------- */
/* App                                                                        */
/* -------------------------------------------------------------------------- */

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-900 text-dark-50 antialiased relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-500/[0.07] blur-[120px] animate-float" />
        <div className="absolute top-[40%] right-[-15%] w-[500px] h-[500px] rounded-full bg-violet-500/[0.05] blur-[100px] animate-float-delay" />
        <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] rounded-full bg-cyan-500/[0.04] blur-[100px] animate-float-slow" />
      </div>

      <TopNav name={PROFILE.name} resumeUrl={PROFILE.links.resume} email={PROFILE.email} onResumeOpen={() => setIsResumeOpen(true)} />
      
      <Hero
        name={PROFILE.name}
        headline={PROFILE.statement}
        subtitle={PROFILE.subtext}
        resumeUrl={PROFILE.links.resume}
        githubUrl={PROFILE.links.github}
        linkedinUrl={PROFILE.links.linkedin}
        email={PROFILE.email}
        badges={HERO_BADGES}
      />
      
      <Education schools={EDUCATION} coursework={COURSEWORK} />
      <Experience experiences={EXPERIENCE} />
      <CaseStudies projects={CASE_STUDIES} />
      <SkillStack skills={SKILLS} />
      <Honors honors={HONORS} />
      <BuildPhilosophy />
      
      <Contact
        email={PROFILE.email}
        linkedinUrl={PROFILE.links.linkedin}
        githubUrl={PROFILE.links.github}
        formEndpoint={FORMSPREE.endpoint}
      />
      
      <Footer 
        name={PROFILE.name} 
        email={PROFILE.email} 
        githubUrl={PROFILE.links.github} 
        linkedinUrl={PROFILE.links.linkedin} 
        resumeUrl={PROFILE.links.resume} 
      />

      <AnimatePresence>
        {isResumeOpen && (
          <ResumeOverlay
            isOpen={isResumeOpen}
            onClose={() => setIsResumeOpen(false)}
            resumeUrl={PROFILE.links.resume}
            email={PROFILE.email}
            linkedinUrl={PROFILE.links.linkedin}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export const metadata = { title: "Raimbek Alish — Software Engineer & AI Developer" };

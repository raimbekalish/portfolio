import TopNav from "./components/TopNav";
import Hero from "./components/Hero";
import ProofStrip from "./components/ProofStrip";
import CaseStudies from "./components/CaseStudies";
import SkillStack from "./components/SkillStack";
import BuildPhilosophy from "./components/BuildPhilosophy";
import NowSection from "./components/NowSection";
import Contact from "./components/Contact";

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

const PROFILE = {
  name: "Raimbek Alish",
  statement: "Building AI products that cut analysis time from 20min to 2min",
  subtext: `Full-stack engineer shipping AI tools and real-time inference systems.
QuackHacks '25 + CodeDay Seattle winner · 90% time-to-insight reduction.
Open to Summer 2026 software engineering internships.`,
  avatar: `${(import.meta as any).env?.BASE_URL || "/"}images/avatar.png`,
  links: {
    github: "https://github.com/raimbekalish",
    linkedin: "https://www.linkedin.com/in/raimbekalish/",
    // use BASE_URL so it works on GitHub Pages path (/portfolio/)
    resume: `${import.meta.env.BASE_URL}Raimbek_Internship_Resume.pdf`,
  },
  email: "r.alish1975@gmail.com",
};

const FORMSPREE = { endpoint: "https://formspree.io/f/xrbogqwn" };

const PROOF_HIGHLIGHTS = [
  "Winner — QuackHacks 2025 · 20m → 2m analysis",
  "Winner — CodeDay Seattle · weeks → hours creation",
  "DubHacks · 5m → 15s lookup",
];

const CASE_STUDIES = [
  {
    name: "JiraGenie",
    tagline: "Voice AI assistant for Jira built on Atlassian Forge",
    problem:
      "Developers waste 5–10 minutes navigating Jira's UI per session. Voice interaction could eliminate context switching.",
    solution:
      "Built a real-time voice assistant with Gemini NLU and ElevenLabs STT/TTS. Streams concise summaries via secure Forge resolvers.",
    technicalDecisions:
      "Chose Forge over Connect for better security and native integration. Used Gemini Flash for fast, accurate NLU. Streamed responses to reduce perceived latency. Implemented Forge resolvers to access Jira data without exposing API keys.",
    technicalHighlights: [
      "Sub-200ms NLU inference with Gemini Flash",
      "Streaming responses to reduce perceived latency",
      "Forge resolver architecture for secure data access",
      "Real-time STT/TTS with ElevenLabs API",
    ],
    impact:
      "Shipped in 24h. Cut lookup from 5min to 15s. Showcased at Atlassian Grow Track, proving voice-first dev workflows.",
    nextSteps:
      "Complex queries, multi-language, and voice shortcuts for common actions.",
    tech: ["Atlassian Forge", "React", "Gemini", "ElevenLabs"],
    repo: "https://github.com/khyeo1011/dubhacks25",
    demo:
      "https://devpost.com/software/untitled-project-rw9st8nfkbm3?ref_content=user-portfolio&ref_feature=in_progress",
    image:
      "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/864/768/datas/gallery.jpg",
    badges: ["DubHacks 2025", "Atlassian Grow Track"],
  },
  {
    name: "PolyPredictor Kit",
    tagline: "AI-powered analytics toolkit for prediction markets",
    problem:
      "Traders manually interpret prediction market charts, missing real-time sentiment shifts. Existing tools lack AI.",
    solution:
      "Real-time forecasting toolkit with Gemini 2.5 Flash. React + TypeScript UI with interactive charts and sub-second on-chain data.",
    technicalDecisions:
      "Selected Gemini 2.5 Flash for cost-effective, fast inference. Used React Query for efficient data fetching and caching. Implemented WebSocket connections for real-time updates. Built custom chart components with D3.js for better performance than heavy libraries.",
    technicalHighlights: [
      "Sub-second inference with Gemini 2.5 Flash",
      "React Query caching reduces API calls by 60%",
      "WebSocket connections for real-time market updates",
      "Custom D3.js charts outperform heavy libraries",
    ],
    impact:
      "Won QuackHacks 2025. Cut analysis from 20min to 2min. Recognized for execution, UX clarity, and AI creativity.",
    nextSteps:
      "Historical accuracy tracking, portfolio optimization, and movement alerts.",
    tech: ["React", "TypeScript", "Gemini 2.5 Flash", "Polymarket API", "Node.js"],
    repo: "https://github.com/raimbekalish/Poly_Predictor_Kit",
    demo: "https://devpost.com/software/poly-predictor-kit",
    image:
      "https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/999/791/datas/gallery.jpg",
    badges: ["QuackHacks 2025 (Winner)", "Polymarket Track"],
  },
  {
    name: "Visual Novel Creator",
    tagline: "AI-powered game builder combining story and image generation",
    problem:
      "Visual novels take weeks to create. Indie devs need faster prototyping without upfront asset investment.",
    solution:
      "Ren'Py-compatible generator with AI story/image synthesis. Python pipeline connects Stability AI + GPT for end-to-end playable stories.",
    technicalDecisions:
      "Chose Stability AI over DALL-E for better control and cost per image. Used GPT-4 for coherent narrative structure. Built Ren'Py compatibility layer to generate standard script format. Implemented batch image generation to reduce API latency.",
    technicalHighlights: [
      "Batch image generation reduces API calls by 70%",
      "Ren'Py compatibility layer for standard output",
      "GPT-4 narrative structure ensures coherent stories",
      "Python pipeline processes 50+ images in <30min",
    ],
    impact:
      "Won CodeDay Seattle 2025. Cut creation from weeks to hours. 50+ images + full narrative in <30min.",
    nextSteps:
      "Branching narratives, character consistency, and multi-engine export.",
    tech: ["Python", "Stability AI", "GPT", "Ren'Py", "Flask"],
    repo: "https://github.com/Vimpel-O-O/AI_Visual_Novel_Creator",
    demo: "https://showcase.codeday.org/project/cmhgqspw91903j5my04z26yk6",
    image:
      "https://img.codeday.org/w=1400;h=600;fit=fill;fill=blur/m/r/mrpenk971ukaabtxa4rre53epse5q4639revtzd121hnvhshruvhrhh5bf6k6e9ghm.png",
    badges: ["CodeDay Seattle 2025 (Winner)"],
  },
];

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

const NOW_CONTENT = `Building AI tools exploring voice interfaces, prediction markets, and creative automation.

• Completed Canva AI Design externship (Dec 2025)
• Transferring to four-year CS program Fall 2026
• Exploring real-time inference and latency optimization

Open to Summer 2026 software engineering internships in AI, product, or developer experience.`;

/* -------------------------------------------------------------------------- */
/* App                                                                        */
/* -------------------------------------------------------------------------- */

export default function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 antialiased">
      <TopNav name={PROFILE.name} resumeUrl={PROFILE.links.resume} />
      <Hero
        name={PROFILE.name}
        statement={PROFILE.statement}
        subtext={PROFILE.subtext}
        avatarUrl={PROFILE.avatar}
        resumeUrl={PROFILE.links.resume}
        githubUrl={PROFILE.links.github}
      />
      <ProofStrip highlights={PROOF_HIGHLIGHTS} />
      <CaseStudies projects={CASE_STUDIES} />
      <SkillStack skills={SKILLS} />
      <BuildPhilosophy />
      <NowSection content={NOW_CONTENT} />
      <Contact
        email={PROFILE.email}
        linkedinUrl={PROFILE.links.linkedin}
        githubUrl={PROFILE.links.github}
        formEndpoint={FORMSPREE.endpoint}
      />
    </div>
  );
}

export const metadata = { title: "Raimbek — Portfolio" };

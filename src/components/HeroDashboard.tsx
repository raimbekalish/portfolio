import { Sparkles, Layers, Database, Cloud, Cpu } from "lucide-react";

const CARDS = [
  {
    id: "ai",
    icon: Sparkles,
    label: "AI Models",
    detail: "PyTorch · Gemini · LangChain",
    position: "top-2 left-0 sm:left-4",
    className: "animate-float-1",
  },
  {
    id: "fullstack",
    icon: Layers,
    label: "Full-Stack",
    detail: "React · FastAPI · Node.js",
    position: "top-6 right-0 sm:right-2",
    className: "animate-float-2",
  },
  {
    id: "data",
    icon: Database,
    label: "Data",
    detail: "Snowflake · PostgreSQL",
    position: "bottom-12 left-2 sm:left-6",
    className: "animate-float-4",
  },
  {
    id: "devops",
    icon: Cloud,
    label: "DevOps",
    detail: "AWS · Docker · K8s",
    position: "bottom-4 right-0 sm:right-6",
    className: "animate-float-5",
  },
];

export default function HeroDashboard() {
  return (
    <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] flex items-center justify-center">
      {/* Background Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-56 h-56 rounded-full bg-indigo-500/[0.08] blur-[70px] animate-pulse-slow" />
      </div>

      {/* SVG Connector Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true">
        <defs>
          <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(99, 102, 241, 0.2)" />
            <stop offset="100%" stopColor="rgba(124, 58, 237, 0.2)" />
          </linearGradient>
        </defs>
        {/* Lines from Center to Cards */}
        {/* Top Left (AI) */}
        <path d="M 50% 50% L 20% 25%" stroke="url(#line-grad)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
        {/* Top Right (Full-Stack) */}
        <path d="M 50% 50% L 80% 30%" stroke="url(#line-grad)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
        {/* Bottom Left (Data) */}
        <path d="M 50% 50% L 25% 75%" stroke="url(#line-grad)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
        {/* Bottom Right (DevOps) */}
        <path d="M 50% 50% L 80% 80%" stroke="url(#line-grad)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
      </svg>

      {/* Center Brain/Compute Node */}
      <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="animate-float-3">
          <div className="glass rounded-xl px-5 py-4 min-w-[220px] sm:min-w-[240px] border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.15)]">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-dark-50 uppercase tracking-wider">Core Engine</span>
            </div>
            <div className="flex items-center gap-1.5 mb-2.5">
              <div className="w-2 h-2 rounded-full bg-red-400/70" />
              <div className="w-2 h-2 rounded-full bg-amber-400/70" />
              <div className="w-2 h-2 rounded-full bg-green-400/70" />
            </div>
            <p className="text-[11px] sm:text-xs font-mono text-dark-200">
              <span className="text-indigo-400">$</span>{" "}
              <span className="text-dark-100">init_workflow()</span>
              <span className="animate-pulse text-indigo-400">_</span>
            </p>
          </div>
        </div>
      </div>

      {/* Branching Nodes */}
      {CARDS.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className={`absolute ${card.position} z-10`}
          >
            <div className={card.className}>
              <div className="glass rounded-xl px-4 py-3 min-w-[150px] sm:min-w-[170px] hover:border-indigo-500/30 transition-colors">
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-xs font-bold text-dark-50 tracking-tight">{card.label}</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-dark-300 font-medium">{card.detail}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

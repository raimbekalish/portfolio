import { useCallback, useRef, type PointerEvent } from "react";
import { Sparkles, Layers, Database, Cloud, Cpu } from "lucide-react";

const CARDS = [
  {
    id: "ai",
    icon: Sparkles,
    label: "AI Models",
    detail: "PyTorch · Gemini · LangChain",
    position: "top-2 left-0 sm:left-4",
  },
  {
    id: "fullstack",
    icon: Layers,
    label: "Full-Stack",
    detail: "React · FastAPI · Node.js",
    position: "top-6 right-0 sm:right-2",
  },
  {
    id: "data",
    icon: Database,
    label: "Data",
    detail: "Snowflake · PostgreSQL",
    position: "bottom-12 left-2 sm:left-6",
  },
  {
    id: "devops",
    icon: Cloud,
    label: "DevOps",
    detail: "AWS · Docker · K8s",
    position: "bottom-4 right-0 sm:right-6",
  },
];

const CONNECTORS = [
  "M 50% 50% L 20% 25%",
  "M 50% 50% L 80% 30%",
  "M 50% 50% L 25% 75%",
  "M 50% 50% L 80% 80%",
];

export default function HeroDashboard() {
  const dashboardRef = useRef<HTMLDivElement | null>(null);

  const handlePointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3);
    const y = ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3);
    event.currentTarget.style.setProperty("--mx", x);
    event.currentTarget.style.setProperty("--my", y);
  }, []);

  const handlePointerLeave = useCallback((event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--mx", "0");
    event.currentTarget.style.setProperty("--my", "0");
  }, []);

  return (
    <div
      ref={dashboardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="command-center relative w-full h-[320px] sm:h-[380px] lg:h-[420px] flex items-center justify-center"
    >
      {/* Background Glow */}
      <div className="hero-depth-back absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-56 h-56 rounded-full bg-indigo-500/[0.08] blur-[70px] hero-glow-pulse" />
        <div className="absolute w-72 h-72 rounded-full border border-indigo-400/[0.06] shadow-[0_0_80px_rgba(99,102,241,0.08)]" />
        <div className="absolute h-44 w-44 rounded-full border border-cyan-300/[0.035]" />
      </div>

      {/* SVG Connector Lines */}
      <svg className="hero-depth-mid absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true">
        <defs>
          <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(99, 102, 241, 0.2)" />
            <stop offset="100%" stopColor="rgba(124, 58, 237, 0.2)" />
          </linearGradient>
          <linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(103, 232, 249, 0)" />
            <stop offset="45%" stopColor="rgba(129, 140, 248, 0.5)" />
            <stop offset="100%" stopColor="rgba(167, 139, 250, 0)" />
          </linearGradient>
        </defs>
        {CONNECTORS.map((d) => (
          <g key={d}>
            <path d={d} stroke="url(#line-grad)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
            <path d={d} stroke="url(#flow-grad)" strokeWidth="2" strokeLinecap="round" fill="none" className="data-flow-line" />
            {[0, 1].map((particle) => (
              <circle key={`${d}-${particle}`} r={particle === 0 ? "2.2" : "1.55"} className="data-particle">
                <animateMotion
                  dur={particle === 0 ? "5.2s" : "6.4s"}
                  begin={`${particle * 1.6}s`}
                  repeatCount="indefinite"
                  path={d}
                />
              </circle>
            ))}
          </g>
        ))}
      </svg>

      {/* Center Brain/Compute Node */}
      <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="hero-depth-front">
          <div className="glass hero-node-card core-engine-card rounded-xl px-5 py-4 min-w-[220px] sm:min-w-[240px] border-indigo-500/20 shadow-[0_0_30px_rgba(99,102,241,0.15)]">
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
            <div className="mt-2.5 space-y-1 border-t border-white/[0.06] pt-2 font-mono text-[10px] text-dark-300">
              <p className="terminal-line"><span className="text-cyan-300/80">signals</span>.route(projects)</p>
              <p className="terminal-line terminal-line-delay"><span className="text-indigo-300/80">status</span>: ready</p>
            </div>
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
            <div>
              <div className="glass hero-node-card hero-depth-front rounded-xl px-4 py-3 min-w-[150px] sm:min-w-[170px] hover:border-indigo-500/30">
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

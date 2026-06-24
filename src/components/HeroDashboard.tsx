import { Sparkles, Layers, Database, Cloud, Terminal } from "lucide-react";

const CARDS = [
  {
    icon: Sparkles,
    label: "AI Models",
    detail: "PyTorch · Gemini · LangChain",
    className: "animate-float-1",
    position: "top-0 left-0 sm:left-4",
  },
  {
    icon: Layers,
    label: "Full-Stack",
    detail: "React · FastAPI · Node.js",
    className: "animate-float-2",
    position: "top-2 right-0 sm:right-2",
  },
  {
    icon: Terminal,
    label: "terminal",
    detail: "> building something new_",
    className: "animate-float-3",
    position: "top-[45%] left-[8%] sm:left-[5%]",
    isTerminal: true,
  },
  {
    icon: Database,
    label: "Data",
    detail: "Snowflake · PostgreSQL · Redis",
    className: "animate-float-4",
    position: "bottom-8 left-2 sm:left-6",
  },
  {
    icon: Cloud,
    label: "DevOps",
    detail: "AWS · Docker · K8s",
    className: "animate-float-5",
    position: "bottom-4 right-0 sm:right-4",
  },
];

export default function HeroDashboard() {
  return (
    <div className="relative w-full h-[280px] sm:h-[320px] lg:h-[360px]">
      {/* Ambient background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-48 h-48 rounded-full bg-indigo-500/[0.08] blur-[60px] animate-pulse-slow" />
      </div>

      {CARDS.map((card) => {
        const Icon = card.icon;
        if (card.isTerminal) {
          return (
            <div
              key={card.label}
              className={`absolute ${card.position} ${card.className} z-10`}
            >
              <div className="glass rounded-xl px-4 py-3 min-w-[200px] sm:min-w-[220px]">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-400/70" />
                  <div className="w-2 h-2 rounded-full bg-amber-400/70" />
                  <div className="w-2 h-2 rounded-full bg-green-400/70" />
                </div>
                <p className="text-[11px] sm:text-xs font-mono text-dark-200">
                  <span className="text-indigo-400">$</span>{" "}
                  <span className="text-dark-100">building something new</span>
                  <span className="animate-pulse text-indigo-400">_</span>
                </p>
              </div>
            </div>
          );
        }
        return (
          <div
            key={card.label}
            className={`absolute ${card.position} ${card.className} z-10`}
          >
            <div className="glass rounded-xl px-4 py-3 min-w-[150px] sm:min-w-[170px]">
              <div className="flex items-center gap-2 mb-1">
                <Icon className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-xs font-semibold text-dark-50">{card.label}</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-dark-300 font-medium">{card.detail}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

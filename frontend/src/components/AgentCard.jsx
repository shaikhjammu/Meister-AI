const STATUS_STYLES = {
  waiting: "glass-card-pink text-[#E8B8CD] border-[#F472B6]/20 hover:border-[#F472B6]/60 hover:shadow-lg hover:shadow-[#EC4899]/15",
  running: "bg-[#331530] text-[#FFF9F2] border-[#EC4899] animate-pulse shadow-xl shadow-[#EC4899]/25 ring-1 ring-[#F472B6]/50",
  completed: "glass-card-pink text-[#FFF5F8] border-[#F472B6]/30 hover:border-[#FDE68A]/60 hover:shadow-lg hover:shadow-[#FDE68A]/15",
  failed: "bg-red-950/40 text-red-300 border-red-500/40",
};

const STATUS_BADGE = {
  waiting: { text: "Waiting", cls: "bg-[#291328] text-[#E8B8CD] border border-[#F472B6]/20" },
  running: { text: "Running", cls: "bg-[#EC4899]/20 text-[#FFF9F2] border border-[#EC4899]/50 font-bold" },
  completed: { text: "Completed", cls: "bg-[#FDE68A]/15 text-[#FDE68A] border border-[#FDE68A]/40 font-semibold" },
  failed: { text: "Failed", cls: "bg-red-500/15 text-red-300 border border-red-500/30 font-semibold" },
};

export default function AgentCard({ agent, onSelect, isSelected }) {
  const badge = STATUS_BADGE[agent.status] || STATUS_BADGE.waiting;

  return (
    <button
      onClick={() => onSelect && onSelect(agent)}
      className={`w-full text-left rounded-2xl border p-4 transition duration-300 cursor-pointer relative overflow-hidden group hover:scale-[1.02] ${
        STATUS_STYLES[agent.status] || STATUS_STYLES.waiting
      } ${isSelected ? "border-[#EC4899] ring-2 ring-[#EC4899]/50 shadow-2xl shadow-[#EC4899]/20 bg-[#2C142A]" : ""}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="circular-btn-sm w-9 h-9 bg-gradient-to-tr from-[#EC4899]/30 to-[#FDE68A]/30 border border-[#F472B6]/40 text-base shadow-sm group-hover:scale-110 transition">
            {agent.icon}
          </div>
          <span className="text-sm font-bold text-[#FFF9F2] group-hover:text-[#F472B6] transition">
            {agent.name}
          </span>
        </div>
        <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full ${badge.cls}`}>
          {badge.text}
        </span>
      </div>

      {agent.currentTask && (
        <p className="text-xs text-[#E8B8CD] mt-3 truncate font-medium bg-[#1A0B1A]/80 p-2 rounded-xl border border-[#F472B6]/15">
          {agent.currentTask}
        </p>
      )}

      <div className="mt-3 flex items-center justify-between text-[11px] text-[#E8B8CD] pt-2.5 border-t border-[#F472B6]/20">
        <span className="font-mono text-[10px] text-[#FDE68A]">Inspect & Run</span>
        <span className="text-[#EC4899] group-hover:text-[#FFF9F2] group-hover:translate-x-1 transition font-bold flex items-center gap-1">
          Details →
        </span>
      </div>
    </button>
  );
}

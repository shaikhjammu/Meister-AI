export default function ProjectHistory({ history, onSelect, activeId }) {
  return (
    <div className="glass-panel-pink rounded-3xl p-5 border border-[#F472B6]/30 shadow-xl space-y-3">
      <h3 className="text-sm font-bold text-[#FFF9F2] flex items-center gap-2">
        <span>🗂 Saved Workspaces & History</span>
      </h3>
      {history.length === 0 && <p className="text-xs text-[#E8B8CD]">No projects created yet.</p>}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {history.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelect(p)}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs transition-all duration-200 border ${
              activeId === p.id
                ? "bg-[#331531] text-[#FDE68A] border-[#EC4899] font-bold shadow-md"
                : "bg-[#1C0D1D] text-[#E8B8CD] border-[#F472B6]/20 hover:bg-[#2B142A] hover:text-[#FFF9F2]"
            }`}
          >
            <p className="truncate font-semibold">{p.requirements?.appType || p.prompt}</p>
            <p className="text-[10px] text-[#E8B8CD]/70 mt-1 flex items-center gap-2">
              <span className="capitalize">{p.overallStatus}</span>
              <span>•</span>
              <span>{p.progress}%</span>
              <span>•</span>
              <span>{new Date(p.createdAt).toLocaleString()}</span>
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

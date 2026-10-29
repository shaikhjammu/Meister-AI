export default function TestReport({ results }) {
  if (!results) return null;
  const { total, passed, failed, cases } = results;

  return (
    <div className="glass-panel-pink rounded-3xl p-6 border border-[#F472B6]/30 shadow-xl space-y-4">
      <h3 className="text-sm font-bold text-[#FFF9F2] flex items-center gap-2">
        <span>🧪 Test Suite Execution Report</span>
      </h3>
      <div className="flex gap-4 text-xs font-mono font-bold bg-[#180A1A] p-3 rounded-2xl border border-[#F472B6]/20">
        <span className="text-[#FFF5F8]">Total: {total}</span>
        <span className="text-[#FDE68A]">Passed: {passed}</span>
        <span className={failed > 0 ? "text-red-400" : "text-[#E8B8CD]"}>Failed: {failed}</span>
      </div>
      <div className="max-h-44 overflow-y-auto space-y-2 pr-1">
        {cases?.map((c, i) => (
          <div key={i} className="flex items-center gap-2 text-xs bg-[#1C0D1D] p-2.5 rounded-xl border border-[#F472B6]/15">
            <span className={c.passed ? "text-[#FDE68A] font-bold" : "text-red-400 font-bold"}>
              {c.passed ? "✓" : "✗"}
            </span>
            <span className="text-[#FFF5F8] truncate font-medium">{c.name}</span>
            {c.fixed && <span className="text-[#FDE68A] text-[10px] ml-auto font-mono">(fixed by Debugger)</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

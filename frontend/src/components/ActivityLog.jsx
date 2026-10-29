import { useEffect, useRef } from "react";

export default function ActivityLog({ entries }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries]);

  return (
    <div className="bg-[#170918] rounded-2xl border border-[#F472B6]/25 p-4 h-64 overflow-y-auto font-mono text-xs shadow-inner">
      {entries.length === 0 && <p className="text-[#E8B8CD]/60">Waiting for agent pipeline activity...</p>}
      {entries.map((e, i) => (
        <div key={i} className="mb-1.5 flex items-start gap-2">
          <span className="text-[#E8B8CD]/50 shrink-0">[{formatTime(e.time)}]</span>{" "}
          <span className="text-[#FDE68A] font-bold shrink-0">{e.agent}:</span>{" "}
          <span className="text-[#FFF5F8]">{e.message}</span>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

function formatTime(iso) {
  try {
    return new Date(iso).toLocaleTimeString();
  } catch {
    return iso;
  }
}

export default function DeploymentResult({ deployment, status, projectId }) {
  if (!deployment) return null;
  const demoUrl = deployment.demoUrl || deployment.frontend?.url;

  const rows = [
    { label: "GitHub Repository", info: deployment.github, kind: "repo" },
    { label: "Frontend (Live Preview)", info: deployment.frontend, kind: "url" },
    { label: "Backend API (Render)", info: deployment.backend, kind: "url" },
    { label: "Database Cluster", info: deployment.database, kind: "db" },
  ];

  return (
    <div className="glass-panel-pink rounded-3xl p-6 space-y-4 shadow-2xl border border-[#F472B6]/30">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[#FFF9F2] flex items-center gap-2">
          <span>🚀 Cloud Deployment & Live Preview</span>
        </h3>
        <StatusPill status={status} />
      </div>

      <div className="grid grid-cols-1 gap-3">
        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 btn-pink-gradient font-bold text-xs py-3.5 px-4 rounded-2xl shadow-lg shadow-pink-500/20 transition cursor-pointer"
          >
            <span>🌐 Open Live Application Demo</span>
            <span className="text-xs">↗</span>
          </a>
        )}

        {projectId && (
          <a
            href={`/api/projects/${projectId}/download`}
            download
            className="w-full flex items-center justify-center gap-2 bg-[#2B142A] hover:bg-[#3D1A3B] text-[#FFF9F2] border border-[#F472B6]/30 font-semibold text-xs py-3 px-4 rounded-2xl shadow-sm transition"
          >
            <span>📦 Download Complete Project (.zip)</span>
            <span className="text-xs">⬇</span>
          </a>
        )}
      </div>

      <div className="space-y-2.5 pt-3 border-t border-[#F472B6]/20">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between text-xs">
            <span className="text-[#E8B8CD] font-medium">{r.label}</span>
            <ValueForRow row={r} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ValueForRow({ row }) {
  const { info, kind } = row;
  if (!info) return <span className="text-[#E8B8CD]/50">—</span>;
  if (kind === "db") {
    return (
      <span className="text-[#FFF9F2]">
        {info.name || "MongoDB Atlas Cluster"} {info.status && <Tag status={info.status} />}
      </span>
    );
  }
  if (info.url) {
    return (
      <a
        href={info.url.startsWith("http") ? info.url : `https://${info.url}`}
        target="_blank"
        rel="noreferrer"
        className="text-[#FDE68A] hover:underline truncate max-w-[200px] inline-block align-middle font-mono font-semibold"
      >
        {info.url} <Tag status={info.status} />
      </a>
    );
  }
  return <Tag status={info.status} />;
}

function Tag({ status }) {
  if (!status) return null;
  const isLive = status === "live demo" || status === "deployed" || status === "completed";
  return (
    <span
      className={`ml-1 text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
        isLive
          ? "bg-[#FDE68A]/20 text-[#FDE68A] border border-[#FDE68A]/40"
          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
      }`}
    >
      {status}
    </span>
  );
}

function StatusPill({ status }) {
  const isCompleted = status === "completed";
  return (
    <span
      className={`text-[10px] uppercase font-extrabold tracking-wider px-3 py-1 rounded-full ${
        isCompleted
          ? "bg-[#FDE68A]/20 text-[#FDE68A] border border-[#FDE68A]/40"
          : "bg-[#EC4899]/20 text-[#FFF9F2] border border-[#EC4899]/50 animate-pulse"
      }`}
    >
      {status || "Running"}
    </span>
  );
}

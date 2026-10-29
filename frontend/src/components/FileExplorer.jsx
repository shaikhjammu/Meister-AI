import { useEffect, useState } from "react";
import { API, safeFetchJson } from "../config.js";

export default function FileExplorer({ projectId, filesGenerated }) {
  const [openFile, setOpenFile] = useState(null);
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [diskFiles, setDiskFiles] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!projectId) return;
    safeFetchJson(`${API}/projects/${projectId}/files`)
      .then((tree) => {
        const flat = flattenTree(tree);
        setDiskFiles(flat);
      })
      .catch(() => setDiskFiles([]));
  }, [projectId, filesGenerated]);

  const combinedMap = new Map();
  
  (filesGenerated || []).forEach((f) => {
    if (typeof f === "string") combinedMap.set(f, { path: f, agent: "Agent" });
    else if (f && f.path) combinedMap.set(f.path, f);
  });

  diskFiles.forEach((p) => {
    if (!combinedMap.has(p)) {
      combinedMap.set(p, { path: p, agent: detectAgent(p) });
    }
  });

  const allFiles = Array.from(combinedMap.values());

  const filteredFiles = allFiles.filter((f) => {
    const matchesSearch = f.path.toLowerCase().includes(search.toLowerCase());
    if (filter === "frontend") return matchesSearch && f.path.startsWith("frontend");
    if (filter === "backend") return matchesSearch && f.path.startsWith("backend");
    if (filter === "database") return matchesSearch && (f.path.includes("database") || f.path.includes("models"));
    if (filter === "docs") return matchesSearch && (f.path.endsWith(".md") || f.path.startsWith("docs"));
    return matchesSearch;
  });

  async function openPath(path) {
    setOpenFile(path);
    setIsEditing(false);
    setContent("Loading file contents...");
    try {
      const data = await safeFetchJson(`${API}/projects/${projectId}/files/${path}`);
      const fileTxt = data.content || "(empty file)";
      setContent(fileTxt);
      setEditedContent(fileTxt);
    } catch {
      setContent("(could not load file content)");
      setEditedContent("");
    }
  }

  async function handleSaveFile() {
    if (!openFile || !projectId) return;
    setSaving(true);
    try {
      await safeFetchJson(`${API}/projects/${projectId}/files/${openFile}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editedContent }),
      });
      setContent(editedContent);
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err) {
      console.error("Save file failed:", err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="glass-panel-pink rounded-3xl p-5 space-y-4 border border-[#F472B6]/30 shadow-xl font-sans">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#FFF9F2] flex items-center gap-2">
          <span>📁 Generated Project Source Files & Live Editor</span>
        </h3>
        <span className="text-xs px-3 py-0.5 rounded-full bg-[#EC4899]/20 text-[#FFF9F2] font-mono font-bold border border-[#F472B6]/30">
          {allFiles.length} files
        </span>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 border-b border-[#F472B6]/20 pb-2.5 overflow-x-auto text-xs">
        {["all", "frontend", "backend", "database", "docs"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1 rounded-xl capitalize transition font-semibold ${
              filter === cat
                ? "btn-pink-gradient text-[#120814] shadow-md"
                : "text-[#E8B8CD] hover:text-[#FFF9F2] hover:bg-[#2B142A]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Filter files (e.g. App.jsx, server.js)..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-[#180A1A] border border-[#F472B6]/30 rounded-xl px-3 py-2 text-xs text-[#FFF9F2] placeholder-[#E8B8CD]/50 focus:outline-none focus:ring-2 focus:ring-[#EC4899]/60 font-mono transition"
      />

      {/* File List Container */}
      <div className="max-h-56 overflow-y-auto border border-[#F472B6]/20 rounded-2xl divide-y divide-[#F472B6]/15 bg-[#180A1A]/80 shadow-inner">
        {filteredFiles.map((f) => (
          <button
            key={f.path}
            onClick={() => openPath(f.path)}
            className={`w-full text-left px-3.5 py-2.5 text-xs font-mono truncate hover:bg-[#2B142A] transition flex items-center justify-between ${
              openFile === f.path ? "bg-[#3D1A3B] text-[#FDE68A] font-bold" : "text-[#FFF5F8]"
            }`}
          >
            <span className="truncate">📄 {f.path}</span>
            <span className="text-[10px] text-[#E8B8CD] ml-2 shrink-0 bg-[#251026] px-2 py-0.5 rounded-full border border-[#F472B6]/20">
              {f.agent || "Generated"}
            </span>
          </button>
        ))}

        {filteredFiles.length === 0 && (
          <div className="p-5 text-center text-xs text-[#E8B8CD]">
            {allFiles.length === 0 ? "Building project files..." : "No matching files found."}
          </div>
        )}
      </div>

      {/* Selected File Content Inspector & Direct Code Editor */}
      {openFile && (
        <div className="space-y-2 pt-2 border-t border-[#F472B6]/20">
          <div className="flex items-center justify-between text-xs text-[#E8B8CD] px-1">
            <span className="font-mono text-[#FDE68A] font-bold truncate flex items-center gap-2">
              <span>📄 {openFile}</span>
              {saveSuccess && (
                <span className="text-xs text-[#FDE68A] font-bold animate-pulse">✓ Saved!</span>
              )}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`text-xs px-2.5 py-1 rounded-xl border transition font-bold ${
                  isEditing
                    ? "bg-[#FDE68A] text-[#120814] border-[#FFF9F2]"
                    : "bg-[#2B142A] hover:bg-[#3D1A3B] text-[#FFF9F2] border-[#F472B6]/30"
                }`}
              >
                {isEditing ? "👁 View Preview" : "✏️ Edit Code"}
              </button>

              {isEditing && (
                <button
                  onClick={handleSaveFile}
                  disabled={saving}
                  className="btn-pink-gradient text-[11px] px-3 py-1 rounded-xl shadow-md font-bold disabled:opacity-50"
                >
                  {saving ? "Saving..." : "💾 Save Changes"}
                </button>
              )}

              <a
                href={`/api/projects/${projectId}/files-download/${openFile}`}
                download
                className="text-[#FFF9F2] hover:underline font-semibold flex items-center gap-1 text-[11px] bg-[#EC4899]/20 px-2.5 py-1 rounded-xl border border-[#F472B6]/30 shadow-sm"
              >
                📥 Download
              </a>

              <button
                onClick={() => setOpenFile(null)}
                className="text-[#E8B8CD] hover:text-[#FFF9F2] text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>
          </div>

          {isEditing ? (
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full bg-[#100511] rounded-2xl p-4 text-xs font-mono text-[#FCE7F3] h-64 border border-[#F472B6]/40 focus:outline-none focus:border-[#EC4899] focus:ring-2 focus:ring-[#EC4899]/50 shadow-inner resize-none leading-relaxed"
            />
          ) : (
            <pre className="bg-[#100511] rounded-2xl p-4 text-xs font-mono text-[#FCE7F3] overflow-auto max-h-64 whitespace-pre-wrap border border-[#F472B6]/25 shadow-inner">
              {content}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

function flattenTree(nodes, parentPath = "") {
  let list = [];
  if (!Array.isArray(nodes)) return list;
  for (const node of nodes) {
    const currentPath = node.path || (parentPath ? `${parentPath}/${node.name}` : node.name);
    if (node.type === "file") {
      list.push(currentPath);
    } else if (node.type === "dir" && Array.isArray(node.children)) {
      list = list.concat(flattenTree(node.children, currentPath));
    }
  }
  return list;
}

function detectAgent(path) {
  if (path.startsWith("frontend")) return "Frontend";
  if (path.startsWith("backend")) return "Backend";
  if (path.includes("database") || path.includes("models")) return "Database";
  if (path.endsWith(".md") || path.startsWith("docs")) return "Docs";
  return "DevOps";
}

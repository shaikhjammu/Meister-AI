import { useState } from "react";

export default function RefinementConsole({ projectId, onRefine, isRefining }) {
  const [refinementPrompt, setRefinementPrompt] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!refinementPrompt.trim() || isRefining) return;
    onRefine(refinementPrompt.trim());
    setRefinementPrompt("");
  }

  return (
    <div className="glass-panel-pink rounded-3xl p-6 border border-[#F472B6]/30 shadow-2xl space-y-4 font-sans">
      <div className="flex items-center justify-between border-b border-[#F472B6]/20 pb-3">
        <div className="flex items-center space-x-3">
          <div className="circular-btn-sm w-9 h-9 bg-gradient-to-tr from-[#EC4899] to-[#FDE68A] text-[#120814] font-extrabold text-base shadow-md">
            💬
          </div>
          <div>
            <h3 className="text-base font-extrabold text-[#FFF9F2] flex items-center gap-2">
              <span className="text-fent-mixup">MeisterAI Pair-Programmer & Refinement Engine</span>
              <span className="text-[10px] bg-[#EC4899]/20 text-[#FDE68A] border border-[#F472B6]/40 px-2 py-0.5 rounded-full font-bold">
                Live Iterative Prompting
              </span>
            </h3>
            <p className="text-xs text-[#E8B8CD]">
              Continuously refine your project like Antigravity. Enter follow-up prompts to modify features, styling, or logic in real-time.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <textarea
            value={refinementPrompt}
            onChange={(e) => setRefinementPrompt(e.target.value)}
            placeholder="Type follow-up instructions (e.g. 'Add a dark mode toggle button', 'Add patient prescription search filter', 'Change navbar background to soft pink')..."
            className="w-full bg-[#180A1A] border border-[#F472B6]/30 rounded-2xl p-4 text-xs text-[#FFF5F8] h-24 resize-none focus:outline-none focus:border-[#EC4899] focus:ring-2 focus:ring-[#EC4899]/40 font-mono transition shadow-inner"
            disabled={isRefining}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] text-[#E8B8CD] font-mono">
            <span className="w-2 h-2 rounded-full bg-[#FDE68A] animate-pulse"></span>
            <span>Iterative Project Modeler Ready</span>
          </div>

          <button
            type="submit"
            disabled={!refinementPrompt.trim() || isRefining}
            className="btn-pink-gradient text-xs px-6 py-2.5 rounded-2xl font-bold transition shadow-lg shadow-pink-500/25 flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            <span>{isRefining ? "⚡ Updating Project..." : "✨ Send Refinement Instruction"}</span>
            <span>→</span>
          </button>
        </div>
      </form>
    </div>
  );
}

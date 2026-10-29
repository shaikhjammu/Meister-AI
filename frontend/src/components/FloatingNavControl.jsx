import { useState, useEffect } from "react";

export default function FloatingNavControl() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollPos(window.scrollY);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end transition-all duration-500 font-sans"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Panel Container */}
      <div
        className={`glass-panel-pink rounded-full p-2.5 shadow-2xl border border-[#F472B6]/30 transition-all duration-500 flex flex-col items-center gap-2.5 ${
          isMinimized && !isHovered
            ? "scale-90 opacity-70 translate-y-2 hover:opacity-100 hover:scale-100"
            : "scale-100 opacity-100 shadow-pink-500/20"
        }`}
      >
        {/* Hover / Minimize Header Indicator */}
        <div className="flex items-center justify-between w-full px-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            title={isMinimized ? "Expand Controls" : "Hover to minimize / click to toggle"}
            className="w-7 h-7 rounded-full bg-[#2E142B] hover:bg-[#EC4899]/30 text-[#F472B6] hover:text-[#FFF9F2] flex items-center justify-center text-xs transition border border-[#F472B6]/30 shadow-inner"
          >
            {isMinimized ? "🔍" : "🗕"}
          </button>
        </div>

        {/* Action Controls List */}
        {(!isMinimized || isHovered) && (
          <>
            {/* DIRECT UP ARROW BUTTON */}
            <button
              onClick={scrollToTop}
              title="Directly Go to Top (Scroll Up)"
              className="circular-btn bg-gradient-to-tr from-[#EC4899] to-[#FDE68A] text-[#120814] font-extrabold text-xl shadow-lg hover:shadow-[#EC4899]/50 hover:scale-110 active:scale-95 transition-all duration-300 border border-[#FFF9F2]/50 group relative"
            >
              <span>↑</span>
              <span className="absolute right-14 bg-[#1F0C20] text-[#FFF9F2] border border-[#F472B6]/40 text-[11px] font-semibold px-2.5 py-1 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                Direct Go Up ↑
              </span>
            </button>

            {/* Quick Section Shortcuts (Circular Shape) */}
            <button
              onClick={() => scrollToSection("home")}
              title="Build & Deploy Section"
              className="circular-btn-sm bg-[#2B142A] hover:bg-[#EC4899]/20 text-[#F472B6] border border-[#F472B6]/30 text-sm hover:scale-110 transition relative group"
            >
              <span>🚀</span>
              <span className="absolute right-12 bg-[#1F0C20] text-[#FFF9F2] border border-[#F472B6]/40 text-[10px] font-semibold px-2 py-0.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Build & Deploy
              </span>
            </button>

            <button
              onClick={() => scrollToSection("mvp")}
              title="MVP Generator Section"
              className="circular-btn-sm bg-[#2B142A] hover:bg-[#EC4899]/20 text-[#FDE68A] border border-[#FDE68A]/30 text-sm hover:scale-110 transition relative group"
            >
              <span>✨</span>
              <span className="absolute right-12 bg-[#1F0C20] text-[#FFF9F2] border border-[#F472B6]/40 text-[10px] font-semibold px-2 py-0.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                MVP Generator
              </span>
            </button>

            <button
              onClick={() => scrollToSection("agents-grid")}
              title="Agents Grid Section"
              className="circular-btn-sm bg-[#2B142A] hover:bg-[#EC4899]/20 text-[#F472B6] border border-[#F472B6]/30 text-sm hover:scale-110 transition relative group"
            >
              <span>🤖</span>
              <span className="absolute right-12 bg-[#1F0C20] text-[#FFF9F2] border border-[#F472B6]/40 text-[10px] font-semibold px-2 py-0.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Agents Grid
              </span>
            </button>

            <button
              onClick={() => scrollToSection("demo")}
              title="Live Demo & Output"
              className="circular-btn-sm bg-[#2B142A] hover:bg-[#EC4899]/20 text-[#FFF9F2] border border-[#F472B6]/30 text-sm hover:scale-110 transition relative group"
            >
              <span>🌐</span>
              <span className="absolute right-12 bg-[#1F0C20] text-[#FFF9F2] border border-[#F472B6]/40 text-[10px] font-semibold px-2 py-0.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Live Preview
              </span>
            </button>

            {/* DIRECT DOWN ARROW BUTTON */}
            <button
              onClick={scrollToBottom}
              title="Directly Go to Bottom (Scroll Down)"
              className="circular-btn bg-gradient-to-tr from-[#DB2777] via-[#EC4899] to-[#FCE7F3] text-[#120814] font-extrabold text-xl shadow-lg hover:shadow-[#EC4899]/50 hover:scale-110 active:scale-95 transition-all duration-300 border border-[#FFF9F2]/50 group relative"
            >
              <span>↓</span>
              <span className="absolute right-14 bg-[#1F0C20] text-[#FFF9F2] border border-[#F472B6]/40 text-[11px] font-semibold px-2.5 py-1 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                Direct Go Down ↓
              </span>
            </button>
          </>
        )}

        {/* Compact Minimized Icon when collapsed */}
        {isMinimized && !isHovered && (
          <div className="flex flex-col items-center gap-1 py-1">
            <span className="text-xs text-[#F472B6] font-bold">↑</span>
            <span className="text-[9px] text-[#FDE68A] font-mono">NAV</span>
            <span className="text-xs text-[#F472B6] font-bold">↓</span>
          </div>
        )}
      </div>
    </div>
  );
}

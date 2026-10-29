import { useEffect, useRef, useState } from "react";
import AgentCard from "./components/AgentCard.jsx";
import ActivityLog from "./components/ActivityLog.jsx";
import FileExplorer from "./components/FileExplorer.jsx";
import DeploymentResult from "./components/DeploymentResult.jsx";
import ProjectHistory from "./components/ProjectHistory.jsx";
import TestReport from "./components/TestReport.jsx";
import AgentInspectorModal from "./components/AgentInspectorModal.jsx";
import LoginPage from "./components/LoginPage.jsx";
import MvpGeneratorBox from "./components/MvpGeneratorBox.jsx";
import FloatingNavControl from "./components/FloatingNavControl.jsx";
import ProfileModal from "./components/ProfileModal.jsx";
import RefinementConsole from "./components/RefinementConsole.jsx";
import { API, safeFetchJson } from "./config.js";
import logoUrl from "../ChatGPT Image Aug 26, 2026, 05_01_03 PM.png";

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("meisterai_user_profile");
    return saved ? JSON.parse(saved) : null;
  });
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [prompt, setPrompt] = useState(
    "Build a Hospital Management System with admin, doctor and patient login, appointments and medical records."
  );
  const [project, setProject] = useState(null);
  const [log, setLog] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isBuilding, setIsBuilding] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [buildError, setBuildError] = useState("");
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [uiStyle, setUiStyle] = useState(() => {
    return localStorage.getItem("meisterai_ui_style") || "glassmorphism";
  });
  const esRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", uiStyle);
    localStorage.setItem("meisterai_ui_style", uiStyle);
  }, [uiStyle]);

  useEffect(() => {
    refreshHistory();
    return () => esRef.current?.close();
  }, []);

  useEffect(() => {
    const scrollRoot = document.querySelector("main");
    const slides = scrollRoot?.querySelectorAll(":scope > *");
    if (!scrollRoot || !slides?.length || !("IntersectionObserver" in window)) return undefined;

    slides.forEach((slide, index) => {
      slide.classList.add("scroll-zoom-slide");
      slide.style.setProperty("--slide-delay", `${Math.min(index * 70, 280)}ms`);
      slide.style.setProperty("--slide-x", index % 2 === 0 ? "-42px" : "42px");
      slide.style.setProperty("--slide-rotate", index % 2 === 0 ? "-7deg" : "7deg");
    });

    let frameId = 0;
    const updateScrollMotion = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        const rootRect = scrollRoot.getBoundingClientRect();
        const rootCenter = rootRect.top + rootRect.height / 2;
        slides.forEach((slide) => {
          const slideRect = slide.getBoundingClientRect();
          const distance = (slideRect.top + slideRect.height / 2 - rootCenter) / rootRect.height;
          const distanceFromCenter = Math.min(Math.abs(distance), 1);
          const isMobile = window.innerWidth <= 640;
          const scale = Math.max(isMobile ? 0.9 : 0.82, (isMobile ? 1.05 : 1.08) - distanceFromCenter * (isMobile ? 0.15 : 0.24));
          const opacity = Math.max(isMobile ? 0.62 : 0.48, 1 - distanceFromCenter * (isMobile ? 0.3 : 0.45));
          const movement = isMobile ? 18 : 28;
          const lift = Math.max(-movement, Math.min(movement, distance * -movement));
          slide.style.setProperty("--scroll-scale", scale.toFixed(3));
          slide.style.setProperty("--scroll-opacity", opacity.toFixed(3));
          slide.style.setProperty("--scroll-y", `${lift.toFixed(1)}px`);
        });
        frameId = 0;
      });
    };

    scrollRoot.addEventListener("scroll", updateScrollMotion, { passive: true });
    updateScrollMotion();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("scroll-zoom-visible", entry.isIntersecting);
        });
      },
      { root: scrollRoot, threshold: 0.12, rootMargin: "-4% 0px -4% 0px" }
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => {
      observer.disconnect();
      scrollRoot.removeEventListener("scroll", updateScrollMotion);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [project]);

  async function refreshHistory() {
    try {
      const data = await safeFetchJson(`${API}/projects`);
      setHistory(data);
    } catch (err) {
      console.warn("Could not fetch project history:", err);
    }
  }

  async function handleBuild(promptOverride) {
    const targetPrompt = typeof promptOverride === "string" ? promptOverride : prompt;
    if (!targetPrompt || !targetPrompt.trim()) return;

    if (typeof promptOverride === "string") {
      setPrompt(promptOverride);
    }

    setIsBuilding(true);
    setBuildError("");
    esRef.current?.close();
    setLog([]);
    setSelectedAgent(null);

    try {
      const created = await safeFetchJson(`${API}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: targetPrompt.trim(), uiStyle }),
      });

      setProject(created);
      subscribe(created.id);

      setTimeout(() => {
        const agentsEl = document.getElementById("agents-section");
        if (agentsEl) {
          agentsEl.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    } catch (err) {
      console.error("Build failed:", err);
      setBuildError(
        err.message || "Failed to connect to backend server. Make sure node backend is running on port 4000."
      );
    } finally {
      setIsBuilding(false);
    }
  }

  async function handleRefine(refinementPromptText) {
    if (!project || !refinementPromptText || isRefining) return;
    setIsRefining(true);
    setBuildError("");
    try {
      const updated = await safeFetchJson(`${API}/projects/${project.id}/refine`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: refinementPromptText }),
      });
      setProject(updated);
    } catch (err) {
      console.error("Refinement failed:", err);
      setBuildError(err.message || "Failed to send refinement prompt to backend server.");
    } finally {
      setIsRefining(false);
    }
  }

  function subscribe(id) {
    const es = new EventSource(`${API}/projects/${id}/stream`);
    esRef.current = es;

    es.addEventListener("snapshot", (e) => setProject(JSON.parse(e.data)));
    es.addEventListener("log", (e) => setLog((prev) => [...prev, JSON.parse(e.data)]));
    es.addEventListener("agent_update", () => refetchProject(id));
    es.addEventListener("progress", () => refetchProject(id));
    es.addEventListener("file_written", () => refetchProject(id));
    es.addEventListener("done", () => {
      refetchProject(id);
      refreshHistory();
    });
    es.onerror = () => {
      console.warn("SSE event stream connection issue");
    };
  }

  async function refetchProject(id) {
    try {
      const updated = await safeFetchJson(`${API}/projects/${id}`);
      setProject(updated);
      if (selectedAgent && updated.agents) {
        setSelectedAgent(updated.agents[selectedAgent.id] || selectedAgent);
      }
    } catch (err) {
      console.warn("Could not refetch project:", err);
    }
  }

  function loadFromHistory(p) {
    esRef.current?.close();
    setProject(p);
    setSelectedAgent(null);
    safeFetchJson(`${API}/projects/${p.id}/log`)
      .then(setLog)
      .catch(() => {});
    subscribe(p.id);
  }

  async function handleRerunAgent(agentId) {
    if (!project) return;
    try {
      const updated = await safeFetchJson(`${API}/projects/${project.id}/agents/${agentId}/rerun`, {
        method: "POST",
      });
      setProject(updated);
    } catch (err) {
      console.error("Failed to rerun agent:", err);
    }
  }

  function handleLoginSuccess(userObj) {
    setCurrentUser(userObj);
    localStorage.setItem("meisterai_user_profile", JSON.stringify(userObj));
  }

  const AGENT_META = {
    pm: { name: "Project Manager Agent", icon: "🧠" },
    frontend: { name: "Frontend Developer Agent", icon: "🎨" },
    backend: { name: "Backend Developer Agent", icon: "⚙️" },
    database: { name: "Database Agent", icon: "🗄️" },
    tester: { name: "Tester Agent", icon: "🧪" },
    debugger: { name: "Debugger Agent", icon: "🐛" },
    devops: { name: "DevOps Agent", icon: "🚀" },
    docs: { name: "Documentation Agent", icon: "📚" }
  };

  function handleOpenAgentInspector(agentKey) {
    const meta = AGENT_META[agentKey] || { name: `${agentKey} Agent`, icon: "🤖" };
    if (project?.agents?.[agentKey]) {
      setSelectedAgent(project.agents[agentKey]);
    } else if (project?.agents) {
      const found = Object.values(project.agents).find(
        (a) => a.id === agentKey || a.name.toLowerCase().includes(agentKey.toLowerCase())
      );
      if (found) setSelectedAgent(found);
      else {
        setSelectedAgent({
          id: agentKey,
          name: meta.name,
          icon: meta.icon,
          status: "running",
          currentTask: `Building ${agentKey} components and services`,
        });
      }
    } else {
      setSelectedAgent({
        id: agentKey,
        name: meta.name,
        icon: meta.icon,
        status: "completed",
        currentTask: `Active — Ready to inspect ${meta.name} deliverables`,
      });
    }
  }

  function handleSignOut() {
    setCurrentUser(null);
    localStorage.removeItem("meisterai_user_profile");
  }

  if (!currentUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen pink-cream-bg text-[#FFF5F8] flex relative font-sans">
      <div className="bubble-field" aria-hidden="true">
        {[...Array(14)].map((_, index) => (
          <span
            key={index}
            className="bubble"
            style={{
              "--bubble-left": `${(index * 23 + 7) % 96}%`,
              "--bubble-size": `${18 + (index % 5) * 12}px`,
              "--bubble-delay": `${(index % 7) * -1.8}s`,
              "--bubble-duration": `${12 + (index % 6) * 2}s`,
            }}
          />
        ))}
      </div>
      
      {/* Floating Circular Up/Down Navigation Controls */}
      <FloatingNavControl />

      {/* FIREBASE-STYLE LEFT VERTICAL SIDEBAR NAVIGATION */}
      <aside className="relative z-10 w-64 md:w-72 bg-[#170918]/95 border-r border-[#F472B6]/25 h-screen sticky top-0 z-40 flex flex-col justify-between p-4 shadow-2xl overflow-y-auto shrink-0">
        <div className="space-y-6">
          
          {/* Top Brand Logo & Title */}
          <a href="#home" className="flex items-center space-x-3 group px-2 pt-1">
            <img
              src={logoUrl}
              alt="MeisterAI logo"
              className="circular-btn w-10 h-10 object-cover shadow-md shadow-[#EC4899]/30 group-hover:scale-105 transition border border-[#FFF9F2]/50 shrink-0"
            />
            <div>
              <span className="text-xl font-extrabold text-[#FFF9F2] tracking-tight flex items-center gap-2">
                <span className="text-fent-mixup">MeisterAI</span>
              </span>
              <span className="text-[10px] bg-[#EC4899]/20 text-[#FDE68A] border border-[#F472B6]/40 px-2 py-0.5 rounded-full font-bold">
                Autonomous Platform
              </span>
            </div>
          </a>

          {/* Sidebar Search Bar */}
          <div className="px-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tools & features..."
                value={sidebarSearch}
                onChange={(e) => setSidebarSearch(e.target.value)}
                className="w-full bg-[#180A1A] border border-[#F472B6]/30 rounded-2xl pl-8 pr-3 py-2 text-xs text-[#FFF9F2] placeholder-[#E8B8CD]/50 focus:outline-none focus:border-[#EC4899] font-mono transition"
              />
              <span className="absolute left-2.5 top-2 text-xs text-[#E8B8CD]">🔍</span>
            </div>
          </div>

          {/* Navigation Categories (Vertical Stack) */}
          <div className="space-y-5 px-1 text-xs font-semibold">
            
            {/* Group 1: Project Shortcuts */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-[#E8B8CD]/70 uppercase tracking-wider px-2">
                Project Shortcuts
              </div>
              <nav className="space-y-1">
                <a href="#home" className="flex items-center gap-2.5 px-3 py-2 rounded-2xl hover:bg-[#2B142A] hover:text-[#FFF9F2] text-[#E8B8CD] transition">
                  <span className="text-sm">🚀</span> Build & Deploy Engine
                </a>
                <a href="#mvp" className="flex items-center gap-2.5 px-3 py-2 rounded-2xl hover:bg-[#2B142A] hover:text-[#FDE68A] text-[#E8B8CD] transition">
                  <span className="text-sm">✨</span> MVP Prompt Enhancer
                </a>
                <a href="#refinement" className="flex items-center gap-2.5 px-3 py-2 rounded-2xl hover:bg-[#2B142A] hover:text-[#F472B6] text-[#E8B8CD] transition">
                  <span className="text-sm">💬</span> Live Pair Refinement
                </a>
              </nav>
            </div>

              {/* Group 2: AI Agents Pipeline */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-[#E8B8CD]/70 uppercase tracking-wider px-2 flex items-center justify-between">
                  <span>AI Agents Workspace</span>
                  <span className="text-[9px] bg-[#EC4899]/20 text-[#FDE68A] px-1.5 py-0.5 rounded font-mono">8 Active</span>
                </div>
                <nav className="space-y-1">
                  <a href="#agents-section" className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl hover:bg-[#2B142A] hover:text-[#FFF9F2] text-[#E8B8CD] transition font-bold">
                    <span className="text-sm">🤖</span> Agents Pipeline Grid
                  </a>
                  <button
                    onClick={() => handleOpenAgentInspector("pm")}
                    className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-2xl hover:bg-[#2B142A] hover:text-[#F472B6] text-[#E8B8CD] transition pl-5 text-left cursor-pointer font-medium"
                  >
                    <span>🧠</span> Project Manager
                  </button>
                  <button
                    onClick={() => handleOpenAgentInspector("frontend")}
                    className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-2xl hover:bg-[#2B142A] hover:text-[#F472B6] text-[#E8B8CD] transition pl-5 text-left cursor-pointer font-semibold text-[#FDE68A]"
                  >
                    <span>🎨</span> Frontend Developer
                  </button>
                  <button
                    onClick={() => handleOpenAgentInspector("backend")}
                    className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-2xl hover:bg-[#2B142A] hover:text-[#F472B6] text-[#E8B8CD] transition pl-5 text-left cursor-pointer font-semibold text-[#FDE68A]"
                  >
                    <span>⚙️</span> Backend Developer
                  </button>
                  <button
                    onClick={() => handleOpenAgentInspector("database")}
                    className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-2xl hover:bg-[#2B142A] hover:text-[#F472B6] text-[#E8B8CD] transition pl-5 text-left cursor-pointer font-medium"
                  >
                    <span>🗄️</span> Database Agent
                  </button>
                  <button
                    onClick={() => handleOpenAgentInspector("tester")}
                    className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-2xl hover:bg-[#2B142A] hover:text-[#F472B6] text-[#E8B8CD] transition pl-5 text-left cursor-pointer font-medium"
                  >
                    <span>🧪</span> Tester Agent
                  </button>
                  <button
                    onClick={() => handleOpenAgentInspector("debugger")}
                    className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-2xl hover:bg-[#2B142A] hover:text-[#F472B6] text-[#E8B8CD] transition pl-5 text-left cursor-pointer font-medium"
                  >
                    <span>🐛</span> Debugger Agent
                  </button>
                  <button
                    onClick={() => handleOpenAgentInspector("devops")}
                    className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-2xl hover:bg-[#2B142A] hover:text-[#F472B6] text-[#E8B8CD] transition pl-5 text-left cursor-pointer font-medium"
                  >
                    <span>🚀</span> DevOps Agent
                  </button>
                  <button
                    onClick={() => handleOpenAgentInspector("docs")}
                    className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-2xl hover:bg-[#2B142A] hover:text-[#F472B6] text-[#E8B8CD] transition pl-5 text-left cursor-pointer font-medium"
                  >
                    <span>📚</span> Documentation Writer
                  </button>
                </nav>
              </div>

            {/* Group 3: Deliverables & Code Outputs */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-[#E8B8CD]/70 uppercase tracking-wider px-2">
                Deliverables & Outputs
              </div>
              <nav className="space-y-1">
                <a href="#files" className="flex items-center gap-2.5 px-3 py-2 rounded-2xl hover:bg-[#2B142A] hover:text-[#FFF9F2] text-[#E8B8CD] transition">
                  <span className="text-sm">📁</span> Source Files & Editor
                </a>
                <a href="#demo" className="flex items-center gap-2.5 px-3 py-2 rounded-2xl hover:bg-[#2B142A] hover:text-[#FDE68A] text-[#E8B8CD] transition font-bold">
                  <span className="text-sm">🌐</span> Live App Preview
                </a>
                <a href="#download" className="flex items-center gap-2.5 px-3 py-2 rounded-2xl hover:bg-[#2B142A] hover:text-[#FFF9F2] text-[#E8B8CD] transition">
                  <span className="text-sm">📦</span> ZIP Code Download
                </a>
                <a href="#history" className="flex items-center gap-2.5 px-3 py-2 rounded-2xl hover:bg-[#2B142A] hover:text-[#FFF9F2] text-[#E8B8CD] transition">
                  <span className="text-sm">📚</span> Saved History
                </a>
              </nav>
            </div>

          </div>
        </div>

        {/* Bottom Profile & Sign Out Bar */}
        <div className="pt-4 border-t border-[#F472B6]/20 space-y-2">
          <button
            onClick={() => setShowProfileModal(true)}
            className="w-full flex items-center gap-3 bg-[#271128] hover:bg-[#3D1A3B] p-2.5 rounded-2xl border border-[#F472B6]/30 text-xs transition shadow-sm cursor-pointer"
          >
            <div className="circular-btn-sm w-8 h-8 bg-[#EC4899]/30 text-white font-bold text-xs border border-[#F472B6]/40 shrink-0">
              👤
            </div>
            <div className="text-left font-mono font-semibold text-[11px] truncate">
              <div className="text-[#FFF9F2] truncate">{currentUser.name || "Developer"}</div>
              <div className="text-[#E8B8CD] text-[10px] truncate">{currentUser.mobile}</div>
            </div>
          </button>

          <button
            onClick={handleSignOut}
            className="w-full text-center text-xs text-[#E8B8CD] hover:text-red-400 font-bold py-1.5 transition"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN RIGHT WORKSPACE AREA */}
      <main className="relative z-10 flex-1 overflow-y-auto p-8 space-y-14 max-w-[1400px]">
        
        {/* Top Header Status Bar */}
        <div className="flex items-center justify-between border-b border-[#F472B6]/20 pb-4">
          <div>
            <h1 className="project-title text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-3">
              <span>MeisterAI Autonomous Platform</span>
            </h1>
            <p className="text-xs text-[#E8B8CD] mt-0.5">
              Production Full-Stack Application Generator & Live Interactive Workspace
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#FDE68A] bg-[#271128] px-3.5 py-1.5 rounded-full border border-[#F472B6]/30 font-mono font-semibold">
              ● API & Live DB Connected
            </span>
          </div>
        </div>

        {/* HERO BUILD & DEPLOY SECTION */}
        <section id="home" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-[#FFF9F2] tracking-tight flex items-center gap-3">
                <span>🚀 Build & Deploy Application</span>
              </h2>
              <p className="text-sm text-[#E8B8CD] mt-1">
                Describe your application below. MeisterAI will orchestrate 8 autonomous agents to construct, test, and deploy your project live.
              </p>
            </div>

            {/* Quick Prompts */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPrompt("Build an E-Commerce Store with product catalog, category filters, interactive shopping cart, checkout, order tracking, and seller dashboard.")}
                className="text-xs bg-[#271128] hover:bg-[#3D1A3B] text-[#FFF9F2] border border-[#F472B6]/30 px-3.5 py-2 rounded-2xl transition font-medium shadow-sm"
              >
                🛒 E-Commerce App
              </button>
              <button
                onClick={() => setPrompt("Build a Hospital Management System with admin, doctor and patient login, appointments and medical records.")}
                className="text-xs bg-[#271128] hover:bg-[#3D1A3B] text-[#FFF9F2] border border-[#F472B6]/30 px-3.5 py-2 rounded-2xl transition font-medium shadow-sm"
              >
                🏥 Hospital System
              </button>
            </div>
          </div>

          {buildError && (
            <div className="bg-red-950/60 border border-red-500/50 p-4 rounded-2xl text-xs text-red-200 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-2">
                <span className="text-base">⚠️</span>
                <span>{buildError}</span>
              </div>
              <button
                onClick={() => setBuildError("")}
                className="text-red-300 hover:text-white font-bold text-sm px-2"
              >
                ✕
              </button>
            </div>
          )}

          <div className="glass-panel-pink rounded-3xl border border-[#F472B6]/30 p-6 shadow-2xl space-y-4">
            {/* UI Style Selector Control */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#170918] p-3.5 rounded-2xl border border-[#F472B6]/20 gap-3">
              <div className="text-xs font-bold text-[#FFF9F2] flex items-center gap-2">
                <span>🎨 Select UI Style:</span>
                <span className="text-[10px] text-[#FDE68A] bg-[#EC4899]/20 border border-[#F472B6]/40 px-2.5 py-0.5 rounded-full font-mono uppercase">
                  {uiStyle}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setUiStyle("glassmorphism")}
                  className={`ui-style-option ui-style-glass ${uiStyle === "glassmorphism" ? "ui-style-option-active" : ""} text-xs px-3 py-1.5 rounded-xl transition cursor-pointer font-medium ${
                    uiStyle === "glassmorphism"
                      ? "bg-[#EC4899] text-black font-extrabold shadow-md"
                      : "bg-[#251026] text-[#E8B8CD] hover:bg-[#3D1A3B]"
                  }`}
                >
                  💎 Glassmorphism
                </button>
                <button
                  type="button"
                  onClick={() => setUiStyle("minimalism")}
                  className={`ui-style-option ui-style-minimal ${uiStyle === "minimalism" ? "ui-style-option-active" : ""} text-xs px-3 py-1.5 rounded-xl transition cursor-pointer font-medium ${
                    uiStyle === "minimalism"
                      ? "bg-[#FAFAFA] text-black font-extrabold shadow-md"
                      : "bg-[#251026] text-[#E8B8CD] hover:bg-[#3D1A3B]"
                  }`}
                >
                  ⚡ Minimalism
                </button>
                <button
                  type="button"
                  onClick={() => setUiStyle("cyberpunk")}
                  className={`ui-style-option ui-style-cyber ${uiStyle === "cyberpunk" ? "ui-style-option-active" : ""} text-xs px-3 py-1.5 rounded-xl transition cursor-pointer font-medium ${
                    uiStyle === "cyberpunk"
                      ? "bg-[#00F0FF] text-black font-extrabold shadow-md"
                      : "bg-[#251026] text-[#E8B8CD] hover:bg-[#3D1A3B]"
                  }`}
                >
                  🔮 Cyberpunk Neon
                </button>
                <button
                  type="button"
                  onClick={() => setUiStyle("neumorphism")}
                  className={`ui-style-option ui-style-soft ${uiStyle === "neumorphism" ? "ui-style-option-active" : ""} text-xs px-3 py-1.5 rounded-xl transition cursor-pointer font-medium ${
                    uiStyle === "neumorphism"
                      ? "bg-[#F59E0B] text-black font-extrabold shadow-md"
                      : "bg-[#251026] text-[#E8B8CD] hover:bg-[#3D1A3B]"
                  }`}
                >
                  🎨 Soft Elegance
                </button>
              </div>
            </div>

            <textarea
              className="w-full bg-[#180A1A] border border-[#F472B6]/30 rounded-2xl p-4 text-sm text-[#FFF5F8] h-36 resize-none focus:outline-none focus:border-[#EC4899] focus:ring-2 focus:ring-[#EC4899]/40 font-mono transition shadow-inner"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your software application..."
            />

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-[#E8B8CD] font-mono">
                Prompt Length: {prompt.length} chars
              </span>
              <button
                onClick={() => handleBuild()}
                disabled={isBuilding}
                className="btn-pink-gradient font-extrabold rounded-2xl px-9 py-3.5 text-sm transition shadow-xl shadow-[#EC4899]/30 flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>{isBuilding ? "⚡ Initiating MeisterAI Pipeline..." : "🚀 Build & Deploy"}</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </section>

        {/* MVP FEATURES GENERATOR SECTION */}
        <section>
          <MvpGeneratorBox
            currentPrompt={prompt}
            selectedUiStyle={uiStyle}
            onSelectUiStyle={(style) => setUiStyle(style)}
            onApplyPrompt={(optimizedPrompt) => setPrompt(optimizedPrompt)}
            onBuild={(optimizedPrompt) => handleBuild(optimizedPrompt)}
          />
        </section>

        {project ? (
          <>
            {/* LIVE REFINEMENT & MULTI-PROMPT PAIR-PROGRAMMER ENGINE */}
            <section id="refinement">
              <RefinementConsole
                projectId={project.id}
                onRefine={handleRefine}
                isRefining={isRefining}
              />
            </section>

            {/* OVERVIEW AGENT GRID SECTION */}
            <section id="agents-section" className="space-y-6 pt-6 border-t border-[#F472B6]/20">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#FFF9F2] flex items-center gap-3">
                    <span className="text-fent-mixup">🤖 MeisterAI Autonomous Agents Grid</span>
                    <span className="text-xs px-3 py-1 rounded-full bg-[#EC4899]/20 text-[#FDE68A] border border-[#F472B6]/40 font-mono font-bold">
                      8 Active Agents
                    </span>
                  </h2>
                  <p className="text-xs text-[#E8B8CD] mt-1">
                    Click any agent card to inspect workspace outputs and trigger individual execution.
                  </p>
                </div>

                <div className="flex items-center gap-4 glass-panel-pink px-5 py-3 rounded-2xl border border-[#F472B6]/30">
                  <div className="text-xs font-bold text-[#FFF9F2]">Overall Progress</div>
                  <div className="w-40 bg-[#180A1A] rounded-full h-3 overflow-hidden border border-[#F472B6]/30 shadow-inner">
                    <div
                      className="btn-pink-gradient h-3 transition-all duration-500 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#FDE68A]">{project.progress}%</span>
                </div>
              </div>

              <div id="agents-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {project.agents &&
                  Object.values(project.agents).map((a) => (
                    <AgentCard
                      key={a.id}
                      agent={a}
                      onSelect={(agent) => setSelectedAgent(agent)}
                      isSelected={selectedAgent?.id === a.id}
                    />
                  ))}
              </div>
            </section>

            {/* DEDICATED INDIVIDUAL AGENT SECTIONS */}
            <section className="space-y-8 pt-6 border-t border-[#F472B6]/20">
              <div className="text-center space-y-1">
                <h2 className="text-xl font-bold text-[#FFF9F2]">Detailed Agent Workspaces</h2>
                <p className="text-xs text-[#E8B8CD]">Specialized workspace logs and state trackers for each agent</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Project Manager Section */}
                <div id="agent-pm" className="glass-panel-pink border border-[#F472B6]/30 p-6 rounded-3xl space-y-3 shadow-lg hover:border-[#F472B6]/60 transition">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#FFF9F2] text-sm flex items-center gap-2">
                      <span className="circular-btn-sm w-7 h-7 bg-[#EC4899]/20 text-xs">🧠</span> Project Manager Agent
                    </h3>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FDE68A]/20 text-[#FDE68A] border border-[#FDE68A]/40 font-mono">
                      {project.agents?.pm?.status || "Active"}
                    </span>
                  </div>
                  <p className="text-xs text-[#E8B8CD]">Analyzes prompt requirements, specifies domain entities, and scaffolds architecture.</p>
                  <div className="text-xs font-mono text-[#FDE68A] bg-[#180A1A] p-3 rounded-2xl border border-[#F472B6]/20">
                    App Type: {project.requirements?.appType || "Analyzed"}
                  </div>
                  <button
                    onClick={() => handleOpenAgentInspector("pm")}
                    className="w-full btn-pink-gradient py-2 rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                  >
                    <span>🔍 Inspect PM Work & Spec</span>
                    <span>→</span>
                  </button>
                </div>

                {/* Frontend Agent Section */}
                <div id="agent-frontend" className="glass-panel-pink border border-[#F472B6]/40 p-6 rounded-3xl space-y-3 shadow-xl hover:border-[#EC4899] transition">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#FFF9F2] text-sm flex items-center gap-2">
                      <span className="circular-btn-sm w-7 h-7 bg-[#EC4899]/20 text-xs">🎨</span> Frontend Developer Agent
                    </h3>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FDE68A]/20 text-[#FDE68A] border border-[#FDE68A]/40 font-mono">
                      {project.agents?.frontend?.status || "Active"}
                    </span>
                  </div>
                  <p className="text-xs text-[#E8B8CD]">Constructs React UI components, Tailwind CSS design system, and responsive pages.</p>
                  <div className="text-xs font-mono text-[#FFF9F2] bg-[#180A1A] p-3 rounded-2xl border border-[#F472B6]/20 flex items-center justify-between">
                    <span>Frontend Source Files:</span>
                    <span className="text-[#FDE68A] font-bold">
                      {(project.filesGenerated || []).filter((f) => (typeof f === "string" ? f : f.path).startsWith("frontend")).length} Files Built
                    </span>
                  </div>
                  <button
                    onClick={() => handleOpenAgentInspector("frontend")}
                    className="w-full btn-pink-gradient py-2.5 rounded-xl text-xs font-extrabold shadow-lg shadow-pink-500/20 flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                  >
                    <span>🎨 Inspect Frontend Work & Code</span>
                    <span>→</span>
                  </button>
                </div>

                {/* Backend Agent Section */}
                <div id="agent-backend" className="glass-panel-pink border border-[#F472B6]/40 p-6 rounded-3xl space-y-3 shadow-xl hover:border-[#EC4899] transition">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#FFF9F2] text-sm flex items-center gap-2">
                      <span className="circular-btn-sm w-7 h-7 bg-[#EC4899]/20 text-xs">⚙️</span> Backend Developer Agent
                    </h3>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FDE68A]/20 text-[#FDE68A] border border-[#FDE68A]/40 font-mono">
                      {project.agents?.backend?.status || "Active"}
                    </span>
                  </div>
                  <p className="text-xs text-[#E8B8CD]">Builds Express REST API endpoints, JWT auth middleware, and validation checks.</p>
                  <div className="text-xs font-mono text-[#FDE68A] bg-[#180A1A] p-3 rounded-2xl border border-[#F472B6]/20 flex items-center justify-between">
                    <span>Backend Server Files:</span>
                    <span className="text-[#FFF9F2] font-bold">
                      {(project.filesGenerated || []).filter((f) => (typeof f === "string" ? f : f.path).startsWith("backend")).length} Modules Built
                    </span>
                  </div>
                  <button
                    onClick={() => handleOpenAgentInspector("backend")}
                    className="w-full btn-pink-gradient py-2.5 rounded-xl text-xs font-extrabold shadow-lg shadow-pink-500/20 flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                  >
                    <span>⚙️ Inspect Backend Work & API Routes</span>
                    <span>→</span>
                  </button>
                </div>

                {/* Database Agent Section */}
                <div id="agent-database" className="glass-panel-pink border border-[#F472B6]/30 p-6 rounded-3xl space-y-3 shadow-lg hover:border-[#F472B6]/60 transition">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#FFF9F2] text-sm flex items-center gap-2">
                      <span className="circular-btn-sm w-7 h-7 bg-[#EC4899]/20 text-xs">🗄️</span> Database Agent
                    </h3>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FDE68A]/20 text-[#FDE68A] border border-[#FDE68A]/40 font-mono">
                      {project.agents?.database?.status || "Active"}
                    </span>
                  </div>
                  <p className="text-xs text-[#E8B8CD]">Designs MongoDB Mongoose schemas, indexes, and document relationships.</p>
                  <div className="text-xs font-mono text-[#FFF9F2] bg-[#180A1A] p-3 rounded-2xl border border-[#F472B6]/20">
                    Entities Configured: {project.requirements?.entities?.join(", ") || "User, Record"}
                  </div>
                  <button
                    onClick={() => handleOpenAgentInspector("database")}
                    className="w-full btn-pink-gradient py-2 rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                  >
                    <span>🗄️ Inspect Database Schemas</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </section>

            {/* LIVE ACTIVITY LOG TERMINAL SECTION */}
            <section className="space-y-4 pt-6 border-t border-[#F472B6]/20">
              <h2 className="text-xl font-bold text-[#FFF9F2] flex items-center gap-2">
                <span>📟 Live Terminal Activity Log</span>
              </h2>
              <ActivityLog entries={log} />
            </section>

            {/* SOURCE FILES & CODE INSPECTOR SECTION */}
            <section id="files" className="space-y-4 pt-6 border-t border-[#F472B6]/20">
              <h2 className="text-xl font-bold text-[#FFF9F2] flex items-center gap-2">
                <span>📁 Source Code & Live File Editor</span>
              </h2>
              <FileExplorer projectId={project.id} filesGenerated={project.filesGenerated} />
            </section>

            {/* DEPLOYMENT & LIVE PREVIEW SECTION */}
            <section id="demo" className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-[#F472B6]/20">
              <div className="lg:col-span-7 space-y-4">
                <h2 className="text-xl font-bold text-[#FFF9F2]">🚀 Live Application Preview & Deployment</h2>
                <DeploymentResult deployment={project.deployment} status={project.overallStatus} projectId={project.id} />
              </div>

              <div className="lg:col-span-5 space-y-4">
                <h2 className="text-xl font-bold text-[#FFF9F2]">🧪 Test Suite Report</h2>
                <TestReport results={project.testResults} />
              </div>
            </section>

            {/* ZIP DOWNLOAD HERO SECTION */}
            <section id="download" className="glass-panel-pink border border-[#F472B6]/40 rounded-3xl p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="space-y-2.5 max-w-2xl">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#120814] bg-gradient-to-r from-[#FDE68A] to-[#FCE7F3] border border-[#FFF9F2] px-3.5 py-1 rounded-full shadow-sm">
                    Complete Codebase Bundled
                  </span>
                  <h2 className="text-2xl font-extrabold text-[#FFF9F2]">
                    Download {project.requirements?.appType || project.prompt}
                  </h2>
                  <p className="text-xs text-[#E8B8CD] leading-relaxed">
                    Download the entire project as a ready-to-run `.zip` archive containing React frontend, Express REST API backend, MongoDB models, Docker configurations, and documentation.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  {project.deployment?.demoUrl && (
                    <a
                      href={project.deployment.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-pink-gradient font-extrabold text-xs px-6 py-3.5 rounded-2xl transition shadow-lg shadow-[#EC4899]/20 flex items-center justify-center gap-2 text-center"
                    >
                      <span>🌐 Open Live Application Demo</span>
                      <span>↗</span>
                    </a>
                  )}

                  <a
                    href={`${API}/projects/${project.id}/download`}
                    download
                    className="bg-[#2B142A] hover:bg-[#3D1A3B] text-[#FFF9F2] border border-[#F472B6]/30 font-bold text-xs px-6 py-3.5 rounded-2xl transition shadow-lg flex items-center justify-center gap-2 text-center"
                  >
                    <span>📦 Download Complete Project (.zip)</span>
                    <span>⬇</span>
                  </a>
                </div>
              </div>
            </section>
          </>
        ) : (
          /* Empty State */
          <section className="glass-panel-pink rounded-3xl border border-[#F472B6]/30 p-16 text-center text-[#E8B8CD] space-y-4 shadow-xl">
            <div className="circular-btn w-20 h-20 bg-gradient-to-tr from-[#EC4899]/30 to-[#FDE68A]/30 border border-[#F472B6]/40 mx-auto flex items-center justify-center text-4xl shadow-md">
              🧠
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#FFF9F2]">No Active MeisterAI Pipeline</h3>
              <p className="text-xs text-[#E8B8CD] max-w-md mx-auto mt-1">
                Enter your application requirements above and click "Build & Deploy" to activate MeisterAI's 8 autonomous agents.
              </p>
            </div>
          </section>
        )}

        {/* HISTORY SECTION */}
        <section id="history" className="space-y-4 pt-6 border-t border-[#F472B6]/20">
          <h2 className="text-xl font-bold text-[#FFF9F2]">📚 Saved MeisterAI Workspaces & History</h2>
          <ProjectHistory history={history} onSelect={loadFromHistory} activeId={project?.id} />
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="glass-panel-pink border border-[#F472B6]/30 rounded-3xl p-8 space-y-3 shadow-lg">
          <h2 className="text-xl font-bold text-[#FFF9F2]">ℹ️ About MeisterAI Autonomous Platform</h2>
          <p className="text-xs text-[#E8B8CD] leading-relaxed max-w-3xl">
            MeisterAI uses an ensemble of 8 specialized autonomous agents (Project Manager, Frontend Developer, Backend Developer, Database Agent, Tester, Debugger, DevOps, and Documentation Writer) working synchronously in a shared project workspace to transform plain text prompts into full-stack runnable software applications.
          </p>
        </section>

        <footer className="border-t border-[#F472B6]/20 pt-5 text-center text-base text-[#FFF9F2]">
          Developed by Jammu Shaikh
        </footer>
      </main>

      {/* AGENT INSPECTOR MODAL */}
      {selectedAgent && (
        <AgentInspectorModal
          agent={selectedAgent}
          project={project}
          onClose={() => setSelectedAgent(null)}
          onRerun={handleRerunAgent}
        />
      )}

      {/* USER PROFILE EDIT MODAL */}
      {showProfileModal && currentUser && (
        <ProfileModal
          user={currentUser}
          onClose={() => setShowProfileModal(false)}
          onSave={(updated) => setCurrentUser(updated)}
        />
      )}
    </div>
  );
}

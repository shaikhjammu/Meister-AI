import { useEffect, useState } from "react";

export default function MvpGeneratorBox({ currentPrompt, onApplyPrompt, onBuild, selectedUiStyle, onSelectUiStyle }) {
  const [copied, setCopied] = useState(false);
  const [mvpFeatures, setMvpFeatures] = useState([]);
  const [appTitle, setAppTitle] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [internalStyle, setInternalStyle] = useState(selectedUiStyle || "glassmorphism");

  const uiStyle = selectedUiStyle || internalStyle;

  useEffect(() => {
    if (!currentPrompt) return;
    const inferred = generateMvpStructure(currentPrompt);
    setMvpFeatures(inferred.features);
    setAppTitle(inferred.title);
  }, [currentPrompt]);

  const compiledMasterPrompt = `Build a complete, production-ready full-stack application for "${appTitle || currentPrompt}".
Architecture:
- Frontend: React + Tailwind CSS (Responsive CRUD dashboard, Auth screens, Clean UX, UI Style: ${uiStyle.toUpperCase()})
- Backend: Node.js + Express REST API (JWT Authentication, Input Validation, Dynamic Data Routes)
- Database: MongoDB Mongoose Schemas (Relational Data Models, Indexes)

Design Theme Requested: ${uiStyle.toUpperCase()} Aesthetic (Modern typography, curated palette, reactive components).

Key MVP Features Required:
${mvpFeatures.map((f, i) => `${i + 1}. ${f}`).join("\n")}

Ensure robust error handling, unit tests, automated deployment configuration, and clear documentation.`;

  function handleCopy() {
    navigator.clipboard.writeText(compiledMasterPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleApplyText() {
    if (onApplyPrompt) {
      onApplyPrompt(compiledMasterPrompt);
    }
  }

  function handleApplyAndBuild() {
    if (onApplyPrompt) {
      onApplyPrompt(compiledMasterPrompt);
    }
    if (onBuild) {
      onBuild(compiledMasterPrompt);
    }
  }

  return (
    <div
      id="mvp"
      className="glass-panel-pink rounded-3xl p-6 shadow-2xl space-y-4 transition-all duration-300 border border-[#F472B6]/30 hover:border-[#F472B6]/60 hover-glow-pink hover-minimize-container group"
    >
      {/* Top Title Bar */}
      <div className="flex items-center justify-between border-b border-[#F472B6]/20 pb-4">
        <div className="flex items-center space-x-3">
          <div className="circular-btn-sm w-9 h-9 bg-gradient-to-tr from-[#EC4899] to-[#FDE68A] text-[#120814] text-lg font-bold shadow-md shadow-[#EC4899]/30">
            ✨
          </div>
          <div>
            <h3 className="text-base font-bold text-[#FFF9F2] flex items-center gap-2">
              <span className="text-fent-mixup">MVP Features & AI Prompt Enhancer</span>
              <span className="text-[10px] bg-[#EC4899]/15 text-[#F472B6] border border-[#F472B6]/40 px-2.5 py-0.5 rounded-full font-semibold">
                Auto-Structure
              </span>
            </h3>
            <p className="text-xs text-[#E8B8CD]">
              Automatically detects domain requirements, structures MVP features & builds optimized master prompt.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Minimize / Expand hover control button */}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-xs bg-[#2E142B] hover:bg-[#EC4899]/30 text-[#F472B6] border border-[#F472B6]/30 px-2.5 py-1.5 rounded-xl transition flex items-center gap-1 font-medium"
            title="Hover to minimize or click to toggle collapse"
          >
            <span>{isMinimized ? "📂 Expand" : "🗕 Minimize"}</span>
          </button>

          <button
            onClick={handleCopy}
            className="bg-[#261125] hover:bg-[#3D1A3B] text-[#FFF9F2] text-xs font-semibold px-3.5 py-1.5 rounded-xl border border-[#F472B6]/30 transition flex items-center gap-1.5 shadow-sm"
          >
            <span>{copied ? "✓ Copied!" : "📋 Copy Prompt"}</span>
          </button>

          <button
            onClick={handleApplyText}
            className="bg-[#2E142B] hover:bg-[#EC4899]/20 text-[#FDE68A] text-xs font-semibold px-3 py-1.5 rounded-xl border border-[#FDE68A]/30 transition"
          >
            <span>✨ Apply to Input</span>
          </button>

          <button
            onClick={handleApplyAndBuild}
            className="btn-pink-gradient text-xs px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-lg shadow-[#EC4899]/25 cursor-pointer font-extrabold"
          >
            <span>🚀 Build & Deploy with MVP</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Expandable / Minimizable Content Body */}
      {!isMinimized && (
        <div className="space-y-4 pt-1 transition-all duration-300">
          {/* Features Checklist */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-[#FFF9F2] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#EC4899] animate-pulse"></span>
              <span>Recommended Core MVP Features for "{appTitle || 'App'}":</span>
            </div>
            <div className="mvp-feature-text-list space-y-2 pl-1">
              {mvpFeatures.map((feat, idx) => (
                <p
                  key={idx}
                  className="text-sm text-[#FFF5F8] leading-relaxed"
                >
                  <span className="text-[#F472B6] font-bold mr-2">{idx + 1}.</span>
                  <span className="font-medium">{feat}</span>
                </p>
              ))}
            </div>
          </div>

          {/* Compiled Master Prompt Output Codebox */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-[#E8B8CD]">
              <span className="font-mono text-[#FDE68A] font-medium flex items-center gap-2">
                <span>📝</span> Structured Master Prompt Preview:
              </span>
              <span className="text-[11px] bg-[#EC4899]/10 text-[#F472B6] px-2 py-0.5 rounded-full border border-[#F472B6]/20 font-mono">
                Ready for AI Pipeline
              </span>
            </div>
            <pre className="bg-[#180A1A] p-4 rounded-2xl border border-[#F472B6]/20 text-xs font-mono text-[#FCE7F3] whitespace-pre-wrap max-h-44 overflow-y-auto leading-relaxed shadow-inner">
              {compiledMasterPrompt}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

function generateMvpStructure(prompt) {
  const text = (prompt || "").toLowerCase();

  if (text.includes("amazon") || text.includes("e-commerce") || text.includes("ecommerce") || text.includes("e commerce") || text.includes("shop") || text.includes("store") || text.includes("marketplace")) {
    return {
      title: "E-Commerce Store & Marketplace",
      features: [
        "Customer & Seller Authentication",
        "Product Catalog with Category Filters & Search",
        "Interactive Shopping Cart & Price Calculator",
        "Real-Time Order Tracking & Checkout Flow",
        "Customer Reviews & Star Ratings",
        "Admin Sales & Inventory Analytics",
      ],
    };
  }

  if (text.includes("hospital") || text.includes("doctor") || text.includes("patient") || text.includes("clinic")) {
    return {
      title: "Hospital Management System",
      features: [
        "Admin, Doctor, and Patient Authentication",
        "Doctor Appointment Scheduling & Calendar",
        "Patient Medical Records & Clinical History",
        "Digital Prescriptions & Diagnosis Generator",
        "Department & Room Inventory Tracking",
        "Billing & Invoice Status Overview",
      ],
    };
  }

  if (text.includes("school") || text.includes("student") || text.includes("teacher")) {
    return {
      title: "School Management System",
      features: [
        "Student, Teacher, and Parent Auth Portal",
        "Daily Attendance & Leave Tracker",
        "Exam Results & Grade Card Generator",
        "Timetable & Classroom Scheduler",
        "Fee Payment & Dues Overview",
        "School Announcement Board",
      ],
    };
  }

  if (text.includes("task") || text.includes("kanban") || text.includes("project")) {
    return {
      title: "Task & Kanban Project Workspace",
      features: [
        "Interactive Kanban Task Drag & Status Board",
        "Project Workspaces & Sprint Milestones",
        "Task Assignee & Priority Level Controls",
        "Comment Threads & File Attachments",
        "Real-Time Team Activity Logs",
        "Project Completion Metrics Dashboard",
      ],
    };
  }

  if (text.includes("fitness") || text.includes("gym") || text.includes("workout")) {
    return {
      title: "Fitness & Workout Tracker App",
      features: [
        "Interactive Workout Routine Logger",
        "Exercise Video & Instructions Library",
        "Daily Calorie & Macro Tracker",
        "Body Progress & Weight Analytics",
        "Trainer Client Coaching Console",
        "Fitness Goal Milestone Badges",
      ],
    };
  }

  if (text.includes("finance") || text.includes("expense") || text.includes("budget")) {
    return {
      title: "Financial Budget & Expense Tracker",
      features: [
        "Income & Expense Transaction Logging",
        "Category Spending Breakdown Charts",
        "Monthly Budget Limit & Goal Tracker",
        "Recurring Subscription & Bill Alerts",
        "Account Balance & Cash Flow Summary",
        "Financial Export & PDF Reports",
      ],
    };
  }

  if (text.includes("ai operating") || text.includes("voice assistant") || text.includes("samjhe")) {
    return {
      title: "AI Operating System & Voice Assistant",
      features: [
        "Voice Command Speech Recognition (Samjhe)",
        "Automated Desktop & System File Organizer",
        "Email AI Key Takeaway Summarizer",
        "AI Code Generation Sandbox",
        "Smart Automated Workflows Console",
        "Live System Health Metrics Dashboard",
      ],
    };
  }

  // Clean fallback title
  const cleanAppTitle = prompt
    .replace(/^["']|["']$/g, "")
    .replace(/^(build|create|make|a|an|the|system|app|for)\s+/i, "")
    .slice(0, 35)
    .trim();

  const requestedFeatures = prompt
    .replace(/^(build|create|make)\s+/i, "")
    .split(/,|\band\b|\bwith\b|\bincluding\b/i)
    .map((item) => item.trim().replace(/[.]+$/, ""))
    .filter((item) => item.length > 3 && !/^(a|an|the)\s+/i.test(item))
    .slice(0, 6);

  return {
    title: cleanAppTitle || "Custom Software Application",
    features: requestedFeatures.length
      ? requestedFeatures.map((feature) => `User-requested capability: ${feature}`)
      : [
          "Role-Based User Authentication & RBAC",
          "Interactive Real-Time Data Dashboard",
          "Dynamic Entity Data Management (CRUD)",
          "Automated Data Analytics & Metrics",
          "Search & Category Filtering System",
          "Export & Report Generator Console",
        ],
  };
}

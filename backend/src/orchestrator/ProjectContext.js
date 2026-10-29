import fs from "fs-extra";
import path from "path";
import { v4 as uuid } from "uuid";

const WORKSPACE_ROOT = path.resolve("workspace");

const AGENT_DEFS = [
  { id: "pm", name: "Project Manager", icon: "🧠" },
  { id: "frontend", name: "Frontend Developer", icon: "🎨" },
  { id: "backend", name: "Backend Developer", icon: "⚙️" },
  { id: "database", name: "Database Agent", icon: "🗄️" },
  { id: "tester", name: "Tester", icon: "🧪" },
  { id: "debugger", name: "Debugger", icon: "🐛" },
  { id: "devops", name: "DevOps", icon: "🚀" },
  { id: "docs", name: "Documentation Writer", icon: "📚" },
];

/**
 * ProjectContext is the "shared workspace" every agent reads/writes to.
 * It holds: original prompt, requirements, architecture, generated files,
 * test results, deployment state, and the live activity log. Emits events
 * so the dashboard can stream updates over SSE.
 */
export class ProjectContext {
  constructor(prompt, emitter, uiStyle = "glassmorphism") {
    this.id = uuid();
    this.prompt = prompt;
    this.uiStyle = uiStyle;
    this.emitter = emitter;
    this.createdAt = new Date().toISOString();

    this.slug = slugify(prompt);
    this.dir = path.join(WORKSPACE_ROOT, `${this.slug}-${this.id.slice(0, 8)}`);

    this.requirements = null;
    this.architecture = null;
    this.techStack = null;


    this.agents = Object.fromEntries(
      AGENT_DEFS.map((a) => [
        a.id,
        { ...a, status: "waiting", currentTask: null, progress: 0 },
      ])
    );

    this.filesGenerated = []; // [{path, agent}]
    this.testResults = null; // {total, passed, failed, cases:[]}
    this.deployment = {
      github: { status: "pending", url: null },
      frontend: { status: "pending", url: null, provider: "Vercel" },
      backend: { status: "pending", url: null, provider: "Render" },
      database: { status: "pending", provider: null, name: null },
    };

    this.activityLog = [];
    this.overallStatus = "running"; // running | completed | failed
    this.progress = 0;
  }

  log(agentName, message) {
    const entry = {
      time: new Date().toISOString(),
      agent: agentName,
      message,
    };
    this.activityLog.push(entry);
    this.emit("log", entry);
  }

  setAgentStatus(agentId, status, currentTask) {
    const a = this.agents[agentId];
    if (!a) return;
    a.status = status;
    a.currentTask = currentTask;
    this.emit("agent_update", { agentId, status, currentTask });
    this.recomputeProgress();
  }

  recomputeProgress() {
    const statuses = Object.values(this.agents).map((a) => a.status);
    const done = statuses.filter((s) => s === "completed").length;
    this.progress = Math.round((done / statuses.length) * 100);
    this.emit("progress", { progress: this.progress });
  }

  async writeFile(relativePath, content, agentName) {
    const fullPath = path.join(this.dir, relativePath);
    await fs.ensureDir(path.dirname(fullPath));
    await fs.writeFile(fullPath, content, "utf-8");
    
    // Deduplicate filesGenerated entries
    const existingIndex = this.filesGenerated.findIndex((f) => f.path === relativePath);
    if (existingIndex >= 0) {
      this.filesGenerated[existingIndex] = { path: relativePath, agent: agentName };
    } else {
      this.filesGenerated.push({ path: relativePath, agent: agentName });
    }
    this.emit("file_written", { path: relativePath, agent: agentName });
  }

  async readFile(relativePath) {
    return fs.readFile(path.join(this.dir, relativePath), "utf-8");
  }

  async fileTree() {
    if (!(await fs.pathExists(this.dir))) return [];
    return walk(this.dir, this.dir);
  }

  emit(type, payload) {
    this.emitter.emit("event", { projectId: this.id, type, payload });
  }

  toSummary() {
    return {
      id: this.id,
      prompt: this.prompt,
      uiStyle: this.uiStyle,
      slug: this.slug,
      createdAt: this.createdAt,
      progress: this.progress,
      overallStatus: this.overallStatus,
      agents: this.agents,
      testResults: this.testResults,
      deployment: this.deployment,
      demoUrl: `http://localhost:4000/preview/${this.id}`,
      filesGenerated: this.filesGenerated,
      requirements: this.requirements,
      architecture: this.architecture,
      techStack: this.techStack,
    };
  }
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40) || "project";
}

function walk(root, dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries
    .filter((e) => e.name !== "node_modules" && e.name !== ".git")
    .map((entry) => {
      const full = path.join(dir, entry.name);
      const rel = path.relative(root, full);
      if (entry.isDirectory()) {
        return { type: "dir", name: entry.name, path: rel, children: walk(root, full) };
      }
      return { type: "file", name: entry.name, path: rel };
    });
}

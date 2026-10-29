import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { EventEmitter } from "events";
import path from "path";
import AdmZip from "adm-zip";
import { Orchestrator } from "./orchestrator/Orchestrator.js";
import { generatePreviewHtml } from "./generators/previewRenderer.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const emitter = new EventEmitter();
emitter.setMaxListeners(100);
const orchestrator = new Orchestrator(emitter);

app.get("/", (req, res) => {
  res.type("html").send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MeisterAI Backend</title>
    <style>
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #e5eaf5; color: #302844; font-family: system-ui, sans-serif; }
      main { width: min(92vw, 560px); padding: 2rem; border: 1px solid #d0bdf4; border-radius: 18px; background: rgba(255,255,255,.72); box-shadow: 0 16px 40px rgba(48,40,68,.16); }
      h1 { margin-top: 0; color: #8458b3; }
      a { color: #8458b3; font-weight: 700; }
      li { margin: .7rem 0; }
    </style>
  </head>
  <body>
    <main>
      <h1>MeisterAI Backend Online</h1>
      <p>The API server is running on port ${process.env.PORT || 4000}.</p>
      <ul>
        <li><a href="http://localhost:5174/">Open MeisterAI Dashboard</a></li>
        <li><a href="/api/health">Check API health</a></li>
        <li>Live previews use <code>/preview/&lt;project-id&gt;</code></li>
      </ul>
    </main>
  </body>
</html>`);
});

// ---------- Build a new project ----------
app.post("/api/projects", async (req, res) => {
  try {
    const { prompt, uiStyle } = req.body;
    if (!prompt || !prompt.trim()) {
      return res.status(400).json({ error: "prompt is required" });
    }
    const project = await orchestrator.startProject(prompt.trim(), uiStyle || "glassmorphism");
    res.status(201).json(project.toSummary());
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).json({ error: err.message || "Failed to start project" });
  }
});

// ---------- List / get project(s) ----------
app.get("/api/projects", (req, res) => {
  res.json(orchestrator.listProjects());
});

app.get("/api/projects/:id", (req, res) => {
  const project = orchestrator.getProject(req.params.id);
  if (!project) return res.status(404).json({ error: "not found" });
  res.json(project.toSummary());
});

app.get("/api/projects/:id/log", (req, res) => {
  const project = orchestrator.getProject(req.params.id);
  if (!project) return res.status(404).json({ error: "not found" });
  res.json(project.activityLog);
});

app.get("/api/projects/:id/files", async (req, res) => {
  const project = orchestrator.getProject(req.params.id);
  if (!project) return res.status(404).json({ error: "not found" });
  res.json(await project.fileTree());
});

app.get("/api/projects/:id/files/*", async (req, res) => {
  const project = orchestrator.getProject(req.params.id);
  if (!project) return res.status(404).json({ error: "not found" });
  const relPath = req.params[0];
  try {
    const content = await project.readFile(relPath);
    res.json({ path: relPath, content });
  } catch {
    res.status(404).json({ error: "file not found" });
  }
});

// ---------- Download Complete Project (.zip) ----------
app.get("/api/projects/:id/download", async (req, res) => {
  const project = orchestrator.getProject(req.params.id);
  if (!project) return res.status(404).json({ error: "project not found" });

  try {
    const zip = new AdmZip();
    zip.addLocalFolder(project.dir);
    const buffer = zip.toBuffer();

    const fileName = `${project.slug || "project"}.zip`;
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Type", "application/zip");
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: `failed to generate zip: ${err.message}` });
  }
});

// ---------- Download Single File ----------
app.get("/api/projects/:id/files-download/*", async (req, res) => {
  const project = orchestrator.getProject(req.params.id);
  if (!project) return res.status(404).json({ error: "not found" });
  const relPath = req.params[0];
  try {
    const content = await project.readFile(relPath);
    const fileName = path.basename(relPath);
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Type", "text/plain");
    res.send(content);
  } catch {
    res.status(404).json({ error: "file not found" });
  }
});

// Save File Edits
app.post("/api/projects/:id/files/*", async (req, res) => {
  const project = orchestrator.getProject(req.params.id);
  if (!project) return res.status(404).json({ error: "not found" });
  const relPath = req.params[0];
  const { content } = req.body;
  try {
    await project.writeFile(relPath, content || "", "User Direct Editor");
    res.json({ status: "saved", path: relPath });
  } catch (err) {
    res.status(500).json({ error: `failed to save file: ${err.message}` });
  }
});

// ---------- Re-trigger Specific Agent ----------
app.post("/api/projects/:id/agents/:agentId/rerun", async (req, res) => {
  try {
    const updatedProject = await orchestrator.rerunAgent(req.params.id, req.params.agentId);
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ---------- Iterative MeisterAI Refinement Engine (Multi-Prompt Edit) ----------
app.post("/api/projects/:id/refine", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: "refinement prompt is required" });
  }
  try {
    const updatedProject = await orchestrator.refineProject(req.params.id, prompt.trim());
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// ---------- Live Interactive Web Preview ----------
app.get("/preview/:id", (req, res) => {
  const project = orchestrator.getProject(req.params.id);
  if (!project) {
    return res.status(404).send("<h2 style='font-family:sans-serif;padding:2rem;'>Project not found. Please build a new project from the dashboard.</h2>");
  }
  const html = generatePreviewHtml(project);
  res.setHeader("Content-Type", "text/html");
  res.send(html);
});

// ---------- Live activity stream (SSE) ----------
app.get("/api/projects/:id/stream", (req, res) => {
  const project = orchestrator.getProject(req.params.id);
  if (!project) return res.status(404).end();

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*",
  });
  res.write(`event: snapshot\ndata: ${JSON.stringify(project.toSummary())}\n\n`);

  const onEvent = (evt) => {
    if (evt.projectId !== project.id) return;
    res.write(`event: ${evt.type}\ndata: ${JSON.stringify(evt.payload)}\n\n`);
  };
  emitter.on("event", onEvent);

  req.on("close", () => emitter.off("event", onEvent));
});

// ---------- Connections (OAuth / API-token integrations) ----------
app.get("/api/connections", (req, res) => {
  res.json({
    github: { connected: !!process.env.GITHUB_ACCESS_TOKEN, connectUrl: "/api/connections/github/start" },
    vercel: { connected: !!process.env.VERCEL_API_TOKEN },
    render: { connected: !!process.env.RENDER_API_KEY },
    mongodb: { connected: !!process.env.MONGODB_ATLAS_PUBLIC_KEY },
  });
});

app.get("/api/connections/github/start", (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return res.status(400).json({
      error: "GITHUB_CLIENT_ID not configured. Add a GitHub OAuth App to .env to enable real connections.",
    });
  }
  const redirect = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo`;
  res.redirect(redirect);
});

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// ---------- Global Express JSON Error Handler ----------
app.use((err, req, res, next) => {
  console.error("Unhandled Backend Error:", err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Multi-Agent AI Software Engineer backend running on http://localhost:${PORT}`);
});

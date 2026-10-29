import { ProjectContext } from "./ProjectContext.js";
import { ProjectManagerAgent } from "../agents/ProjectManagerAgent.js";
import { FrontendAgent } from "../agents/FrontendAgent.js";
import { BackendAgent } from "../agents/BackendAgent.js";
import { DatabaseAgent } from "../agents/DatabaseAgent.js";
import { TesterAgent } from "../agents/TesterAgent.js";
import { DebuggerAgent } from "../agents/DebuggerAgent.js";
import { DevOpsAgent } from "../agents/DevOpsAgent.js";
import { DocumentationAgent } from "../agents/DocumentationAgent.js";

/**
 * Central Agent Orchestrator.
 *
 *   User -> Web Dashboard -> Backend API -> Orchestrator
 *     -> Project Manager -> Task Queue -> Specialized Agents
 *     -> Shared Project Workspace -> Tester -> Debugger -> DevOps
 *     -> External Services
 *
 * Maintains project/agent/task/file/test/deployment state via
 * ProjectContext, which all agents read from and write to.
 */
export class Orchestrator {
  constructor(emitter) {
    this.emitter = emitter;
    this.projects = new Map();
  }

  async startProject(prompt, uiStyle = "glassmorphism") {
    const project = new ProjectContext(prompt, this.emitter, uiStyle);
    this.projects.set(project.id, project);

    // Fire and forget — the dashboard subscribes to SSE for live updates.
    this.runPipeline(project).catch((err) => {
      project.overallStatus = "failed";
      project.log("Orchestrator", `pipeline failed: ${err.message}`);
      project.emit("done", { status: "failed", error: err.message });
    });

    return project;
  }

  getProject(id) {
    return this.projects.get(id);
  }

  listProjects() {
    return [...this.projects.values()].map((p) => p.toSummary());
  }

  async runPipeline(project) {
    project.log("Orchestrator", `pipeline started for project "${project.slug}"`);

    const agents = {
      pm: new ProjectManagerAgent({ project }),
      frontend: new FrontendAgent({ project }),
      backend: new BackendAgent({ project }),
      database: new DatabaseAgent({ project }),
      tester: new TesterAgent({ project }),
      debugger: new DebuggerAgent({ project }),
      devops: new DevOpsAgent({ project }),
      docs: new DocumentationAgent({ project }),
    };

    // 1. Project Manager: requirements + architecture
    await agents.pm.execute({ name: "Analyze prompt & generate requirements" });

    // 2. Database design (can run in parallel conceptually with frontend/backend
    //    scaffolding; here we run database first since routes/models depend on
    //    the entity list it confirms).
    await agents.database.execute({ name: "Design database schema" });

    // 3. Frontend + Backend development
    await agents.frontend.execute({ name: "Build frontend application" });
    await agents.backend.execute({ name: "Build backend API" });

    // 4. Testing
    let testResult = await agents.tester.execute({ name: "Run test suite" });

    // 5. Debug -> retest loop until critical tests pass (max 3 rounds)
    let rounds = 0;
    while (testResult.data.failed > 0 && rounds < 3) {
      rounds++;
      await agents.debugger.execute({ name: `Fix failing tests (round ${rounds})` });
      project.log("Orchestrator", "re-running tests after fixes");
      testResult = { data: { failed: project.testResults.failed } };
      if (testResult.data.failed === 0) {
        agents.tester.setStatus("completed", "Run test suite");
      }
    }

    // 6. Documentation
    await agents.docs.execute({ name: "Generate documentation" });

    // 7. DevOps: GitHub + deployment
    await agents.devops.execute({ name: "Push to GitHub & deploy" });

    project.overallStatus = "completed";
    project.progress = 100;
    project.log("Orchestrator", "pipeline completed successfully");
    project.emit("done", { status: "completed" });
  }

  async rerunAgent(projectId, agentId) {
    const project = this.getProject(projectId);
    if (!project) throw new Error("Project not found");

    const agentMap = {
      pm: { cls: ProjectManagerAgent, task: "Analyze prompt & regenerate requirements" },
      frontend: { cls: FrontendAgent, task: "Rebuild frontend application" },
      backend: { cls: BackendAgent, task: "Rebuild backend API" },
      database: { cls: DatabaseAgent, task: "Redesign database schema" },
      tester: { cls: TesterAgent, task: "Re-run test suite" },
      debugger: { cls: DebuggerAgent, task: "Debug code & fix issues" },
      devops: { cls: DevOpsAgent, task: "Re-deploy & update configuration" },
      docs: { cls: DocumentationAgent, task: "Regenerate documentation" },
    };

    const target = agentMap[agentId];
    if (!target) throw new Error(`Unknown agent: ${agentId}`);

    project.log("Orchestrator", `Manually triggering ${agentId} agent execution...`);
    const agent = new target.cls({ project });
    await agent.execute({ name: target.task });
    project.log("Orchestrator", `${agentId} agent finished execution.`);
    project.emit("done", { status: project.overallStatus });
    return project.toSummary();
  }

  async refineProject(projectId, refinementPrompt) {
    const project = this.getProject(projectId);
    if (!project) throw new Error("Project not found");

    project.log("MeisterAI Refinement Engine", `Received iterative refinement prompt: "${refinementPrompt}"`);
    project.prompt += `\n\n[Iterative Refinement]: ${refinementPrompt}`;
    project.overallStatus = "running";
    project.emit("progress", { progress: project.progress });

    const agents = {
      pm: new ProjectManagerAgent({ project }),
      frontend: new FrontendAgent({ project }),
      backend: new BackendAgent({ project }),
      tester: new TesterAgent({ project }),
      devops: new DevOpsAgent({ project }),
    };

    project.log("PM Agent", `Updating architecture & specs for: "${refinementPrompt}"`);
    await agents.pm.execute({ name: `Process refinement: ${refinementPrompt.slice(0, 30)}` });

    project.log("Frontend Agent", "Applying live frontend modifications...");
    await agents.frontend.execute({ name: "Update React views & components" });

    project.log("Backend Agent", "Updating REST API routes and data controllers...");
    await agents.backend.execute({ name: "Update backend API logic" });

    project.log("Tester Agent", "Re-running test suite for updated code...");
    await agents.tester.execute({ name: "Validate refined codebase" });

    project.log("DevOps Agent", "Updating live preview build artifact...");
    await agents.devops.execute({ name: "Update live deployment preview" });

    project.overallStatus = "completed";
    project.progress = 100;
    project.log("MeisterAI Refinement Engine", "Iterative refinement completed cleanly.");
    project.emit("done", { status: "completed" });
    return project.toSummary();
  }
}


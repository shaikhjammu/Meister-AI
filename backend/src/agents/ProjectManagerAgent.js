import { BaseAgent } from "./BaseAgent.js";
import { inferDomain } from "../generators/domainInference.js";

export class ProjectManagerAgent extends BaseAgent {
  constructor(opts) {
    super({ id: "pm", name: "Project Manager", icon: "🧠", ...opts });
  }

  async run(task) {
    const { prompt } = this.project;
    const domain = inferDomain(prompt);

    this.log(`analyzing prompt: "${prompt}"`);
    this.log(`identified application type: ${domain.appType}`);

    const requirements = {
      appType: domain.appType,
      roles: domain.roles,
      features: domain.features,
      entities: domain.entities,
      uiStyle: this.project.uiStyle || "glassmorphism",
    };

    const architecture = {
      pattern: "3-tier (frontend / backend / database)",
      frontend: `React + Tailwind CSS (${this.project.uiStyle || "Glassmorphism"} UI Style, SPA, REST client)`,
      backend: "Node.js + Express + TypeScript (REST API, JWT auth)",
      database: "MongoDB (document store)",
      auth: "JWT-based auth with role-based access control",
    };

    const techStack = {
      frontend: ["React", "TypeScript", "Tailwind CSS", "React Router", "Axios"],
      backend: ["Node.js", "Express", "TypeScript", "JWT", "bcrypt", "Zod"],
      database: ["MongoDB", "Mongoose"],
      testing: ["Jest", "Supertest"],
    };

    this.project.requirements = requirements;
    this.project.architecture = architecture;
    this.project.techStack = techStack;

    this.log(
      `requirements generated — roles: ${domain.roles.join(", ")}; features: ${domain.features.join(", ")}`
    );
    this.log(`architecture decided: ${architecture.pattern}, stack: React/Node/Mongo`);

    const nextTasks = [
      "design_database_schema",
      "build_frontend",
      "build_backend",
    ];

    return {
      summary: `Requirements and architecture generated for ${domain.appType}.`,
      next_tasks: nextTasks,
      data: { requirements, architecture, techStack, domain },
    };
  }
}

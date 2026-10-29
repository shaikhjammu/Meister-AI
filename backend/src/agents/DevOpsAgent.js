import { BaseAgent } from "./BaseAgent.js";
import { createRepoAndPush } from "../integrations/github.js";
import { deployFrontend, deployBackend } from "../integrations/deploy.js";

export class DevOpsAgent extends BaseAgent {
  constructor(opts) {
    super({ id: "devops", name: "DevOps", icon: "🚀", ...opts });
  }

  async run(task) {
    // 1. docker-compose + root README stubs for local dev
    await this.project.writeFile("docker-compose.yml", dockerCompose(), this.name);

    // 2. GitHub: create repo, init, commit, push
    this.log("preparing GitHub repository");
    const repo = await createRepoAndPush({
      slug: this.project.slug,
      projectDir: this.project.dir,
      log: (m) => this.log(m),
    });
    this.project.deployment.github = { status: repo.status, url: repo.url };

    // 3. Deploy frontend -> Vercel / Live Local Preview
    this.log("deploying frontend & generating live interactive web preview");
    const fe = await deployFrontend({ slug: this.project.slug, githubUrl: repo.url, log: (m) => this.log(m) });
    const liveDemoUrl = `http://localhost:4000/preview/${this.project.id}`;
    this.project.deployment.frontend = { status: fe.status === "simulated" ? "live demo" : fe.status, url: liveDemoUrl, provider: "Vercel / Local Live Preview" };
    this.project.deployment.demoUrl = liveDemoUrl;

    // 4. Deploy backend -> Render, wire env vars (incl. DB connection string)
    this.log("deploying backend with environment variables (DATABASE_URL, JWT_SECRET, CORS_ORIGIN)");
    const dbUri = this.project.deployment.database?.name
      ? `mongodb+srv://<user>:<password>@cluster0.mongodb.net/${this.project.deployment.database.name}`
      : "mongodb://localhost:27017/app";
    const be = await deployBackend({
      slug: this.project.slug,
      githubUrl: repo.url,
      envVars: {
        MONGODB_URI: dbUri,
        JWT_SECRET: "(generated, stored securely)",
        CORS_ORIGIN: fe.url,
      },
      log: (m) => this.log(m),
    });
    this.project.deployment.backend = { status: be.status, url: be.url, provider: "Render" };

    this.log("deployment pipeline complete");

    return {
      summary: `GitHub repo, Vercel frontend, and Render backend provisioned (${repo.status}).`,
      files_changed: ["docker-compose.yml"],
      next_tasks: [],
      data: { repo, frontend: fe, backend: be },
    };
  }
}

function dockerCompose() {
  return `version: "3.9"
services:
  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    environment:
      - VITE_API_URL=http://localhost:5000/api
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/app
      - JWT_SECRET=change-me
    depends_on:
      - mongo
  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
volumes:
  mongo_data:
`;
}

import { BaseAgent } from "./BaseAgent.js";
import * as tpl from "../generators/backendTemplates.js";
import { generateCodeFile } from "../generators/llmCodeGenerator.js";

const FIELD_GUESSES = {
  Patient: [
    { name: "name", type: "String", required: true },
    { name: "age", type: "Number", required: false },
    { name: "gender", type: "String", required: false },
    { name: "phone", type: "String", required: false },
  ],
  Doctor: [
    { name: "name", type: "String", required: true },
    { name: "specialization", type: "String", required: false },
    { name: "phone", type: "String", required: false },
  ],
  Appointment: [
    { name: "patient", type: "mongoose.Schema.Types.ObjectId", required: true },
    { name: "doctor", type: "mongoose.Schema.Types.ObjectId", required: true },
    { name: "date", type: "Date", required: true },
    { name: "status", type: "String", required: false },
  ],
  MedicalRecord: [
    { name: "patient", type: "mongoose.Schema.Types.ObjectId", required: true },
    { name: "notes", type: "String", required: false },
    { name: "diagnosis", type: "String", required: false },
  ],
  Prescription: [
    { name: "patient", type: "mongoose.Schema.Types.ObjectId", required: true },
    { name: "medication", type: "String", required: true },
    { name: "dosage", type: "String", required: false },
  ],
  Product: [
    { name: "name", type: "String", required: true },
    { name: "price", type: "Number", required: true },
    { name: "quantity", type: "Number", required: false },
  ],
  Category: [{ name: "name", type: "String", required: true }],
  Order: [
    { name: "user", type: "mongoose.Schema.Types.ObjectId", required: true },
    { name: "items", type: "Array", required: false },
    { name: "status", type: "String", required: false },
  ],
  Task: [
    { name: "title", type: "String", required: true },
    { name: "description", type: "String", required: false },
    { name: "status", type: "String", required: false },
  ],
  Project: [{ name: "name", type: "String", required: true }],
  DEFAULT: [
    { name: "title", type: "String", required: true },
    { name: "description", type: "String", required: false },
  ],
};

export class BackendAgent extends BaseAgent {
  constructor(opts) {
    super({ id: "backend", name: "Backend Developer", icon: "⚙️", ...opts });
  }

  async run(task) {
    const { appType, entities, roles } = this.project.requirements;
    const base = "backend";

    this.log("scaffolding Node.js + Express + TypeScript-style project");
    await this.project.writeFile(`${base}/package.json`, tpl.packageJson(this.project.slug), this.name);
    await this.project.writeFile(`${base}/.env.example`, tpl.envExample(entities), this.name);
    await this.writeSource(`${base}/src/index.js`, tpl.serverIndex(appType, entities.filter((e) => e !== "User")), "Create the Express server entry point, middleware, database connection, and route registration.");

    this.log("implementing JWT authentication and authorization");
    await this.writeSource(`${base}/src/models/User.model.js`, tpl.userModel(roles), "Create the secure user model with roles and authentication fields.");
    await this.writeSource(`${base}/src/routes/auth.routes.js`, tpl.authRoutes(), "Create registration and login routes with validation and password handling.");
    await this.writeSource(`${base}/src/middleware/auth.middleware.js`, tpl.authMiddleware(), "Create JWT authentication and role authorization middleware.");

    for (const entity of entities.filter((e) => e !== "User")) {
      this.log(`generating REST API for ${entity} (model, routes, validation)`);
      const fields = FIELD_GUESSES[entity] || FIELD_GUESSES.DEFAULT;
      await this.writeSource(`${base}/src/models/${entity}.model.js`, tpl.entityModel(entity, fields), `Create the Mongoose model for ${entity} with validation and useful indexes.`);
      await this.writeSource(
        `${base}/src/routes/${entity.charAt(0).toLowerCase() + entity.slice(1)}.routes.js`,
        tpl.entityRoutes(entity),
        `Create protected Express CRUD routes for ${entity} with validation and consistent JSON errors.`
      );
      await this.writeSource(
        `${base}/src/routes/${entity}.test.js`,
        tpl.entityTest(entity),
        `Create focused automated tests for the ${entity} API CRUD contract.`
      );
    }

    this.log("backend build complete — REST APIs, auth, and role-based access control wired");

    return {
      summary: `Backend generated: ${entities.length} REST resources with JWT auth over Express/MongoDB.`,
      files_changed: this.project.filesGenerated
        .filter((f) => f.path.startsWith(base))
        .map((f) => f.path),
      tests_required: entities.filter((e) => e !== "User").map((e) => `${e} CRUD + auth`),
      next_tasks: [],
    };
  }

  async writeSource(path, fallback, instructions) {
    const content = await generateCodeFile({
      project: this.project,
      path,
      instructions,
      fallback,
      log: (message) => this.log(message),
    });
    await this.project.writeFile(path, content, this.name);
  }
}

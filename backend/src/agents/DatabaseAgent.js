import { BaseAgent } from "./BaseAgent.js";
import { provisionDatabase } from "../integrations/mongodb.js";

export class DatabaseAgent extends BaseAgent {
  constructor(opts) {
    super({ id: "database", name: "Database Agent", icon: "🗄️", ...opts });
  }

  async run(task) {
    const { entities } = this.project.requirements;

    this.log(`designing schema for ${entities.length} entities: ${entities.join(", ")}`);
    this.log("defining relationships (references between Appointment/MedicalRecord and Patient/Doctor-style entities)");
    this.log("planning indexes on lookup fields (email, foreign-key references, createdAt)");

    const result = await provisionDatabase({
      provider: "mongodb",
      projectSlug: this.project.slug,
      log: (m) => this.log(m),
    });

    this.project.deployment.database = {
      status: result.status,
      provider: "MongoDB Atlas",
      name: result.databaseName,
      connectionUriEnvVar: "MONGODB_URI",
    };

    await this.project.writeFile(
      "database/schema.md",
      renderSchemaDoc(entities),
      this.name
    );

    return {
      summary: `Database schema designed for ${entities.length} entities. Provider: MongoDB Atlas (${result.status}).`,
      files_changed: ["database/schema.md"],
      next_tasks: [],
      data: result,
    };
  }
}

function renderSchemaDoc(entities) {
  return `# Database Schema

Provider: MongoDB (Mongoose ODM)

## Collections

${entities.map((e) => `### ${e}\nSee \`backend/src/models/${e}.model.js\` for the generated schema.`).join("\n\n")}

## Notes
- All collections include \`createdAt\`/\`updatedAt\` timestamps.
- Cross-entity references use \`mongoose.Schema.Types.ObjectId\`.
- Indexes: unique index on \`User.email\`; consider adding indexes on any
  frequently-queried foreign key fields as the app scales.
`;
}

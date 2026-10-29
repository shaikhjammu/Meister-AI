import { BaseAgent } from "./BaseAgent.js";

export class DocumentationAgent extends BaseAgent {
  constructor(opts) {
    super({ id: "docs", name: "Documentation Writer", icon: "📚", ...opts });
  }

  async run(task) {
    const { appType, roles, features, entities } = this.project.requirements;
    const dep = this.project.deployment;

    await this.project.writeFile("README.md", readme({ appType, roles, features, entities, dep, prompt: this.project.prompt }), this.name);
    await this.project.writeFile("docs/API.md", apiDocs(entities.filter((e) => e !== "User")), this.name);
    await this.project.writeFile("docs/ENVIRONMENT.md", envDocs(), this.name);
    await this.project.writeFile("docs/ARCHITECTURE.md", archDocs(this.project.architecture, this.project.techStack), this.name);

    this.log("generated README, API docs, environment docs, and architecture docs");

    return {
      summary: "Full documentation set generated.",
      files_changed: ["README.md", "docs/API.md", "docs/ENVIRONMENT.md", "docs/ARCHITECTURE.md"],
      next_tasks: [],
    };
  }
}

function readme({ appType, roles, features, entities, dep, prompt }) {
  return `# ${appType}

> Generated automatically from the prompt: "${prompt}"

## Roles
${roles.map((r) => `- ${r}`).join("\n")}

## Features
${features.map((f) => `- ${f}`).join("\n")}

## Tech Stack
- Frontend: React, TypeScript-style, Tailwind CSS
- Backend: Node.js, Express, MongoDB (Mongoose)
- Auth: JWT

## Getting Started

\`\`\`bash
# Backend
cd backend
npm install
cp .env.example .env
npm run dev

# Frontend (in a new terminal)
cd frontend
npm install
npm run dev
\`\`\`

Or with Docker:
\`\`\`bash
docker-compose up --build
\`\`\`

## Testing
\`\`\`bash
cd backend
npm test
\`\`\`

## Deployment
- GitHub: ${dep.github.url || "not connected"} (${dep.github.status})
- Frontend: ${dep.frontend.url || "not deployed"} (${dep.frontend.status})
- Backend: ${dep.backend.url || "not deployed"} (${dep.backend.status})
- Database: ${dep.database.provider} (${dep.database.status})

See \`docs/API.md\`, \`docs/ENVIRONMENT.md\`, and \`docs/ARCHITECTURE.md\` for details.
`;
}

function apiDocs(entities) {
  const sections = entities
    .map(
      (e) => `### ${e}
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | /api/${lower(e)}s | Yes | List all ${lower(e)}s |
| GET | /api/${lower(e)}s/:id | Yes | Get one ${lower(e)} |
| POST | /api/${lower(e)}s | Yes | Create a ${lower(e)} |
| PUT | /api/${lower(e)}s/:id | Yes | Update a ${lower(e)} |
| DELETE | /api/${lower(e)}s/:id | Yes | Delete a ${lower(e)} |
`
    )
    .join("\n");

  return `# API Documentation

Base URL: \`/api\`

## Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Log in, returns JWT |

All resource endpoints below require \`Authorization: Bearer <token>\`.

${sections}
`;
}

function envDocs() {
  return `# Environment Variables

## Backend (\`backend/.env\`)
| Variable | Description |
|---|---|
| PORT | Port the API listens on |
| MONGODB_URI | MongoDB connection string |
| JWT_SECRET | Secret used to sign auth tokens |
| CORS_ORIGIN | Allowed frontend origin |

## Frontend (\`frontend/.env\`)
| Variable | Description |
|---|---|
| VITE_API_URL | URL of the backend API |

Never commit \`.env\` files — only \`.env.example\` is tracked in git.
`;
}

function archDocs(architecture, techStack) {
  return `# Architecture

Pattern: ${architecture.pattern}

- **Frontend**: ${architecture.frontend}
- **Backend**: ${architecture.backend}
- **Database**: ${architecture.database}
- **Auth**: ${architecture.auth}

## Tech Stack
${Object.entries(techStack)
  .map(([k, v]) => `- **${k}**: ${v.join(", ")}`)
  .join("\n")}
`;
}

function lower(s) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

import { BaseAgent } from "./BaseAgent.js";
import * as tpl from "../generators/frontendTemplates.js";
import { generateCodeFile } from "../generators/llmCodeGenerator.js";

export class FrontendAgent extends BaseAgent {
  constructor(opts) {
    super({ id: "frontend", name: "Frontend Developer", icon: "🎨", ...opts });
  }

  async run(task) {
    const { requirements, slug } = { ...this.project, slug: this.project.slug };
    const { appType, entities, features } = this.project.requirements;
    const base = "frontend";

    this.log("scaffolding React + TypeScript + Tailwind project");
    await this.project.writeFile(`${base}/package.json`, tpl.packageJson(this.project.slug), this.name);
    await this.project.writeFile(`${base}/vite.config.js`, tpl.viteConfig(), this.name);
    await this.project.writeFile(`${base}/tailwind.config.js`, tpl.tailwindConfig(), this.name);
    await this.project.writeFile(`${base}/index.html`, tpl.indexHtml(appType), this.name);
    await this.writeSource(`${base}/src/main.jsx`, tpl.mainJsx(), "Create the React entry point and mount the application.");
    await this.writeSource(`${base}/src/index.css`, tpl.indexCss(), "Create the responsive visual design system and global styles.");
    await this.writeSource(`${base}/src/lib/api.js`, tpl.apiClient(), "Create the API client with robust request and error handling.");

    this.log("building pages and navigation");
    await this.writeSource(`${base}/src/pages/LoginPage.jsx`, tpl.loginPage(), "Create the responsive authentication page with validation and accessible form states.");
    await this.writeSource(
      `${base}/src/pages/DashboardPage.jsx`,
      tpl.dashboardPage(appType, features),
      "Create the main responsive dashboard with the requested domain features and API integration."
    );

    for (const entity of entities.filter((e) => e !== "User")) {
      this.log(`creating ${entity} page + API integration`);
      await this.writeSource(
        `${base}/src/pages/${entity}Page.jsx`,
        tpl.entityPage(entity),
        `Create a complete CRUD page for the ${entity} entity with loading, empty, validation, and error states.`
      );
    }

    await this.writeSource(
      `${base}/src/App.jsx`,
      tpl.appJsx(appType, entities.filter((e) => e !== "User")),
      "Create the application shell, routing/navigation, and composition of all generated pages."
    );

    this.log("frontend build complete — responsive UI with loading/error states wired to API");

    return {
      summary: `Frontend generated: ${entities.length} entity pages, auth flow, responsive dashboard.`,
      files_changed: this.project.filesGenerated
        .filter((f) => f.path.startsWith(base))
        .map((f) => f.path),
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

/**
 * All agents extend this. Each agent receives a shared `ProjectContext`
 * and must return a structured result:
 * { status, task, summary, files_changed, tests_required, next_tasks }
 */
export class BaseAgent {
  constructor({ id, name, icon, project }) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.project = project; // shared ProjectContext
  }

  log(message) {
    this.project.log(this.name, message);
  }

  setStatus(status, currentTask = null) {
    this.project.setAgentStatus(this.id, status, currentTask);
  }

  // Override in subclasses
  async run(_task) {
    throw new Error(`${this.name} did not implement run()`);
  }

  async execute(task) {
    this.setStatus("running", task.name);
    this.log(`started: ${task.name}`);
    try {
      const result = await this.run(task);
      this.setStatus("completed", task.name);
      this.log(`completed: ${task.name}`);
      return {
        status: "completed",
        task: task.name,
        summary: result.summary || "",
        files_changed: result.files_changed || [],
        tests_required: result.tests_required || [],
        next_tasks: result.next_tasks || [],
        data: result.data || {},
      };
    } catch (err) {
      this.setStatus("failed", task.name);
      this.log(`FAILED: ${task.name} — ${err.message}`);
      throw err;
    }
  }
}

/**
 * Minimal in-memory task queue with dependency tracking.
 * A task is: { id, agent, name, dependsOn: [taskId], status, input, output }
 */
export class TaskQueue {
  constructor() {
    this.tasks = new Map();
  }

  add(task) {
    this.tasks.set(task.id, { status: "pending", output: null, ...task });
    return task.id;
  }

  isReady(taskId) {
    const task = this.tasks.get(taskId);
    if (!task) return false;
    return task.dependsOn.every(
      (depId) => this.tasks.get(depId)?.status === "completed"
    );
  }

  nextReadyTask() {
    for (const task of this.tasks.values()) {
      if (task.status === "pending" && this.isReady(task.id)) return task;
    }
    return null;
  }

  markRunning(id) {
    this.tasks.get(id).status = "running";
  }

  markCompleted(id, output) {
    const t = this.tasks.get(id);
    t.status = "completed";
    t.output = output;
  }

  markFailed(id, error) {
    const t = this.tasks.get(id);
    t.status = "failed";
    t.error = error;
  }

  allSettled() {
    return [...this.tasks.values()].every((t) =>
      ["completed", "failed", "skipped"].includes(t.status)
    );
  }

  anyFailed() {
    return [...this.tasks.values()].some((t) => t.status === "failed");
  }

  toJSON() {
    return [...this.tasks.values()];
  }
}

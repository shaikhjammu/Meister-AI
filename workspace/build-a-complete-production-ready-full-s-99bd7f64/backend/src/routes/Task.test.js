import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the Task API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("Task model file exists and exports a model", async () => {
  const mod = await import("../models/Task.model.js");
  assert.ok(mod.Task, "Task model should be exported");
});

test("Task routes module exports an Express router", async () => {
  const mod = await import("../routes/task.routes.js");
  assert.ok(mod.default, "Task router should be the default export");
});

import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the Project API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("Project model file exists and exports a model", async () => {
  const mod = await import("../models/Project.model.js");
  assert.ok(mod.Project, "Project model should be exported");
});

test("Project routes module exports an Express router", async () => {
  const mod = await import("../routes/project.routes.js");
  assert.ok(mod.default, "Project router should be the default export");
});

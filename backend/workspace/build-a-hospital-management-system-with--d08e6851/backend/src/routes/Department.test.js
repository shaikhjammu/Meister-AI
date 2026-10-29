import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the Department API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("Department model file exists and exports a model", async () => {
  const mod = await import("../models/Department.model.js");
  assert.ok(mod.Department, "Department model should be exported");
});

test("Department routes module exports an Express router", async () => {
  const mod = await import("../routes/department.routes.js");
  assert.ok(mod.default, "Department router should be the default export");
});

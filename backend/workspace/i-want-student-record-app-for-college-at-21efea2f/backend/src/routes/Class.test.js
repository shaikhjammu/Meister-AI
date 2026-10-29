import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the Class API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("Class model file exists and exports a model", async () => {
  const mod = await import("../models/Class.model.js");
  assert.ok(mod.Class, "Class model should be exported");
});

test("Class routes module exports an Express router", async () => {
  const mod = await import("../routes/class.routes.js");
  assert.ok(mod.default, "Class router should be the default export");
});

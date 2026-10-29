import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the Teacher API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("Teacher model file exists and exports a model", async () => {
  const mod = await import("../models/Teacher.model.js");
  assert.ok(mod.Teacher, "Teacher model should be exported");
});

test("Teacher routes module exports an Express router", async () => {
  const mod = await import("../routes/teacher.routes.js");
  assert.ok(mod.default, "Teacher router should be the default export");
});

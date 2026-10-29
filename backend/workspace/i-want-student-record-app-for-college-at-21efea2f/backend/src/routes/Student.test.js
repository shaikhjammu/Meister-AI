import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the Student API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("Student model file exists and exports a model", async () => {
  const mod = await import("../models/Student.model.js");
  assert.ok(mod.Student, "Student model should be exported");
});

test("Student routes module exports an Express router", async () => {
  const mod = await import("../routes/student.routes.js");
  assert.ok(mod.default, "Student router should be the default export");
});

import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the Grade API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("Grade model file exists and exports a model", async () => {
  const mod = await import("../models/Grade.model.js");
  assert.ok(mod.Grade, "Grade model should be exported");
});

test("Grade routes module exports an Express router", async () => {
  const mod = await import("../routes/grade.routes.js");
  assert.ok(mod.default, "Grade router should be the default export");
});

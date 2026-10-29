import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the Exercise API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("Exercise model file exists and exports a model", async () => {
  const mod = await import("../models/Exercise.model.js");
  assert.ok(mod.Exercise, "Exercise model should be exported");
});

test("Exercise routes module exports an Express router", async () => {
  const mod = await import("../routes/exercise.routes.js");
  assert.ok(mod.default, "Exercise router should be the default export");
});

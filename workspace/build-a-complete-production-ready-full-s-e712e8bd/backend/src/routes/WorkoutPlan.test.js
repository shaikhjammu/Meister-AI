import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the WorkoutPlan API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("WorkoutPlan model file exists and exports a model", async () => {
  const mod = await import("../models/WorkoutPlan.model.js");
  assert.ok(mod.WorkoutPlan, "WorkoutPlan model should be exported");
});

test("WorkoutPlan routes module exports an Express router", async () => {
  const mod = await import("../routes/workoutPlan.routes.js");
  assert.ok(mod.default, "WorkoutPlan router should be the default export");
});

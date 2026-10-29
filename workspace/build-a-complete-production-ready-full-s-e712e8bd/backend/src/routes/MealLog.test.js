import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the MealLog API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("MealLog model file exists and exports a model", async () => {
  const mod = await import("../models/MealLog.model.js");
  assert.ok(mod.MealLog, "MealLog model should be exported");
});

test("MealLog routes module exports an Express router", async () => {
  const mod = await import("../routes/mealLog.routes.js");
  assert.ok(mod.default, "MealLog router should be the default export");
});

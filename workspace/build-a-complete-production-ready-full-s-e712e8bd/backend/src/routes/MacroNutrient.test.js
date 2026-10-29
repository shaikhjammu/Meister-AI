import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the MacroNutrient API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("MacroNutrient model file exists and exports a model", async () => {
  const mod = await import("../models/MacroNutrient.model.js");
  assert.ok(mod.MacroNutrient, "MacroNutrient model should be exported");
});

test("MacroNutrient routes module exports an Express router", async () => {
  const mod = await import("../routes/macroNutrient.routes.js");
  assert.ok(mod.default, "MacroNutrient router should be the default export");
});

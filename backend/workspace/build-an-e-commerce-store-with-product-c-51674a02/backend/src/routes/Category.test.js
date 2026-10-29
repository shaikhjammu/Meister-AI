import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the Category API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("Category model file exists and exports a model", async () => {
  const mod = await import("../models/Category.model.js");
  assert.ok(mod.Category, "Category model should be exported");
});

test("Category routes module exports an Express router", async () => {
  const mod = await import("../routes/category.routes.js");
  assert.ok(mod.default, "Category router should be the default export");
});

import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the Item API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("Item model file exists and exports a model", async () => {
  const mod = await import("../models/Item.model.js");
  assert.ok(mod.Item, "Item model should be exported");
});

test("Item routes module exports an Express router", async () => {
  const mod = await import("../routes/item.routes.js");
  assert.ok(mod.default, "Item router should be the default export");
});

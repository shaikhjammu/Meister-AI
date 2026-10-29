import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the Order API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("Order model file exists and exports a model", async () => {
  const mod = await import("../models/Order.model.js");
  assert.ok(mod.Order, "Order model should be exported");
});

test("Order routes module exports an Express router", async () => {
  const mod = await import("../routes/order.routes.js");
  assert.ok(mod.default, "Order router should be the default export");
});

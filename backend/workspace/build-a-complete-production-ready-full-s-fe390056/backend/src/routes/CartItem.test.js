import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the CartItem API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("CartItem model file exists and exports a model", async () => {
  const mod = await import("../models/CartItem.model.js");
  assert.ok(mod.CartItem, "CartItem model should be exported");
});

test("CartItem routes module exports an Express router", async () => {
  const mod = await import("../routes/cartItem.routes.js");
  assert.ok(mod.default, "CartItem router should be the default export");
});

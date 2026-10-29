import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the Product API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("Product model file exists and exports a model", async () => {
  const mod = await import("../models/Product.model.js");
  assert.ok(mod.Product, "Product model should be exported");
});

test("Product routes module exports an Express router", async () => {
  const mod = await import("../routes/product.routes.js");
  assert.ok(mod.default, "Product router should be the default export");
});

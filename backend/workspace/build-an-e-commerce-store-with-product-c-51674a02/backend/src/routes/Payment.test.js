import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the Payment API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("Payment model file exists and exports a model", async () => {
  const mod = await import("../models/Payment.model.js");
  assert.ok(mod.Payment, "Payment model should be exported");
});

test("Payment routes module exports an Express router", async () => {
  const mod = await import("../routes/payment.routes.js");
  assert.ok(mod.default, "Payment router should be the default export");
});

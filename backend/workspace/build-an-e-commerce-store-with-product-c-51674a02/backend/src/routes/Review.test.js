import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the Review API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("Review model file exists and exports a model", async () => {
  const mod = await import("../models/Review.model.js");
  assert.ok(mod.Review, "Review model should be exported");
});

test("Review routes module exports an Express router", async () => {
  const mod = await import("../routes/review.routes.js");
  assert.ok(mod.default, "Review router should be the default export");
});

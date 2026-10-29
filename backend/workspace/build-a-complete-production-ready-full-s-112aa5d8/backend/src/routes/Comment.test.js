import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the Comment API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("Comment model file exists and exports a model", async () => {
  const mod = await import("../models/Comment.model.js");
  assert.ok(mod.Comment, "Comment model should be exported");
});

test("Comment routes module exports an Express router", async () => {
  const mod = await import("../routes/comment.routes.js");
  assert.ok(mod.default, "Comment router should be the default export");
});

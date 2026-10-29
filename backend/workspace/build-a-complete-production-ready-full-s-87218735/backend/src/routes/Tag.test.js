import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the Tag API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("Tag model file exists and exports a model", async () => {
  const mod = await import("../models/Tag.model.js");
  assert.ok(mod.Tag, "Tag model should be exported");
});

test("Tag routes module exports an Express router", async () => {
  const mod = await import("../routes/tag.routes.js");
  assert.ok(mod.default, "Tag router should be the default export");
});

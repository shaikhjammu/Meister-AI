import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the ProgressRecord API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("ProgressRecord model file exists and exports a model", async () => {
  const mod = await import("../models/ProgressRecord.model.js");
  assert.ok(mod.ProgressRecord, "ProgressRecord model should be exported");
});

test("ProgressRecord routes module exports an Express router", async () => {
  const mod = await import("../routes/progressRecord.routes.js");
  assert.ok(mod.default, "ProgressRecord router should be the default export");
});

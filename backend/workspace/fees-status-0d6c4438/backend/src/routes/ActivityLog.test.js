import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the ActivityLog API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("ActivityLog model file exists and exports a model", async () => {
  const mod = await import("../models/ActivityLog.model.js");
  assert.ok(mod.ActivityLog, "ActivityLog model should be exported");
});

test("ActivityLog routes module exports an Express router", async () => {
  const mod = await import("../routes/activityLog.routes.js");
  assert.ok(mod.default, "ActivityLog router should be the default export");
});

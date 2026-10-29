import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the Activity API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("Activity model file exists and exports a model", async () => {
  const mod = await import("../models/Activity.model.js");
  assert.ok(mod.Activity, "Activity model should be exported");
});

test("Activity routes module exports an Express router", async () => {
  const mod = await import("../routes/activity.routes.js");
  assert.ok(mod.default, "Activity router should be the default export");
});

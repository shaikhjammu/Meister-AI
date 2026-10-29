import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the Record API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("Record model file exists and exports a model", async () => {
  const mod = await import("../models/Record.model.js");
  assert.ok(mod.Record, "Record model should be exported");
});

test("Record routes module exports an Express router", async () => {
  const mod = await import("../routes/record.routes.js");
  assert.ok(mod.default, "Record router should be the default export");
});

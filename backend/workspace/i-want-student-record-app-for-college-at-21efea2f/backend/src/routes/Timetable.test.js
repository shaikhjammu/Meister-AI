import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the Timetable API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("Timetable model file exists and exports a model", async () => {
  const mod = await import("../models/Timetable.model.js");
  assert.ok(mod.Timetable, "Timetable model should be exported");
});

test("Timetable routes module exports an Express router", async () => {
  const mod = await import("../routes/timetable.routes.js");
  assert.ok(mod.default, "Timetable router should be the default export");
});

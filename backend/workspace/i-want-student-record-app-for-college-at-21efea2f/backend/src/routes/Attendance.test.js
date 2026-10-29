import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the Attendance API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("Attendance model file exists and exports a model", async () => {
  const mod = await import("../models/Attendance.model.js");
  assert.ok(mod.Attendance, "Attendance model should be exported");
});

test("Attendance routes module exports an Express router", async () => {
  const mod = await import("../routes/attendance.routes.js");
  assert.ok(mod.default, "Attendance router should be the default export");
});

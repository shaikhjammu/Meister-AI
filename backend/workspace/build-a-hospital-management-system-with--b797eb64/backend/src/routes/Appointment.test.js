import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the Appointment API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("Appointment model file exists and exports a model", async () => {
  const mod = await import("../models/Appointment.model.js");
  assert.ok(mod.Appointment, "Appointment model should be exported");
});

test("Appointment routes module exports an Express router", async () => {
  const mod = await import("../routes/appointment.routes.js");
  assert.ok(mod.default, "Appointment router should be the default export");
});

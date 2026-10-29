import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the Doctor API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("Doctor model file exists and exports a model", async () => {
  const mod = await import("../models/Doctor.model.js");
  assert.ok(mod.Doctor, "Doctor model should be exported");
});

test("Doctor routes module exports an Express router", async () => {
  const mod = await import("../routes/doctor.routes.js");
  assert.ok(mod.default, "Doctor router should be the default export");
});

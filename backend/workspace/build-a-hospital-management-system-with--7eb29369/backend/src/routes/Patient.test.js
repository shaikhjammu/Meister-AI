import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the Patient API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("Patient model file exists and exports a model", async () => {
  const mod = await import("../models/Patient.model.js");
  assert.ok(mod.Patient, "Patient model should be exported");
});

test("Patient routes module exports an Express router", async () => {
  const mod = await import("../routes/patient.routes.js");
  assert.ok(mod.default, "Patient router should be the default export");
});

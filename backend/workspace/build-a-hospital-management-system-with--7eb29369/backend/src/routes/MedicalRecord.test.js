import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the MedicalRecord API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("MedicalRecord model file exists and exports a model", async () => {
  const mod = await import("../models/MedicalRecord.model.js");
  assert.ok(mod.MedicalRecord, "MedicalRecord model should be exported");
});

test("MedicalRecord routes module exports an Express router", async () => {
  const mod = await import("../routes/medicalRecord.routes.js");
  assert.ok(mod.default, "MedicalRecord router should be the default export");
});

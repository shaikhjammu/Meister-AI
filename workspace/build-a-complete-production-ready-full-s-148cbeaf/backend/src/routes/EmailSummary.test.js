import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the EmailSummary API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("EmailSummary model file exists and exports a model", async () => {
  const mod = await import("../models/EmailSummary.model.js");
  assert.ok(mod.EmailSummary, "EmailSummary model should be exported");
});

test("EmailSummary routes module exports an Express router", async () => {
  const mod = await import("../routes/emailSummary.routes.js");
  assert.ok(mod.default, "EmailSummary router should be the default export");
});

import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the Report API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("Report model file exists and exports a model", async () => {
  const mod = await import("../models/Report.model.js");
  assert.ok(mod.Report, "Report model should be exported");
});

test("Report routes module exports an Express router", async () => {
  const mod = await import("../routes/report.routes.js");
  assert.ok(mod.default, "Report router should be the default export");
});

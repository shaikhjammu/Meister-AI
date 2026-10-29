import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the FileOrganizer API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("FileOrganizer model file exists and exports a model", async () => {
  const mod = await import("../models/FileOrganizer.model.js");
  assert.ok(mod.FileOrganizer, "FileOrganizer model should be exported");
});

test("FileOrganizer routes module exports an Express router", async () => {
  const mod = await import("../routes/fileOrganizer.routes.js");
  assert.ok(mod.default, "FileOrganizer router should be the default export");
});

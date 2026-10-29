import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the BoardColumn API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("BoardColumn model file exists and exports a model", async () => {
  const mod = await import("../models/BoardColumn.model.js");
  assert.ok(mod.BoardColumn, "BoardColumn model should be exported");
});

test("BoardColumn routes module exports an Express router", async () => {
  const mod = await import("../routes/boardColumn.routes.js");
  assert.ok(mod.default, "BoardColumn router should be the default export");
});

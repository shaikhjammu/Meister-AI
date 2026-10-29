import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the CodeSnippet API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("CodeSnippet model file exists and exports a model", async () => {
  const mod = await import("../models/CodeSnippet.model.js");
  assert.ok(mod.CodeSnippet, "CodeSnippet model should be exported");
});

test("CodeSnippet routes module exports an Express router", async () => {
  const mod = await import("../routes/codeSnippet.routes.js");
  assert.ok(mod.default, "CodeSnippet router should be the default export");
});

import test from "node:test";
import assert from "node:assert";

// Basic smoke tests for the VoiceCommand API contract.
// Run with: npm test (requires a running MongoDB instance for full integration).

test("VoiceCommand model file exists and exports a model", async () => {
  const mod = await import("../models/VoiceCommand.model.js");
  assert.ok(mod.VoiceCommand, "VoiceCommand model should be exported");
});

test("VoiceCommand routes module exports an Express router", async () => {
  const mod = await import("../routes/voiceCommand.routes.js");
  assert.ok(mod.default, "VoiceCommand router should be the default export");
});

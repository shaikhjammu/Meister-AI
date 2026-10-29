import { callLLMForCode, hasLLM } from "../integrations/llmClient.js";

const SYSTEM_PROMPT = `You are a senior production software engineer generating one file for a full-stack application.
Write complete, runnable code that matches the requested framework and file path.
Use the project requirements and existing architecture. Keep imports valid, avoid placeholders, and implement the requested behavior.
Return only source code.`;

export async function generateCodeFile({ project, path, instructions, fallback, log, maxTokens = 7000 }) {
  if (!hasLLM()) return fallback;

  try {
    log(`LLM generating ${path}`);
    const code = await callLLMForCode(
      SYSTEM_PROMPT,
      [
        `File path: ${path}`,
        `Original user prompt: ${project.prompt}`,
        `UI style: ${project.uiStyle}`,
        `Requirements: ${JSON.stringify(project.requirements)}`,
        `Architecture: ${JSON.stringify(project.architecture || {})}`,
        `Task: ${instructions}`,
      ].join("\n\n"),
      { maxTokens }
    );
    if (!code) throw new Error("LLM returned empty source code");
    log(`LLM generated ${path}`);
    return code;
  } catch (error) {
    log(`LLM generation failed for ${path}; using deterministic fallback`);
    return fallback;
  }
}

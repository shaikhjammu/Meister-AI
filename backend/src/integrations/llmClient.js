/**
 * Gemini LLM client used by the code-writing agents.
 * Deterministic generators remain the fallback when no API key is configured.
 */

const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export function hasLLM() {
  return Boolean(process.env.GEMINI_API_KEY);
}

export async function callLLM(systemPrompt, userPrompt, { maxTokens = 4000 } = {}) {
  if (!hasLLM()) {
    throw new Error("GEMINI_API_KEY not set - no LLM available");
  }

  const res = await fetch(`${GEMINI_URL}?key=${encodeURIComponent(process.env.GEMINI_API_KEY)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig: { maxOutputTokens: maxTokens },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${body}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.find((part) => part.text)?.text;
  if (!text) throw new Error("No text content in Gemini response");
  return text;
}

export async function callLLMForCode(systemPrompt, userPrompt, opts) {
  const raw = await callLLM(
    `${systemPrompt}\n\nRespond with ONLY the raw source code for the file. No markdown code fences, no explanation, no commentary.`,
    userPrompt,
    opts
  );

  return raw
    .replace(/^```[a-z]*\s*/i, "")
    .replace(/```\s*$/, "")
    .trim();
}

export async function callLLMForJSON(systemPrompt, userPrompt, opts) {
  const raw = await callLLM(
    `${systemPrompt}\n\nRespond with ONLY valid JSON. No markdown, no code fences, no commentary before or after.`,
    userPrompt,
    opts
  );
  const cleaned = raw.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();
  return JSON.parse(cleaned);
}

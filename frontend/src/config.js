// Configurable API base URL with smart fallback for hosted environments
export const getApiBase = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, "");
  }

  const isHosted =
    typeof window !== "undefined" &&
    (window.location.hostname.includes("web.app") ||
      window.location.hostname.includes("firebaseapp.com") ||
      (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1"));

  // In production hosting (e.g. Firebase), connect to http://localhost:4000/api by default unless VITE_API_URL is set
  return isHosted ? "http://localhost:4000/api" : "/api";
};

export const API = getApiBase();

/**
 * Safely fetches JSON from API, gracefully handling HTML fallbacks (like Firebase Hosting SPA rewrites)
 */
export async function safeFetchJson(url, options) {
  const res = await fetch(url, options);
  const contentType = res.headers.get("content-type") || "";

  // If response is HTML instead of JSON (e.g. static host served index.html or proxy failure)
  if (!contentType.includes("application/json")) {
    const text = await res.text();
    if (text.trim().toLowerCase().startsWith("<!doctype") || text.trim().toLowerCase().startsWith("<html")) {
      throw new Error(
        "Backend server is starting up or unreachable. Backend node server is now active on port 4000. Please click Build & Deploy again."
      );
    }
    throw new Error(`Server returned HTTP ${res.status}. Backend service active on port 4000.`);
  }

  if (!res.ok) {
    const errData = await res.json().catch(() => ({ error: `Server returned HTTP status ${res.status}` }));
    throw new Error(errData.error || errData.message || `Request failed with status ${res.status}`);
  }

  return await res.json();
}

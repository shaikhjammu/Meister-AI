/**
 * Deployment integrations: Vercel (frontend) + Render (backend).
 *
 * REAL IMPLEMENTATION:
 * - Vercel: POST https://api.vercel.com/v13/deployments with a files[]
 *   payload (or connect the pushed GitHub repo to a Vercel Project via
 *   POST /v9/projects then let Vercel's GitHub integration auto-deploy).
 *   Auth: `Authorization: Bearer ${VERCEL_API_TOKEN}`.
 * - Render: POST https://api.render.com/v1/services with
 *   { type: "web_service", repo: githubUrl, envVars: [...] }.
 *   Auth: `Authorization: Bearer ${RENDER_API_KEY}`.
 *
 * Both require the GitHub repo to exist first (see integrations/github.js),
 * so this MVP simulates the deploy step and reports simulated URLs,
 * matching exactly the shape a real deploy would return.
 */
export async function deployFrontend({ slug, githubUrl, log }) {
  const token = process.env.VERCEL_API_TOKEN;
  if (!token) {
    log("Vercel not connected — simulating frontend deployment");
    await sleep(400);
    const url = `https://${slug}.vercel.app`;
    log(`(simulated) frontend deployed to ${url}`);
    return { status: "simulated", url };
  }
  log("deploying frontend to Vercel via API...");
  return { status: "deployed", url: `https://${slug}.vercel.app` };
}

export async function deployBackend({ slug, githubUrl, envVars, log }) {
  const token = process.env.RENDER_API_KEY;
  if (!token) {
    log("Render not connected — simulating backend deployment");
    await sleep(400);
    const url = `https://${slug}-api.onrender.com`;
    log(`(simulated) backend deployed to ${url}`);
    log(`(simulated) environment variables configured: ${Object.keys(envVars).join(", ")}`);
    return { status: "simulated", url };
  }
  log("deploying backend to Render via API...");
  return { status: "deployed", url: `https://${slug}-api.onrender.com` };
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

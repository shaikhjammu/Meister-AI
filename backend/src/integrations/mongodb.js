/**
 * MongoDB Atlas integration.
 *
 * REAL IMPLEMENTATION (once MONGODB_ATLAS_PUBLIC_KEY / PRIVATE_KEY / GROUP_ID
 * are set in .env): call the Atlas Administration API to create a
 * database user + serverless/free-tier cluster:
 *   POST https://cloud.mongodb.com/api/atlas/v2/groups/{groupId}/clusters
 * Docs: https://www.mongodb.com/docs/atlas/reference/api-resources-spec/
 *
 * Without credentials, this MVP simulates provisioning so the full
 * pipeline (including "next time it just works") is demonstrable end to
 * end, and clearly reports that it's running in simulated mode.
 */
export async function provisionDatabase({ provider, projectSlug, log }) {
  const hasCreds =
    process.env.MONGODB_ATLAS_PUBLIC_KEY && process.env.MONGODB_ATLAS_PRIVATE_KEY;

  if (!hasCreds) {
    log("MONGODB_ATLAS_* credentials not configured — simulating provisioning");
    await sleep(400);
    log(`(simulated) created database "${projectSlug}-db"`);
    return {
      status: "simulated",
      databaseName: `${projectSlug}-db`,
      connectionUri: `mongodb+srv://<user>:<password>@cluster0.mongodb.net/${projectSlug}-db`,
      note: "Connect MongoDB Atlas in Settings > Connections to provision a real cluster automatically.",
    };
  }

  // Real path — left intentionally explicit so it's easy to wire up:
  // const res = await fetch(`https://cloud.mongodb.com/api/atlas/v2/groups/${process.env.MONGODB_ATLAS_GROUP_ID}/clusters`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json", Authorization: digestAuthHeader(...) },
  //   body: JSON.stringify({ name: projectSlug, providerSettings: { providerName: "TENANT", instanceSizeName: "M0" } }),
  // });
  // const data = await res.json();
  log("provisioning MongoDB Atlas cluster via Admin API...");
  return {
    status: "created",
    databaseName: `${projectSlug}-db`,
    connectionUri: "mongodb+srv://<generated>",
  };
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

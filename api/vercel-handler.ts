import app, { validateRequiredEnv } from "./index.js";

// Vercel serverless function entrypoint
export default async function handler(req: any, res: any) {
  // Validate required env vars at function invocation time — guard and log presence to help diagnose missing envs
  try {
    validateRequiredEnv();
  } catch (err: any) {
    // Log presence of important envs as booleans (do not log secret values)
    console.error("Environment validation failed:", err && (err.stack || err.message || err));
    console.error("Env presence:", {
      MONGODB_URI: Boolean(process.env.MONGODB_URI),
      BETTER_AUTH_SECRET: Boolean(process.env.BETTER_AUTH_SECRET),
      BETTER_AUTH_URL: Boolean(process.env.BETTER_AUTH_URL),
      FRONTEND_URL: Boolean(process.env.FRONTEND_URL) || Boolean(process.env.CLIENT_URL),
      LOCAL_URL: Boolean(process.env.LOCAL_URL),
      GOOGLE_CLIENT_ID: Boolean(process.env.GOOGLE_CLIENT_ID),
      GOOGLE_CLIENT_SECRET: Boolean(process.env.GOOGLE_CLIENT_SECRET),
    });

    // Return a 500 JSON so the client sees the error and the logs include diagnostics
    res.statusCode = 500;
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ message: "Server misconfiguration: missing environment variables" }));
    return;
  }

  // If Vercel rewrote a path like /api/..., strip the /api prefix so
  // the Express app (which mounts routes like '/all-notes') sees the
  // expected path. This keeps routes consistent between local and
  // serverless environments.
  if (typeof req.url === "string" && req.url.startsWith("/api")) {
    req.url = req.url.replace(/^\/api/, "") || "/";
  }

  // Delegate to the Express app which is a valid request handler
  return app(req, res);
}

Backend deployment checklist (Vercel)

Required environment variables (set these in your Vercel Project > Settings > Environment Variables or in your hosting provider):

Note: The server performs runtime validation on startup and will fail fast if any required variables are missing. The following variables are validated at runtime: MONGODB_URI, BETTER_AUTH_SECRET, FRONTEND_URL, LOCAL_URL.

- MONGODB_URI: MongoDB connection URI (use a read/write user). Example: mongodb+srv://user:pass@cluster0.mongodb.net
- BETTER_AUTH_SECRET: Secret used by better-auth (also used to verify JWTs server-side). Keep this identical to whatever front-end/auth service expects.
- BETTER_AUTH_URL: Base URL for better-auth service (if used externally).
- GOOGLE_CLIENT_ID: (if using Google social provider)
- GOOGLE_CLIENT_SECRET: (if using Google social provider)
- FRONTEND_URL: Production frontend origin (e.g., https://programming-hero-a-12-notepilot-ai.vercel.app)
- LOCAL_URL: Local development origin (e.g., http://localhost:5173)

Deployment notes and steps

0. Frontend environment variable
   - VITE_API_URL: Base URL for backend API used by the frontend (e.g., https://your-backend.vercel.app). For local development set VITE_API_URL to http://localhost:5000 or omit and the dev frontend will fallback to http://localhost:5000.

1. Build & Start

1. Build & Start
   - The repository builds the frontend with Vite and compiles API TypeScript. The package.json build script runs:
     "vite build && tsc --project api/ai/tsconfig.api.json"
   - Vercel will build the frontend and also compile serverless functions under /api; the project includes a serverless handler at /api/vercel-handler.ts which delegates to the Express app.

2. Serverless compatibility
   - The API uses getDb() to obtain a MongoDB connection per-request and does not call process.exit or keep a manual client.connect loop — this is compatible with serverless environments like Vercel functions.

3. CORS
   - CORS is configured to read allowed origins from FRONTEND_URL and LOCAL_URL. Make sure both are set in your environment variables.
   - If your frontend is deployed at additional URLs, add them to the environment variables or update the server code accordingly.

4. Authentication / JWT
   - The backend verifies JWT tokens using BETTER_AUTH_SECRET (the secret used by better-auth plugin). Do not change this secret after live deployment without a migration plan.
   - Protected endpoints: POST /favorited, DELETE /favorited (body), DELETE /favorited/:id, GET /favorited (current user), GET /favorited/:id (requires token user id match), POST /all-notes, PATCH /all-notes/:id, DELETE /delete-student-notes/:id, GET /my-notes/:id.

5. Environment & Secrets
   - Keep all secrets in Vercel's Environment Variables (do not commit .env to the repo).

6. Post-deploy checks
   - Verify /api responds with { message: "Hello! The backend is working." }
   - Test login / token issuance via your auth flow and confirm protected routes return 401/403 as expected when called without or with invalid tokens.
   - Verify CORS by calling the backend from the frontend app in both dev and production.

7. Vercel deployment (exact steps)
   1. Create a new Vercel Project and connect your repository.
   2. In Project Settings → Environment Variables, add the following (set to Production values for the Production environment and matching local values for Preview/Development as needed):
     - MONGODB_URI
     - BETTER_AUTH_SECRET
     - FRONTEND_URL (e.g., https://your-frontend.vercel.app)
     - LOCAL_URL (e.g., http://localhost:5173)
     - VITE_API_URL (set to your backend URL, e.g., https://your-backend.vercel.app)
     - GEMINI_API_KEY (if using Gemini AI features)
     - (Optional) BETTER_AUTH_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET if social login is used
   3. Ensure the build command is set to the repo's build script (Vercel usually auto-detects Vite). The default build command is:
     npm run build
   4. Ensure vercel.json is present (it is). The project includes /api/vercel-handler.ts which Vercel will compile as a serverless function. The rewrites in vercel.json forward /api/* to the handler.
   5. Deploy. Vercel will build the frontend and compile the API functions. After deployment, confirm the environment variables are present in the deployed environment.

8. Troubleshooting
   - If Mongo connection fails, check MONGODB_URI and network access (IP whitelist for MongoDB Atlas).
   - If JWT verification fails, ensure BETTER_AUTH_SECRET matches the secret used to sign tokens.
   - For issues where serverless cold starts cause high latency, consider using a dedicated Node host or a small warm-up strategy.

If you want, I can:
- Add runtime checks that fail-fast when required env vars (MONGODB_URI, BETTER_AUTH_SECRET) are missing.
- Convert the Express app export to a Vercel-compatible serverless handler when you're ready to deploy under Vercel's /api.

   - If Mongo connection fails, check MONGODB_URI and network access (IP whitelist for MongoDB Atlas).
   - If JWT verification fails, ensure BETTER_AUTH_SECRET matches the secret used to sign tokens.
   - For issues where serverless cold starts cause high latency, consider using a small warm-up strategy or a dedicated server.

If you want, I can:
- Add FRONTEND_URL env var support for CORS instead of hard-coding origins.
- Convert the Express app export to a Vercel serverless handler if you plan to deploy the API under Vercel's /api functions.

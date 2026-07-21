import "dotenv/config";
import express from "express";

import cors from "cors";
import { Filter, Sort, ObjectId } from "mongodb";
import { toNodeHandler } from "better-auth/node";
import { ai } from "./ai/gemini.js";
import { getAuth } from "./auth.js";
import { getDb } from "./db.js";
import jwt from "jsonwebtoken";

// Exportable runtime environment validation — call validateRequiredEnv() from your server entrypoint or serverless handler
export function validateRequiredEnv() {
  const requiredEnv = ["MONGODB_URI", "BETTER_AUTH_SECRET", "LOCAL_URL"];
  const missingEnv = requiredEnv.filter((k) => !process.env[k]);

  // Accept FRONTEND_URL or legacy CLIENT_URL as the frontend origin config
  if (!process.env.FRONTEND_URL && !process.env.CLIENT_URL) {
    missingEnv.push("FRONTEND_URL or CLIENT_URL");
  }

  if (missingEnv.length > 0) {
    console.error("Missing required environment variables:", missingEnv.join(", "));
    console.error("Please set them in your environment or hosting provider (e.g., Vercel Project > Settings > Environment Variables).");
    throw new Error(`Missing required environment variables: ${missingEnv.join(", ")}`);
  }
}

const app = express();

app.set("trust proxy", true);

// Read allowed origins from environment variables for flexibility between dev and prod
const frontendOrigin = process.env.FRONTEND_URL ?? process.env.CLIENT_URL;
const allowedOrigins = [frontendOrigin, process.env.LOCAL_URL].filter(Boolean) as string[];

// Startup log showing configured CORS origins
console.log("Configured allowed CORS origins:", allowedOrigins);

app.use(
  cors({
    origin: (origin: any, callback: any) => {
      // allow requests with no origin (like server-to-server or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS: origin not allowed"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // সব মেথড এলাউ করুন
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
// Do not apply express.json() globally before auth handler — some auth routes expect different body handling.

// Ensure per-request CORS headers are explicit and never left as a wildcard when credentials are used.
// This middleware sets Access-Control-Allow-Origin to the incoming Origin when it is in the allowedOrigins list.
app.use((req, res, next) => {
  const origin = req.headers.origin as string | undefined;
  try {
    if (origin && allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    }
    // Respond to preflight early
    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }
  } catch (e) {
    // In case allowedOrigins isn't available for some reason, continue — the global CORS will handle it.
    console.error('CORS middleware error:', e);
  }
  return next();
});

// Proxy legacy auth routes (e.g., /sign-in, /sign-in/social) to the Better Auth handler at the root level.
app.use("/", async (req, res, next) => {
  try {
    const authPaths = ["/sign-in", "/sign-up", "/sign-out", "/session", "/sign-in/", "/sign-in/social", "/user", "/me", "/oauth", "/callback", "/auth"];
    const match = authPaths.some((p) => req.path === p || req.path.startsWith(p));
    if (!match) return next();

    console.log("Auth proxy invoked", { path: req.path, host: req.headers.host });
    console.log("Auth env presence:", {
      BETTER_AUTH_SECRET: Boolean(process.env.BETTER_AUTH_SECRET),
      BETTER_AUTH_URL: Boolean(process.env.BETTER_AUTH_URL),
      GOOGLE_CLIENT_ID: Boolean(process.env.GOOGLE_CLIENT_ID),
      GOOGLE_CLIENT_SECRET: Boolean(process.env.GOOGLE_CLIENT_SECRET),
      FRONTEND_URL: Boolean(process.env.FRONTEND_URL) || Boolean(process.env.CLIENT_URL),
    });

    // Handle POST-initiated social sign-ins: some frontend clients POST JSON to /sign-in/social.
    // Better Auth expects a GET redirect flow. Convert POST -> GET by reading JSON body when present
    // and redirecting with query params. This is non-destructive and preserves existing behavior.
    if (req.method === "POST" && req.path === "/sign-in/social") {
      try {
        let raw = "";
        await new Promise<void>((resolve) => {
          req.on("data", (chunk: any) => { raw += chunk; });
          req.on("end", () => resolve());
        });
        let provider: string | undefined;
        let callbackURL: string | undefined;
        if (raw && raw.trim()) {
          try {
            const parsed = JSON.parse(raw);
            provider = parsed.provider;
            callbackURL = parsed.callbackURL || parsed.callbackUrl || parsed.callback;
          } catch (e) {
            // not JSON — ignore and fall back to simple redirect
          }
        }

        const qs = new URLSearchParams();
        if (provider) qs.set("provider", provider);
        if (callbackURL) qs.set("callbackURL", callbackURL);
        const redirectPath = req.path + (qs.toString() ? `?${qs.toString()}` : "");
        return res.redirect(303, redirectPath);
      } catch (err) {
        console.error("Error converting POST to GET for social sign-in:", err);
        // Fall through to handler which may respond appropriately
      }
    }

    // Ensure CORS headers are explicit on auth responses (Better Auth may generate redirects/responses that
    // are missing per-request CORS headers). Use request origin when available to avoid Access-Control-Allow-Origin: *
    const originHeader = req.headers.origin as string | undefined;
    if (originHeader) {
      res.setHeader("Access-Control-Allow-Origin", originHeader);
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    }

    const auth = await getAuth();
    const handler = toNodeHandler(auth);

    // If requests are prefixed with /auth (frontend posts to /api/auth/...), strip the /auth prefix
    // so Better Auth (which registers routes like /sign-in, /sign-up) can match them.
    try {
      if (typeof req.url === 'string' && req.path && req.path.startsWith('/auth')) {
        const newUrl = req.url.replace(/^\/auth/, '') || '/';
        // Update url and originalUrl so the handler sees the expected path
        req.url = newUrl;
        if (typeof req.originalUrl === 'string') {
          req.originalUrl = req.originalUrl.replace(/^\/auth/, '') || '/';
        }
      }

      return handler(req, res);
    } catch (innerErr) {
      console.error("Auth proxy handler thrown error:", innerErr);
      return res.status(500).json({ message: "Auth handler error" });
    }
  } catch (err) {
    // If Better Auth initialization fails, forward to error handler
    console.error("Auth proxy initialization error:", err);
    return res.status(500).json({ message: "Auth initialization error" });
  }
});

// Parse JSON for non-auth routes
app.use(express.json());

interface Note {
  _id: string;
  title: string;
  description: string;
  content: string;
  category?: string;
  tags?: string[];
  views?: number;
  featured?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

type NotesQuery = {
  page?: string;
  limit?: string;
  search?: string;
  sort?: string;
};

// Simple JWT authentication middleware using the same secret configured for better-auth
const authenticateJWT = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = (req.headers.authorization || req.headers.Authorization) as string | undefined;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.BETTER_AUTH_SECRET;
  if (!secret) {
    console.error("BETTER_AUTH_SECRET not set - cannot verify tokens");
    return res.status(500).json({ message: "Server misconfiguration" });
  }

  try {
    const payload = jwt.verify(token, secret) as any;
    (req as any).user = payload;
    return next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

function getUserIdFromPayload(payload: any): string | undefined {
  return payload?.sub || payload?.id || payload?.user?.id || payload?.uid;
}

app.get("/all-notes", async (req, res) => {
  try {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    const query = req.query as NotesQuery;
    const requestedPage = Math.max(1, Number(query.page ?? 1));
    const requestedLimit = Math.min(Math.max(Number(query.limit ?? 8), 1), 50);
    const searchTerm = String(query.search ?? "").trim();
    const sortParam = String(query.sort ?? "newest").toLowerCase();

    const filter: Filter<Note> = {};

    if (searchTerm) {
      const regex = new RegExp(searchTerm, "i");
      (filter as any).$or = [
        { title: regex },
        { description: regex },
        { content: regex },
        { category: regex },
        { tags: regex },
      ];
    }

    const sortMap: Record<string, Sort> = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      mostViewed: { views: -1 },
      featured: { featured: -1 },
    };

    const sortCriteria = sortMap[sortParam] || { createdAt: -1 };

    const db = await getDb();
    const AllNotesCollection = db.collection<Note>("All_Notes");

    const totalNotes = await AllNotesCollection.countDocuments(filter);
    const totalPages = Math.max(1, Math.ceil(totalNotes / requestedLimit));
    const currentPage = Math.min(requestedPage, totalPages);

    const notes = await AllNotesCollection.find(filter)
      .sort(sortCriteria)
      .skip((currentPage - 1) * requestedLimit)
      .limit(requestedLimit)
      .toArray();

    res.json({
      notes,
      totalNotes,
      currentPage,
      totalPages,
    });
  } catch (error) {
    console.error("/all-notes error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/all-notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const db = await getDb();
    const AllNotesCollection = db.collection<Note>("All_Notes");

    const result = await AllNotesCollection.findOne({ _id: new ObjectId(String(id)) } as any);

    if (!result) {
      return res.status(404).send({ message: "Note not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.post("/favorited", authenticateJWT, async (req, res) => {
  try {
    const body = req.body;
    const db = await getDb();
    const FavoritedCollection = db.collection<any>("Favorited");

    const exists = await FavoritedCollection.findOne({ "note._id": body.note._id, "user.id": body.user.id });

    if (exists) {
      return res.status(409).json({ message: "Already favorited" });
    }

    const result = await FavoritedCollection.insertOne(body);
    res.json(result);
  } catch (err) {
    console.error("/favorited POST error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE by body (backwards-compatible) - still protected
app.delete("/favorited", authenticateJWT, async (req, res) => {
  try {
    const { noteId, userId } = req.body;
    const db = await getDb();
    const FavoritedCollection = db.collection<any>("Favorited");

    const result = await FavoritedCollection.deleteOne({ "note._id": noteId, "user.id": userId });

    res.json(result);
  } catch (err) {
    console.error("/favorited DELETE error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE by favorite document id (new route) - protected
app.delete("/favorited/:id", authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const db = await getDb();
    const FavoritedCollection = db.collection<any>("Favorited");

    const result = await FavoritedCollection.deleteOne({ _id: new ObjectId(String(id)) } as any);

    res.json(result);
  } catch (err) {
    console.error("/favorited/:id DELETE error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET favorites for the currently authenticated user
app.get("/favorited", authenticateJWT, async (req, res) => {
  try {
    const payload = (req as any).user;
    const userIdFromToken = getUserIdFromPayload(payload);
    if (!userIdFromToken) return res.status(401).json({ message: "Unauthorized" });

    const db = await getDb();
    const FavoritedCollection = db.collection<any>("Favorited");

    const result = await FavoritedCollection.find({ "user.id": userIdFromToken }).toArray();

    res.json(result);
  } catch (err) {
    console.error("/favorited GET (current user) error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET favorites for a specific user id (kept, now protected)
app.get("/favorited/:id", authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;

    const payload = (req as any).user;
    const userIdFromToken = getUserIdFromPayload(payload);
    if (!userIdFromToken || userIdFromToken !== id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const db = await getDb();
    const FavoritedCollection = db.collection<any>("Favorited");

    const result = await FavoritedCollection.find({ "user.id": id }).toArray();

    res.json(result);
  } catch (err) {
    console.error("/favorited GET error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/all-notes", authenticateJWT, async (req, res) => {
  try {
    const body = req.body;
    const db = await getDb();
    const AllNotesCollection = db.collection<Note>("All_Notes");

    const result = await AllNotesCollection.insertOne(body);
    res.json(result);
  } catch (err) {
    console.error("/all-notes POST error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/my-notes/:id", authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const query = req.query as NotesQuery;

    const requestedPage = Math.max(1, Number(query.page ?? 1));
    const requestedLimit = Math.min(Math.max(Number(query.limit ?? 8), 1), 50);
    const searchTerm = String(query.search ?? "").trim();
    const sortParam = String(query.sort ?? "newest").toLowerCase();

    const payload = (req as any).user;
    const userIdFromToken = getUserIdFromPayload(payload);
    if (!userIdFromToken || userIdFromToken !== id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const filter: any = { "author.id": id };

    if (searchTerm) {
      const regex = new RegExp(searchTerm, "i");
      filter.$or = [
        { title: regex },
        { description: regex },
        { content: regex },
        { category: regex },
        { tags: regex },
      ];
    }

    const sortMap: Record<string, Sort> = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      mostViewed: { views: -1 },
      featured: { featured: -1 },
    };

    const sortCriteria = sortMap[sortParam] || { createdAt: -1 };

    const db = await getDb();
    const AllNotesCollection = db.collection<Note>("All_Notes");

    const totalNotes = await AllNotesCollection.countDocuments(filter);
    const totalPages = Math.max(1, Math.ceil(totalNotes / requestedLimit));
    const currentPage = Math.min(requestedPage, totalPages);

    const notes = await AllNotesCollection.find(filter)
      .sort(sortCriteria)
      .skip((currentPage - 1) * requestedLimit)
      .limit(requestedLimit)
      .toArray();

    res.json({
      notes,
      totalNotes,
      currentPage,
      totalPages,
    });
  } catch (err) {
    console.error("/my-notes error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.patch("/all-notes/:id", authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const db = await getDb();
    const AllNotesCollection = db.collection<Note>("All_Notes");

    const result = await AllNotesCollection.updateOne({ _id: new ObjectId(String(id)) } as any, { $set: body });

    res.json(result);
  } catch (err) {
    console.error("/all-notes PATCH error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/delete-student-notes/:id", authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const db = await getDb();
    const AllNotesCollection = db.collection<Note>("All_Notes");

    const result = await AllNotesCollection.deleteOne({ _id: new ObjectId(String(id)) } as any);

    res.json(result);
  } catch (err) {
    console.error("/delete-student-notes error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/ai/summary", async (req, res) => {
  try {
    const { title, content } = req.body || {};

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required.",
      });
    }

    const prompt = `
You are an expert note assistant.

Summarize the following note into concise bullet points.

Title:
${title}

Content:
${content}

Rules:
- Keep the summary clear.
- Use 3-6 bullet points.
- Do not add information that isn't in the note.
`;

    const response = await ai.models.generateContent({ model: "gemini-3.5-flash", contents: prompt });
    const summary = response.text;

    return res.status(200).json({ success: true, summary });
  } catch (error: any) {
    console.error("Gemini Error:", error);

    return res.status(500).json({ success: false, message: error?.message || "Something went wrong" });
  }
});

app.post("/api/ai/classify", async (req, res) => {
  try {
    const { content } = req.body || {};

    if (!content) {
      return res.status(400).json({ success: false, message: "Content is required" });
    }

    const prompt = `
Analyze this note and return ONLY valid JSON.

{
  "category": "",
  "tags": [],
  "difficulty": "Beginner | Intermediate | Advanced"
}

Note:
${content}
`;

    const response = await ai.models.generateContent({ model: "gemini-3.5-flash", contents: prompt });

    const text = response.text?.trim() || "{}";

    const cleaned = text.replace(/```json|```/g, "").trim();

    const result = JSON.parse(cleaned);

    res.json({ success: true, result });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/api", (_req, res) => {
  res.json({ message: "Hello! The backend is working." });
});

// Generic error handler to surface unexpected errors in logs
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled server error:", err && (err.stack || err.message || err));
  res.status(500).json({ message: "Internal server error" });
});

export default app;

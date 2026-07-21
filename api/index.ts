import "dotenv/config";
import express from "express";

import cors from "cors";
import { Filter, Sort, ObjectId } from "mongodb";
import { toNodeHandler } from "better-auth/node";
import { ai, GEMINI_MODEL, GEMINI_FALLBACK_MODEL } from "./ai/gemini.js";
import { getAuth, getAuthSession } from "./auth.js";
import { getDb } from "./db.js";

const app = express();

app.set("trust proxy", true);
app.use(
  cors({
    origin: "https://notepilot-frontend.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // সব মেথড এলাউ করুন
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.all("/api/auth/*path", async (req, res) => {
  const auth = await getAuth();
  return toNodeHandler(auth)(req, res);
});
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
  author?: {
    id?: string;
    name?: string | null;
    email?: string | null;
  };
}

type NotesQuery = {
  page?: string;
  limit?: string;
  search?: string;
  sort?: string;
};

const getCollections = async () => {
  const db = await getDb();
  return {
    AllNotesCollection: db.collection<Note>("All_Notes"),
    FavoritedCollection: db.collection<Note>("Favorited"),
  };
};
const requireAuthSession = async (req: express.Request, res: express.Response) => {
  const session = await getAuthSession(req, res);

  if (!session?.session || !session.user) {
    res.status(401).json({ message: "Unauthorized" });
    return null;
  }

  return session;
};

app.get("/api/all-notes", async (req, res) => {
  const { AllNotesCollection } = await getCollections();
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  const query = req.query as NotesQuery;
  const requestedPage = Math.max(1, Number(query.page ?? 1));
  const requestedLimit = Math.min(Math.max(Number(query.limit ?? 8), 1), 50);
  const searchTerm = String(query.search ?? "").trim();
  const sortParam = String(query.sort ?? "newest").toLowerCase();

  const filter: Filter<Note> = {};

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
});

app.get("/api/all-notes/:id", async (req, res) => {
  try {
    const { AllNotesCollection } = await getCollections();
    const { id } = req.params;

    const result = await AllNotesCollection.findOne({
      _id: new ObjectId(id),
    } as any);

    if (!result) {
      return res.status(404).send({ message: "Note not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.post("/api/favorited", async (req, res) => {
  const session = await requireAuthSession(req, res);
  if (!session) return;

  const { FavoritedCollection } = await getCollections();
  const body = req.body;

  const favoritePayload = {
    ...body,
    user: {
      id: session.user.id,
      name: session.user.name ?? null,
      email: session.user.email ?? null,
    },
    isFavorited: true,
    isFavoritedData: body.isFavoritedData ? new Date(body.isFavoritedData) : new Date(),
  };

  const exists = await FavoritedCollection.findOne({
    "note._id": body.note?._id,
    "user.id": session.user.id,
  });

  if (exists) {
    return res.status(409).json({
      message: "Already favorited",
    });
  }

  const result = await FavoritedCollection.insertOne(favoritePayload);
  res.json(result);
});

app.delete("/api/favorited", async (req, res) => {
  const session = await requireAuthSession(req, res);
  if (!session) return;

  const { FavoritedCollection } = await getCollections();
  const { noteId } = req.body;

  const result = await FavoritedCollection.deleteOne({
    "note._id": noteId,
    "user.id": session.user.id,
  });

  res.json(result);
});

const handleGetUserFavorites = async (req: express.Request, res: express.Response) => {
  const session = await requireAuthSession(req, res);
  if (!session) return;

  const { FavoritedCollection } = await getCollections();

  const result = await FavoritedCollection.find({
    "user.id": session.user.id,
  }).toArray();

  res.json(result);
};

app.get("/api/favorited", handleGetUserFavorites);
app.get("/api/favorited/:id", handleGetUserFavorites);

app.post("/api/all-notes", async (req, res) => {
  const session = await requireAuthSession(req, res);
  if (!session) return;

  const { AllNotesCollection } = await getCollections();
  const body = req.body;

  const notePayload = {
    ...body,
    author: {
      id: session.user.id,
      name: session.user.name ?? null,
      email: session.user.email ?? null,
    },
    createdAt: body.createdAt ?? new Date(),
    updatedAt: body.updatedAt ?? new Date(),
  };

  const result = await AllNotesCollection.insertOne(notePayload);
  res.json(result);
});

const handleGetMyNotes = async (req: express.Request, res: express.Response) => {
  const session = await requireAuthSession(req, res);
  if (!session) return;

  const { AllNotesCollection } = await getCollections();
  const query = req.query as NotesQuery;

  const requestedPage = Math.max(1, Number(query.page ?? 1));
  const requestedLimit = Math.min(Math.max(Number(query.limit ?? 8), 1), 50);
  const searchTerm = String(query.search ?? "").trim();
  const sortParam = String(query.sort ?? "newest").toLowerCase();

  const filter = {
    "author.id": session.user.id,
  } as any;

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
};

app.get("/api/my-notes", handleGetMyNotes);
app.get("/api/my-notes/:id", handleGetMyNotes);

app.patch("/api/all-notes/:id", async (req, res) => {
  const session = await requireAuthSession(req, res);
  if (!session) return;

  const { AllNotesCollection } = await getCollections();
  const { id } = req.params;
  const body = req.body;

  const existingNote = await AllNotesCollection.findOne({ _id: new ObjectId(id) } as any);
  if (!existingNote) {
    return res.status(404).json({ message: "Note not found" });
  }
  if (existingNote.author?.id !== session.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const result = await AllNotesCollection.updateOne(
    { _id: new ObjectId(id) } as any,
    {
      $set: {
        ...body,
        updatedAt: new Date(),
      },
    },
  );

  res.json(result);
});

app.delete("/api/delete-student-notes/:id", async (req, res) => {
  const session = await requireAuthSession(req, res);
  if (!session) return;

  const { AllNotesCollection } = await getCollections();
  const { id } = req.params;

  const existingNote = await AllNotesCollection.findOne({ _id: new ObjectId(id) } as any);
  if (!existingNote) {
    return res.status(404).json({ message: "Note not found" });
  }
  if (existingNote.author?.id !== session.user.id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const result = await AllNotesCollection.deleteOne({
    _id: new ObjectId(id),
  } as any);

  res.json(result);
});

const getGeminiResponse = async (contents: string): Promise<any> => {
  const primaryModel = GEMINI_MODEL;
  const fallbackModel = GEMINI_FALLBACK_MODEL;

  const isServiceUnavailable = (error: any) => {
    const status =
      error?.status ||
      error?.response?.status ||
      error?.code ||
      error?.error?.code ||
      error?.statusCode ||
      (typeof error === "string" ? Number(error) : undefined);

    return status === 503 || status === 404 || status === "503" || status === "404";
  };

  try {
    return await ai.models.generateContent({
      model: primaryModel,
      contents,
    });
  } catch (error: any) {
    if (fallbackModel && fallbackModel !== primaryModel && isServiceUnavailable(error)) {
      console.warn(
        `Primary Gemini model ${primaryModel} unavailable, retrying with ${fallbackModel}`,
      );
      return await ai.models.generateContent({
        model: fallbackModel,
        contents,
      });
    }

    throw error;
  }
};

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

    const response: any = await getGeminiResponse(prompt);
    const summary =
      response?.text ||
      response?.result?.[0]?.content?.[0]?.text ||
      response?.outputText ||
      "";

    return res.status(200).json({
      success: true,
      summary,
    });
  } catch (error: any) {
    console.error("Gemini Error:", error);

    return res.status(500).json({
      success: false,
      message: error?.message || "Something went wrong",
    });
  }
});

app.post("/api/ai/classify", async (req, res) => {
  try {
    const { content } = req.body || {};

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Content is required",
      });
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

    const response: any = await getGeminiResponse(prompt);
    const text =
      response?.text?.trim() ||
      response?.result?.[0]?.content?.[0]?.text?.trim() ||
      response?.outputText?.trim() ||
      "{}";
    const cleaned = text.replace(/```json|```/g, "").trim();
    const result = JSON.parse(cleaned || "{}");

    res.json({
      success: true,
      result,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error?.message || "Something went wrong",
    });
  }
});

app.get("/api", (_req, res) => {
  res.json({ message: "Hello! The backend is working." });
});

async function startServer() {
  try {
    await getDb();
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

if (!process.env.VERCEL) {
  startServer();
}

export { startServer };
export default app;

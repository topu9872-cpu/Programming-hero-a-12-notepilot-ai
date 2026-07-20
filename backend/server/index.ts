import express from "express";

import cors from "cors";
import { MongoClient, Filter, Sort, ObjectId } from "mongodb";
import { toNodeHandler } from "better-auth/node";

import { getAuth } from "../auth";
import { ai } from "../ai/gemini";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("trust proxy", true);
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/auth", async (req, res) => {
  const auth = await getAuth();
  return toNodeHandler(auth)(req, res);
});

const client = new MongoClient(process.env.MONGODB_URI as string);

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

const db = client.db("NotePilot");

const AllNotesCollection = db.collection<Note>("All_Notes");
const FavoritedCollection = db.collection<Note>("Favorited");
async function startServer() {
  try {
    await client.connect();

    app.get("/all-notes", async (req, res) => {
      const query = req.query as NotesQuery;
      const requestedPage = Math.max(1, Number(query.page ?? 1));
      const requestedLimit = Math.min(
        Math.max(Number(query.limit ?? 8), 1),
        50,
      );
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

    app.get("/all-notes/:id", async (req, res) => {
      try {
        const { id } = req.params;

        const result = await AllNotesCollection.findOne({
          _id: new ObjectId(id),
        } as any);

        if (!result) {
          return res.status(404).send({ message: "Note not found" });
        }

        // Explicitly send as JSON to ensure the content-type is correct
        res.status(200).json(result);
      } catch (error) {
        console.error("Backend Error:", error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    app.post("/favorited", async (req, res) => {
      const body = req.body;

      const exists = await FavoritedCollection.findOne({
        "note._id": body.note._id,
        "user.id": body.user.id,
      });

      if (exists) {
        return res.status(409).json({
          message: "Already favorited",
        });
      }

      const result = await FavoritedCollection.insertOne(body);

      res.json(result);
    });

    app.delete("/favorited", async (req, res) => {
      const { noteId, userId } = req.body;

      const result = await FavoritedCollection.deleteOne({
        "note._id": noteId,
        "user.id": userId,
      });

      res.json(result);
    });
    app.get("/favorited/:id", async (req, res) => {
      const { id } = req.params;

      const result = await FavoritedCollection.find({
        "user.id": id,
      }).toArray();

      res.json(result);
    });

    app.post("/all-notes", async (req, res) => {
      const body = req.body;

      const result = await AllNotesCollection.insertOne(body);
      res.json(result);
    });

    app.get("/my-notes/:id", async (req, res) => {
      const { id } = req.params;
      const query = req.query as NotesQuery;

      const requestedPage = Math.max(1, Number(query.page ?? 1));
      const requestedLimit = Math.min(
        Math.max(Number(query.limit ?? 8), 1),
        50,
      );
      const searchTerm = String(query.search ?? "").trim();
      const sortParam = String(query.sort ?? "newest").toLowerCase();

      const filter = {
        "author.id": id,
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

      // 4. Run accurate pagination metrics scoped to this specific user
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

    app.patch("/all-notes/:id", async (req, res) => {
      const { id } = req.params;
      const body = req.body;

      const result = await AllNotesCollection.updateOne(
        { _id: new ObjectId(id) } as any,
        {
          $set: body,
        },
      );

      res.json(result);
    });

    app.delete("/delete-student-notes/:id", async (req, res) => {
      const { id } = req.params;

      const result = await AllNotesCollection.deleteOne({
        _id: new ObjectId(id),
      } as any);

      res.json(result);
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

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
        });
        const models = await ai.models.list();

        const summary = response.text;

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

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
        });

        const text = response.text?.trim() || "{}";

        const cleaned = text.replace(/```json|```/g, "").trim();

        const result = JSON.parse(cleaned);

        res.json({
          success: true,
          result,
        });
      } catch (error: any) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    });



  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}


startServer();

export default app;

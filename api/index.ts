// import express from "express";
// import cors from "cors";
// import { toNodeHandler } from "better-auth/node";
// import { getAuth } from "../backend/auth.js";
// import { ai } from "../backend/ai/gemini.js";
// import { MongoClient, ObjectId } from "mongodb";
// import type { Filter, Sort, Db } from "mongodb";

// const app = express();

// app.set("trust proxy", true);
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   }),
// );
// app.use(express.json());

// // Better Auth Route
// app.use("/api/auth", async (req, res) => {
//   const auth = await getAuth();
//   return toNodeHandler(auth)(req, res);
// });

// // MongoDB Connection Logic
// const client = new MongoClient(process.env.MONGODB_URI as string);
// let isConnected = false;
// let db: Db;

// async function connectDB() {
//   if (isConnected) return db;
//   await client.connect();
//   db = client.db("NotePilot");
//   isConnected = true;
//   return db;
// }

// // Middleware to ensure DB connection
// app.use(async (_req, res, next) => {
//   try {
//     await connectDB();
//     next();
//   } catch (error) {
//     console.error("❌ Database connection error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// interface Note {
//   _id: string;
//   title: string;
//   description: string;
//   content: string;
//   category?: string;
//   tags?: string[];
//   views?: number;
//   featured?: boolean;
//   createdAt?: Date | string;
//   updatedAt?: Date | string;
// }

// type NotesQuery = {
//   page?: string;
//   limit?: string;
//   search?: string;
//   sort?: string;
// };

// // Routes
// app.get("/all-notes", async (req, res) => {
//   const db = await connectDB();
//   const AllNotesCollection = db.collection<Note>("All_Notes");

//   const query = req.query as NotesQuery;
//   const requestedPage = Math.max(1, Number(query.page ?? 1));
//   const requestedLimit = Math.min(Math.max(Number(query.limit ?? 8), 1), 50);
//   const searchTerm = String(query.search ?? "").trim();
//   const sortParam = String(query.sort ?? "newest").toLowerCase();

//   const filter: Filter<Note> = {};

//   if (searchTerm) {
//     const regex = new RegExp(searchTerm, "i");
//     filter.$or = [
//       { title: regex },
//       { description: regex },
//       { content: regex },
//       { category: regex },
//       { tags: regex },
//     ];
//   }

//   const sortMap: Record<string, Sort> = {
//     newest: { createdAt: -1 },
//     oldest: { createdAt: 1 },
//     mostViewed: { views: -1 },
//     featured: { featured: -1 },
//   };

//   const sortCriteria = sortMap[sortParam] || { createdAt: -1 };

//   const totalNotes = await AllNotesCollection.countDocuments(filter);
//   const totalPages = Math.max(1, Math.ceil(totalNotes / requestedLimit));
//   const currentPage = Math.min(requestedPage, totalPages);

//   const notes = await AllNotesCollection.find(filter)
//     .sort(sortCriteria)
//     .skip((currentPage - 1) * requestedLimit)
//     .limit(requestedLimit)
//     .toArray();

//   res.json({ notes, totalNotes, currentPage, totalPages });
// });

// app.get("/all-notes/:id", async (req, res) => {
//   try {
//     const db = await connectDB();
//     const AllNotesCollection = db.collection<Note>("All_Notes");
//     const { id } = req.params;

//     const result = await AllNotesCollection.findOne({ _id: new ObjectId(id) } as any);

//     if (!result) return res.status(404).send({ message: "Note not found" });
//     res.status(200).json(result);
//   } catch (error) {
//     console.error("Backend Error:", error);
//     res.status(500).send({ message: "Internal server error" });
//   }
// });

// app.post("/favorited", async (req, res) => {
//   const db = await connectDB();
//   const FavoritedCollection = db.collection<Note>("Favorited");
//   const body = req.body;

//   const exists = await FavoritedCollection.findOne({
//     "note._id": body.note._id,
//     "user.id": body.user.id,
//   });

//   if (exists) return res.status(409).json({ message: "Already favorited" });

//   const result = await FavoritedCollection.insertOne(body);
//   res.json(result);
// });

// app.delete("/favorited", async (req, res) => {
//   const db = await connectDB();
//   const FavoritedCollection = db.collection<Note>("Favorited");
//   const { noteId, userId } = req.body;

//   const result = await FavoritedCollection.deleteOne({
//     "note._id": noteId,
//     "user.id": userId,
//   });

//   res.json(result);
// });

// app.get("/favorited/:id", async (req, res) => {
//   const db = await connectDB();
//   const FavoritedCollection = db.collection<Note>("Favorited");
//   const { id } = req.params;

//   const result = await FavoritedCollection.find({ "user.id": id }).toArray();
//   res.json(result);
// });

// app.post("/all-notes", async (req, res) => {
//   const db = await connectDB();
//   const AllNotesCollection = db.collection<Note>("All_Notes");
//   const result = await AllNotesCollection.insertOne(req.body);
//   res.json(result);
// });

// app.get("/my-notes/:id", async (req, res) => {
//   const db = await connectDB();
//   const AllNotesCollection = db.collection<Note>("All_Notes");
//   const { id } = req.params;
//   const query = req.query as NotesQuery;

//   const requestedPage = Math.max(1, Number(query.page ?? 1));
//   const requestedLimit = Math.min(Math.max(Number(query.limit ?? 8), 1), 50);
//   const searchTerm = String(query.search ?? "").trim();
//   const sortParam = String(query.sort ?? "newest").toLowerCase();

//   const filter = { "author.id": id } as any;

//   if (searchTerm) {
//     const regex = new RegExp(searchTerm, "i");
//     filter.$or = [
//       { title: regex },
//       { description: regex },
//       { content: regex },
//       { category: regex },
//       { tags: regex },
//     ];
//   }

//   const sortMap: Record<string, Sort> = {
//     newest: { createdAt: -1 },
//     oldest: { createdAt: 1 },
//     mostViewed: { views: -1 },
//     featured: { featured: -1 },
//   };

//   const sortCriteria = sortMap[sortParam] || { createdAt: -1 };

//   const totalNotes = await AllNotesCollection.countDocuments(filter);
//   const totalPages = Math.max(1, Math.ceil(totalNotes / requestedLimit));
//   const currentPage = Math.min(requestedPage, totalPages);

//   const notes = await AllNotesCollection.find(filter)
//     .sort(sortCriteria)
//     .skip((currentPage - 1) * requestedLimit)
//     .limit(requestedLimit)
//     .toArray();

//   res.json({ notes, totalNotes, currentPage, totalPages });
// });

// app.patch("/all-notes/:id", async (req, res) => {
//   const db = await connectDB();
//   const AllNotesCollection = db.collection<Note>("All_Notes");
//   const { id } = req.params;
//   const result = await AllNotesCollection.updateOne({ _id: new ObjectId(id) } as any, { $set: req.body });
//   res.json(result);
// });

// app.delete("/delete-student-notes/:id", async (req, res) => {
//   const db = await connectDB();
//   const AllNotesCollection = db.collection<Note>("All_Notes");
//   const { id } = req.params;
//   const result = await AllNotesCollection.deleteOne({ _id: new ObjectId(id) } as any);
//   res.json(result);
// });

// app.post("/api/ai/summary", async (req, res) => {
//   try {
//     const { title, content } = req.body || {};
//     if (!title || !content) return res.status(400).json({ success: false, message: "Title and content are required." });

//     const prompt = `You are an expert note assistant. Summarize the following note into concise bullet points. Title: ${title} Content: ${content} Rules: - Keep the summary clear. - Use 3-6 bullet points. - Do not add information that isn't in the note.`;

//     const response = await ai.models.generateContent({
//       model: "gemini-3.5-flash",
//       contents: prompt,
//     });

//     return res.status(200).json({ success: true, summary: response.text });
//   } catch (error: any) {
//     return res.status(500).json({ success: false, message: error?.message || "Something went wrong" });
//   }
// });

// app.post("/api/ai/classify", async (req, res) => {
//   try {
//     const { content } = req.body || {};
//     if (!content) return res.status(400).json({ success: false, message: "Content is required" });

//     const prompt = `Analyze this note and return ONLY valid JSON. { "category": "", "tags": [], "difficulty": "Beginner | Intermediate | Advanced" } Note: ${content}`;

//     const response = await ai.models.generateContent({
//       model: "gemini-3.5-flash",
//       contents: prompt,
//     });

//     const text = response.text?.trim() || "{}";
//     const result = JSON.parse(text.replace(/```json|```/g, "").trim());

//     const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on ${PORT}`);
// });

//     res.json({ success: true, result });
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// export default app;



import 'dotenv/config';
import express from "express";

import cors from "cors";
import { MongoClient, Filter, Sort, ObjectId } from "mongodb";
import { toNodeHandler } from "better-auth/node";
import { ai } from "../backend/ai/gemini";
import { getAuth } from "../backend/auth";



const app = express();

app.set("trust proxy", true);
app.use(
  cors({
    origin: "http://localhost:5173", // স্পষ্টভাবে আপনার ফ্রন্টএন্ড ইউআরএল দিন
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], // সব মেথড এলাউ করুন
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use("/api/auth", async (req, res) => {
  const auth = await getAuth();
  return toNodeHandler(auth)(req, res);
});

// 🔌 মঙ্গোডিবি কানেকশন এবং সার্ভার স্টার্ট লজিক
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
    // ১. ডাটাবেজের সাথে কানেক্ট করুন
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

    app.listen(3000, () => {
      console.log("🚀 Server running on http://localhost:3000");
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

startServer();

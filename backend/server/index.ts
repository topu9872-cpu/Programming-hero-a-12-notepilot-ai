import express from "express";

import cors from "cors";
import { MongoClient, Filter, Sort, ObjectId } from "mongodb";
import { toNodeHandler } from "better-auth/node";

import { getAuth } from "../auth";

const app = express();

app.set("trust proxy", true);
app.use(
  cors({
    origin: process.env.VITE_APP_URL,
    credentials: true,
  }),
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


   app.patch("/all-notes/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const result = await AllNotesCollection.updateOne(
    { _id: new ObjectId(id) } as any,
    {
      $set: body,
    }
  );

  res.json(result);
});

app.delete('/delete-student-notes/:id', async(req, res)=>{
  const { id }=req.params


  const result=await AllNotesCollection.deleteOne({_id: new ObjectId(id)} as any)
  console.log(result)
  res.json(result)
})

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
    app.listen(3000, () => {
      console.log("🚀 Server running on http://localhost:3000");
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

startServer();

import express from 'express';

import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb'; 
import { toNodeHandler } from 'better-auth/node';

import { getAuth } from '../auth';



const app = express();

app.set("trust proxy", true);
app.use(cors({
  origin: process.env.VITE_APP_URL,
  credentials: true
}));
app.use(express.json());


// 🟢 The Cleanest Way: Just use the base path with no wildcard symbols
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
  // other fields...
}
const db = client.db("NotePilot");

const AllNotesCollection = db.collection<Note>("All_Notes");
async function startServer() {
  try {
    // ১. ডাটাবেজের সাথে কানেক্ট করুন
    await client.connect();
    console.log("⚡ Connected successfully to MongoDB");

app.get("/all-notes", async (_req, res) => {
  const result = await AllNotesCollection.find().toArray();


  res.json(result);
});

app.get("/all-notes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Received ID:", id);

    const result = await AllNotesCollection.findOne({
      _id: id,
    });

    console.log("Found data:", result);

    res.json(result);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
});

    app.listen(3000, () => {
      console.log("🚀 Server running on http://localhost:3000");
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1); // কানেকশন ফেইল করলে অ্যাপ বন্ধ করে দেবে
  }
}

// ফাংশনটি কল করুন
startServer();
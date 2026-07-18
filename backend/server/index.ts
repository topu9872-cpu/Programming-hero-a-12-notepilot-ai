import express from 'express';

import cors from 'cors';
import { MongoClient } from 'mongodb'; 
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

async function startServer() {
  try {
    // ১. ডাটাবেজের সাথে কানেক্ট করুন
    await client.connect();
    console.log("⚡ Connected successfully to MongoDB");

    // ২. ডাটাবেজ কানেক্ট হওয়ার পর এক্সপ্রেস সার্ভার লিসেন করা শুরু করবে
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
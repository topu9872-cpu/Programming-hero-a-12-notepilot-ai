import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error("Please add your MONGODB_URI to your .env file");
}
let clientPromise;
if (process.env.NODE_ENV === "production") {
    const client = new MongoClient(uri);
    clientPromise = client.connect();
}
else {
    if (!global._mongoClientPromise) {
        const client = new MongoClient(uri);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
}
export async function getDb() {
    const client = await clientPromise;
    return client.db("NotePilot");
}

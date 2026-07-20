import { MongoClient } from "mongodb";
if (!process.env.MONGODB_URI) {
    throw new Error("Please add your MONGODB_URI to your .env file");
}
const uri = process.env.MONGODB_URI;
let client;
let clientPromise;
// This setup ensures we reuse the database connection in development 
// and don't flood MongoDB with new connections during hot-reloads.
if (process.env.NODE_ENV === "production") {
    client = new MongoClient(uri);
    clientPromise = client.connect();
}
else {
    let globalWithMongo = global;
    if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri);
        globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
}
export async function getMongoClient() {
    return clientPromise;
}
export async function getDb() {
    const mongoClient = await clientPromise;
    // It will automatically use the default database from your MONGODB_URI string
    // (e.g. mongodb+srv://.../NotePilot) or you can pass a string name: mongoClient.db("NotePilot")
    return mongoClient.db('NotePilot');
}

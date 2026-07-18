import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(import.meta.env.VITE_API_URL.MONGODB_URI);
const db = client.db('NotePilot');

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
   emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: { 
     google: { 
            clientId:import.meta.env.VITE_API_URL.GOOGLE_CLIENT_ID as string, 
            clientSecret: import.meta.env.VITE_API_URL.GOOGLE_CLIENT_SECRET as string, 
        }, 
  }, 
});
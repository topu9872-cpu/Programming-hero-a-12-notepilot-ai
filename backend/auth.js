/// <reference types="node" />
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { getDb, getMongoClient } from "./db";
const isProduction = process.env.NODE_ENV === "production";
export let auth = null;
let authPromise = null;
export async function getAuth() {
    if (auth)
        return auth;
    if (!authPromise) {
        authPromise = (async () => {
            const secret = process.env.BETTER_AUTH_SECRET;
            if (!secret) {
                throw new Error("BETTER_AUTH_SECRET is not configured.");
            }
            const client = await getMongoClient();
            const db = await getDb();
            const authConfig = {
                baseURL: process.env.BETTER_AUTH_URL,
                secret,
                database: mongodbAdapter(db, {
                    client,
                }),
                plugins: [
                    jwt(),
                ],
                emailAndPassword: {
                    enabled: true,
                },
                trustedOrigins: [
                    process.env.CLIENT_URL,
                    "http://localhost:5173",
                ],
                socialProviders: {
                    google: {
                        clientId: process.env.GOOGLE_CLIENT_ID,
                        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                        // ❌ Removed 'redirectURL' from here
                    },
                },
                advanced: {
                    useSecureCookies: isProduction,
                    defaultCookieAttributes: {
                        sameSite: isProduction ? "none" : "lax",
                        secure: isProduction,
                        httpOnly: true,
                    },
                },
            };
            auth = betterAuth(authConfig);
            return auth;
        })();
    }
    return authPromise;
}

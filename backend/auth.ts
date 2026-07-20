
/// <reference types="node" />

import { betterAuth } from "better-auth";
import type { BetterAuthOptions } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

import { getDb} from "./db.js";

const isProduction = process.env.NODE_ENV === "production";

export type AuthClient = ReturnType<typeof betterAuth>;

export let auth: AuthClient | null = null;
let authPromise: Promise<AuthClient> | null = null;

export async function getAuth(): Promise<AuthClient> {
  if (auth) return auth;

  if (!authPromise) {
    authPromise = (async (): Promise<AuthClient> => {
      const secret = process.env.BETTER_AUTH_SECRET;

      if (!secret) {
        throw new Error("BETTER_AUTH_SECRET is not configured.");
      }

   
      const db = await getDb();

      const authConfig = {
        baseURL: process.env.BETTER_AUTH_URL,
        secret,
        database: mongodbAdapter(db, {
          // client,
        }),
        plugins: [
          jwt(),
        ],
        emailAndPassword: {
          enabled: true,
        },
       trustedOrigins: [
  "https://programming-hero-a-12-notepilot-ai.vercel.app",
 
],
        socialProviders: {
          google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
      } satisfies BetterAuthOptions;

      auth = betterAuth(authConfig) as unknown as AuthClient;
      return auth;
    })();
  }

  return authPromise;
}
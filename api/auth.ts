/// <reference types="node" />

import { betterAuth } from "better-auth";
import type { BetterAuthOptions } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { getDb } from "./db.js";


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

      // Normalize BETTER_AUTH_URL to avoid accidental /api suffixes from serverless rewrites
      const rawBetterAuthUrl = process.env.BETTER_AUTH_URL as string | undefined;
      const normalizedBetterAuthUrl = rawBetterAuthUrl ? rawBetterAuthUrl.replace(/\/api\/?$/, "").replace(/\/+$/, "") : undefined;

      const trustedOrigins = [
        process.env.FRONTEND_URL ?? process.env.CLIENT_URL,
        process.env.LOCAL_URL,
      ].filter(Boolean) as string[];

      const authConfig = {
        baseURL: normalizedBetterAuthUrl,
        secret,
        database: mongodbAdapter(db, {
          // client,
        }),
        plugins: [jwt()],
        emailAndPassword: {
          enabled: true,
        },
        trustedOrigins,
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

      // Diagnostic logs (safe - do not print secrets)
      console.log('Initializing Better Auth with baseURL:', normalizedBetterAuthUrl);
      console.log('Better Auth trustedOrigins:', trustedOrigins);

      auth = betterAuth(authConfig) as unknown as AuthClient;
      return auth;
    })();
  }

  return authPromise;
}

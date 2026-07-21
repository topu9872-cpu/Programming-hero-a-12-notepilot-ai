/// <reference types="node" />

import { betterAuth } from "better-auth";
import type { BetterAuthOptions } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { getDb } from "./db.js";
import type { Request, Response } from "express";

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
        plugins: [jwt()],
        emailAndPassword: {
          enabled: true,
        },
        trustedOrigins: ["https://notepilot-frontend.vercel.app"],
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

export async function getAuthSession(req: Request, res: Response) {
  const auth = await getAuth();
  const host = String(req.headers.host ?? process.env.BETTER_AUTH_URL ?? "localhost");
  const protocol = String(req.headers["x-forwarded-proto"] ?? req.protocol ?? "https").split(",")[0] || "https";
  const requestUrl = new URL("/api/auth/get-session", `${protocol}://${host}`);

  const HeadersClass = (globalThis as any).Headers;
  const requestHeaders = new HeadersClass();

  Object.entries(req.headers).forEach(([key, value]) => {
    if (value === undefined) return;
    if (Array.isArray(value)) {
      value.forEach((headerValue) => requestHeaders.append(key, String(headerValue)));
    } else {
      requestHeaders.append(key, String(value));
    }
  });

  const RequestClass = (globalThis as any).Request;
  const request = new RequestClass(requestUrl.toString(), {
    method: "GET",
    headers: requestHeaders,
  });

  const response = await auth.handler(request);

  response.headers.forEach((value: string, key: string) => {
    if (key.toLowerCase() === "set-cookie") {
      res.append("Set-Cookie", value);
    }
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}

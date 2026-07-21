import { createAuthClient } from "better-auth/react";

const API_BASE = (() => {
  const apiUrl = import.meta.env.VITE_API_URL as string | undefined;
  if (apiUrl && apiUrl !== "undefined") return apiUrl.replace(/\/$/, "");
  if (import.meta.env.MODE === "development") return "http://localhost:5000";
  // Fallback to deployed backend API path
  return "https://notepilot-backend.vercel.app/api";
})();

// The auth client expects the auth routes to be available under the auth prefix.
// Ensure baseURL ends with `/auth` so client requests go to e.g. /api/auth/sign-in
const AUTH_BASE = API_BASE.replace(/\/$/, "") + "/auth";

export const authClient = createAuthClient({
  baseURL: AUTH_BASE,
});

export const signUp = authClient.signUp;
export const signIn = authClient.signIn;
export const signOut = authClient.signOut;

export const useSession: typeof authClient.useSession = authClient.useSession;
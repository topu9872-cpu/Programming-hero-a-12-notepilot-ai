import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: `${
    import.meta.env.VITE_API_URL ||
    "https://notepilot-backend.vercel.app/api"
  }/auth`,
});

export const signUp = authClient.signUp;
export const signIn = authClient.signIn;
export const signOut = authClient.signOut;

export const useSession: typeof authClient.useSession =
  authClient.useSession;
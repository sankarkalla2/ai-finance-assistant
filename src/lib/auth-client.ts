import { polarClient } from "@polar-sh/better-auth";
import { magicLinkClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [polarClient(), magicLinkClient()],
});

export const { signIn, signOut, signUp, useSession } = authClient;

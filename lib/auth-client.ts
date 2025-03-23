import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

// Export commonly used methods
export const { signIn, signUp, useSession, signOut } = authClient; 
import NextAuth from "next-auth";
import { authOptions } from "config.ts"; // ← FIXED: goes up 3 folders to reach root

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };



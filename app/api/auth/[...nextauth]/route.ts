import NextAuth from "next-auth";
import { authOptions } from "@/app/lib/auth-options";

// Export the NextAuth handler directly - do not export authOptions here
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import { authOptions } from "../../../config"; // ← FIXED: goes up 3 folders to reach root

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

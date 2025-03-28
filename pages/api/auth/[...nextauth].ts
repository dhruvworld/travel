import NextAuth from "next-auth";
import { authOptions } from "../../../config"; // ✅ Correct relative import
// rebuild trigger

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

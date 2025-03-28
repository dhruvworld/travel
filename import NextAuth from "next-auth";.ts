import NextAuth from "next-auth";
import { authOptions } from "../../../config"; // ✅ Correct relative import

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

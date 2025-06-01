// lib/utils/verify-admin.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-options";

export async function verifyAdmin() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    throw new Error("Not authenticated");
  }

  // Check if user is admin based on email
  const adminEmails = process.env.ADMIN_EMAIL?.split(',') || [];
  if (!adminEmails.includes(session.user.email)) {
    throw new Error("Not authorized");
  }

  return session.user;
}

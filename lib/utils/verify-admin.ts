import { adminAuth } from "@/lib/firebase-admin";
import { NextRequest } from "next/server";

export async function verifyAdmin(req: NextRequest): Promise<boolean> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return false;

  const token = authHeader.replace("Bearer ", "");
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken.admin === true;
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
}

// Just for backward compatibility if anything expects authOptions (even though not needed anymore)
export const authOptions = {};

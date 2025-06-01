import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Example: protect /admin routes
  if (url.pathname.startsWith("/admin")) {
    const token = req.headers.get("authorization");
    if (!token) {
      url.pathname = "/auth/signin";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

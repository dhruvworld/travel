import { NextResponse } from "next/server";
<<<<<<< HEAD
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  const pathname = request.nextUrl.pathname;
  const isLoginPage = pathname === "/admin/login";
  const isAdminPath = pathname.startsWith("/admin") && !isLoginPage;

  // ✅ If accessing protected admin route
  if (isAdminPath) {
    if (!token || token.isAdmin !== true) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ✅ If already logged in and visits login page, redirect to dashboard
  if (isLoginPage && token?.isAdmin === true) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
=======
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
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27

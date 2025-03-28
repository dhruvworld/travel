// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  // Authentication configuration here
});

export const config = {
  matcher: [
    '/admin/:path*',
    '/profile/:path*',
  ],
};

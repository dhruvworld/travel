import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized: ({ token }) => {
      // Allow access only if the user is logged in
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/dashboard/:path*"], // Protect all dashboard routes
};

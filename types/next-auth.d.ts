import "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
    // Add other custom properties here
  }

  interface Session {
    user: User & {
      role?: string;
    };
  }

  interface JWT {
    role?: string;
  }
}

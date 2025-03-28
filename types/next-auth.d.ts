import "next-auth";
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    role?: string;
  }

  interface Session {
    user: {
      role?: string;
    } & DefaultSession["user"];
    expires: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}

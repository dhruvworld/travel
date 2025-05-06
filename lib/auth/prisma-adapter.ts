import { type PrismaClient } from "@prisma/client";

export async function PrismaAdapter(client: PrismaClient) {
  const { PrismaAdapter: _PrismaAdapter } = await import("@auth/prisma-adapter");
  return _PrismaAdapter(client);
}

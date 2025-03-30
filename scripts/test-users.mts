import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function main() {
  try {
    const user = await prisma.user.create({
      data: {
        name: "Dhruv",
        email: "dhruv@example.com"
      }
    });
    console.log("✅ User created:", user);
  } catch (error) {
    console.error("❌ Error while creating user:");
    if (error instanceof Error) {
      console.error("📛 Message:", error.message);
      console.error("📛 Stack:", error.stack);
      console.dir(error, { depth: null });
    } else {
      console.error("⚠️ Unknown error type:");
      console.dir(error, { depth: null });
    }
  } finally {
    console.log("🔌 Disconnecting Prisma...");
    await prisma.$disconnect();
  }
}
main();

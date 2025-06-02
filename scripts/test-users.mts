<<<<<<< HEAD
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
=======
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
  log: ['query', 'info', 'warn', 'error'],
});

async function main() {
  try {
<<<<<<< HEAD
    const user = await prisma.user.create({
=======
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
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
<<<<<<< HEAD
    await prisma.$disconnect();
=======
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
  }
}
main();

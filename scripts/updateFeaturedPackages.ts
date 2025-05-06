// scripts/updateFeaturedPackages.ts
import prisma from '../lib/prisma.js'; // Adjusted to relative path with .js extension

// Ensure the 'dayjs' package is installed by running: npm install dayjs
// If using TypeScript, also install types: npm install --save-dev @types/dayjs

import dayjs from 'dayjs';

const PACKAGES_PER_HOUR = 3;

async function main() {
  const now = dayjs();
  const hour = now.hour();

  const allPackages = await prisma.package.findMany({
    where: { published: true, isActive: true },
    orderBy: { createdAt: 'asc' }
  });

  const total = allPackages.length;
  const start = (hour * PACKAGES_PER_HOUR) % total;
  const nextFeatured = allPackages.slice(start, start + PACKAGES_PER_HOUR);

  if (nextFeatured.length === 0) {
    console.warn('⚠️ No packages available to feature.');
    return;
  }

  await prisma.package.updateMany({ data: { featured: false } });

  for (const pkg of nextFeatured) {
    await prisma.package.update({
      where: { id: pkg.id },
      data: { featured: true }
    });
  }

  console.log(`✅ Updated featured packages at ${hour}:00 → showing packages ${start + 1} to ${start + PACKAGES_PER_HOUR}`);
}

main().catch(err => {
  console.error('❌ Error rotating featured packages', err);
  process.exit(1);
});

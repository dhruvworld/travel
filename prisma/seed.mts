import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create a test admin
  await prisma.admin.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: '$2a$10$YGk8vfNGSQPtCvAy1Yx8puHg5CDY2GzU6Bx4a0TIWx.tCzKMGi9AC', // "password123"
      role: 'admin',
    },
  });

  // Create sample packages
  await prisma.package.upsert({
    where: { slug: 'bali-adventure' },
    update: {},
    create: {
      name: 'Bali Adventure',
      slug: 'bali-adventure',
      duration: 7,
      price: 1299.99,
      description: 'Experience the beauty of Bali with this 7-day adventure package.',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
      highlights: ['Temple tours', 'Beaches', 'Local cuisine', 'Water sports'],
      featured: true,
    },
  });

  await prisma.package.upsert({
    where: { slug: 'paris-getaway' },
    update: {},
    create: {
      name: 'Paris Getaway',
      slug: 'paris-getaway',
      duration: 5,
      price: 1499.99,
      description: 'Romantic 5-day trip to the city of lights.',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
      highlights: ['Eiffel Tower', 'Louvre Museum', 'Seine River cruise', 'French cuisine'],
      featured: true,
    },
  });

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

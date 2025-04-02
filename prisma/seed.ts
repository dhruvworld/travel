import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create a test admin user
  await prisma.admin.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: '$2a$10$YGk8vfNGSQPtCvAy1Yx8puHg5CDY2GzU6Bx4a0TIWx.tCzKMGi9AC', // "password123"
      role: 'admin',
    },
  })

  // Create sample packages
  await prisma.package.createMany({
    data: [
      {
        name: 'Golden Triangle Tour',
        slug: 'golden-triangle-tour',
        description: "Experience the rich history and culture of India's most iconic cities.",
        price: 35000,
        duration: 6,
        location: 'Delhi, Agra, Jaipur',
        image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da',
        highlights: ['Taj Mahal', 'Red Fort', 'Amber Palace', 'Qutub Minar'],
        featured: true,
        isActive: true,
        published: true,
      },
      {
        name: 'Kerala Backwaters',
        slug: 'kerala-backwaters',
        description: 'Cruise through the serene backwaters of Kerala on a traditional houseboat.',
        price: 28000,
        duration: 5,
        location: 'Alleppey, Kumarakom',
        image: 'https://images.unsplash.com/photo-1602215137037-573e1321fb79',
        highlights: ['Houseboat Stay', 'Ayurvedic Massage', 'Spice Plantations', 'Cultural Shows'],
        featured: true,
        isActive: true,
        published: true,
      },
      {
        name: 'Manali Adventure',
        slug: 'manali-adventure',
        description: 'A thrilling adventure in the mountains of Himachal Pradesh.',
        price: 22000,
        duration: 7,
        location: 'Manali, Rohtang Pass',
        image: 'https://images.unsplash.com/photo-1626621331169-5f34be280ed9',
        highlights: ['Paragliding', 'Skiing', 'Trekking', 'River Rafting'],
        featured: false,
        isActive: true,
        published: true,
      }
    ],
    skipDuplicates: true,
  })

  console.log('Database seeded!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

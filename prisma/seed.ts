import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.package.deleteMany({})

  // Create packages
  await prisma.package.createMany({
    data: [
      {
        name: 'Golden Triangle Tour',
        description: "Experience the rich history and culture of India's most iconic cities.",
        price: 35000,
        duration: 6,
        location: 'Delhi - Agra - Jaipur',
        image: '/images/golden-triangle.jpg',
        isActive: true,
      },
      {
        name: 'Kerala Backwaters',
        description: "Explore the serene backwaters and lush landscapes of God's own country.",
        price: 28000,
        duration: 5,
        location: 'Kerala',
        image: '/images/kerala.jpg',
        isActive: false,
      },
      {
        name: 'Rajasthan Heritage',
        description: 'Discover the royal heritage and desert beauty of Rajasthan.',
        price: 45000,
        duration: 8,
        location: 'Rajasthan',
        image: '/images/rajasthan.jpg',
        isActive: true,
      }
    ]
  })
}

console.log('Starting database seed...')
try {
  await main()
  console.log('✅ Database seeding completed')
} catch (error) {
  console.error('❌ Error seeding database:', error)
  throw error // Proper error propagation
} finally {
  await prisma.$disconnect()
}

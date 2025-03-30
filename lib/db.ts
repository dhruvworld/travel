import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function checkDatabaseConnection() {
  try {
    await prisma.$connect()
    // Test query to verify connection
    const result = await prisma.$queryRaw`SELECT 1+1 AS result`
    console.log('✅ Database connection successful')
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    throw new Error(`Database connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export { prisma }

import { PrismaClient } from '@prisma/client';

// Maximum number of connection retries
const MAX_RETRIES = 3;
// Delay between retries in ms
const RETRY_DELAY = 1000;

class PrismaService {
  private static instance: PrismaClient;
  private static isConnected = false;
  private static retryCount = 0;

  static getInstance(): PrismaClient {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaClient({
        // Add more detailed logging in non-production environments
        log: process.env.NODE_ENV === 'development' 
          ? ['query', 'error', 'warn'] 
          : ['error'],
      });
      
      // Attempt to connect right away in non-serverless environments
      if (process.env.NODE_ENV !== 'production' || !process.env.AWS_LAMBDA_FUNCTION_NAME) {
        PrismaService.connect();
      }
    }
    
    return PrismaService.instance;
  }

  static async connect(): Promise<void> {
    if (PrismaService.isConnected) return;
    
    try {
      await PrismaService.getInstance().$connect();
      PrismaService.isConnected = true;
      PrismaService.retryCount = 0;
      console.log('📦 Database connection established');
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      
      // Implement retry logic
      if (PrismaService.retryCount < MAX_RETRIES) {
        PrismaService.retryCount++;
        console.log(`Retrying connection (${PrismaService.retryCount}/${MAX_RETRIES})...`);
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        await PrismaService.connect();
      } else {
        console.error(`Failed to connect after ${MAX_RETRIES} attempts`);
        throw error;
      }
    }
  }

  static async disconnect(): Promise<void> {
    if (!PrismaService.instance || !PrismaService.isConnected) return;
    
    await PrismaService.instance.$disconnect();
    PrismaService.isConnected = false;
    console.log('📦 Database disconnected');
  }
}

// Export a singleton instance
const prisma = PrismaService.getInstance();

export { prisma, PrismaService };
export default prisma;

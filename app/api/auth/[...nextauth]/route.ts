import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth' // Change to named import

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

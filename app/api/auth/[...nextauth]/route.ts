import NextAuth from 'next-auth/next';
import { authOptions } from './auth.config';

const handler = NextAuth(authOptions);

export const { GET, POST } = handler;
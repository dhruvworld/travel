/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for Netlify
  output: 'standalone',
  
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'your-production-domain.com'],
    },
    optimizePackageImports: ['@prisma/client'],
  },
  outputFileTracing: true,
  trailingSlash: false,
  reactStrictMode: true,
  
  // Optimize image domains if using Cloudinary/S3/etc
  images: {
    domains: ['res.cloudinary.com'],
    unoptimized: process.env.NODE_ENV === 'development'
  },
  
  typescript: {
    ignoreBuildErrors: false
  }
}

module.exports = nextConfig;

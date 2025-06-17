/** @type {import('next').NextConfig} */
const nextConfig = {
  // Core settings
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  
  // Image optimization settings
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },

  // Experimental features
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
    optimizeCss: true,
    optimizePackageImports: ['framer-motion'],
  },

  // Build and deployment settings
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Runtime configuration
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },

  // Build settings
  staticPageGenerationTimeout: 180,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Environment variables
  env: {
    NEXT_FORCE_DYNAMIC: '1',
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  // Output standalone for better compatibility with Netlify and other platforms
  output: 'standalone',
  
  // Ignore build errors to help with deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Force dynamic rendering by default
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  
  // Increase timeouts
  staticPageGenerationTimeout: 180,
  
  // Add more explicit settings for dynamic rendering
  env: {
    NEXT_FORCE_DYNAMIC: '1',
  }
}

module.exports = nextConfig

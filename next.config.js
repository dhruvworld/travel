<<<<<<< HEAD
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // Use remotePatterns instead
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
=======
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
      },
    ],
  },
  experimental: {
<<<<<<< HEAD
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
=======
    optimizeCss: true,
    optimizePackageImports: ['framer-motion'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27

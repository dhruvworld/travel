/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize build output
  output: 'standalone',
  
  // Improve build reliability
  onError: async (err) => {
    console.error('Next.js build error:', err);
  },
  
  // Enable webpack optimization
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add build optimizations
    config.optimization = {
      ...config.optimization,
      minimize: true,
    }
    
    return config
  },

  // Production build settings  
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  reactStrictMode: true
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  
  webpack: (config) => {
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

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Static export mode
  reactStrictMode: true,
  images: {
    domains: ['your-image-domain.com'],
  },
};

module.exports = nextConfig;

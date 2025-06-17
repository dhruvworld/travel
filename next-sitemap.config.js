/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://shubhamtravel.in',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/admin/*', '/api/*'],
  robotsTxtOptions: {
policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
additionalSitemaps: [
      'https://shubhamtravel.in/sitemap.xml', // optional if you have multiple sitemaps
    ],
  },
};

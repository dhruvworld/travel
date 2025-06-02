/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://shubhamtravel.in',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/admin/*', '/api/*'],
  robotsTxtOptions: {
<<<<<<< HEAD
    additionalSitemaps: [
      'https://shubhamtravel.in/sitemap.xml',
    ],
=======
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
<<<<<<< HEAD
  },
}
=======
    additionalSitemaps: [
      'https://shubhamtravel.in/sitemap.xml', // optional if you have multiple sitemaps
    ],
  },
};
>>>>>>> 44ef0346a7c81ff5618abd514baaf7db50292d27

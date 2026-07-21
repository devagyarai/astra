import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/workspace', '/dashboard', '/archive', '/settings'],
    },
    sitemap: 'https://astra.devagyarai.com/sitemap.xml',
  };
}

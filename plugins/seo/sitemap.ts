import type { SiteRoute } from '../site-routes.js';

export function sitemapXml({ siteUrl, routes }: { siteUrl: string; routes: SiteRoute[] }): string {
  const now = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const urlEntries = routes.map((route) => {
    const priority = route.path === '/' ? '1.0' : '0.8';
    return [
      '  <url>',
      `    <loc>${siteUrl}${route.path}</loc>`,
      `    <lastmod>${now}</lastmod>`,
      '    <changefreq>monthly</changefreq>',
      `    <priority>${priority}</priority>`,
      '  </url>',
    ].join('\n');
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urlEntries,
    '</urlset>',
  ].join('\n');
}

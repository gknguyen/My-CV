import type { HtmlTagDescriptor, Plugin, ResolvedConfig } from 'vite';
import type { SiteRoute } from '../site-routes.js';
import { ogTags } from './og-tags.js';
import { sitemapXml } from './sitemap.js';

/** Injects Open Graph and Twitter Card meta tags, plus a canonical link, into `index.html`'s
 * `<head>`, so links to the site render a rich preview card (title, description, image) across
 * social platforms and chat apps (Facebook, LinkedIn, X/Twitter, Slack, Discord, etc.). Also
 * generates `sitemap.xml` (from `routes`, kept in sync with what `ssgPlugin` prerenders). */
export function seoPlugin({
  siteUrl,
  routes = [],
}: {
  siteUrl: string;
  routes?: SiteRoute[];
}): Plugin {
  let config: ResolvedConfig;

  return {
    name: 'seo-og-tags',
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    transformIndexHtml(): HtmlTagDescriptor[] {
      const canonicalTag: HtmlTagDescriptor = {
        tag: 'link',
        attrs: { rel: 'canonical', href: siteUrl },
        injectTo: 'head',
      };

      return [...ogTags({ siteUrl }), canonicalTag];
    },
    generateBundle() {
      // Skip emitting sitemap.xml during nested SSR builds.
      if (config.build.ssr) return;

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: sitemapXml({ siteUrl, routes }),
      });
    },
  };
}

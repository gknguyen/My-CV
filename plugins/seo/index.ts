import type { Plugin } from 'vite';
import { profile } from '../../src/data/profile';

const SITE_TITLE = 'GK Nguyen – Fullstack Engineer | MERN Stack Developer (Typescript, AWS)';
const SITE_DESCRIPTION =
  'Fullstack Engineer specializing in Typescript, NestJS, React.js, AWS, Kubernetes, and distributed systems. Portfolio, projects, and blog.';

function metaTags({
  siteUrl,
}: {
  siteUrl: string;
}): Array<{ attr: 'property' | 'name'; key: string; content: string }> {
  const image = `${siteUrl}${profile.avatar}`;

  return [
    // Open Graph — Facebook, LinkedIn, Slack, Discord, etc.
    { attr: 'property', key: 'og:type', content: 'website' },
    { attr: 'property', key: 'og:site_name', content: profile.name },
    { attr: 'property', key: 'og:locale', content: 'en_US' },
    { attr: 'property', key: 'og:title', content: SITE_TITLE },
    { attr: 'property', key: 'og:description', content: SITE_DESCRIPTION },
    { attr: 'property', key: 'og:url', content: siteUrl },
    { attr: 'property', key: 'og:image', content: image },

    // Twitter/X Cards
    { attr: 'name', key: 'twitter:card', content: 'summary_large_image' },
    { attr: 'name', key: 'twitter:title', content: SITE_TITLE },
    { attr: 'name', key: 'twitter:description', content: SITE_DESCRIPTION },
    { attr: 'name', key: 'twitter:image', content: image },
  ];
}

/** Injects Open Graph and Twitter Card meta tags into `index.html`'s `<head>`, so links to
 * the site render a rich preview card (title, description, image) across social platforms
 * and chat apps (Facebook, LinkedIn, X/Twitter, Slack, Discord, etc.). */
export function seoPlugin({ siteUrl }: { siteUrl: string }): Plugin {
  return {
    name: 'seo-og-tags',
    transformIndexHtml() {
      return metaTags({ siteUrl }).map(({ attr, key, content }) => ({
        tag: 'meta',
        attrs: { [attr]: key, content },
        injectTo: 'head',
      }));
    },
  };
}

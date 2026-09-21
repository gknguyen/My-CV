// AI/answer-engine crawlers explicitly allowed alongside the generic `User-agent: *` rule.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'Amazonbot',
  'meta-externalagent',
];

export function robotsTxt({ siteUrl }: { siteUrl: string }): string {
  const lines = [
    'User-agent: *',
    'Allow: /',
    ...AI_CRAWLERS.flatMap((agent) => [`User-agent: ${agent}`, 'Allow: /']),
    '',
    `Sitemap: ${siteUrl}/sitemap.xml`,
    `# llms.txt: ${siteUrl}/llms.txt`,
  ];

  return lines.join('\n');
}

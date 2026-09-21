import type { HtmlTagDescriptor, Plugin, ResolvedConfig } from 'vite';

import { personJsonLd } from './json-ld.js';
import { createLlmProfile, type LlmProfile } from './llm-profile.js';
import { robotsTxt } from './robots.js';

/** Bakes machine-readable profile data into the built site, so LLM/AEO crawlers that don't
 * execute JavaScript can read it directly (JSON-LD in `index.html`, plus `llms.txt` and
 * `robots.txt` with an explicit AI/answer-engine crawler allowlist). */
export function aeoPlugin({ siteUrl }: { siteUrl: string }): Plugin {
  const llmProfile = createLlmProfile(siteUrl);
  let config: ResolvedConfig;

  return {
    name: 'aeo-data',
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    transformIndexHtml(): HtmlTagDescriptor[] {
      return [
        {
          tag: 'link',
          attrs: {
            rel: 'alternate',
            type: 'text/markdown',
            href: '/llms.txt',
            title: 'LLM-readable profile',
          },
          injectTo: 'head',
        },
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          injectTo: 'head',
          children: JSON.stringify(personJsonLd(llmProfile)),
        },
      ];
    },
    generateBundle() {
      // Skip emitting llms.txt during nested SSR builds.
      if (config.build.ssr) return;

      const lines = [
        `# ${llmProfile.name}`,
        '',
        `> ${llmProfile.jobTitle}, ${llmProfile.yearsOfExperience}+ years of experience. ${llmProfile.summary}`,
        '',
        '## Contact',
        `- Portfolio: ${llmProfile.url}`,
        `- Email: ${llmProfile.email}`,
        ...llmProfile.sameAs.map((link: string) => `- ${link}`),
        '',
        '## Ideal roles',
        ...llmProfile.idealFor.map((item: string) => `- ${item}`),
        '',
        '## Skills',
        llmProfile.knowsAbout.join(', '),
        '',
        '## Education',
        `- ${llmProfile.alumniOf.name}${
          llmProfile.alumniOf.field ? ` (${llmProfile.alumniOf.field})` : ''
        }`,
        '',
        '## Languages',
        ...llmProfile.languages.map(
          (lang: LlmProfile['languages'][number]) =>
            `- ${lang.name}${lang.proficiency ? ` (${lang.proficiency})` : ''}`,
        ),
        '',
        '## Work history',
        ...llmProfile.workHistory.flatMap((job: LlmProfile['workHistory'][number]) => [
          `- **${job.jobTitle}**, ${job.organization} (${job.startDate} - ${
            job.endDate ?? 'present'
          }): ${job.summary}`,
          ...(job.projects.length > 0
            ? job.projects.map(
                (project) =>
                  `  - ${project.name}${project.position ? ` (${project.position})` : ''}: ${
                    project.description
                  }`,
              )
            : []),
        ]),
        '',
        '## Certifications',
        ...llmProfile.certifications.map((cert: LlmProfile['certifications'][number]) => {
          const name = cert.url ? `[${cert.name}](${cert.url})` : cert.name;
          return `- ${name} (${cert.issuer})`;
        }),
        '',
        '## Certification roadmap',
        `- ${llmProfile.certificationRoadmap.title}`,
        ...llmProfile.certificationRoadmap.milestones.map(
          (milestone) => `  - ${milestone.achieved ? '✓' : '○'} ${milestone.name}`,
        ),
        ...llmProfile.certificationRoadmap.stretchGoals.map((goal) => `  - (stretch) ${goal}`),
        '',
        '## Personal projects',
        ...llmProfile.projects.map((project: LlmProfile['projects'][number]) => {
          const name = project.url ? `[${project.name}](${project.url})` : project.name;
          return `- ${name}${project.type ? ` (${project.type})` : ''}${
            project.period ? ` • ${project.period}` : ''
          }: ${project.description}`;
        }),
        '',
        '## Resources',
        `- Resume: ${siteUrl}/resumes/nguyen-truong-giang.pdf`,
        `- UI v1: ${siteUrl}/v1`,
        `- UI v2: ${siteUrl}/v2`,
        '',
      ];

      this.emitFile({
        type: 'asset',
        fileName: 'llms.txt',
        source: lines.join('\n'),
      });

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: robotsTxt({ siteUrl }),
      });
    },
  };
}

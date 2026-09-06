import type { Plugin } from 'vite';

import { createLlmProfile, type LlmProfile } from './llm-profile';

function personJsonLd(llmProfile: LlmProfile) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: llmProfile.name,
    alternateName: llmProfile.alternateName,
    jobTitle: llmProfile.jobTitle,
    description: llmProfile.summary,
    url: llmProfile.url,
    image: llmProfile.image,
    email: `mailto:${llmProfile.email}`,
    telephone: llmProfile.telephone,
    gender: llmProfile.gender,
    birthDate: llmProfile.birthDate,
    address: {
      '@type': 'PostalAddress',
      addressLocality: llmProfile.address.addressLocality,
      addressCountry: llmProfile.address.addressCountry,
    },
    sameAs: llmProfile.sameAs,
    knowsAbout: llmProfile.knowsAbout,
    knowsLanguage: llmProfile.languages.map((lang: LlmProfile['languages'][number]) => lang.name),
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: llmProfile.alumniOf.name,
    },
    hasCredential: llmProfile.certifications.map((cert: LlmProfile['certifications'][number]) => ({
      '@type': 'EducationalOccupationalCredential',
      name: cert.name,
      credentialCategory: 'certification',
      recognizedBy: { '@type': 'Organization', name: cert.issuer },
      ...('url' in cert && cert.url ? { url: cert.url } : {}),
    })),
    worksFor: llmProfile.workHistory
      .filter((job: LlmProfile['workHistory'][number]) => job.endDate === null)
      .map((job: LlmProfile['workHistory'][number]) => ({
        '@type': 'Organization',
        name: job.organization,
      })),
  };
}

/** Bakes machine-readable profile data into the built site, so LLM/AEO crawlers that don't
 * execute JavaScript can read it directly (JSON-LD in `index.html`, plus `llms.txt`). */
export function aeoPlugin({ siteUrl }: { siteUrl: string }): Plugin {
  const llmProfile = createLlmProfile(siteUrl);

  return {
    name: 'aeo-data',
    transformIndexHtml() {
      return [
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          injectTo: 'head',
          children: JSON.stringify(personJsonLd(llmProfile)),
        },
      ];
    },
    generateBundle() {
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
        '## Work history',
        ...llmProfile.workHistory.map(
          (job: LlmProfile['workHistory'][number]) =>
            `- **${job.jobTitle}**, ${job.organization} (${job.startDate} - ${job.endDate ?? 'present'}): ${job.summary}`,
        ),
        '',
        '## Certifications',
        ...llmProfile.certifications.map((cert: LlmProfile['certifications'][number]) => {
          const name = cert.url ? `[${cert.name}](${cert.url})` : cert.name;
          return `- ${name} (${cert.issuer})`;
        }),
        '',
        '## Personal projects',
        ...llmProfile.projects.map((project: LlmProfile['projects'][number]) => {
          const name = project.url ? `[${project.name}](${project.url})` : project.name;
          return `- ${name}: ${project.description}`;
        }),
        '',
      ];

      this.emitFile({
        type: 'asset',
        fileName: 'llms.txt',
        source: lines.join('\n'),
      });
    },
  };
}

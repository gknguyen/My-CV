import type { LlmProfile } from './llm-profile.js';

function toCreativeWork(
  project: LlmProfile['projects'][number] | LlmProfile['workHistory'][number]['projects'][number],
  siteUrl: string,
  producerOrg?: string,
) {
  const base: Record<string, unknown> = {
    '@type': 'CreativeWork',
    name: project.name,
    description: project.description,
    creator: { '@id': `${siteUrl}#person` },
  };

  if ('url' in project && project.url) {
    base.url = project.url;
  }

  if (producerOrg) {
    base.producer = { '@type': 'Organization', name: producerOrg };
  }

  return base;
}

export function personJsonLd(llmProfile: LlmProfile) {
  const personDescription = `${llmProfile.jobTitle}, ${llmProfile.yearsOfExperience}+ years of experience. ${llmProfile.summary}`;

  const personNode = {
    '@id': `${llmProfile.url}#person`,
    '@type': 'Person',
    name: llmProfile.name,
    alternateName: llmProfile.alternateName,
    jobTitle: llmProfile.jobTitle,
    description: personDescription,
    url: llmProfile.url,
    image: llmProfile.image,
    email: `mailto:${llmProfile.email}`,
    gender: llmProfile.gender,
    birthDate: llmProfile.birthDate,
    sameAs: llmProfile.sameAs,
    knowsAbout: llmProfile.knowsAbout,
    knowsLanguage: llmProfile.languages.map((lang: LlmProfile['languages'][number]) => lang.name),
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: llmProfile.alumniOf.name,
      ...(llmProfile.alumniOf.field ? { department: llmProfile.alumniOf.field } : {}),
    },
    hasCredential: llmProfile.certifications.map((cert: LlmProfile['certifications'][number]) => ({
      '@type': 'EducationalOccupationalCredential',
      name: cert.name,
      credentialCategory: 'certification',
      recognizedBy: { '@type': 'Organization', name: cert.issuer },
      ...('url' in cert && cert.url ? { url: cert.url } : {}),
    })),
    workHistory: llmProfile.workHistory.map((job: LlmProfile['workHistory'][number]) => ({
      '@type': 'OrganizationRole',
      roleName: job.jobTitle,
      startDate: job.startDate,
      ...(job.endDate ? { endDate: job.endDate } : {}),
      description: job.summary,
      organization: { '@type': 'Organization', name: job.organization },
    })),
  };

  // Collect all CreativeWork nodes (projects from both sources).
  const creativeWorks: Record<string, unknown>[] = [];

  // Personal projects.
  for (const project of llmProfile.projects) {
    creativeWorks.push(toCreativeWork(project, llmProfile.url));
  }

  // Work history projects.
  for (const job of llmProfile.workHistory) {
    for (const project of job.projects) {
      creativeWorks.push(toCreativeWork(project, llmProfile.url, job.organization));
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [personNode, ...creativeWorks],
  };
}

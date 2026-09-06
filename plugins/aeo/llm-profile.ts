import { APPLICATION_ARCHITECT } from '../../src/data/aws-roadmap.js';
import { profile } from '../../src/data/profile.js';
import { TECH_STACKS } from '../../src/data/tech-stack.js';
import { isUrl } from '../../src/shared/helper.js';

function toYearMonth(monthYear: string): string {
  const date = new Date(`1 ${monthYear}`);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${date.getFullYear()}-${month}`;
}

// Local-time formatting on purpose: `Date#toISOString()` converts to UTC first, which can
// shift the calendar day backward depending on the machine's timezone offset.
function toIsoDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function parsePeriod(period: string): { startDate: string; endDate: string | null } {
  const [startRaw, endRaw] = period.split(/[-–]/).map((part) => part.trim());
  return {
    startDate: toYearMonth(startRaw),
    endDate: /now/i.test(endRaw) ? null : toYearMonth(endRaw),
  };
}

function toUrl(value: string): string {
  return isUrl(value) ? value : `https://${value}`;
}

function normalizeVnPhone(phone: string): string {
  return `+84${phone.replace(/^0/, '')}`;
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// These `TECH_STACKS` entries are generic category groupings (used only to anchor an icon in
// the UI), not real technologies — skip the umbrella name but keep its addons.
const GENERIC_TECH_STACK_CATEGORIES = new Set(['Database', 'Messaging', 'IaC']);

function flattenTechStackNames(): string[] {
  const names = TECH_STACKS.flatMap((stack) => [
    ...(GENERIC_TECH_STACK_CATEGORIES.has(stack.name) ? [] : [stack.name]),
    ...(stack.addons?.map((addon) => addon.name) ?? []),
  ]);
  return Array.from(new Set(names));
}

function parseLanguage(entry: string): { name: string; proficiency: string | null } {
  const match = /^(.+?)\s*\((.+)\)$/.exec(entry);
  return match ? { name: match[1], proficiency: match[2] } : { name: entry, proficiency: null };
}

/**
 * Canonical, machine-readable summary of this site's owner — derived from the
 * same data that powers the UI (`profile.ts`, `aws-roadmap.ts`, `tech-stack.ts`),
 * reshaped into a schema.org-friendly, LLM/AEO-friendly structure.
 *
 * `siteUrl` is passed in (rather than read from `import.meta.env`) because this
 * runs inside `vite.config.ts` itself, where `import.meta.env` is not defined —
 * `vite.config.ts` reads it from `.env` (`VITE_APP_DOMAIN`) via `loadEnv` and
 * passes it through.
 */
export function createLlmProfile(siteUrl: string) {
  const latestJob = profile.experiences[0];
  const [birthday, gender, location, school] = profile.personals;
  const contact = Object.fromEntries(profile.contacts.map((c) => [c.key, c.content]));
  const languageSkills = profile.skills.find((s) => s.category === 'Languages')?.list ?? [];

  const earnedAwsCerts = (profile.certificates.find((c) => c.key === 'aws')?.list ?? []).map(
    (cert) => normalize(cert.name),
  );

  return {
    name: profile.name,
    alternateName: 'GK Nguyen',
    jobTitle: latestJob.position,
    url: siteUrl,
    image: `${siteUrl}${profile.avatar}`,
    email: contact.email,
    telephone: normalizeVnPhone(contact.phone),
    gender: gender.content,
    birthDate: toIsoDate(new Date(birthday.content)),
    address: {
      addressLocality: location.content,
      addressCountry: 'VN',
    },

    summary: profile.about.join(' '),
    yearsOfExperience: Number(profile.yearOfExp.match(/\d+/)?.[0] ?? 0),

    idealFor: [
      'Senior/Staff Full-Stack or Backend Engineer roles',
      'Technical Architect / Tech Lead roles owning system design end-to-end',
      'Teams building distributed systems, real-time data pipelines, or IoT data platforms',
      'Cloud-native teams standardizing on AWS/GCP, Kubernetes, and GitOps (ArgoCD)',
    ],

    languages: languageSkills.map(parseLanguage),

    sameAs: profile.contacts.reduce<string[]>((urls, c) => {
      if (c.type === 'url' && c.key !== 'portfolio') urls.push(toUrl(c.content));
      return urls;
    }, []),

    alumniOf: {
      name: school.content,
      field: school.subContent ?? null,
    },

    knowsAbout: flattenTechStackNames(),

    certificationRoadmap: {
      title: APPLICATION_ARCHITECT.title,
      milestones: APPLICATION_ARCHITECT.certs.map((cert) => ({
        name: cert.title,
        achieved: earnedAwsCerts.some(
          (earned) =>
            earned.includes(normalize(cert.title)) || normalize(cert.title).includes(earned),
        ),
      })),
      stretchGoals: APPLICATION_ARCHITECT.addons.map((addon) => addon.title),
    },

    certifications: profile.certificates.flatMap((provider) => {
      const certList = provider.list as Array<{ name: string; isShow: boolean; link?: string }>;
      return certList.reduce<Array<{ name: string; issuer: string; url: string | null }>>(
        (shown, cert) => {
          if (cert.isShow) {
            shown.push({ name: cert.name, issuer: provider.name, url: cert.link ?? null });
          }
          return shown;
        },
        [],
      );
    }),

    workHistory: profile.experiences.map((job) => ({
      organization: job.title,
      jobTitle: job.position,
      ...parsePeriod(job.period),
      summary: job.descriptions.join(' '),
      projects: (job.projects ?? []).map((project) => ({
        name: project.name,
        position: project.position,
        description: project.descriptions.join(' '),
      })),
    })),

    projects: profile.projects.map((project) => {
      const url = project.descriptions.find(isUrl) ?? null;
      return {
        name: project.title,
        type: project.type,
        period: project.period,
        url,
        description: project.descriptions.filter((d) => !isUrl(d)).join(' '),
      };
    }),
  };
}

export type LlmProfile = ReturnType<typeof createLlmProfile>;

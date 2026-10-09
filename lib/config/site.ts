/**
 * Single source of truth for product identity. Change the name here only.
 */
export const siteConfig = {
  name: 'BELLORA.PULSE',
  brandTagline: 'AI intelligence, daily.',
  tagline: 'AI and startup news, collected automatically.',
  description:
    'bellora.pulse collects artificial intelligence and startup headlines from across the web and links you straight to the original publisher.',
  /** Leave a URL empty to display its footer icon without an active link. */
  socialLinks: {
    linkedin: '',
    github: '',
    x: '',
  },
  /** Default page size for the article grid. */
  defaultPageSize: 12,
  /** Hard ceiling accepted by GET /api/articles. */
  maxPageSize: 48,
} as const;

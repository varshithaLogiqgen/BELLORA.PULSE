import Link from 'next/link';
import { tools } from '@/lib/tools/catalog';
import { shows } from '@/lib/podcasts/catalog';

export function ExploreSections() {
  const sections = [
    {
      href: '/tools',
      eyebrow: 'Discover',
      title: 'Your next AI tool',
      description: 'Find a tool for your task, from coding to creative work.',
      detail: `${tools.length} tools · Browse A–Z`,
      mark: '↗',
    },
    {
      href: '/podcasts',
      eyebrow: 'Listen',
      title: 'Ideas worth your time',
      description:
        'Hear from the people researching, building, and applying AI.',
      detail: `${shows.length} shows · Find your next listen`,
      mark: '♫',
    },
  ];
  return (
    <section className="my-8" aria-labelledby="explore-heading">
      <div className="mb-4 flex items-center gap-3">
        <h2 id="explore-heading" className="text-xl font-semibold">
          Go beyond the headlines
        </h2>
        <span className="directory-badge">Explore</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <Link
            href={section.href}
            key={section.href}
            className="directory-card group"
          >
            <div className="flex items-center justify-between">
              <span className="section-eyebrow">{section.eyebrow}</span>
              <span aria-hidden="true" className="text-2xl text-accent">
                {section.mark}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold group-hover:text-accent">
              {section.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">
              {section.description}
            </p>
            <p className="mt-5 text-xs font-semibold text-accent">
              {section.detail} →
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

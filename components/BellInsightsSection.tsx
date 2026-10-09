'use client';

import { useEffect, useState } from 'react';

type BellPost = {
  id: number;
  date: string;
  link: string;
  title: { rendered: string };
  acf?: { main_image?: string };
};

function decodeHtml(html: string): string {
  if (typeof window === 'undefined') return html;
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

function getTag(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes('podcast')) return 'PODCAST';
  if (lower.includes('press release') || lower.includes('partners') || lower.includes('partner')) return 'PRESS RELEASE';
  return 'INSIGHT';
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function TagBadge({ tag }: { tag: string }) {
  const colours: Record<string, string> = {
    'PRESS RELEASE': 'bg-[rgb(var(--color-navy))] text-white',
    PODCAST: 'bg-[rgb(var(--color-accent-soft))] text-[rgb(var(--color-accent))]',
    INSIGHT: 'bg-[rgb(var(--color-ocean-soft))] text-[rgb(var(--color-ocean))]',
  };
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${colours[tag] ?? colours['INSIGHT']}`}
    >
      {tag}
    </span>
  );
}

function CardImage({ src, alt }: { src?: string; alt: string }) {
  return (
    <div
      className="h-full w-full bg-cover bg-center"
      style={{
        backgroundImage: src ? `url(${src})` : 'var(--ocean-gradient)',
      }}
      aria-label={alt}
      role="img"
    >
      {!src && (
        <div className="flex h-full min-h-[180px] items-center justify-center opacity-25">
          <svg viewBox="0 0 40 40" className="h-14 w-14 text-white" fill="currentColor">
            <circle cx="8" cy="20" r="6" />
            <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </div>
      )}
    </div>
  );
}

function SmallCard({ post }: { post: BellPost }) {
  const title = decodeHtml(post.title.rendered);
  const tag = getTag(title);
  const img = post.acf?.main_image;
  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="h-[180px] overflow-hidden">
        <CardImage src={img} alt={title} />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2.5">
          <TagBadge tag={tag} />
          <span className="text-xs text-fg-muted">{formatDate(post.date)}</span>
        </div>
        <p className="text-sm font-semibold leading-snug text-fg group-hover:text-accent">
          {title}
        </p>
        <p className="mt-auto pt-1 text-xs font-medium text-accent">
          Read on bell-integration.com ↗
        </p>
      </div>
    </a>
  );
}

function FeaturedCard({ post }: { post: BellPost }) {
  const title = decodeHtml(post.title.rendered);
  const tag = getTag(title);
  const img = post.acf?.main_image;
  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group col-span-2 flex min-h-[260px] overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div className="w-[45%] shrink-0 overflow-hidden">
        <CardImage src={img} alt={title} />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-4 p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <TagBadge tag={tag} />
          <span className="text-xs text-fg-muted">{formatDate(post.date)}</span>
        </div>
        <p className="text-xl font-bold leading-snug tracking-tight text-fg group-hover:text-accent sm:text-2xl">
          {title}
        </p>
        <p className="text-sm font-semibold text-accent">
          Read on bell-integration.com ↗
        </p>
      </div>
    </a>
  );
}

export function BellInsightsSection() {
  const [posts, setPosts] = useState<BellPost[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/bell-insights')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setPosts(data.slice(0, 5));
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  if (loaded && posts.length === 0) return null;

  const [featured, ...rest] = posts;

  return (
    <section className="my-14" aria-labelledby="bell-insights-heading">
      {/* Section header */}
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="section-eyebrow mb-2 flex items-center gap-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            Company Insights
          </p>
          <h2
            id="bell-insights-heading"
            className="text-2xl font-bold tracking-tight text-fg sm:text-3xl"
          >
            From Bell Integration
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-fg-muted">
            The latest articles, podcasts and announcements from our own team,
            straight from bell-integration.com.
          </p>
        </div>
        <a
          href="https://www.bell-integration.com/insights/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
        >
          View all insights ↗
        </a>
      </div>

      {/* Skeleton */}
      {!loaded && (
        <div className="grid gap-6 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-[280px] animate-pulse rounded-2xl bg-surface" />
          ))}
        </div>
      )}

      {/* Cards */}
      {loaded && posts.length > 0 && (
        <>
          {/* Top row: featured (2 cols) + one small card */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {featured && <FeaturedCard post={featured} />}
            {rest[0] && <SmallCard post={rest[0]} />}
          </div>

          {/* Bottom row: remaining small cards */}
          {rest.length > 1 && (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {rest.slice(1).map((post) => (
                <SmallCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}

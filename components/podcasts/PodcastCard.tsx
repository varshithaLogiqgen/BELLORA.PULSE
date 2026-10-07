'use client';
import Link from 'next/link';
import {
  shows,
  type PodcastShow,
  type PodcastEpisode,
} from '@/lib/podcasts/catalog';
import { SaveResourceButton } from '@/components/directory/SaveResourceButton';

export function PodcastCard({ show }: { show: PodcastShow }) {
  return (
    <article className="directory-card">
      <div className="podcast-cover" data-tone={show.slug.length % 3}>
        <span className="text-xs font-semibold uppercase tracking-widest">
          AI / On air
        </span>
        <span className="my-6 font-display text-2xl font-bold">
          {show.title}
        </span>
        <span aria-hidden="true" className="podcast-wave">
          ▂ ▅ ▃ ▇ ▄ ▆ ▂ ▅ ▇ ▃ ▅ ▂
        </span>
      </div>
      <h2 className="mt-5 text-xl font-semibold">
        <Link className="hover:text-accent" href={`/podcasts/${show.slug}`}>
          {show.title}
        </Link>
      </h2>
      <p className="mt-2 text-xs text-fg-muted">
        {show.host} · {show.language}
      </p>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-fg-muted">
        {show.description}
      </p>
      <div className="my-5 flex flex-wrap gap-2">
        {show.topics.map((topic) => (
          <span key={topic} className="directory-tag">
            {topic}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <Link
          className="text-sm font-semibold text-accent hover:underline"
          href={`/podcasts/${show.slug}`}
        >
          Explore show →
        </Link>
        <SaveResourceButton kind="shows" id={show.slug} title={show.title} />
      </div>
    </article>
  );
}
export function EpisodeCard({ episode }: { episode: PodcastEpisode }) {
  const show = shows.find((item) => item.slug === episode.showSlug);
  return (
    <article className="directory-panel">
      <div className="flex flex-wrap items-center gap-3 text-xs text-fg-muted">
        <Link
          href={`/podcasts/${episode.showSlug}`}
          className="font-semibold text-accent hover:underline"
        >
          {show?.title}
        </Link>
        <time dateTime={episode.publishedAt}>
          {new Date(`${episode.publishedAt}T00:00:00Z`).toLocaleDateString(
            'en-GB',
            {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              timeZone: 'UTC',
            },
          )}
        </time>
        {episode.durationMinutes && (
          <span>About {episode.durationMinutes} min</span>
        )}
      </div>
      <h2 className="mt-3 text-lg font-semibold leading-relaxed">
        {episode.title}
      </h2>
      {episode.guest && (
        <p className="mt-2 text-xs text-fg-muted">With {episode.guest}</p>
      )}
      <p className="my-4 text-sm leading-relaxed text-fg-muted">
        {episode.summary}
      </p>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <a
          href={episode.episodeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-accent hover:underline"
        >
          Listen on publisher site ↗
        </a>
        <SaveResourceButton
          kind="episodes"
          id={episode.id}
          title={episode.title}
        />
      </div>
    </article>
  );
}

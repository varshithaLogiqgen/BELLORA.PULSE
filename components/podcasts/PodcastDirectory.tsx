'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  shows,
  episodes,
  podcastTopics,
  filterEpisodes,
  type PodcastShow,
} from '@/lib/podcasts/catalog';
import { matchesSearch } from '@/lib/utils/directory';
import { useSavedResources } from '@/lib/hooks/useSavedResources';
import {
  DirectoryHero,
  DirectorySearch,
  DirectorySelect,
  DirectoryEmpty,
  selectOptions,
} from '@/components/directory/DirectoryUI';
import { SaveResourceButton } from '@/components/directory/SaveResourceButton';
import { PodcastCard, EpisodeCard } from './PodcastCard';

export function PodcastDirectory({ show }: { show?: PodcastShow }) {
  const [view, setView] = useState<'shows' | 'episodes'>(
    show ? 'episodes' : 'shows',
  );
  const [search, setSearch] = useState('');
  const [topic, setTopic] = useState('');
  const [sort, setSort] = useState('newest');
  const [savedOnly, setSavedOnly] = useState(false);
  const { savedIds: savedShows } = useSavedResources('shows');
  const { savedIds: savedEpisodes } = useSavedResources('episodes');
  const filteredShows = shows.filter(
    (item) =>
      matchesSearch(search, [
        item.title,
        item.host,
        item.description,
        ...item.topics,
      ]) &&
      (!topic || item.topics.includes(topic)) &&
      (!savedOnly || savedShows.includes(item.slug)),
  );
  const filteredEpisodes = filterEpisodes(
    episodes,
    search,
    topic,
    show?.slug ?? '',
    sort,
  ).filter((episode) => !savedOnly || savedEpisodes.includes(episode.id));
  const count =
    view === 'shows' ? filteredShows.length : filteredEpisodes.length;
  const reset = () => {
    setSearch('');
    setTopic('');
    setSort('newest');
    setSavedOnly(false);
  };
  return (
    <div className="directory-page" id="podcast-directory">
      {show && (
        <Link href="/podcasts" className="directory-back">
          ← All podcasts
        </Link>
      )}
      <DirectoryHero
        eyebrow={show ? show.host : 'Press play. Stay curious.'}
        title={show ? show.title : 'AI, in good company.'}
        description={
          show
            ? show.description
            : 'Meet the people building AI. Discover thoughtful conversations, technical deep dives, and ideas worth listening to.'
        }
      >
        {show ? (
          <>
            <span className="directory-badge">{show.language}</span>
            <SaveResourceButton
              kind="shows"
              id={show.slug}
              title={show.title}
            />
          </>
        ) : (
          <>
            <span className="directory-badge">
              {shows.length} curated shows
            </span>
            <span className="directory-badge">
              {episodes.length} selected episodes
            </span>
          </>
        )}
      </DirectoryHero>
      {show && (
        <div className="my-6">
          <div className="flex flex-wrap gap-3">
            {show.listeningLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="directory-button"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
          <p className="mt-3 text-xs text-fg-muted">
            Links checked {show.verifiedAt}
          </p>
        </div>
      )}
      {!show && (
        <div
          className="my-6 flex gap-5 border-b border-border"
          role="group"
          aria-label="Podcast view"
        >
          <button
            className="creator-view-tab"
            aria-pressed={view === 'shows'}
            onClick={() => setView('shows')}
          >
            Discover shows
          </button>
          <button
            className="creator-view-tab"
            aria-pressed={view === 'episodes'}
            onClick={() => setView('episodes')}
          >
            Selected episodes
          </button>
        </div>
      )}
      <section className="directory-filters mt-6" aria-label="Filter podcasts">
        <DirectorySearch
          value={search}
          onChange={setSearch}
          placeholder={
            view === 'shows'
              ? 'Search shows, hosts, or topics…'
              : 'Search episodes, guests, or topics…'
          }
        />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <DirectorySelect
            label="Topic"
            value={topic}
            onChange={setTopic}
            options={selectOptions(podcastTopics, 'All topics')}
          />
          {view === 'episodes' && (
            <DirectorySelect
              label="Sort episodes"
              value={sort}
              onChange={setSort}
              options={[
                { value: 'newest', label: 'Newest first' },
                { value: 'oldest', label: 'Oldest first' },
              ]}
            />
          )}
        </div>
        <div className="mt-5 flex flex-wrap gap-5 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={savedOnly}
              onChange={(event) => setSavedOnly(event.target.checked)}
            />
            {view === 'shows' ? 'Saved shows' : 'Listen later'}
          </label>
          <button className="text-accent hover:underline" onClick={reset}>
            Reset filters
          </button>
        </div>
      </section>
      <p role="status" className="my-5 text-sm text-fg-muted">
        {count} {view === 'shows' ? 'shows' : 'episodes'} found
      </p>
      {count > 0 ? (
        view === 'shows' ? (
          <div className="directory-grid">
            {filteredShows.map((item) => (
              <PodcastCard key={item.slug} show={item} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        )
      ) : (
        <DirectoryEmpty
          onReset={reset}
          message={
            show && !episodes.some((episode) => episode.showSlug === show.slug)
              ? 'We have not selected episodes for this show yet. Use the listening links above to explore its full catalog.'
              : undefined
          }
        />
      )}
      <p className="mt-8 text-xs leading-relaxed text-fg-muted">
        Episodes are handpicked and link to their publishers. Browse each show’s
        official page for its full catalog and newest releases.
      </p>
    </div>
  );
}

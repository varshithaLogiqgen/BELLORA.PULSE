'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArticleGrid } from '@/components/ArticleGrid';
import { SkeletonGrid } from '@/components/states/SkeletonGrid';
import { clearBookmarks, removeBookmark } from '@/lib/bookmarks';
import { useBookmarks } from '@/lib/hooks/useBookmarks';
import { useSavedResources } from '@/lib/hooks/useSavedResources';
import { tools } from '@/lib/tools/catalog';
import { questions } from '@/lib/interviews/catalog';
import { shows, episodes } from '@/lib/podcasts/catalog';
import { ToolCard } from '@/components/tools/ToolCard';
import { QuestionCard } from '@/components/interviews/QuestionCard';
import { PodcastCard, EpisodeCard } from '@/components/podcasts/PodcastCard';
import {
  DirectoryHero,
  DirectoryEmpty,
} from '@/components/directory/DirectoryUI';

export function SavedView() {
  const bookmarks = useBookmarks();
  const savedTools = useSavedResources('tools');
  const savedQuestions = useSavedResources('questions');
  const savedShows = useSavedResources('shows');
  const savedEpisodes = useSavedResources('episodes');
  const params = useSearchParams();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const toolItems = tools.filter((item) =>
    savedTools.savedIds.includes(item.slug),
  );
  const questionItems = questions.filter((item) =>
    savedQuestions.savedIds.includes(item.id),
  );
  const showItems = shows.filter((item) =>
    savedShows.savedIds.includes(item.slug),
  );
  const episodeItems = episodes.filter((item) =>
    savedEpisodes.savedIds.includes(item.id),
  );
  const tabs = [
    { id: 'articles', label: 'Articles', count: bookmarks.length, href: '/' },
    { id: 'tools', label: 'Tools', count: toolItems.length, href: '/tools' },
    {
      id: 'questions',
      label: 'Questions',
      count: questionItems.length,
      href: '/interviews',
    },
    { id: 'shows', label: 'Shows', count: showItems.length, href: '/podcasts' },
    {
      id: 'episodes',
      label: 'Listen later',
      count: episodeItems.length,
      href: '/podcasts',
    },
  ];
  const selected = tabs.find((tab) => tab.id === params.get('tab')) ?? tabs[0];
  return (
    <div className="directory-page">
      <DirectoryHero
        eyebrow="Keep something good"
        title="Your saved collection"
        description="Tools to try, questions to practise, and conversations for later. Saved items stay in this browser and are not synced to an account."
      />
      <nav aria-label="Saved collections" className="my-6 flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={'/saved?tab=' + tab.id}
            scroll={false}
            className="directory-button"
            aria-current={selected.id === tab.id ? 'page' : undefined}
          >
            {tab.label}{' '}
            <span className="directory-tag">{mounted ? tab.count : '–'}</span>
          </Link>
        ))}
        <Link href="/jobs?saved=true" className="directory-button">
          Saved jobs ↗
        </Link>
      </nav>
      {!mounted ? (
        <SkeletonGrid count={3} />
      ) : (
        <>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold">{selected.label}</h2>
            <Link
              href={selected.href}
              className="text-sm font-semibold text-accent hover:underline"
            >
              Explore more →
            </Link>
          </div>
          {selected.count === 0 && (
            <DirectoryEmpty message="Save an item while exploring and it will appear here." />
          )}
          {selected.id === 'articles' && bookmarks.length > 0 && (
            <>
              <button
                className="directory-button mb-5"
                onClick={clearBookmarks}
              >
                Remove all saved articles
              </button>
              <ArticleGrid
                articles={bookmarks}
                label="Saved articles"
                onRemove={removeBookmark}
              />
            </>
          )}
          {selected.id === 'tools' && (
            <div className="directory-grid">
              {toolItems.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          )}
          {selected.id === 'questions' && (
            <div className="space-y-5">
              {questionItems.map((question) => (
                <QuestionCard key={question.id} question={question} />
              ))}
            </div>
          )}
          {selected.id === 'shows' && (
            <div className="directory-grid">
              {showItems.map((show) => (
                <PodcastCard key={show.slug} show={show} />
              ))}
            </div>
          )}
          {selected.id === 'episodes' && (
            <div className="space-y-5">
              {episodeItems.map((episode) => (
                <EpisodeCard key={episode.id} episode={episode} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

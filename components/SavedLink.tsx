'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useBookmarks } from '@/lib/hooks/useBookmarks';
import { useSavedResources } from '@/lib/hooks/useSavedResources';

export function SavedLink() {
  const bookmarks = useBookmarks();
  const pathname = usePathname();
  const savedTools = useSavedResources('tools');
  const savedShows = useSavedResources('shows');
  const savedEpisodes = useSavedResources('episodes');
  const count = bookmarks.length +
      savedTools.savedIds.length +
      savedShows.savedIds.length +
      savedEpisodes.savedIds.length;
  const tab = pathname.startsWith('/tools')
    ? 'tools'
    : pathname.startsWith('/podcasts')
        ? 'episodes'
        : 'articles';

  return (
    <Link
      href={`/saved?tab=${tab}`}
      aria-label={`Saved items (${count} saved)`}
      className="relative inline-flex h-10 shrink-0 items-center gap-2 rounded-lg border border-border bg-surface px-2.5 text-sm font-medium text-fg-muted transition-colors hover:border-accent hover:text-accent sm:px-3"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      >
        <path d="M6 4h12v16l-6-4-6 4z" />
      </svg>
      <span className="hidden sm:inline">Saved</span>
      {count > 0 && (
        <span className="absolute -right-1.5 -top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-bold text-accent-fg sm:static">
          {count}
        </span>
      )}
    </Link>
  );
}

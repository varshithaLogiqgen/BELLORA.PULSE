'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  tools,
  toolCategories,
  pricingLabels,
  filterTools,
} from '@/lib/tools/catalog';
import { ToolCard } from './ToolCard';
import {
  DirectoryHero,
  DirectorySearch,
  DirectorySelect,
  DirectoryEmpty,
  selectOptions,
} from '@/components/directory/DirectoryUI';
import { useSavedResources } from '@/lib/hooks/useSavedResources';

const defaults = {
  search: '',
  category: '',
  pricing: '',
  letter: '',
  openSource: false,
  sort: 'az',
};
export function ToolsDirectory() {
  const [filters, setFilters] = useState(defaults);
  const [savedOnly, setSavedOnly] = useState(false);
  const { savedIds } = useSavedResources('tools');
  const update = (key: keyof typeof defaults, value: string | boolean) =>
    setFilters((previous) => ({ ...previous, [key]: value }));
  const results = filterTools(
    savedOnly ? tools.filter((tool) => savedIds.includes(tool.slug)) : tools,
    filters,
  );
  const reset = () => {
    setFilters(defaults);
    setSavedOnly(false);
  };
  return (
    <div className="directory-page" id="tools-directory">
      <DirectoryHero
        eyebrow="Your AI toolkit"
        title="AI Tools A–Z"
        description="Find your next everyday tool. Explore by name, discover by task, and keep your favourites close."
      >
        <span className="directory-badge">{tools.length} curated tools</span>
        <span className="directory-badge">
          {toolCategories.length} categories
        </span>
        <Link href="/?category=ai-tools" className="directory-button">
          Read tool news ↗
        </Link>
      </DirectoryHero>
      <section className="directory-filters" aria-label="Filter tools">
        <DirectorySearch
          value={filters.search}
          onChange={(value) => update('search', value)}
          placeholder="Search tools, tasks, or features…"
        />
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <DirectorySelect
            label="Category"
            value={filters.category}
            onChange={(value) => update('category', value)}
            options={selectOptions(toolCategories, 'All categories')}
          />
          <DirectorySelect
            label="Pricing"
            value={filters.pricing}
            onChange={(value) => update('pricing', value)}
            options={[
              { value: '', label: 'All pricing' },
              ...Object.entries(pricingLabels).map(([value, label]) => ({
                value,
                label,
              })),
            ]}
          />
          <DirectorySelect
            label="Sort"
            value={filters.sort}
            onChange={(value) => update('sort', value)}
            options={[
              { value: 'az', label: 'Name: A–Z' },
              { value: 'za', label: 'Name: Z–A' },
            ]}
          />
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-5 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.openSource}
              onChange={(event) => update('openSource', event.target.checked)}
            />
            Open source
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={savedOnly}
              onChange={(event) => setSavedOnly(event.target.checked)}
            />
            Saved tools
          </label>
          <button className="text-accent hover:underline" onClick={reset}>
            Reset filters
          </button>
        </div>
      </section>
      <div
        className="my-6 flex flex-wrap gap-1.5"
        role="group"
        aria-label="Browse tools by initial letter"
      >
        {['', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '#'].map((letter) => (
          <button
            key={letter}
            className="alphabet-button"
            aria-pressed={filters.letter === letter}
            onClick={() => update('letter', letter)}
          >
            {letter || 'All'}
          </button>
        ))}
      </div>
      <p className="mb-5 text-sm text-fg-muted" role="status">
        {results.length} {results.length === 1 ? 'tool' : 'tools'} found
      </p>
      {results.length ? (
        <div className="directory-grid">
          {results.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <DirectoryEmpty onReset={reset} />
      )}
      <p className="mt-8 text-xs leading-relaxed text-fg-muted">
        A curated directory, growing over time. Pricing labels describe access
        models; check each official website for current limits and prices.
      </p>
    </div>
  );
}

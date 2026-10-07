'use client';
import Link from 'next/link';
import { pricingLabels, type AITool } from '@/lib/tools/catalog';
import { ToolLogo } from './ToolLogo';
import { SaveResourceButton } from '@/components/directory/SaveResourceButton';

export function ToolCard({ tool }: { tool: AITool }) {
  return (
    <article className="directory-card">
      <div className="flex items-start justify-between gap-3">
        <ToolLogo tool={tool} />
        <span className="directory-badge">{pricingLabels[tool.pricing]}</span>
      </div>
      <h2 className="mt-5 text-xl font-semibold">
        <Link href={`/tools/${tool.slug}`} className="hover:text-accent">
          {tool.name}
        </Link>
      </h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">
        {tool.description}
      </p>
      <div className="my-5 flex flex-wrap gap-2">
        {tool.categories.slice(0, 3).map((category) => (
          <span className="directory-tag" key={category}>
            {category}
          </span>
        ))}
        {tool.openSource && <span className="directory-tag">Open source</span>}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <Link
          className="text-sm font-semibold text-accent hover:underline"
          href={`/tools/${tool.slug}`}
        >
          View details →
        </Link>
        <SaveResourceButton kind="tools" id={tool.slug} title={tool.name} />
      </div>
      <a
        className="mt-3 text-xs text-fg-muted hover:text-accent hover:underline"
        href={tool.website}
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit website ↗<span className="sr-only"> (opens in a new tab)</span>
      </a>
    </article>
  );
}

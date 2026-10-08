'use client';

import type { Article } from '@/lib/types/article';
import { ArticleImage } from '@/components/ArticleImage';
import { BookmarkButton } from '@/components/BookmarkButton';
import { CategoryBadge } from '@/components/CategoryBadge';
import { formatAbsoluteDate, formatRelativeDate } from '@/lib/utils/format';

export function FeaturedArticle({ article }: { article: Article }) {
  return (
    <section aria-labelledby="featured-heading" className="min-w-0">
      <h2
        id="featured-heading"
        className="section-eyebrow mb-4"
      >
        In the spotlight
      </h2>

      <article
        id={`article-${article.id}`}
        tabIndex={-1}
        className="featured-story group relative isolate grid overflow-hidden rounded-2xl border border-border">
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <ArticleImage
            src={article.imageUrl}
            alt={article.title}
            seed={article.id}
            className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className="relative flex min-h-[440px] flex-col justify-end gap-4 p-6 sm:min-h-[520px] sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="featured-category"><CategoryBadge slug={article.category} /></span>
            <span className="text-xs text-fg-muted">
              <span className="font-bold text-fg">{article.sourceName}</span>
              <span aria-hidden="true"> · </span>
              <time dateTime={article.publishedAt}>
                {formatRelativeDate(article.publishedAt)}
              </time>
              <span className="sr-only">
                , published {formatAbsoluteDate(article.publishedAt)}
              </span>
            </span>
          </div>

          <h3 className="text-[28px] font-bold leading-[1.16] tracking-tight text-fg sm:text-4xl 2xl:text-[44px]">
            <a href={article.articleUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent">{article.title}</a>
          </h3>

          {article.description && (
            <p className="line-clamp-4 text-sm leading-relaxed text-fg-muted sm:text-base">
              {article.description}
            </p>
          )}

          <div className="flex items-center gap-3 pt-2">
            <a
              href={article.articleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-[#BE1763] px-4 text-sm font-semibold text-white transition-colors hover:bg-accent/85"
            >
              Read full story
              <span className="sr-only"> at {article.sourceName}</span>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
            <BookmarkButton article={article} className="h-10 w-10" />
          </div>
        </div>
      </article>
    </section>
  );
}

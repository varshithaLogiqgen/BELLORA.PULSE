import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { tools, pricingLabels } from '@/lib/tools/catalog';
import { ToolCard } from '@/components/tools/ToolCard';
import { DirectoryHero } from '@/components/directory/DirectoryUI';
import { SaveResourceButton } from '@/components/directory/SaveResourceButton';

type Props = { params: Promise<{ slug: string }> };
export const generateStaticParams = () => tools.map(({ slug }) => ({ slug }));
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find((item) => item.slug === slug);
  return {
    title: tool?.name ?? 'Tool not found',
    description: tool?.description,
  };
}
export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = tools.find((item) => item.slug === slug);
  if (!tool) notFound();
  const related = tools
    .filter(
      (item) =>
        item.slug !== slug &&
        item.categories.some((category) => tool.categories.includes(category)),
    )
    .slice(0, 3);
  return (
    <article className="directory-page">
      <Link href="/tools" className="directory-back">
        ← All AI tools
      </Link>
      <DirectoryHero
        eyebrow={tool.categories.join(' / ')}
        title={tool.name}
        description={tool.description}
      >
        <span className="directory-badge">{pricingLabels[tool.pricing]}</span>
        {tool.openSource && (
          <span className="directory-badge">Open source</span>
        )}
        <SaveResourceButton kind="tools" id={slug} title={tool.name} />
      </DirectoryHero>
      <div className="my-8 grid items-start gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="directory-panel">
          <h2 className="text-xl font-semibold">What you can do</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-fg-muted">
            {tool.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <h2 className="mt-8 text-xl font-semibold">Ideas to get started</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-fg-muted">
            {tool.useCases.map((useCase) => (
              <li key={useCase}>{useCase}</li>
            ))}
          </ul>
        </div>
        <aside className="directory-panel">
          <h2 className="text-lg font-semibold">At a glance</h2>
          <p className="mt-4 text-sm text-fg-muted">
            Available on: {tool.platforms.join(', ')}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-fg-muted">
            {tool.pricingNote}
          </p>
          <a
            href={tool.website}
            target="_blank"
            rel="noopener noreferrer"
            className="directory-primary mt-6"
          >
            Visit {tool.name} ↗
          </a>
          <a
            href={tool.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block text-sm text-accent underline"
          >
            Official pricing / source ↗
          </a>
          <p className="mt-3 text-xs text-fg-muted">
            Last checked {tool.verifiedAt}
          </p>
        </aside>
      </div>
      {related.length > 0 && (
        <section>
          <h2 className="mb-5 text-2xl font-semibold">Explore similar tools</h2>
          <div className="directory-grid">
            {related.map((item) => (
              <ToolCard key={item.slug} tool={item} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

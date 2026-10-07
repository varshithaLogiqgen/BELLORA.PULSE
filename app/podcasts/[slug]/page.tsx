import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { shows } from '@/lib/podcasts/catalog';
import { PodcastDirectory } from '@/components/podcasts/PodcastDirectory';
type Props = { params: Promise<{ slug: string }> };
export const generateStaticParams = () => shows.map(({ slug }) => ({ slug }));
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const show = shows.find((item) => item.slug === slug);
  return {
    title: show?.title ?? 'Podcast not found',
    description: show?.description,
  };
}
export default async function PodcastPage({ params }: Props) {
  const { slug } = await params;
  const show = shows.find((item) => item.slug === slug);
  if (!show) notFound();
  return <PodcastDirectory key={slug} show={show} />;
}

import type { Metadata } from 'next';
import { PodcastDirectory } from '@/components/podcasts/PodcastDirectory';
export const metadata: Metadata = {
  title: 'AI Podcasts',
  description:
    'Discover AI podcasts, explore selected episodes, and save your next listen.',
};
export default function PodcastsPage() {
  return <PodcastDirectory />;
}
